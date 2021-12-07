import React from "react";
import s from "./Affiliate.module.scss";
import "./selector.css";
import { Row, TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import AffiliateDashboard from "./AffiliateDashboard/AffiliateDashboard";
import AffiliateCampaign from "./AffiliateCampaign/AffiliateCampaign";
import AffiliateCreateCampaign from "./AffiliateCreateCampaign/AffiliateCreateCampaign";
import AffiliateAccounting from "./AffiliateAccounting/AffiliateAccounting";

class Affiliate extends React.Component {
  constructor(props) {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let username = userInfo.username;
    super(props);
    this.toggleTabs = this.toggleTabs.bind(this);
    this.state = {
      activeTab: "dashboard",
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
                        active: this.state.activeTab === "dashboard",
                      })}
                      onClick={() => {
                        this.toggleTabs("dashboard");
                      }}
                    >
                      <span>Dashboard</span>
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "create-campaign",
                      })}
                      onClick={() => {
                        this.toggleTabs("create-campaign");
                      }}
                    >
                      <span>Create Campaign</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "active-campaign",
                      })}
                      onClick={() => {
                        this.toggleTabs("active-campaign");
                      }}
                    >
                      <span>Active</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "inactive-campaign",
                      })}
                      onClick={() => {
                        this.toggleTabs("inactive-campaign");
                      }}
                    >
                      <span>In Active</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "expired-campaign",
                      })}
                      onClick={() => {
                        this.toggleTabs("expired-campaign");
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
                  <TabPane tabId="dashboard">
                    {this.state.activeTab === "dashboard" ? (
                      <AffiliateDashboard username={this.state.username} />
                    ) : null}
                  </TabPane>
                  <TabPane
                    tabId="create-campaign"
                    className="tab-create-campaign"
                  >
                    {this.state.activeTab === "create-campaign" ? (
                      <AffiliateCreateCampaign
                        username={this.state.username}
                        user_id={this.state.user_id}
                        toggleTabs={() => {
                          this.toggleTabs("active-campaign");
                        }}
                      />
                    ) : null}
                  </TabPane>
                  <TabPane tabId="active-campaign">
                    {this.state.activeTab === "active-campaign" ? (
                      <AffiliateCampaign
                        username={this.state.username}
                        type="active"
                      />
                    ) : null}
                  </TabPane>
                  <TabPane tabId="inactive-campaign">
                    {this.state.activeTab === "inactive-campaign" ? (
                      <AffiliateCampaign
                        username={this.state.username}
                        type="inactive"
                      />
                    ) : null}
                  </TabPane>
                  <TabPane tabId="expired-campaign">
                    {this.state.activeTab === "expired-campaign" ? (
                      <AffiliateCampaign
                        username={this.state.username}
                        type="expired"
                      />
                    ) : null}
                  </TabPane>

                  <TabPane tabId="accounting">
                    {this.state.activeTab === "accounting" ? (
                      <AffiliateAccounting username={this.state.username} />
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
export default Affiliate;
