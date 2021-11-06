import React from "react";
import { Button, Tabs, Tab, Modal } from "react-bootstrap";
import logo from "../../images/logo.svg";
import axios from "axios";
import { PaymentButton } from "../../components/PaymentButton/PaymentButton";
import { createBrowserHistory } from "history";
export const history = createBrowserHistory({
  forceRefresh: true,
});
const userInfo = JSON.parse(localStorage.getItem("userInfo"));

class Package extends React.Component {
  state = {
    show: false,
    packages: "",
  };
  componentDidMount() {
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
    let { show } = this.state;
    this.setState({ show: !show });
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
  render() {
    const individual = this.state.packages.Individual || {};
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
          <Tabs
            defaultActiveKey="home"
            transition={false}
            id="noanim-tab-example"
            className="pricing_tabs_ifti mb-3"
          >
            <Tab eventKey="home" title="Monthly">
              <div className="package_parent">
                <div className="custom_pkg">
                  <h4>{individual.package_name}</h4>
                  <p>
                    Individual account allows you to create profile, add up to{" "}
                    {individual.link_count} social links and access &nbsp;
                    <br></br><a
                      className="pkg_read"
                      href="javascript:void"
                      onClick={() => {
                        this.setState({ show: true });
                      }}
                    >
                      Read More
                    </a>
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
                </div>
                <div className="custom_pkg">
                  <h4>{microInfluencer.package_name}</h4>
                  <p>
                    Micro lnfluencer account allows you to create profile page,
                    add up to {microInfluencer.link_count} social/external
                    &nbsp;
                    <br></br><a
                      className="pkg_read"
                      href="javascript:void"
                      onClick={() => {
                        this.setState({ show: true });
                      }}
                    >
                      Read More
                    </a>
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
                  <PaymentButton
                    userId={userInfo.user_id}
                    packageId={microInfluencer.package_id}
                    name={"Select Plan"}
                    variant="dark"
                    paymentMethod={"Micro Influencer"}
                  />
                </div>
                <div className="custom_pkg">
                  <h4>{influencer.package_name}</h4>
                  <p>
                    influencer account allows creation of profile page, up to{" "}
                    {influencer.link_count} social/external links and
                    &nbsp;
                    <br></br><a
                      className="pkg_read"
                      href="javascript:void"
                      onClick={() => {
                        this.setState({ show: true });
                      }}
                    >
                      Read More
                    </a>
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
                  <PaymentButton
                    userId={userInfo.user_id}
                    packageId={influencer.package_id}
                    name={"Select Plan"}
                    variant="dark"
                    paymentMethod={"Influencer"}
                  />
                </div>
                <div className="custom_pkg">
                  <h4>{business.package_name}</h4>
                  <p>
                    Business account is for large businesses and brands and
                    allows creation of profile &nbsp;
                    <br></br><a
                      className="pkg_read"
                      href="javascript:void"
                      onClick={() => {
                        this.setState({ show: true });
                      }}
                    >
                      Read More
                    </a>
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
                  <Button
                    variant="dark"
                    onClick={() => {
                      alert(
                        "Please contact support@konnect.bio for plan inquiries."
                      );
                    }}
                  >
                    Select Plan
                  </Button>
                </div>
                <div className="custom_pkg">
                  <h4>{businessPlus.package_name}</h4>
                  <p>
                    Business Plus account is for large businesses and brands and
                    allows creation of profile &nbsp;
                    <br></br><a
                      className="pkg_read"
                      href="javascript:void"
                      onClick={() => {
                        this.setState({ show: true });
                      }}
                    >
                      Read More
                    </a>
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
                  <Button
                    variant="dark"
                    onClick={() => {
                      alert(
                        "Please contact support@konnect.bio for plan inquiries."
                      );
                    }}
                  >
                    Select Plan
                  </Button>
                </div>
              </div>
            </Tab>
            <Tab eventKey="profile" title="Yearly">
              <div className="package_parent">
                <div className="custom_pkg">
                  <h4>{individual.package_name}</h4>
                  <p>
                    Individual account allows you to create profile, add up to{" "}
                    {individual.link_count} social links and access &nbsp;
                    <br></br><a
                      className="pkg_read"
                      href="javascript:void"
                      onClick={() => {
                        this.setState({ show: true });
                      }}
                    >
                      Read More
                    </a>
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
                </div>
                <div className="custom_pkg">
                  <h4>{microInfluencer.package_name}</h4>
                  <p>
                    Micro lnfluencer account allows you to create profile page,
                    add up to {microInfluencer.link_count} social/external
                    &nbsp;
                    <br></br><a
                      className="pkg_read"
                      href="javascript:void"
                      onClick={() => {
                        this.setState({ show: true });
                      }}
                    >
                      Read More
                    </a>
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
                  <Button
                    variant="dark"
                    onClick={() => {
                      alert(
                        "Please contact support@konnect.bio for plan inquiries."
                      );
                    }}
                  >
                    Select Plan
                  </Button>
                </div>
                <div className="custom_pkg">
                  <h4>{influencer.package_name}</h4>
                  <p>
                    influencer account allows creation of profile page, up to{" "}
                    {influencer.link_count} social/external links and
                    &nbsp;
                    <br></br><a
                      className="pkg_read"
                      href="javascript:void"
                      onClick={() => {
                        this.setState({ show: true });
                      }}
                    >
                      Read More
                    </a>
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
                  <Button
                    variant="dark"
                    onClick={() => {
                      alert(
                        "Please contact support@konnect.bio for plan inquiries."
                      );
                    }}
                  >
                    Select Plan
                  </Button>
                </div>
                <div className="custom_pkg">
                  <h4>{business.package_name}</h4>
                  <p>
                    Business account is for large businesses and brands and
                    allows creation of profile &nbsp;
                    <br></br><a
                      className="pkg_read"
                      href="javascript:void"
                      onClick={() => {
                        this.setState({ show: true });
                      }}
                    >
                      Read More
                    </a>
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
                  <Button
                    variant="dark"
                    onClick={() => {
                      alert(
                        "Please contact support@konnect.bio for plan inquiries."
                      );
                    }}
                  >
                    Select Plan
                  </Button>
                </div>
                <div className="custom_pkg">
                  <h4>{businessPlus.package_name}</h4>
                  <p>
                    Business Plus account is for large businesses and brands and
                    allows creation of profile &nbsp;
                    <br></br><a
                      className="pkg_read"
                      href="javascript:void"
                      onClick={() => {
                        this.setState({ show: true });
                      }}
                    >
                      Read More
                    </a>
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
                  <Button
                    variant="dark"
                    onClick={() => {
                      alert(
                        "Please contact support@konnect.bio for plan inquiries."
                      );
                    }}
                  >
                    Select Plan
                  </Button>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>

        <Modal
          className="pkg_readmore"
          show={this.state.show}
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
      </>
    );
  }
}
export default Package;
