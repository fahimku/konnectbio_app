import React, {useEffect} from "react";
import {Button, Row, Col} from "react-bootstrap";
import logo from "../../images/logo.svg";
import axios from "axios";
import {createBrowserHistory} from "history";
export const history = createBrowserHistory({
  forceRefresh: true,
});
const userInfo = JSON.parse(localStorage.getItem("userInfo"));
const Package = (props) => {
  useEffect(() => {}, []);

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
      <div className="main-header">
        <div className="container">
          <Row className="connect-page-header">
            <Col md={10} xs={8}>
              <img className="img-connect" src={logo} alt="logo" />
            </Col>
            <Col md={2} xs={4} className="text-right">
              <Button
                className="btn-connect"
                onClick={() => this.props.history.push("/logout")}
              >
                Logout
              </Button>
            </Col>
          </Row>
        </div>
      </div>
      <div className="container-fluid bg-light">
        <div className="pricing1 py-5 ">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-md-8 text-center">
                <h3 className="mt-3 font-weight-medium mb-1">Pricing</h3>
                <h6 className="subtitle">Select plan perfect for you.</h6>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col col-xl col-lg-6 col-md-6 col-sm-12">
                <div className="card text-center card-shadow on-hover border-0 mb-4">
                  <div className="card-body font-14">
                    <h5 className="mt-3 mb-1 font-weight-medium">
                      Individual Account
                    </h5>
                    {/* <h6 className="subtitle font-weight-normal">
                      For Team of 3-5 Members
                    </h6> */}
                    <div className="pricing my-3">
                      <sup>$</sup>
                      <span className="monthly display-5">0</span>
                      <span className="yearly display-5">240</span>
                      <small className="monthly">/mo</small>
                      <small className="yearly">/yr</small>
                      {/* <span className="d-block">
                        Save <span className="font-weight-medium">$20</span> a
                        Year
                      </span> */}
                    </div>
                    <ul className="list-inline">
                      <li className="d-block py-2">Profile Page</li>
                      <li className="d-block py-2">Up to 3 Social Links</li>
                      <li className="d-block py-2">Access To BIOSHOP</li>
                      <li className="d-block py-2">&nbsp;</li>
                      <li className="d-block py-2">&nbsp;</li>
                      <li className="d-block py-2">&nbsp;</li>
                    </ul>
                    {/* <div
                      onClick={() => {
                        updatePackage(userInfo.user_id);
                      }}
                      className="bottom-btn"
                    > */}
                    <button
                      className="btn btn-success-gradiant btn-md text-white btn-block"
                      onClick={() => {
                        updatePackage(
                          userInfo.user_id,
                          "617cee6790aad9bd2a4e10fb"
                        );
                      }}
                    >
                      <span>Select Package</span>
                    </button>
                    {/* </div> */}
                  </div>
                </div>
              </div>
              <div className="col col-xl col-lg-6 col-md-6 col-sm-12">
                <div className="card text-center card-shadow on-hover border-0 mb-4">
                  <div className="card-body font-14">
                    <h5 className="mt-3 mb-1 font-weight-medium">
                      Micro Influencer Account
                    </h5>
                    {/* <h6 className="subtitle font-weight-normal">
                      For Team of 5-10 Members
                    </h6> */}
                    <div className="pricing my-3">
                      <sup>$</sup>
                      <span className="monthly display-5">10</span>
                      <small className="monthly">/mo</small>
                    </div>
                    <ul className="list-inline">
                      <li className="d-block py-2">Profile Page.</li>
                      <li className="d-block py-2">
                        Up to 3 social/external links.
                      </li>
                      <li className="d-block py-2">
                        Create BIOSHOP With 3 Categories.
                      </li>
                      <li className="d-block py-2">Access To Analytics.</li>
                      <li className="d-block py-2">Access To Marketplace.</li>
                      <li className="d-block py-2">&nbsp;</li>
                    </ul>
                    {/* <div className="bottom-btn"> */}
                    <button
                      className="btn btn-danger-gradiant btn-md text-white btn-block"
                      // onClick={() => {
                      //   alert(
                      //     "Please contact support@konnect.bio for plan inquiries."
                      //   );
                      // }}
                      onClick={() => {
                        updatePackage(
                          userInfo.user_id,
                          "617cee8b90aad9bd2a4e10ff"
                        );
                      }}
                    >
                      <span>Select Package</span>
                    </button>
                    {/* </div> */}
                  </div>
                </div>
              </div>
              <div className="col col-xl col-lg-6 col-md-6 col-sm-12">
                <div className="card text-center card-shadow on-hover border-0 mb-4">
                  <div className="card-body font-14">
                    <h5 className="mt-3 mb-1 font-weight-medium">Influencer</h5>
                    {/* <h6 className="subtitle font-weight-normal">
                      For Team of 10-25 Members
                    </h6> */}
                    <div className="pricing my-3">
                      <sup>$</sup>
                      <span className="monthly display-5">25</span>
                      <small className="monthly">/mo</small>
                    </div>
                    <ul className="list-inline">
                      <li className="d-block py-2">Profile Page.</li>
                      <li className="d-block py-2">
                        Up to 6 social/external links.
                      </li>
                      <li className="d-block py-2">
                        Create BIOSHOP With 6 Categories.
                      </li>
                      <li className="d-block py-2">Access To Analytics.</li>
                      <li className="d-block py-2">Access To Marketplace.</li>
                      <li className="d-block py-2">&nbsp;</li>
                    </ul>
                    <button
                      className="btn btn-danger-gradiant btn-md text-white btn-block"
                      // onClick={() => {
                      //   alert(
                      //     "Please contact support@konnect.bio for plan inquiries."
                      //   );
                      // }}
                      onClick={() => {
                        updatePackage(
                          userInfo.user_id,
                          "617ceeb390aad9bd2a4e1103"
                        );
                      }}
                    >
                      <span>Select Package</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col col-xl col-lg-6 col-md-6 col-sm-12">
                <div className="card text-center card-shadow on-hover border-0 mb-4">
                  <div className="card-body font-14">
                    <h5 className="mt-3 mb-1 font-weight-medium">Business</h5>
                    {/* <h6 className="subtitle font-weight-normal">
                      For Team of 25-100 Members
                    </h6> */}
                    <div className="pricing my-3">
                      <sup>$</sup>
                      <span className="monthly display-5">500</span>
                      <small className="monthly">/mo</small>
                    </div>
                    <ul className="list-inline">
                      <li className="d-block py-2">Profile Page.</li>
                      <li className="d-block py-2">
                        Up to 6 social/external links.
                      </li>
                      <li className="d-block py-2">
                        Create BIOSHOP With 6 Categories.
                      </li>
                      <li className="d-block py-2">Access To Analytics.</li>
                      <li className="d-block py-2">Access To Marketplace.</li>
                      <li className="d-block py-2">
                        Affiliate Campaign/Coupons.
                      </li>
                    </ul>
                    <button
                      className="btn btn-danger-gradiant btn-md text-white btn-block"
                      // onClick={() => {
                      //   alert(
                      //     "Please contact support@konnect.bio for plan inquiries."
                      //   );
                      // }}
                      onClick={() => {
                        updatePackage(
                          userInfo.user_id,
                          "617cef1390aad9bd2a4e1107"
                        );
                      }}
                    >
                      <span>Select Package</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col col-xl col-lg-6 col-md-6 col-sm-12">
                <div className="card text-center card-shadow on-hover border-0 mb-4">
                  <div className="card-body font-14">
                    <h5 className="mt-3 mb-1 font-weight-medium">
                      Business Plus
                    </h5>
                    {/* <h6 className="subtitle font-weight-normal">
                      For Team of 25-100 Members
                    </h6> */}
                    <div className="pricing my-3">
                      <sup>$</sup>
                      <span className="monthly display-5">1000</span>
                      <small className="monthly">/mo</small>
                    </div>
                    <ul className="list-inline">
                      <li className="d-block py-2">Profile Page.</li>
                      <li className="d-block py-2">
                        Up to 12 social/external links.
                      </li>
                      <li className="d-block py-2">
                        Create BIOSHOP With 30 Categories.
                      </li>
                      <li className="d-block py-2">Access To Analytics.</li>
                      <li className="d-block py-2">Access To Marketplace.</li>
                      <li className="d-block py-2">
                        Affiliate Campaign/Coupons.
                      </li>
                    </ul>
                    <button
                      className="btn btn-danger-gradiant btn-md text-white btn-block"
                      // onClick={() => {
                      //   alert(
                      //     "Please contact support@konnect.bio for plan inquiries."
                      //   );
                      // }}
                      onClick={() => {
                        updatePackage(
                          userInfo.user_id,
                          "617cef2e90aad9bd2a4e110b"
                        );
                      }}
                    >
                      <span>Select Package</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Package;