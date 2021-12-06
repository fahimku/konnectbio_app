import React from "react";
import s from "./Affiliate.module.scss";
import "./selector.css";
import { Row, TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import AllMarketPlace from "./AllMarketPlace";
import ActiveMarketPlace from "./ActiveMarketPlace/ActiveMarketPlace"

class MarketPlace extends React.Component {

  constructor(props) {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let username = userInfo.username;
    super(props);
    this.toggleTabs = this.toggleTabs.bind(this);
    this.state = {
      activeTab: "marketplace",
      username: username,
    };
  }

  toggleTabs(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    return (
      <div className="analytics-page affiliate-page linkin-bio">
        <Row className="ml-0 mr-0 tab-section">
          <div className="affiliate_p_col">
            <Row className="ml-0 mr-0">
              <div className="affiliate_in_col">
                <Nav tabs className={`${s.coloredNav}`}>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "marketplace",
                      })}
                      onClick={() => {
                        this.toggleTabs("marketplace");
                      }}
                    >
                      <span>Marketplace</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "active",
                      })}
                      onClick={() => {
                        this.toggleTabs("active");
                      }}
                    >
                      <span>Active</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "in-active",
                      })}
                      onClick={() => {
                        this.toggleTabs("in-active");
                      }}
                    >
                      <span>In Active</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "expired",
                      })}
                      onClick={() => {
                        this.toggleTabs("expired");
                      }}
                    >
                      <span>Expired</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "accounting",
                      })}
                      onClick={() => {
                        this.toggleTabs("accounting");
                      }}
                    >
                      <span>Accounting</span>
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent
                  className="affiliate_tab_ift"
                  activeTab={this.state.activeTab}
                >
                  <TabPane tabId="marketplace">
                    {this.state.activeTab === "marketplace" ? (
                      <AllMarketPlace title="Marketplace" type='marketplace' />
                    ) : null}
                  </TabPane>
                  <TabPane tabId="active">
                    {this.state.activeTab === "active" ? (
                      <ActiveMarketPlace title='Active Campaign' type='active' endPoint='users/marketPlace/getCampaigns' />
                    ) : null}
                  </TabPane>
                  <TabPane
                    type='inActive'
                    tabId="in-active">
                    {this.state.activeTab === "in-active" ? (
                      <ActiveMarketPlace title='In Active Campaign' type='in_active' endPoint='users/marketPlace/getAllPusedCampaignPost' />
                    ) : null}
                  </TabPane>
                  <TabPane
                    tabId="expired"
                    className="tab-expired"
                  >
                    {this.state.activeTab === "expired" ? (
                      <ActiveMarketPlace title='Expired Campaign' type='expired' endPoint='users/marketPlace/getExpiredCampaigns' />
                    ) : null}
                  </TabPane>

                  <TabPane
                    tabId="accounting"
                    className="tab-accounting"
                  >
                    {this.state.activeTab === "accounting" ? (
                    ''
                    ) : null}
                  </TabPane>
                </TabContent>
              </div>
            </Row>
          </div>
        </Row>
      </div>
    );
  }
}
export default MarketPlace;