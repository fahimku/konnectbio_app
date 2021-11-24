import React from "react";
// import { Row, Col } from "react-bootstrap";
import { createBrowserHistory } from "history";
export const history = createBrowserHistory({
  forceRefresh: true,
});

class AccountUpgrade extends React.Component {
  render() {
    return (
      <div className="analytics-page">
        {/* <iframe
                  id="iframe"
                  //key={this.state.iframeKey}
                  src={`https://konnect.bio/kbiouser3?coupon=no&brand=no&iframe=yes&mypost=hide`}
                  title="linkin"
                  className="myshop-iframe"
                ></iframe> */}
        <div className={"container-fluid"}>
          <h4 className="page-title mt-4">Account Upgrade</h4>
          <div className="summary_container_main container">
            <div className="row">
              <div className="summary_box_main col-md-6">
                <div className="summary_block_profile">
                  <div className="summary_content_profile">
                    <h5>Please upgrade your plan to unlock more features.</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AccountUpgrade;
