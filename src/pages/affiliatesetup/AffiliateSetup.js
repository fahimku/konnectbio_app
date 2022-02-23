import React from "react";
import { Row, TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import s from "./analysis.module.scss";
import AffiliateBrand from "./AffiliateBrand/AffiliateBrand";
import AffiliatePayment from "./AffiliatePayment/AffiliatePayment";
import AffiliateTransaction from "./AffiliateTransaction/AffiliateTransaction";

class AffiliateSetup extends React.Component {
  constructor(props) {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    super(props);
    this.toggleSecondTabs = this.toggleSecondTabs.bind(this);

    this.state = {
      activeSecondTab: "brandtab",
      username: userInfo.username,
      packageId: userInfo.package.package_id,
    };
  }
  componentDidMount() {
    // this.setState({
    //   activeSecondTab: "tab24",
    // });
  }

  toggleSecondTabs(tab) {
    const url = new URL(window.location.href.split("?")[0]);
    window.history.replaceState(null, null, url.href);
    if (this.state.activeSecondTab !== tab) {
      this.setState({
        activeSecondTab: tab,
      });
    }
  }

  render() {
    return (
      <>
        <div className="analytics-page affiliate-page linkin-bio">
          <Row className="ml-0 mr-0 tab-section">
            <div className="affiliate_p_col">
              <Row className="ml-0 mr-0">
                <div className="affiliate_in_col marketing-tabs">
                  <Nav tabs className={`${s.coloredNav}`}>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeSecondTab === "brandtab",
                        })}
                        onClick={() => {
                          this.toggleSecondTabs("brandtab");
                        }}
                      >
                        <span>Brand</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeSecondTab === "balance",
                        })}
                        onClick={() => {
                          this.toggleSecondTabs("balance");
                        }}
                      >
                        <span>Balance</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeSecondTab === "transaction",
                        })}
                        onClick={() => {
                          this.toggleSecondTabs("transaction");
                        }}
                      >
                        <span>Transactions</span>
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent
                    className="affiliate_tab_ift"
                    activeTab={this.state.activeSecondTab}
                  >
                    <TabPane tabId="brandtab">
                      {this.state.activeSecondTab === "brandtab" ? (
                        <AffiliateBrand />
                      ) : null}
                    </TabPane>
                    <TabPane tabId="balance">
                      {this.state.activeSecondTab === "balance" ? (
                        <AffiliatePayment />
                      ) : null}
                    </TabPane>
                    <TabPane tabId="transaction">
                      {this.state.activeSecondTab === "transaction" ? (
                        <AffiliateTransaction />
                      ) : null}
                    </TabPane>
                  </TabContent>
                </div>
              </Row>
            </div>
          </Row>
        </div>
      </>
    );
  }
}

export default AffiliateSetup;
