import React, { useEffect, useState } from "react";
import { Button, Row, Col, Tabs, Tab, Modal } from "react-bootstrap";
import logo from "../../images/logo.svg";
import axios from "axios";
import { createBrowserHistory } from "history";
export const history = createBrowserHistory({
  forceRefresh: true,
});
const userInfo = JSON.parse(localStorage.getItem("userInfo"));

const Package = (props) => {
  const [modal, setModal] = useState(false);
  useEffect(() => {


  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function updatePackage(id, packageId) {
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
  }

  return (
    <>

      <div className="login_header">
        <div className="header_inr group">
          <div className="header_inr_left">
            <div className="konnect_logo"><img className="logo" src={logo} alt="logo" /></div>
          </div>
          <div className="header_inr_right">
            <div className="create_account">
              <Button
                className="btn-connect"
                onClick={() => props.history.push("/logout")}
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
                <h4>Individual</h4>
                <p>Individual account allows you to create profile, add up to 3 social links and access
                  &nbsp;<a className="pkg_read" href="javascript:void"  onClick={() => {setShow(true) }}>Read More</a>
                </p>
                <div className="pkg_price_ifti">
                  <span className="pkg_limit">Always</span>
                  <sup>$</sup>
                  <span className="monthly display-5">0</span>
                  <small className="monthly">/mo</small>
                  <span className="pkg_billed">billed monthly</span>
                </div>
                <ul className="pkg_detail_list_ift">
                  <li><span className="glyphicon glyphicon-menu-right"></span>Profile Page</li>
                  <li><span className="glyphicon glyphicon-menu-right"></span>Up to 3 Social Links</li>
                  <li><span className="glyphicon glyphicon-menu-right"></span>Access To BIOSHOP</li>
                </ul>
                <Button variant="dark" className="btn_individual">Select Plan</Button>
              </div>
              <div className="custom_pkg">
                <h4>Micro Influencer</h4>
                <p>Micro lnfluencer account allows you to create profile page, add up to 3 social/external
                 &nbsp;<a className="pkg_read" href="javascript:void"  onClick={() => {setShow(true) }}>Read More</a>
                </p>
                <div className="pkg_price_ifti">
                  <span className="pkg_limit">From</span>
                  <sup>$</sup>
                  <span className="monthly display-5">10</span>
                  <small className="monthly">/mo</small>
                  <span className="pkg_billed">billed monthly</span>
                </div>
                <ul className="pkg_detail_list_ift">
                  <li><span className="glyphicon glyphicon-menu-right"></span>Profile Page</li>
                  <li><span className="glyphicon glyphicon-menu-right"></span>Up to 3 social/external links.</li>
                  <li><span className="glyphicon glyphicon-menu-right"></span>Create BIOSHOP With 3 Categories.</li>
                  <li><span className="glyphicon glyphicon-menu-right"></span>Access To Analytics.</li>
                  <li><span className="glyphicon glyphicon-menu-right"></span>Access To Marketplace.</li>
                </ul>
                <Button variant="dark">Select Plan</Button>
              </div>
              <div className="custom_pkg">
                <h4>Influencer</h4>
                <p>influencer account allows creation of profile page, up to 6 social/external links and BIOSHOP
                  &nbsp;<a className="pkg_read" href="javascript:void"  onClick={() => {setShow(true) }}>Read More</a>
                </p>
                <div className="pkg_price_ifti">
                  <span className="pkg_limit">From</span>
                  <sup>$</sup>
                  <span className="monthly display-5">25</span>
                  <small className="monthly">/mo</small>
                  <span className="pkg_billed">billed monthly</span>
                </div>
                <ul className="pkg_detail_list_ift">
                  <li><span className="glyphicon glyphicon-menu-right"></span>Profile Page</li>
                  <li><span className="glyphicon glyphicon-menu-right"></span>Up to 6 social/external links</li>
                  <li><span className="glyphicon glyphicon-menu-right"></span>Create BIOSHOP</li>
                  <li><span className="glyphicon glyphicon-menu-right"></span>Up to 6 Product and Service Categories</li>
                  <li><span className="glyphicon glyphicon-menu-right"></span>Access To Analytics</li>
                  <li><span className="glyphicon glyphicon-menu-right"></span>Access To Marketplace</li>
                </ul>
                <Button variant="dark">Select Plan</Button>
              </div>
              <div className="custom_pkg">
                <h4>Business</h4>
                <p>Business account is for large businesses and brands and allows creation of profile
                  &nbsp;<a className="pkg_read" href="javascript:void"  onClick={() => {setShow(true) }}>Read More</a>
                </p>
                <div className="pkg_price_ifti">
                  <span className="pkg_limit">From</span>
                  <sup>$</sup>
                  <span className="monthly display-5">500</span>
                  <small className="monthly">/mo</small>
                  <span className="pkg_billed">billed monthly</span>
                </div>
                <ul className="pkg_detail_list_ift">
                  <li><span className="glyphicon glyphicon-menu-right"></span>Profile Page</li>
                  <li><span className="glyphicon glyphicon-menu-right"></span>Up to 6 social/external links</li>
                  <li><span className="glyphicon glyphicon-menu-right"></span>Create BIOSHOP With 6 Categories</li>
                  <li><span className="glyphicon glyphicon-menu-right"></span>Access To Analytics</li>
                  <li><span className="glyphicon glyphicon-menu-right"></span>Access To Marketplace</li>
                  <li><span className="glyphicon glyphicon-menu-right"></span>Affiliate Campaigns/Coupons</li>
                </ul>
                <Button variant="dark">Select Plan</Button>
              </div>
              <div className="custom_pkg">
                <h4>Business Plus</h4>
                <p>Business Plus account is for large businesses and brands and allows creation of profile
                  &nbsp;<a className="pkg_read" href="javascript:void"  onClick={() => {setShow(true) }}>Read More</a>
                </p>
                <div className="pkg_price_ifti">
                  <span className="pkg_limit">From</span>
                  <sup>$</sup>
                  <span className="monthly display-5">1000</span>
                  <small className="monthly">/mo</small>
                  <span className="pkg_billed">billed monthly</span>
                </div>
                <ul className="pkg_detail_list_ift">
                  <li><span className="glyphicon glyphicon-menu-right"></span>Profile Page</li>
                  <li><span className="glyphicon glyphicon-menu-right"></span>Up to 12 social/external links</li>
                  <li><span className="glyphicon glyphicon-menu-right"></span>Create BIOSHOP With 30 Categories</li>
                  <li><span className="glyphicon glyphicon-menu-right"></span>Access To Analytics</li>
                  <li><span className="glyphicon glyphicon-menu-right"></span>Access To Marketplac </li>
                  <li><span className="glyphicon glyphicon-menu-right"></span>Affiliate Campaigns/Coupons</li>
                </ul>
                <Button variant="dark">Select Plan</Button>
              </div>
            </div>
          </Tab>
          <Tab eventKey="profile" title="Yearly">
          <div className="package_parent">
              <div className="custom_pkg">
                <h4>Individual</h4>
                <p>Individual account allows you to create profile, add up to 3 social links and access
                  &nbsp;<a className="pkg_read" href="javascript:void"  onClick={() => {setShow(true) }}>Read More</a>
                </p>
                <div className="pkg_price_ifti">
                  <span className="pkg_limit">Always</span>
                  <sup>$</sup>
                  <span className="monthly display-5">0</span>
                  <small className="monthly">/mo</small>
                  <span className="pkg_billed">billed yearly</span>
                </div>
                <ul className="pkg_detail_list_ift">
                  <li><span className="glyphicon glyphicon-menu-right"></span>Profile Page</li>
                  <li><span className="glyphicon glyphicon-menu-right"></span>Up to 3 Social Links</li>
                  <li><span className="glyphicon glyphicon-menu-right"></span>Access To BIOSHOP</li>
                </ul>
                <Button variant="dark" className="btn_individual">Select Plan</Button>
              </div>
              <div className="custom_pkg">
                <h4>Micro Influencer</h4>
                <p>Micro lnfluencer account allows you to create profile page, add up to 3 social/external
                 &nbsp;<a className="pkg_read" href="javascript:void"  onClick={() => {setShow(true) }}>Read More</a>
                </p>
                <div className="pkg_price_ifti">
                  <span className="pkg_limit">From</span>
                  <sup>$</sup>
                  <span className="monthly display-5">10</span>
                  <small className="monthly">/mo</small>
                  <span className="pkg_billed">billed yearly</span>
                </div>
                <ul className="pkg_detail_list_ift">
                  <li><span className="glyphicon glyphicon-menu-right"></span>Profile Page</li>
                  <li><span className="glyphicon glyphicon-menu-right"></span>Up to 3 social/external links.</li>
                  <li><span className="glyphicon glyphicon-menu-right"></span>Create BIOSHOP With 3 Categories.</li>
                  <li><span className="glyphicon glyphicon-menu-right"></span>Access To Analytics.</li>
                  <li><span className="glyphicon glyphicon-menu-right"></span>Access To Marketplace.</li>
                </ul>
                <Button variant="dark">Select Plan</Button>
              </div>
              <div className="custom_pkg">
                <h4>Influencer</h4>
                <p>influencer account allows creation of profile page, up to 6 social/external links and BIOSHOP
                  &nbsp;<a className="pkg_read" href="javascript:void"  onClick={() => {setShow(true) }}>Read More</a>
                </p>
                <div className="pkg_price_ifti">
                  <span className="pkg_limit">From</span>
                  <sup>$</sup>
                  <span className="monthly display-5">25</span>
                  <small className="monthly">/mo</small>
                  <span className="pkg_billed">billed yearly</span>
                </div>
                <ul className="pkg_detail_list_ift">
                  <li><span className="glyphicon glyphicon-menu-right"></span>Profile Page</li>
                  <li><span className="glyphicon glyphicon-menu-right"></span>Up to 6 social/external links</li>
                  <li><span className="glyphicon glyphicon-menu-right"></span>Create BIOSHOP</li>
                  <li><span className="glyphicon glyphicon-menu-right"></span>Up to 6 Product and Service Categories</li>
                  <li><span className="glyphicon glyphicon-menu-right"></span>Access To Analytics</li>
                  <li><span className="glyphicon glyphicon-menu-right"></span>Access To Marketplace</li>
                </ul>
                <Button variant="dark">Select Plan</Button>
              </div>
              <div className="custom_pkg">
                <h4>Business</h4>
                <p>Business account is for large businesses and brands and allows creation of profile
                  &nbsp;<a className="pkg_read" href="javascript:void"  onClick={() => {setShow(true) }}>Read More</a>
                </p>
                <div className="pkg_price_ifti">
                  <span className="pkg_limit">From</span>
                  <sup>$</sup>
                  <span className="monthly display-5">500</span>
                  <small className="monthly">/mo</small>
                  <span className="pkg_billed">billed yearly</span>
                </div>
                <ul className="pkg_detail_list_ift">
                  <li><span className="glyphicon glyphicon-menu-right"></span>Profile Page</li>
                  <li><span className="glyphicon glyphicon-menu-right"></span>Up to 6 social/external links</li>
                  <li><span className="glyphicon glyphicon-menu-right"></span>Create BIOSHOP With 6 Categories</li>
                  <li><span className="glyphicon glyphicon-menu-right"></span>Access To Analytics</li>
                  <li><span className="glyphicon glyphicon-menu-right"></span>Access To Marketplace</li>
                  <li><span className="glyphicon glyphicon-menu-right"></span>Affiliate Campaigns/Coupons</li>
                </ul>
                <Button variant="dark">Select Plan</Button>
              </div>
              <div className="custom_pkg">
                <h4>Business Plus</h4>
                <p>Business Plus account is for large businesses and brands and allows creation of profile
                  &nbsp;<a className="pkg_read" href="javascript:void"  onClick={() => {setShow(true) }}>Read More</a>
                </p>
                <div className="pkg_price_ifti">
                  <span className="pkg_limit">From</span>
                  <sup>$</sup>
                  <span className="monthly display-5">1000</span>
                  <small className="monthly">/mo</small>
                  <span className="pkg_billed">billed yearly</span>
                </div>
                <ul className="pkg_detail_list_ift">
                  <li><span className="glyphicon glyphicon-menu-right"></span>Profile Page</li>
                  <li><span className="glyphicon glyphicon-menu-right"></span>Up to 12 social/external links</li>
                  <li><span className="glyphicon glyphicon-menu-right"></span>Create BIOSHOP With 30 Categories</li>
                  <li><span className="glyphicon glyphicon-menu-right"></span>Access To Analytics</li>
                  <li><span className="glyphicon glyphicon-menu-right"></span>Access To Marketplac </li>
                  <li><span className="glyphicon glyphicon-menu-right"></span>Affiliate Campaigns/Coupons</li>
                </ul>
                <Button variant="dark">Select Plan</Button>
              </div>
            </div>
          </Tab>
        </Tabs>

      </div>

      <Modal 
      className="pkg_readmore" 
      show={show} 
      onHide={handleClose}
      centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Individual</Modal.Title>
        </Modal.Header>
        <Modal.Body>Individual account allows you to create profile, add up to 3 social links and access to all the product and service categories offered by businesses/brands on our platform. You are not allowed to link any your posts with any product categories. To link post-upgrade to influencer package you required.</Modal.Body>
      </Modal>
    </>
  );
};
export default Package;