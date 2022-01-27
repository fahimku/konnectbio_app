import React from "react";
import {
  Button,
  Tabs,
  Tab,
  Modal,
  Row,
  Collapse,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import logo from "../../images/konnectbiologo.svg";
import axios from "axios";
import { PaymentButton } from "../../components/PaymentButton/PaymentButton";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import * as subActions from "../../actions/subscribe";
import { createBrowserHistory } from "history";
import Loader from "../../components/Loader/Loader";
export const history = createBrowserHistory({
  forceRefresh: true,
});
const userInfo = JSON.parse(localStorage.getItem("userInfo"));

class Package extends React.Component {
  state = {
    showBasic: false,
    showPremium: false,
    showPremiumPlus: false,
    packages: "",
    loading: false,
    promo_code: "",
    promo_error: false,
    promoCodeError: "",
    showSelectPackage: false,
    checkbox: {},
    plan: "",
    showPromo: false,
    showPromoPlus: false,
    help1: true,
    help2: true,
    help3: true,
    packageId: "",
    prices: [],
    selectedtab: "Yearly",
    paymentLoading: false,
  };

  componentDidMount() {
    this.props.configSubs().then((res) => {
      this.setState({ prices: res.message });
    });
    if (userInfo.hasOwnProperty("package")) {
      history.push("/app/main");
    }
    this.getPackages();
  }

  getPackages = async () => {
    await axios
      .get(`/package/receive`)
      .then((response) => {
        const packages = response.data.message;
        this.setState({ packages: this.convertArrayToObject(packages) });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  convertArrayToObject = (array) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item["package_name"].replace(/\s+/g, "")]: item,
      };
    }, initialValue);
  };

  handleClose = () => {
    this.setState({ promo_error: false });
    this.setState({ showBasic: false });
    this.setState({ showPremium: false });
    this.setState({ showPremiumPlus: false });
    this.setState({ showSelectPackage: false });
    this.setState({ plan: "", checkbox: {}, promo_code: "" });
    this.setState({ showPromo: false, showPromoPlus: false });
    this.setState({ help1: true, help2: true, help3: true });
    this.setState({ packageId: "" });
  };

  updatePackage = async (id, packageId) => {
    await axios
      .put(`users/revise/package/${id}`, {
        package_id: packageId,
      })
      .then((response) => {
        const userInformation = localStorage.getItem("userInfo");
        const parseUserInformation = JSON.parse(userInformation);
        parseUserInformation.package = response.data.message;
        const storeUserInformation = JSON.stringify(parseUserInformation);
        localStorage.setItem("userInfo", storeUserInformation);
        history.push("/connect");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleChange = (e) => {
    this.setState({
      promo_code: e.target.value,
      promo_error: false,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.state.promo_code === "") {
      this.setState({ promo_error: true });
      this.setState({ promoCodeError: " Please enter promo code" });
    } else if (
      !this.state.checkbox.instagram &&
      !this.state.checkbox.facebook &&
      !this.state.checkbox.checkbox3
    ) {
      this.setState({ showPromo: true });
    } else {
      this.setState({ loading: true });
      await axios
        .post("/payment/validatepromocode", {
          promo_code: this.state.promo_code,
          package_id: this.state.packageId,
        })
        .then((response) => {
          this.setState({ loading: false });
          toast.success(response.data.message);
          const userInformation = localStorage.getItem("userInfo");
          const parseUserInformation = JSON.parse(userInformation);
          parseUserInformation.package = response.data.message;
          const storeUserInformation = JSON.stringify(parseUserInformation);
          localStorage.setItem("userInfo", storeUserInformation);
          history.push("/connect");
        })
        .catch((err) => {
          this.setState({ promo_error: true });
          this.setState({ promoCodeError: err.response.data.message });
          toast.error(err.response.data.message);
          this.setState({ loading: false, promo_code: "" });
          // this.setState({ checkbox: {}, plan: "" });
        });
    }
  };

  handleCheckbox = (e) => {
    const target = e.target;
    const { checkbox } = this.state;
    const value = target.type === "checkbox" ? target.checked : target.value;
    checkbox[target.name] = value;
    this.setState({
      checkbox,
    });
  };

  getPriceId = (value, name, arr) => {
    const updatedArr = arr.filter(
      (item) =>
        item.interval === value.slice(0, value.length - 2) &&
        item.product_name == name
    );
    return updatedArr[0].price_id;
  };
  render() {
    const basic = this.state.packages.Basic || {};
    const premium = this.state.packages.Premium || {};
    const premiumPlus = this.state.packages.PremiumPlus || {};
    const renderTooltip = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        Platform Fee of 5% of earned commission will be charged.
      </Tooltip>
    );
    return (
      <>
        <div className="login_header">
          <div className="header_inr group">
            <div className="header_inr_left">
              <div className="konnect_logo">
                <img className="logo" src={logo} alt="logo" />
              </div>
            </div>
            <div className="header_inr_right">
              <div className="create_account">
                <Button
                  className="btn-connect"
                  onClick={() => this.props.history.push("/logout")}
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid pricing-table-ifti p-0">
          {/* <form onSubmit={this.handleSubmit}>
            <Row className="promo_code_ift">
              <div className="promo_msg col-md-12">Have Promo Code?</div>
              <div className="promo_iner col-md-12">
                <input
                  type="text"
                  name="promo_code"
                  // placeholder="Enter Promo Code"
                  onInput={this.handleChange}
                  className="form-control"
                  value={this.state.promo_code}
                  autoComplete="off"
                />
                {this.state.loading ? (
                  <Button>
                    <Loader />
                  </Button>
                ) : (
                  <Button type="submit">Apply</Button>
                )}
              </div>
              {this.state.promo_error ? (
                <span class="text-danger col-md-12">
                  Please enter promo code
                </span>
              ) : null}
            </Row>
          </form> */}
          <div className="yearly_message">Save 20% with yearly billing</div>
          <Tabs
            defaultActiveKey="Yearly"
            transition={false}
            id="noanim-tab-example"
            onSelect={(v) => {
              this.setState({ selectedtab: v });
            }}
            className="pricing_tabs_ifti mb-3"
          >
            <Tab eventKey="Monthly" title="Monthly">
              <div className="package_parent">
                {Object.keys(basic).length !== 0 ? (
                  <div className="custom_pkg">
                    <h4>{basic.package_name}</h4>
                    <p>
                      Basic account is for individuals and influencers, allows
                      creation of profile, have social links, create link in
                      Bioshop &nbsp;
                      <button
                        className="pkg_read btn btn-link"
                        onClick={() => {
                          this.setState({ showBasic: true });
                        }}
                      >
                        Read More
                      </button>
                    </p>
                    <div className="pkg_price_ifti">
                      <span className="pkg_limit">From</span>
                      <sup>$</sup>
                      <span className="monthly display-5">
                        {basic.package_amount_monthly}
                      </span>
                      <small className="monthly">/mo</small>
                      <span className="pkg_billed">billed monthly</span>
                    </div>
                    <ul className="pkg_detail_list_ift">
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Profile Page
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Social Links - Up to 3
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        BIOSHOP With 3 Categories
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Affiliate - Publisher{" "}
                        <OverlayTrigger
                          placement="bottom"
                          delay={{ show: 250, hide: 400 }}
                          overlay={renderTooltip}
                        >
                          <i class="fa fa-info pac-info"></i>
                        </OverlayTrigger>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Analytics
                      </li>
                    </ul>

                    {this.state.promo_code !== "" ? (
                      <Button
                        variant="dark"
                        className="btn_individual"
                        disabled
                      >
                        Select Plan
                      </Button>
                    ) : (
                      <Button
                        variant="dark"
                        className="btn_individual"
                        onClick={() => {
                          this.updatePackage(
                            userInfo.user_id,
                            basic.package_id
                          );
                        }}
                      >
                        Select Plan
                      </Button>
                    )}
                  </div>
                ) : null}
                {Object.keys(premium).length !== 0 ? (
                  <div className="custom_pkg">
                    <h4>{premium.package_name}</h4>
                    <p>
                      Premium account is for businesses, brands and influencers,
                      allows creation of profile, have social links, create link
                      in Bioshop &nbsp;
                      <button
                        className="pkg_read btn btn-link"
                        onClick={() => {
                          this.setState({ showPremium: true });
                        }}
                      >
                        Read More
                      </button>
                    </p>
                    <div className="pkg_price_ifti">
                      <span className="pkg_limit">From</span>
                      <sup>$</sup>
                      <span className="monthly display-5">
                        {premium.package_amount_monthly}
                      </span>
                      <small className="monthly">/mo</small>
                      {/* <ins>(Free For 90 Days)</ins> */}
                      <span className="pkg_billed">billed monthly</span>
                    </div>
                    <ul className="pkg_detail_list_ift">
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Profile Page
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Social Links - Up to {premium.link_count}
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        BIOSHOP with {premium.category_count} Categories
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Affiliate - Publisher{" "}
                        <OverlayTrigger
                          placement="bottom"
                          delay={{ show: 250, hide: 400 }}
                          overlay={renderTooltip}
                        >
                          <i class="fa fa-info pac-info"></i>
                        </OverlayTrigger>
                      </li>

                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Schedule Post
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Monitor Hashtags - Up to {premium.hashtag_limit}
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Monitor Mention/Comment
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Monitor Competition Profiles - Up to{" "}
                        {premium.profile_limit}
                      </li>
                      {/* <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Direct Messaging
                      </li> */}

                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Analytics
                      </li>
                    </ul>
                    {this.state.promo_code !== "" ? (
                      <Button
                        variant="dark"
                        className="btn_individual"
                        disabled
                      >
                        Select Plan
                      </Button>
                    ) : (
                      <Button
                        variant="dark"
                        // className="btn_individual"
                        onClick={() => {
                          this.setState({
                            showSelectPackage: true,
                            plan: "Monthly",
                            packageId: premium.package_id,
                          });
                        }}
                      >
                        Select Plan
                      </Button>
                      // <PaymentButton
                      //   key="2"
                      //   userId={userInfo.user_id}
                      //   packageId={premium.package_id}
                      //   name={"Select Plan"}
                      //   variant="dark"
                      //   paymentMethod={"Influencer"}
                      //   plan="Monthly"
                      // />
                    )}
                  </div>
                ) : null}
                {Object.keys(premiumPlus).length !== 0 ? (
                  <div className="custom_pkg">
                    <h4>{premiumPlus.package_name}</h4>
                    <p>
                      Premium Plus account is for large businesses and brands
                      allows creation of profile, have social links, create link
                      in Bioshop &nbsp;
                      <button
                        className="pkg_read btn btn-link"
                        onClick={() => {
                          this.setState({ showPremiumPlus: true });
                        }}
                      >
                        Read More
                      </button>
                    </p>
                    <div className="pkg_price_ifti">
                      <span className="pkg_limit">From</span>
                      <sup>$</sup>
                      <span className="monthly display-5">
                        {premiumPlus.package_amount_monthly}
                      </span>
                      <small className="monthly">/mo</small>
                      <span className="pkg_billed">billed monthly</span>
                    </div>
                    <ul className="pkg_detail_list_ift">
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Profile Page
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Social Links - Up to {premiumPlus.link_count}
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        BIOSHOP with {premiumPlus.category_count} Categories
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Affiliate - Publisher{" "}
                        <OverlayTrigger
                          placement="bottom"
                          delay={{ show: 250, hide: 400 }}
                          overlay={renderTooltip}
                        >
                          <i class="fa fa-info pac-info"></i>
                        </OverlayTrigger>
                      </li>

                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Schedule Post
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Monitor Hashtags - Up to {premiumPlus.hashtag_limit}
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Monitor Mention/Comment
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Monitor Competition Profiles - Up to{" "}
                        {premiumPlus.profile_limit}
                      </li>
                      {/* <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Direct Messaging
                      </li> */}

                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Affiliate - Advertiser
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Analytics
                      </li>
                    </ul>
                    {this.state.promo_code !== "" ? (
                      <Button
                        variant="dark"
                        className="btn_individual"
                        disabled
                      >
                        Select Plan
                      </Button>
                    ) : (
                      <Button
                        variant="dark"
                        // className="btn_individual"
                        onClick={() => {
                          this.setState({
                            showPromoPlus: true,
                            plan: "Monthly",
                            packageId: premiumPlus.package_id,
                          });
                        }}
                      >
                        Select Plan
                      </Button>
                      // <PaymentButton
                      //   key="2"
                      //   userId={userInfo.user_id}
                      //   packageId={premium.package_id}
                      //   name={"Select Plan"}
                      //   variant="dark"
                      //   paymentMethod={"Influencer"}
                      //   plan="Monthly"
                      // />
                    )}
                  </div>
                ) : null}
              </div>
            </Tab>
            <Tab eventKey="Yearly" title="Yearly">
              <div className="package_parent">
                {Object.keys(basic).length !== 0 ? (
                  <div className="custom_pkg">
                    <h4>{basic.package_name}</h4>
                    <p>
                      Basic account is for individuals and influencers, allows
                      creation of profile, have social links, create link in
                      Bioshop &nbsp;
                      <button
                        className="pkg_read btn btn-link"
                        onClick={() => {
                          this.setState({ showBasic: true });
                        }}
                      >
                        Read More
                      </button>
                    </p>
                    <div className="pkg_price_ifti">
                      <span className="pkg_limit">From</span>
                      <sup>$</sup>
                      <span className="monthly display-5">
                        {basic.package_amount_yearly}
                      </span>
                      <small className="monthly">/mo</small>
                      <span className="pkg_billed">billed yearly</span>
                    </div>
                    <ul className="pkg_detail_list_ift">
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Profile Page
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Social Links - Up to 3
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        BIOSHOP With 3 Categories
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Affiliate - Publisher{" "}
                        <OverlayTrigger
                          placement="bottom"
                          delay={{ show: 250, hide: 400 }}
                          overlay={renderTooltip}
                        >
                          <i class="fa fa-info pac-info"></i>
                        </OverlayTrigger>
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Analytics
                      </li>
                    </ul>

                    {this.state.promo_code !== "" ? (
                      <Button
                        variant="dark"
                        className="btn_individual"
                        disabled
                      >
                        Select Plan
                      </Button>
                    ) : (
                      <Button
                        variant="dark"
                        className="btn_individual"
                        onClick={() => {
                          this.updatePackage(
                            userInfo.user_id,
                            basic.package_id
                          );
                        }}
                      >
                        Select Plan
                      </Button>
                    )}
                  </div>
                ) : null}
                {Object.keys(premium).length !== 0 ? (
                  <div className="custom_pkg">
                    <h4>{premium.package_name}</h4>
                    <p>
                      Premium account is for businesses, brands and influencers,
                      allows creation of profile, have social links, create link
                      in Bioshop &nbsp;
                      <button
                        className="pkg_read btn btn-link"
                        onClick={() => {
                          this.setState({ showPremium: true });
                        }}
                      >
                        Read More
                      </button>
                    </p>
                    <div className="pkg_price_ifti">
                      <span className="pkg_limit">From</span>
                      <sup>$</sup>
                      <span className="monthly display-5">
                        {premium.package_amount_yearly}
                      </span>
                      <small className="monthly">/mo</small>
                      {/* <ins>(Free For 90 Days)</ins> */}
                      <span className="pkg_billed">billed yearly</span>
                    </div>
                    <ul className="pkg_detail_list_ift">
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Profile Page
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Social Links - Up to {premium.link_count}
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        BIOSHOP with {premium.category_count} Categories
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Affiliate - Publisher{" "}
                        <OverlayTrigger
                          placement="bottom"
                          delay={{ show: 250, hide: 400 }}
                          overlay={renderTooltip}
                        >
                          <i class="fa fa-info pac-info"></i>
                        </OverlayTrigger>
                      </li>

                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Schedule Post
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Monitor Hashtags - Up to {premium.hashtag_limit}
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Monitor Mention/Comment
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Monitor Competition Profiles - Up to{" "}
                        {premium.profile_limit}
                      </li>
                      {/* <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Direct Messaging
                      </li> */}

                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Analytics
                      </li>
                    </ul>
                    {this.state.promo_code !== "" ? (
                      <Button
                        variant="dark"
                        className="btn_individual"
                        disabled
                      >
                        Select Plan
                      </Button>
                    ) : (
                      <Button
                        variant="dark"
                        // className="btn_individual"
                        onClick={() => {
                          this.setState({
                            showSelectPackage: true,
                            plan: "Yearly",
                            packageId: premium.package_id,
                          });
                        }}
                      >
                        Select Plan
                      </Button>
                      // <PaymentButton
                      //   key="2"
                      //   userId={userInfo.user_id}
                      //   packageId={premium.package_id}
                      //   name={"Select Plan"}
                      //   variant="dark"
                      //   paymentMethod={"Influencer"}
                      //   plan="Yearly"
                      // />
                    )}
                  </div>
                ) : null}
                {Object.keys(premiumPlus).length !== 0 ? (
                  <div className="custom_pkg">
                    <h4>{premiumPlus.package_name}</h4>
                    <p>
                      Premium Plus account is for large businesses and brands
                      allows creation of profile, have social links, create link
                      in Bioshop &nbsp;
                      <button
                        className="pkg_read btn btn-link"
                        onClick={() => {
                          this.setState({ showPremiumPlus: true });
                        }}
                      >
                        Read More
                      </button>
                    </p>
                    <div className="pkg_price_ifti">
                      <span className="pkg_limit">From</span>
                      <sup>$</sup>
                      <span className="monthly display-5">
                        {premiumPlus.package_amount_yearly}
                      </span>
                      <small className="monthly">/mo</small>
                      <span className="pkg_billed">billed yearly</span>
                    </div>
                    <ul className="pkg_detail_list_ift">
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Profile Page
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Social Links - Up to {premiumPlus.link_count}
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        BIOSHOP with {premiumPlus.category_count} Categories
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Affiliate - Publisher{" "}
                        <OverlayTrigger
                          placement="bottom"
                          delay={{ show: 250, hide: 400 }}
                          overlay={renderTooltip}
                        >
                          <i class="fa fa-info pac-info"></i>
                        </OverlayTrigger>
                      </li>

                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Schedule Post
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Monitor Hashtags - Up to {premiumPlus.hashtag_limit}
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Monitor Mention/Comment
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Monitor Competition Profiles - Up to{" "}
                        {premiumPlus.profile_limit}
                      </li>
                      {/* <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Direct Messaging
                      </li> */}

                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Affiliate - Advertiser
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Analytics
                      </li>
                    </ul>
                    {this.state.promo_code !== "" ? (
                      <Button
                        variant="dark"
                        className="btn_individual"
                        disabled
                      >
                        Select Plan
                      </Button>
                    ) : (
                      <Button
                        variant="dark"
                        // className="btn_individual"
                        onClick={() => {
                          this.setState({
                            showPromoPlus: true,
                            plan: "Yearly",
                            packageId: premiumPlus.package_id,
                          });
                        }}
                      >
                        Select Plan
                      </Button>
                      // <PaymentButton
                      //   key="2"
                      //   userId={userInfo.user_id}
                      //   packageId={premium.package_id}
                      //   name={"Select Plan"}
                      //   variant="dark"
                      //   paymentMethod={"Influencer"}
                      //   plan="Yearly"
                      // />
                    )}
                  </div>
                ) : null}
              </div>
            </Tab>
          </Tabs>
        </div>

        <Modal
          className="pkg_readmore"
          show={this.state.showBasic}
          onHide={this.handleClose}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Basic</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Basic account is for individuals and influencers, allows creation of
            profile, have social links, create link in Bioshop with categories,
            access analytics and become an affiliate publisher. By becoming a
            publisher, you are able to publish products and services on your
            Bioshop and earn commission when your followers buy them.
          </Modal.Body>
        </Modal>

        <Modal
          className="pkg_readmore"
          show={this.state.showPremium}
          onHide={this.handleClose}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Premium</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Premium account is for businesses, brands and influencers, allows
            creation of profile, have social links, create link in Bioshop with
            categories, access to analytics and become an affiliate publisher.
            By becoming a publisher, you are able to publish products and
            services on your Bioshop and earn commission when your followers buy
            them. You can also search user generated content, schedule post,
            monitor hashtags, monitor mentions and monitor competition profiles.
          </Modal.Body>
        </Modal>

        <Modal
          className="pkg_readmore"
          show={this.state.showPremiumPlus}
          onHide={this.handleClose}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Premium Plus</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Premium Plus account is for large businesses and brands allows
            creation of profile, have social links, create link in Bioshop with
            categories, access to analytics and become an affiliate publisher.
            By becoming a publisher, you are able to publish products and
            services on your Bioshop and earn commission when your followers buy
            them. You can also search user generated content, schedule post,
            monitor hashtags, monitor mentions and monitor competition profiles.
            As a Premium Plus account, you can also create Affiliate Advertising
            campaigns for followers to participate and earn commission when they
            promote to their followers.
          </Modal.Body>
        </Modal>

        <Modal
          className="pkg_readmore pkg_fb_connect"
          show={this.state.showSelectPackage}
          onHide={this.handleClose}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Premium Package</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div class="funkyradio">
              <p>
                Please make sure of the following before proceeding further:
              </p>
              <div class="funkyradio-primary form-check abc-checkbox abc-checkbox-primary">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="instagram"
                  id="instagram"
                  onChange={this.handleCheckbox}
                />
                <label for="instagram">
                  Do you have Instagram business account?{" "}
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({
                        help1: !this.state.help1,
                        help2: true,
                        help3: true,
                      });
                    }}
                    href="#"
                  >
                    Click here for help.
                  </a>
                </label>

                <Collapse in={!this.state.help1}>
                  <div className="card card-body">
                    <ol type="1" class="insta-list">
                      <li>Login To Your Instagram Account.</li>
                      <li>Go To Profile.</li>
                      <li>
                        Select Settings <i class="fa fa-cog"></i>
                      </li>
                      <li>
                        Find Account Icon <i class="fa fa-user-circle-o"></i>
                      </li>
                      <li>Find Switch Account Type.</li>
                      <li>Select Switch to Business Account.</li>
                    </ol>
                    <p>You will now have an Instagram Business Account.</p>
                  </div>
                </Collapse>
              </div>
              <div class="funkyradio-primary form-check abc-checkbox abc-checkbox-primary">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="facebook"
                  id="facebook"
                  onChange={this.handleCheckbox}
                />
                <label for="facebook">
                  Do you have Facebook account connected to a Facebook page?{" "}
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({
                        help2: !this.state.help2,
                        help1: true,
                        help3: true,
                      });
                    }}
                    href="#"
                  >
                    Click here for help.
                  </a>
                </label>
                <Collapse in={!this.state.help2}>
                  <div className="card card-body">
                    <ol type="1" class="insta-list">
                      <li>Go to facebook.com and create an account.</li>
                      <li>
                        Once account is created, connect to a facebook page.
                      </li>
                    </ol>
                    <p>
                      Your Facebook account will be connected to a facebook
                      page.
                    </p>
                  </div>
                </Collapse>
              </div>
              <div class="funkyradio-primary form-check abc-checkbox abc-checkbox-primary">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="checkbox3"
                  id="checkbox3"
                  onChange={this.handleCheckbox}
                />
                <label for="checkbox3">
                  Is your Facebook account connected with your Instagram
                  account?{" "}
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({
                        help3: !this.state.help3,
                        help1: true,
                        help2: true,
                      });
                    }}
                    href="#"
                  >
                    Click here for help.
                  </a>
                </label>
                <Collapse in={!this.state.help3}>
                  <div className="card card-body">
                    <span className="font-weight-bold">From Instagram:</span>
                    <ol type="1" class="insta-list">
                      <li>Log in to Instagram and go to your profile.</li>
                      <li>Tap Edit Profile.</li>
                      <li>
                        Under Public Business/Profile Information, select Page.
                      </li>
                      <li>
                        Choose the Facebook page you wish to connect to. If you
                        don’t have one yet, tap Create a new Facebook page.
                      </li>
                    </ol>
                    <p>
                      Your Instagram account will be connected to a Facebook
                      account.
                    </p>
                    <span className="font-weight-bold">From Facebook:</span>
                    <ol type="1" class="insta-list">
                      <li>
                        Log in to Facebook and click Pages in the left menu.
                      </li>
                      <li>From your Facebook page, click Settings.</li>
                      <li>
                        Scroll down and select Instagram in the left column.
                      </li>
                      <li>
                        Click Connect Account, and fill in your Instagram
                        username and password.
                      </li>
                    </ol>
                    <p>
                      Your Facebook account will be connected to an Instagram
                      account.
                    </p>
                  </div>
                </Collapse>
              </div>
            </div>
            <div>
              {this.state.checkbox.instagram &&
              this.state.checkbox.facebook &&
              this.state.checkbox.checkbox3 ? (
                <>
                  {/* <form onSubmit={this.handleSubmit}>
                    <Row className="promo_code_ift promo_code_ift_new">
                      <div className="promo_msg col-md-12">
                        Have Promo Code?
                      </div>
                      <div className="promo_iner col-md-12">
                        <input
                          type="text"
                          name="promo_code"
                          // placeholder="Enter Promo Code"
                          onInput={this.handleChange}
                          className="form-control"
                          value={this.state.promo_code}
                          autoComplete="off"
                        />
                        {this.state.loading ? (
                          <Button>
                            <Loader />
                          </Button>
                        ) : (
                          <Button type="submit">Apply</Button>
                        )}
                      </div>
                      <span class="text-danger col-md-12 promo-err-box">
                        {this.state.promo_error
                          ? // <span class="text-danger col-md-12">
                            this.state.promoCodeError
                          : // </span>
                            null}
                      </span>
                    </Row>
                  </form>
                  <PaymentButton
                    key="2"
                    userId={userInfo.user_id}
                    packageId={premium.package_id}
                    name={"Make Payment"}
                    variant="primary"
                    paymentMethod={"Premium"}
                    plan={this.state.plan}
                    disableButton={this.state.promo_code !== "" ? true : false}
                    btnClass="btn-block"
                  /> */}
                  {this.state.paymentLoading ? (
                    <Button>
                      <Loader />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        this.setState({ paymentLoading: true });
                        this.props
                          .makePayment({
                            price_id: this.getPriceId(
                              this.state.selectedtab.toLowerCase(),
                              premium.package_name,
                              this.state.prices
                            ),
                            package_id: premium.package_id,
                            recurring_payment_type: this.state.selectedtab,
                          })
                          .then((res) => {
                            this.setState({ paymentLoading: false });
                            window.open(res, "_self");
                          });
                      }}
                    >
                      Pay Now
                    </Button>
                  )}
                  <Button
                    onClick={() => {
                      this.updatePackage(userInfo.user_id, premium.package_id);
                    }}
                  >
                    Start Trial
                  </Button>
                </>
              ) : null}
            </div>
          </Modal.Body>
        </Modal>

        <Modal
          className="pkg_readmore"
          show={this.state.showPromo}
          onHide={this.handleClose}
          centered
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Premium Package</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div class="funkyradio">
              <p>
                Please make sure of the following before proceeding further:
              </p>
              <div class="funkyradio-primary form-check abc-checkbox abc-checkbox-primary">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="instagram"
                  id="instagram"
                  onChange={this.handleCheckbox}
                />
                <label for="instagram">
                  Do you have Instagram business account?{" "}
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({
                        help1: !this.state.help1,
                        help3: true,
                        help2: true,
                      });
                    }}
                    href="#"
                  >
                    Click here for help.
                  </a>
                </label>

                <Collapse in={!this.state.help1}>
                  <div className="card card-body">
                    <ol type="1" class="insta-list">
                      <li>Login To Your Instagram Account.</li>
                      <li>Go To Profile.</li>
                      <li>
                        Select Settings <i class="fa fa-cog"></i>
                      </li>
                      <li>
                        Find Account Icon <i class="fa fa-user-circle-o"></i>
                      </li>
                      <li>Find Switch Account Type.</li>
                      <li>Select Switch to Business Account.</li>
                    </ol>
                    <p>You will now have an Instagram Business Account.</p>
                  </div>
                </Collapse>
              </div>
              <div class="funkyradio-primary form-check abc-checkbox abc-checkbox-primary">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="facebook"
                  id="facebook"
                  onChange={this.handleCheckbox}
                />
                <label for="facebook">
                  Do you have Facebook account connected to a business page?{" "}
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({
                        help2: !this.state.help2,
                        help1: true,
                        help3: true,
                      });
                    }}
                    href="#"
                  >
                    Click here for help.
                  </a>
                </label>
                <Collapse in={!this.state.help2}>
                  <div className="card card-body">
                    <ol type="1" class="insta-list">
                      <li>Go to facebook.com and create an account.</li>
                      <li>
                        Once account is created, connect to a business page.
                      </li>
                    </ol>
                    <p>
                      Your Facebook account will be connected to a business
                      page.
                    </p>
                  </div>
                </Collapse>
              </div>
              <div class="funkyradio-primary form-check abc-checkbox abc-checkbox-primary">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="checkbox3"
                  id="checkbox3"
                  onChange={this.handleCheckbox}
                />
                <label for="checkbox3">
                  Is your Facebook account connected with your Instagram
                  account?{" "}
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({
                        help3: !this.state.help3,
                        help1: true,
                        help2: true,
                      });
                    }}
                    href="#"
                  >
                    Click here for help.
                  </a>
                </label>
                <Collapse in={!this.state.help3}>
                  <div className="card card-body">
                    <span className="font-weight-bold">From Instagram:</span>
                    <ol type="1" class="insta-list">
                      <li>Log in to Instagram and go to your profile.</li>
                      <li>Tap Edit Profile.</li>
                      <li>
                        Under Public Business/Profile Information, select Page.
                      </li>
                      <li>
                        Choose the Facebook page you wish to connect to. If you
                        don’t have one yet, tap Create a new Facebook page.
                      </li>
                    </ol>
                    <p>
                      Your Instagram account will be connected to a Facebook
                      account.
                    </p>
                    <span className="font-weight-bold">From Facebook:</span>
                    <ol type="1" class="insta-list">
                      <li>
                        Log in to Facebook and click Pages in the left menu.
                      </li>
                      <li>From your Facebook page, click Settings.</li>
                      <li>
                        Scroll down and select Instagram in the left column.
                      </li>
                      <li>
                        Click Connect Account, and fill in your Instagram
                        username and password.
                      </li>
                    </ol>
                    <p>
                      Your Facebook account will be connected to an Instagram
                      account.
                    </p>
                  </div>
                </Collapse>
              </div>
              <div>
                {this.state.checkbox.instagram &&
                this.state.checkbox.facebook &&
                this.state.checkbox.checkbox3 ? (
                  <Button
                    onClick={() => {
                      this.setState({
                        showPromo: false,
                        help1: true,
                        help2: true,
                        help3: true,
                      });
                    }}
                  >
                    Accept
                  </Button>
                ) : null}
              </div>
            </div>
          </Modal.Body>
        </Modal>

        <Modal
          className="pkg_readmore pkg_fb_connect"
          show={this.state.showPromoPlus}
          onHide={this.handleClose}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Premium Plus Package</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div class="funkyradio">
              <p>
                Please make sure of the following before proceeding further:
              </p>
              <div class="funkyradio-primary form-check abc-checkbox abc-checkbox-primary">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="instagram"
                  id="instagram"
                  onChange={this.handleCheckbox}
                />
                <label for="instagram">
                  Do you have Instagram business account?{" "}
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({
                        help1: !this.state.help1,
                        help2: true,
                        help3: true,
                      });
                    }}
                    href="#"
                  >
                    Click here for help.
                  </a>
                </label>

                <Collapse in={!this.state.help1}>
                  <div className="card card-body">
                    <ol type="1" class="insta-list">
                      <li>Login To Your Instagram Account.</li>
                      <li>Go To Profile.</li>
                      <li>
                        Select Settings <i class="fa fa-cog"></i>
                      </li>
                      <li>
                        Find Account Icon <i class="fa fa-user-circle-o"></i>
                      </li>
                      <li>Find Switch Account Type.</li>
                      <li>Select Switch to Business Account.</li>
                    </ol>
                    <p>You will now have an Instagram Business Account.</p>
                  </div>
                </Collapse>
              </div>
              <div class="funkyradio-primary form-check abc-checkbox abc-checkbox-primary">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="facebook"
                  id="facebook"
                  onChange={this.handleCheckbox}
                />
                <label for="facebook">
                  Do you have Facebook account connected to a Facebook page?{" "}
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({
                        help2: !this.state.help2,
                        help1: true,
                        help3: true,
                      });
                    }}
                    href="#"
                  >
                    Click here for help.
                  </a>
                </label>
                <Collapse in={!this.state.help2}>
                  <div className="card card-body">
                    <ol type="1" class="insta-list">
                      <li>Go to facebook.com and create an account.</li>
                      <li>
                        Once account is created, connect to a facebook page.
                      </li>
                    </ol>
                    <p>
                      Your Facebook account will be connected to a facebook
                      page.
                    </p>
                  </div>
                </Collapse>
              </div>
              <div class="funkyradio-primary form-check abc-checkbox abc-checkbox-primary">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="checkbox3"
                  id="checkbox3"
                  onChange={this.handleCheckbox}
                />
                <label for="checkbox3">
                  Is your Facebook account connected with your Instagram
                  account?{" "}
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({
                        help3: !this.state.help3,
                        help1: true,
                        help2: true,
                      });
                    }}
                    href="#"
                  >
                    Click here for help.
                  </a>
                </label>
                <Collapse in={!this.state.help3}>
                  <div className="card card-body">
                    <span className="font-weight-bold">From Instagram:</span>
                    <ol type="1" class="insta-list">
                      <li>Log in to Instagram and go to your profile.</li>
                      <li>Tap Edit Profile.</li>
                      <li>
                        Under Public Business/Profile Information, select Page.
                      </li>
                      <li>
                        Choose the Facebook page you wish to connect to. If you
                        don’t have one yet, tap Create a new Facebook page.
                      </li>
                    </ol>
                    <p>
                      Your Instagram account will be connected to a Facebook
                      account.
                    </p>
                    <span className="font-weight-bold">From Facebook:</span>
                    <ol type="1" class="insta-list">
                      <li>
                        Log in to Facebook and click Pages in the left menu.
                      </li>
                      <li>From your Facebook page, click Settings.</li>
                      <li>
                        Scroll down and select Instagram in the left column.
                      </li>
                      <li>
                        Click Connect Account, and fill in your Instagram
                        username and password.
                      </li>
                    </ol>
                    <p>
                      Your Facebook account will be connected to an Instagram
                      account.
                    </p>
                  </div>
                </Collapse>
              </div>
            </div>
            <div>
              {this.state.checkbox.instagram &&
              this.state.checkbox.facebook &&
              this.state.checkbox.checkbox3 ? (
                <>
                  <form onSubmit={this.handleSubmit}>
                    <Row className="promo_code_ift promo_code_ift_new">
                      <div className="promo_msg col-md-12">
                        Have Promo Code?
                      </div>
                      <div className="promo_iner col-md-12">
                        <input
                          type="text"
                          name="promo_code"
                          // placeholder="Enter Promo Code"
                          onInput={this.handleChange}
                          className="form-control"
                          value={this.state.promo_code}
                          autoComplete="off"
                        />
                        {this.state.loading ? (
                          <Button>
                            <Loader />
                          </Button>
                        ) : (
                          <Button type="submit">Apply</Button>
                        )}
                      </div>
                      <span class="text-danger col-md-12 promo-err-box">
                        {this.state.promo_error
                          ? // <span class="text-danger col-md-12">
                            this.state.promoCodeError
                          : // </span>
                            null}
                      </span>
                    </Row>
                  </form>

                  {/* <PaymentButton
                    key="2"
                    userId={userInfo.user_id}
                    packageId={premiumPlus.package_id}
                    name={"Make Payment"}
                    variant="primary"
                    paymentMethod={"Premium Plus"}
                    plan={this.state.plan}
                    disableButton={this.state.promo_code !== "" ? true : false}
                    btnClass="btn-block"
                  /> */}
                  {this.state.paymentLoading ? (
                    <Button>
                      <Loader />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        this.setState({ paymentLoading: true });
                        this.props
                          .makePayment({
                            price_id: this.getPriceId(
                              this.state.selectedtab.toLowerCase(),
                              premiumPlus.package_name,
                              this.state.prices
                            ),
                            package_id: premiumPlus.package_id,
                            recurring_payment_type: this.state.selectedtab,
                          })
                          .then((res) => {
                            this.setState({ paymentLoading: false });
                            window.open(res, "_self");
                          });
                      }}
                    >
                      Pay Now
                    </Button>
                  )}
                </>
              ) : null}
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
export default connect(null, subActions)(Package);
