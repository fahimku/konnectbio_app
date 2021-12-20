import React from "react";
import { Button, Tabs, Tab, Modal, Row } from "react-bootstrap";
import logo from "../../images/logo.svg";
import axios from "axios";
import { PaymentButton } from "../../components/PaymentButton/PaymentButton";
import { toast } from "react-toastify";

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
    packages: "",
    loading: false,
    promo_code: "",
    promo_error: false,
    showSelectPackage: false,
    checkbox: {},
    plan: "",
  };
  componentDidMount() {
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
    this.setState({ showBasic: false });
    this.setState({ showPremium: false });
    this.setState({ showSelectPackage: false });
    this.setState({ plan: "", checkbox: {} });
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
    } else {
      this.setState({ loading: true });
      await axios
        .post("/payment/validatepromocode", {
          promo_code: this.state.promo_code,
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
          console.log(err.response.data);
          toast.error(err.response.data.message);
          this.setState({ loading: false, promo_code: "" });
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
  render() {
    const basic = this.state.packages.Basic || {};
    const premium = this.state.packages.Premium || {};
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
          <form onSubmit={this.handleSubmit}>
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
          </form>
          <div className="yearly_message">Save 20% with yearly billing</div>
          <Tabs
            defaultActiveKey="home"
            transition={false}
            id="noanim-tab-example"
            className="pricing_tabs_ifti mb-3"
          >
            <Tab eventKey="home" title="Monthly">
              <div className="package_parent">
                {Object.keys(basic).length !== 0 ? (
                  <div className="custom_pkg">
                    <h4>{basic.package_name}</h4>
                    <p>
                      Basic account allows you to create profile page, add up to{" "}
                      {basic.link_count} social/external &nbsp;
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
                        Up to {basic.link_count} social/external links.
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Create BIOSHOP With {basic.category_count} Categories.
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Access To Analytics.
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Access To Marketplace.
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
                      Premium account allows creation of profile page, up to{" "}
                      {premium.link_count} social/external links and BIOSHOP
                      &nbsp;
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
                      <span className="pkg_billed">billed monthly</span>
                    </div>
                    <ul className="pkg_detail_list_ift">
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Profile Page
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Up to {premium.link_count} social/external links
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Create BIOSHOP
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Up to {premium.category_count} Product and Service
                        Categories
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Access To Analytics
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Access To Marketplace
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
            <Tab eventKey="profile" title="Yearly">
              <div className="package_parent">
                {Object.keys(basic).length !== 0 ? (
                  <div className="custom_pkg">
                    <h4>{basic.package_name}</h4>
                    <p>
                      Micro lnfluencer account allows you to create profile
                      page, add up to {basic.link_count} social/external &nbsp;
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
                        Up to {basic.link_count} social/external links.
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Create BIOSHOP With {basic.category_count} Categories.
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Access To Analytics.
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Access To Marketplace.
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
                      Premium account allows creation of profile page, up to{" "}
                      {premium.link_count} social/external links and BIOSHOP
                      &nbsp;
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
                      <span className="pkg_billed">billed yearly</span>
                    </div>
                    <ul className="pkg_detail_list_ift">
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Profile Page
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Up to {premium.link_count} social/external links
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Create BIOSHOP
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Up to {premium.category_count} Product and Service
                        Categories
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Access To Analytics
                      </li>
                      <li>
                        <span className="glyphicon glyphicon-menu-right"></span>
                        Access To Marketplace
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
            Basic account allows you to create profile, add up to 3 social links
            and access to all the product and service categories offered by
            businesses/brands on our platform. You are not allowed to link any
            your posts with any product categories. To link post-upgrade to
            influencer package you required.
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
            Premium account allows you to create profile page, add up to 3
            social/external links and create BIOSHOP on our platform. In this
            package you are allowed 3 product and service categories you like to
            promote. You can add hyperlink to any lG post within these 3 product
            and service categories only. You also get access to analytical data
            like; impressions, clicks and user engagement' You are allowed
            Market Place access which enables you to search affiliate campaigns
            being offered by businesses and brands on our platform in your
            selected 3 categories only.
          </Modal.Body>
        </Modal>

        <Modal
          className="pkg_readmore"
          show={this.state.showSelectPackage}
          onHide={this.handleClose}
          centered
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Premium Package</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div class="funkyradio">
              <p>Please check for further payment</p>
              <div class="funkyradio-primary">
                <input
                  type="checkbox"
                  name="instagram"
                  id="instagram"
                  onChange={this.handleCheckbox}
                />
                <label for="instagram">
                  Make sure you have instagram account?
                </label>
              </div>
              <div class="funkyradio-primary">
                <input
                  type="checkbox"
                  name="facebook"
                  id="facebook"
                  onChange={this.handleCheckbox}
                />
                <label for="facebook">
                  Make sure you have facebook account?
                </label>
              </div>
              <div class="funkyradio-primary">
                <input
                  type="checkbox"
                  name="checkbox3"
                  id="checkbox3"
                  onChange={this.handleCheckbox}
                />
                <label for="checkbox3">
                  Facebook connected with instagram and instagram connected with
                  facebook
                </label>
              </div>
              <div>
                {this.state.checkbox.instagram &&
                this.state.checkbox.facebook &&
                this.state.checkbox.checkbox3 ? (
                  <PaymentButton
                    key="2"
                    userId={userInfo.user_id}
                    packageId={premium.package_id}
                    name={"Select Plan"}
                    variant="primary"
                    paymentMethod={"Influencer"}
                    plan={this.state.plan}
                  />
                ) : null}
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
export default Package;
