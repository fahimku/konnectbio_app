import React from "react";
import s from "./Affiliate.module.scss";
import "./selector.css";
import { Row, TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import AffiliateDashboard from "./AffiliateDashboard/AffiliateDashboard";
import AffiliateCampaign from "./AffiliateCampaign/AffiliateCampaign";
import AffiliateCreateCampaign from "./AffiliateCreateCampaign/AffiliateCreateCampaign";
import AffiliateScheduleCampaign from "./AffiliateCampaign/AffiliateScheduleCampaign";
import axios from "axios";
import { createBrowserHistory } from "history";
import Loader from "../../components/Loader/Loader";
export const history = createBrowserHistory({
  forceRefresh: true,
});

class Affiliate extends React.Component {
  constructor(props) {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let username = userInfo.username;
    super(props);
    this.toggleTabs = this.toggleTabs.bind(this);
    this.state = {
      activeTab: "dashboard",
      username: username,
      package_name: userInfo?.package?.package_name,
      myBrand: "",
      brandLoading: false,
    };
  }

  componentDidMount() {
    // this.setState({
    //   activeSecondTab: "tab24",
    // });
    if (this.state.package_name !== "Premium") {
      this.getMyBrands();
    }
  }
  getMyBrands = async () => {
    this.setState({
      brandLoading: true,
    });
    await axios
      .get(`/affiliate/getUserBrandName`)
      .then((response) => {
        this.setState({
          myBrand: response.data.data.brand_name,
          brandLoading: false,
        });
      })
      .catch(function (error) {
        console.log(error);
        this.setState({
          brandLoading: true,
        });
      });
  };

  toggleTabs(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    return userInfo?.package?.package_name !== "Premium Plus" ? (
      <div className="container-fluid">
        <div class="coming_iner">
          <h2>Upgrade Account</h2>
          <p className="text-muted">
            This Option is only available for premium plus plan.
          </p>
          <button
            class="btn btn-primary"
            onClick={() => history.push("/app/subcription/setup")}
          >
            Upgrade Subscription
          </button>
        </div>
      </div>
    ) : this.state.brandLoading ? (
      <div className="container-fluid">
        <div class="coming_iner">
          <Loader size={40} />
        </div>
      </div>
    ) : this.state.myBrand === "" ? (
      <div className="container-fluid">
        <div class="coming_iner">
          <h2>Add Brand</h2>
          <p className="text-muted">Please add brand to create campaign.</p>
          <button
            class="btn btn-primary"
            onClick={() => history.push("/app/account/affiliate")}
          >
            Add Brand
          </button>
        </div>
      </div>
    ) : (
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
                      <span>Paused</span>
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
                        active: this.state.activeTab === "schedule-campaign",
                      })}
                      onClick={() => {
                        this.toggleTabs("schedule-campaign");
                      }}
                    >
                      <span>Schedule Campaign</span>
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
                        title="Active Campaigns"
                      />
                    ) : null}
                  </TabPane>
                  <TabPane tabId="inactive-campaign">
                    {this.state.activeTab === "inactive-campaign" ? (
                      <AffiliateCampaign
                        username={this.state.username}
                        type="inactive"
                        title="Paused Campaigns"
                      />
                    ) : null}
                  </TabPane>
                  <TabPane tabId="expired-campaign">
                    {this.state.activeTab === "expired-campaign" ? (
                      <AffiliateCampaign
                        username={this.state.username}
                        type="expired"
                        title="Expired Campaigns"
                      />
                    ) : null}
                  </TabPane>

                  <TabPane tabId="schedule-campaign">
                    {this.state.activeTab === "schedule-campaign" ? (
                      <AffiliateScheduleCampaign
                        username={this.state.username}
                        type="active"
                        title="Schedule Campaigns"
                      />
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
