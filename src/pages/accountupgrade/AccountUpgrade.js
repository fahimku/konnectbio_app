import React from "react";
import { Row, Col } from "react-bootstrap";
import { createBrowserHistory } from "history";
export const history = createBrowserHistory({
  forceRefresh: true,
});

class AccountUpgrade extends React.Component {
  render() {
    return (
      <div className="account-upgrade-page">
        <div className={"container-fluid"}>
          <div className="justify-content-md-center">
            <div className="connections mt-5">
              <div className="page-title">
                <h3>Account Upgrade</h3>
              </div>
              <div className="white-box mt-5">
                <h5 className="page-title line-heading">Upgrade Plan</h5>
                <Row>
                  <Col md={8}>
                    <h4 className="package_name">
                      Please upgrade your plan to unlock more features.
                    </h4>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AccountUpgrade;
