import React from "react";
import {Button, Tabs, Tab, Modal, Row} from "react-bootstrap";
import logo from "../../images/logo.svg";
import axios from "axios";
import {PaymentButton} from "../../components/PaymentButton/PaymentButton";
import {toast} from "react-toastify";

import {createBrowserHistory} from "history";
export const history = createBrowserHistory({
  forceRefresh: true,
});
const userInfo = JSON.parse(localStorage.getItem("userInfo"));

class Package extends React.Component {
  state = {
    showIndividual: false,
    showMicroInfluencer: false,
    showInfluencer: false,
    showBusiness: false,
    showBusinessPlus: false,
    packages: "",
    loading: false,
    promo_code: "",
  };
  componentDidMount() {
    if (userInfo.hasOwnProperty("package")) {
      history.push('/app/main')
    }
    this.getPackages();
  }

  getPackages = async () => {
    await axios
      .get(`/package/receive`)
      .then((response) => {
        const packages = response.data.message;

        this.setState({packages: this.convertArrayToObject(packages)});
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
    // let {
    //   showIndividual,
    //   showMicroInfluencer,
    //   showInfluencer,
    //   showBusiness,
    //   showBusinessPlus,
    // } = this.state;
    this.setState({showIndividual: false});
    this.setState({showMicroInfluencer: false});
    this.setState({showInfluencer: false});
    this.setState({showBusiness: false});
    this.setState({showBusinessPlus: false});
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
    });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({loading: true});
    await axios
      .post("/payment/validatepromocode", {promo_code: this.state.promo_code})
      .then((response) => {
        this.setState({loading: false});
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
        this.setState({loading: false, promo_code: ""});
      });
  };
  render() {
    // const individual = this.state.packages.Individual || {};
    const business = this.state.packages.Business || {};
    const businessPlus = this.state.packages.BusinessPlus || {};
    const influencer = this.state.packages.Influencer || {};
    const microInfluencer = this.state.packages.MicroInfluencer || {};

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

        <div className="container-fluid pricing-table-ifti">
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
                  required
                />
                <Button
                  type="submit"
                  disabled={!this.state.loading ? false : true}
                >
                  Apply
                </Button>
              </div>
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
                {/* <div className="custom_pkg">
                  <h4>{individual.package_name}</h4>
                  <p>
                    Individual account allows you to create profile, add up to{" "}
                    {individual.link_count} social links and access &nbsp;
                    <button
                      className="pkg_read btn btn-link"
                      onClick={() => {
                        this.setState({ showIndividual: true });
                      }}
                    >
                      Read More
                    </button>
                  </p>
                  <div className="pkg_price_ifti">
                    <span className="pkg_limit">Always</span>
                    <sup>$</sup>
                    <span className="monthly display-5">
                      {individual.package_amount_monthly}
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
                      Up to {individual.link_count} Social Links
                    </li>
                    <li>
                      <span className="glyphicon glyphicon-menu-right"></span>
                      Access To BIOSHOP
                    </li>
                  </ul>
                  <Button
                    variant="dark"
                    className="btn_individual"
                    onClick={() => {
                      this.updatePackage(
                        userInfo.user_id,
                        individual.package_id
                      );
                    }}
                  >
                    Select Plan
                  </Button>
                </div> */}
                <div className="custom_pkg">
                  <h4>{microInfluencer.package_name}</h4>
                  <p>
                    Micro lnfluencer account allows you to create profile page,
                    add up to {microInfluencer.link_count} social/external
                    &nbsp;
                    <button
                      className="pkg_read btn btn-link"
                      onClick={() => {
                        this.setState({showMicroInfluencer: true});
                      }}
                    >
                      Read More
                    </button>
                  </p>
                  <div className="pkg_price_ifti">
                    <span className="pkg_limit">From</span>
                    <sup>$</sup>
                    <span className="monthly display-5">
                      {microInfluencer.package_amount_monthly}
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
                      Up to {microInfluencer.link_count} social/external links.
                    </li>
                    <li>
                      <span className="glyphicon glyphicon-menu-right"></span>
                      Create BIOSHOP With {microInfluencer.category_count}{" "}
                      Categories.
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
                  {/* <PaymentButton
                    key="1"
                    userId={userInfo.user_id}
                    packageId={microInfluencer.package_id}
                    name={"Select Plan"}
                    variant="dark"
                    paymentMethod={"Micro Influencer"}
                    plan="Monthly"
                  /> */}

                  {this.state.promo_code !== "" ? (
                    <Button variant="dark" className="btn_individual" disabled>
                      Select Plan
                    </Button>
                  ) : (
                    <Button
                      variant="dark"
                      className="btn_individual"
                      onClick={() => {
                        this.updatePackage(
                          userInfo.user_id,
                          microInfluencer.package_id
                        );
                      }}
                    >
                      Select Plan
                    </Button>
                  )}
                </div>
                <div className="custom_pkg">
                  <h4>{influencer.package_name}</h4>
                  <p>
                    Influencer account allows creation of profile page, up to{" "}
                    {influencer.link_count} social/external links and BIOSHOP
                    &nbsp;
                    <button
                      className="pkg_read btn btn-link"
                      onClick={() => {
                        this.setState({showInfluencer: true});
                      }}
                    >
                      Read More
                    </button>
                  </p>
                  <div className="pkg_price_ifti">
                    <span className="pkg_limit">From</span>
                    <sup>$</sup>
                    <span className="monthly display-5">
                      {influencer.package_amount_monthly}
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
                      Up to {influencer.link_count} social/external links
                    </li>
                    <li>
                      <span className="glyphicon glyphicon-menu-right"></span>
                      Create BIOSHOP
                    </li>
                    <li>
                      <span className="glyphicon glyphicon-menu-right"></span>
                      Up to {influencer.category_count} Product and Service
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
                    <Button variant="dark" className="btn_individual" disabled>
                      Select Plan
                    </Button>
                  ) : (
                    <PaymentButton
                      key="2"
                      userId={userInfo.user_id}
                      packageId={influencer.package_id}
                      name={"Select Plan"}
                      variant="dark"
                      paymentMethod={"Influencer"}
                      plan="Monthly"
                    />
                  )}
                </div>
                <div className="custom_pkg">
                  <h4>{business.package_name}</h4>
                  <p>
                    Business account is for large businesses and brands and
                    allows creation of profile &nbsp;
                    <button
                      className="pkg_read btn btn-link"
                      onClick={() => {
                        this.setState({showBusiness: true});
                      }}
                    >
                      Read More
                    </button>
                  </p>
                  <div className="pkg_price_ifti">
                    <span className="pkg_limit">From</span>
                    <sup>$</sup>
                    <span className="monthly display-5">
                      {" "}
                      {business.package_amount_monthly}
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
                      Up to {business.link_count} social/external links
                    </li>
                    <li>
                      <span className="glyphicon glyphicon-menu-right"></span>
                      Create BIOSHOP With {business.category_count} Categories
                    </li>
                    <li>
                      <span className="glyphicon glyphicon-menu-right"></span>
                      Access To Analytics
                    </li>
                    <li>
                      <span className="glyphicon glyphicon-menu-right"></span>
                      Access To Marketplace
                    </li>
                    <li>
                      <span className="glyphicon glyphicon-menu-right"></span>
                      Affiliate Campaigns/Coupons
                    </li>
                  </ul>
                  {/* <Button
                    variant="dark"
                    onClick={() => {
                      alert(
                        "Please contact support@konnect.bio for plan inquiries."
                      );
                    }}
                  >
                    Select Plan
                  </Button> */}
                  {this.state.promo_code !== "" ? (
                    <Button variant="dark" className="btn_individual" disabled>
                      Select Plan
                    </Button>
                  ) : (
                    <PaymentButton
                      key="2"
                      userId={userInfo.user_id}
                      packageId={business.package_id}
                      name={"Select Plan"}
                      variant="dark"
                      paymentMethod={"Business"}
                      plan="Monthly"
                    />
                  )}
                </div>
                <div className="custom_pkg">
                  <h4>{businessPlus.package_name}</h4>
                  <p>
                    Business Plus account is for large businesses and brands and
                    allows creation of profile &nbsp;
                    <button
                      className="pkg_read btn btn-link"
                      onClick={() => {
                        this.setState({showBusinessPlus: true});
                      }}
                    >
                      Read More
                    </button>
                  </p>
                  <div className="pkg_price_ifti">
                    <span className="pkg_limit">From</span>
                    <sup>$</sup>
                    <span className="monthly display-5">
                      {businessPlus.package_amount_monthly}
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
                      Up to {businessPlus.link_count} social/external links
                    </li>
                    <li>
                      <span className="glyphicon glyphicon-menu-right"></span>
                      Create BIOSHOP With {businessPlus.category_count}{" "}
                      Categories
                    </li>
                    <li>
                      <span className="glyphicon glyphicon-menu-right"></span>
                      Access To Analytics
                    </li>
                    <li>
                      <span className="glyphicon glyphicon-menu-right"></span>
                      Access To Marketplac{" "}
                    </li>
                    <li>
                      <span className="glyphicon glyphicon-menu-right"></span>
                      Affiliate Campaigns/Coupons
                    </li>
                  </ul>
                  {/* <Button
                    variant="dark"
                    onClick={() => {
                      alert(
                        "Please contact support@konnect.bio for plan inquiries."
                      );
                    }}
                  >
                    Select Plan
                  </Button> */}
                  {this.state.promo_code !== "" ? (
                    <Button variant="dark" className="btn_individual" disabled>
                      Select Plan
                    </Button>
                  ) : (
                    <PaymentButton
                      key="2"
                      userId={userInfo.user_id}
                      packageId={businessPlus.package_id}
                      name={"Select Plan"}
                      variant="dark"
                      paymentMethod={"Business Plus"}
                      plan="Monthly"
                    />
                  )}
                </div>
              </div>
            </Tab>
            <Tab eventKey="profile" title="Yearly">
              <div className="package_parent">
                {/* <div className="custom_pkg">
                  <h4>{individual.package_name}</h4>
                  <p>
                    Individual account allows you to create profile, add up to{" "}
                    {individual.link_count} social links and access &nbsp;
                    <button
                      className="pkg_read btn btn-link"
                      onClick={() => {
                        this.setState({ showIndividual: true });
                      }}
                    >
                      Read More
                    </button>
                  </p>
                  <div className="pkg_price_ifti">
                    <span className="pkg_limit">Always</span>
                    <sup>$</sup>
                    <span className="monthly display-5">
                      {individual.package_amount_yearly}
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
                      Up to {individual.link_count} Social Links
                    </li>
                    <li>
                      <span className="glyphicon glyphicon-menu-right"></span>
                      Access To BIOSHOP
                    </li>
                  </ul>
                  <Button
                    variant="dark"
                    className="btn_individual"
                    onClick={() => {
                      this.updatePackage(
                        userInfo.user_id,
                        individual.package_id
                      );
                    }}
                  >
                    Select Plan
                  </Button>
                </div> */}
                <div className="custom_pkg">
                  <h4>{microInfluencer.package_name}</h4>
                  <p>
                    Micro lnfluencer account allows you to create profile page,
                    add up to {microInfluencer.link_count} social/external
                    &nbsp;
                    <button
                      className="pkg_read btn btn-link"
                      onClick={() => {
                        this.setState({showMicroInfluencer: true});
                      }}
                    >
                      Read More
                    </button>
                  </p>
                  <div className="pkg_price_ifti">
                    <span className="pkg_limit">From</span>
                    <sup>$</sup>
                    <span className="monthly display-5">
                      {microInfluencer.package_amount_yearly}
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
                      Up to {microInfluencer.link_count} social/external links.
                    </li>
                    <li>
                      <span className="glyphicon glyphicon-menu-right"></span>
                      Create BIOSHOP With {microInfluencer.category_count}{" "}
                      Categories.
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
                  {/* <PaymentButton
                    key="1"
                    userId={userInfo.user_id}
                    packageId={microInfluencer.package_id}
                    name={"Select Plan"}
                    variant="dark"
                    paymentMethod={"Micro Influencer"}
                    plan="Yearly"
                  /> */}
                  {this.state.promo_code !== "" ? (
                    <Button variant="dark" className="btn_individual" disabled>
                      Select Plan
                    </Button>
                  ) : (
                    <Button
                      variant="dark"
                      className="btn_individual"
                      onClick={() => {
                        this.updatePackage(
                          userInfo.user_id,
                          microInfluencer.package_id
                        );
                      }}
                    >
                      Select Plan
                    </Button>
                  )}
                </div>
                <div className="custom_pkg">
                  <h4>{influencer.package_name}</h4>
                  <p>
                    Influencer account allows creation of profile page, up to{" "}
                    {influencer.link_count} social/external links and BIOSHOP
                    &nbsp;
                    <button
                      className="pkg_read btn btn-link"
                      onClick={() => {
                        this.setState({showInfluencer: true});
                      }}
                    >
                      Read More
                    </button>
                  </p>
                  <div className="pkg_price_ifti">
                    <span className="pkg_limit">From</span>
                    <sup>$</sup>
                    <span className="monthly display-5">
                      {influencer.package_amount_yearly}
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
                      Up to {influencer.link_count} social/external links
                    </li>
                    <li>
                      <span className="glyphicon glyphicon-menu-right"></span>
                      Create BIOSHOP
                    </li>
                    <li>
                      <span className="glyphicon glyphicon-menu-right"></span>
                      Up to {influencer.category_count} Product and Service
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
                    <Button variant="dark" className="btn_individual" disabled>
                      Select Plan
                    </Button>
                  ) : (
                    <PaymentButton
                      key="2"
                      userId={userInfo.user_id}
                      packageId={influencer.package_id}
                      name={"Select Plan"}
                      variant="dark"
                      paymentMethod={"Influencer"}
                      plan="Yearly"
                    />
                  )}
                </div>
                <div className="custom_pkg">
                  <h4>{business.package_name}</h4>
                  <p>
                    Business account is for large businesses and brands and
                    allows creation of profile &nbsp;
                    <button
                      className="pkg_read btn btn-link"
                      onClick={() => {
                        this.setState({showBusiness: true});
                      }}
                    >
                      Read More
                    </button>
                  </p>
                  <div className="pkg_price_ifti">
                    <span className="pkg_limit">From</span>
                    <sup>$</sup>
                    <span className="monthly display-5">
                      {business.package_amount_yearly}
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
                      Up to {business.link_count} social/external links
                    </li>
                    <li>
                      <span className="glyphicon glyphicon-menu-right"></span>
                      Create BIOSHOP With {business.category_count} Categories
                    </li>
                    <li>
                      <span className="glyphicon glyphicon-menu-right"></span>
                      Access To Analytics
                    </li>
                    <li>
                      <span className="glyphicon glyphicon-menu-right"></span>
                      Access To Marketplace
                    </li>
                    <li>
                      <span className="glyphicon glyphicon-menu-right"></span>
                      Affiliate Campaigns/Coupons
                    </li>
                  </ul>
                  {/* <Button
                    variant="dark"
                    onClick={() => {
                      alert(
                        "Please contact support@konnect.bio for plan inquiries."
                      );
                    }}
                  >
                    Select Plan
                  </Button> */}
                  {this.state.promo_code !== "" ? (
                    <Button variant="dark" className="btn_individual" disabled>
                      Select Plan
                    </Button>
                  ) : (
                    <PaymentButton
                      key="3"
                      userId={userInfo.user_id}
                      packageId={business.package_id}
                      name={"Select Plan"}
                      variant="dark"
                      paymentMethod={"Business"}
                      plan="Yearly"
                    />
                  )}
                </div>
                <div className="custom_pkg">
                  <h4>{businessPlus.package_name}</h4>
                  <p>
                    Business Plus account is for large businesses and brands and
                    allows creation of profile &nbsp;
                    <button
                      className="pkg_read btn btn-link"
                      onClick={() => {
                        this.setState({showBusinessPlus: true});
                      }}
                    >
                      Read More
                    </button>
                  </p>
                  <div className="pkg_price_ifti">
                    <span className="pkg_limit">From</span>
                    <sup>$</sup>
                    <span className="monthly display-5">
                      {businessPlus.package_amount_yearly}
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
                      Up to {businessPlus.link_count} social/external links
                    </li>
                    <li>
                      <span className="glyphicon glyphicon-menu-right"></span>
                      Create BIOSHOP With {businessPlus.category_count}{" "}
                      Categories
                    </li>
                    <li>
                      <span className="glyphicon glyphicon-menu-right"></span>
                      Access To Analytics
                    </li>
                    <li>
                      <span className="glyphicon glyphicon-menu-right"></span>
                      Access To Marketplac{" "}
                    </li>
                    <li>
                      <span className="glyphicon glyphicon-menu-right"></span>
                      Affiliate Campaigns/Coupons
                    </li>
                  </ul>
                  {/* <Button
                    variant="dark"
                    onClick={() => {
                      alert(
                        "Please contact support@konnect.bio for plan inquiries."
                      );
                    }}
                  >
                    Select Plan
                  </Button> */}
                  {this.state.promo_code !== "" ? (
                    <Button variant="dark" className="btn_individual" disabled>
                      Select Plan
                    </Button>
                  ) : (
                    <PaymentButton
                      key="2"
                      userId={userInfo.user_id}
                      packageId={businessPlus.package_id}
                      name={"Select Plan"}
                      variant="dark"
                      paymentMethod={"Business Plus"}
                      plan="Yearly"
                    />
                  )}
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>

        <Modal
          className="pkg_readmore"
          show={this.state.showIndividual}
          onHide={this.handleClose}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Individual</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Individual account allows you to create profile, add up to 3 social
            links and access to all the product and service categories offered
            by businesses/brands on our platform. You are not allowed to link
            any your posts with any product categories. To link post-upgrade to
            influencer package you required.
          </Modal.Body>
        </Modal>
        <Modal
          className="pkg_readmore"
          show={this.state.showMicroInfluencer}
          onHide={this.handleClose}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Micro Influencer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Micro Influencer account allows you to create profile page, add up
            to 3 social/external links and create BIOSHOP on our platform. In
            this package you are allowed 3 product and service categories you
            like to promote. You can add hyperlink to any lG post within these 3
            product and service categories only. You also get access to
            analytical data like; impressions, clicks and user engagement' You
            are allowed Market Place access which enables you to search
            affiliate campaigns being offered by businesses and brands on our
            platform in your selected 3 categories only.
          </Modal.Body>
        </Modal>
        <Modal
          className="pkg_readmore"
          show={this.state.showInfluencer}
          onHide={this.handleClose}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Influencer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Influencer account allows creation of profile page, up to 6
            social/external links and BIOSHOP on our platform. This package
            allows 6 product and service categories for promotion. Hyperlink can
            be added to any lG post within these 6 product and service
            categories only. Access to analytical data like impressions, clicks
            and user engagement is also allowed. Market Place access allows
            searching of affiliate campaigns/coupons being offered by businesses
            and brands on our platform in your selected 6 categories' if
            accepted, affiliate campaigns/coupons are added to the BIOSHOP
            visible to all your followers.
          </Modal.Body>
        </Modal>
        <Modal
          className="pkg_readmore"
          show={this.state.showBusiness}
          onHide={this.handleClose}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Business</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Business account is for large businesses and brands and allows
            creation of profile page, add up to 6 social/external links and
            creation of BIOSHOP on our platform. In this package 6 product and
            service categories are supported on BIOSHOP. Hyperlink can be added
            to any lG post within these 6 product and service categories Access
            to analytical data like impressions, clicks and user engagement is
            provided. Market Place access is allowed to create affiliate
            campaigns/coupons of products and services visible to all
            influencers on our platform. This is a most powerful feature of
            platform if influencers accept, the campaign/coupon is added to
            influencer BIOSHOP, visible to their followers, boosting traffic and
            driving sales.
          </Modal.Body>
        </Modal>
        <Modal
          className="pkg_readmore"
          show={this.state.showBusinessPlus}
          onHide={this.handleClose}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Business Plus</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Business Plus account is for large businesses and brands and allows
            creation of profile page, add up to 6 social/external links, and
            creation of BIOSHOP on our platform. In this package 30 product and
            service categories are supported on BIOSHOP. Hyperlink can be added
            to any lG post within these 30 product and service categories.
            Access to analytical data like impressions, clicks and user
            engagement is provided. Market Place access is allowed to create
            Affiliate campaigns/coupons of products and services visible to all
            influencers on our platform. This is a most powerful feature of
            platform. If influencers accept the paign/coupon is added to
            influencer BIOSHOP, visible to all their followers, boosting traffic
            and driving sales.
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
export default Package;
