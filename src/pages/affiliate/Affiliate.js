import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import s from "./Affiliate.module.scss";
import {
  Row,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import classnames from "classnames";
import { createBrowserHistory } from "history";
import AffiliateDashboard from "./AffiliateDashboard/AffiliateDashboard";
import AffiliateCampaign from "./AffiliateCampaign/AffiliateCampaign";
import AffiliateCreateCampaign from "./AffiliateCreateCampaign/AffiliateCreateCampaign";
import AffiliateAccounting from "./AffiliateAccounting/AffiliateAccounting";

export const history = createBrowserHistory({
  forceRefresh: true,
});

class Affiliate extends React.Component {
  constructor(props) {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let username = userInfo.username;
    let user_id = userInfo.user_id;
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
        <Row className="tab-section">
          <div className="affiliate_p_col">
            <Row>
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
                        active: this.state.activeTab === "campaign",
                      })}
                      onClick={() => {
                        this.toggleTabs("campaign");
                      }}
                    >
                      <span>Active Campaign</span>
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

                <TabContent className="affiliate_tab_ift" activeTab={this.state.activeTab}>
                  <TabPane tabId="dashboard">
                    <AffiliateDashboard username={this.state.username} />
                  </TabPane>
                  <TabPane tabId="campaign">
                    <AffiliateCampaign username={this.state.username} />
                  </TabPane>
                  <TabPane tabId="create-campaign">
                    <AffiliateCreateCampaign
                      username={this.state.username}
                      user_id={this.state.user_id}
                    />
                  </TabPane>
                  <TabPane tabId="accounting">
                    <AffiliateAccounting username={this.state.username} />
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
