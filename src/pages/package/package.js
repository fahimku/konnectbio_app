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
  useEffect(() => { }, []);

  async function updatePackage(id) {
    await axios
      .put(`users/revise/package/${id}`, {
        package_id: "a7afb3b0-fb76-4ceb-975d-a6dc900728aa",
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
      <Row className="connect-page-header">
        <Col md={11} xs={8}>
          <img className="img-connect" src={logo} alt="logo" />
        </Col>
        <Col md={1} xs={4}>
          <Button
            className="btn-connect"
            onClick={() => history.push("/logout")}
          >
            Logout
          </Button>
        </Col>
      </Row>
      <div className="container-fluid">
        <div className="pricing1 py-5 bg-light">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-md-8 text-center">
                <h3 className="mt-3 font-weight-medium mb-1">Pricing</h3>
                <h6 className="subtitle">Select plan perfect for you.</h6>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col">
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
                        updatePackage(userInfo.user_id);
                      }}
                    >
                      <span>Select Package</span>
                    </button>
                    {/* </div> */}
                  </div>
                </div>
              </div>

              <div className="col">
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
                      onClick={() => {
                        alert(
                          "Please contact support@konnect.bio for plan inquiries."
                        );
                      }}
                    >
                      <span>Select Package</span>
                    </button>
                    {/* </div> */}
                  </div>
                </div>
              </div>

              <div className="col">
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
                      onClick={() => {
                        alert(
                          "Please contact support@konnect.bio for plan inquiries."
                        );
                      }}
                    >
                      <span>Select Package</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col">
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
                      onClick={() => {
                        alert(
                          "Please contact support@konnect.bio for plan inquiries."
                        );
                      }}
                    >
                      <span>Select Package</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="col">
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
                      onClick={() => {
                        alert(
                          "Please contact support@konnect.bio for plan inquiries."
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