import React from "react";
import { Row, TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import s from "./analysis.module.scss";
import PostAnalytic from "./postperformance/postanalytics";
// import LinkAnalytic from "./Linkperformance/linkanalytics";
import SummaryComponent from "./Summary/SummaryComponent";
import CampaignAnalytics from "./CampaignPerformance/CampaignAnalytics";

class Analysis extends React.Component {
  constructor(props) {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let username = userInfo.username;
    super(props);
    this.toggleSecondTabs = this.toggleSecondTabs.bind(this);

    this.state = {
      activeSecondTab: "tab20",
      username: username,
      packageName: userInfo.package.package_name,
    };
  }

  toggleSecondTabs(tab) {
    if (this.state.activeSecondTab !== tab) {
      this.setState({
        activeSecondTab: tab,
      });
    }
  }

  render() {
    return (
      <>
        <div className="analytics-page">
          <Row className="ml-0 mr-0 tab-section">
            <div className="affiliate_p_col">
              <Row className="ml-0 mr-0">
                <div className="affiliate_in_col">
                  <Nav tabs className={`${s.coloredNav}`}>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeSecondTab === "tab20",
                        })}
                        onClick={() => {
                          this.toggleSecondTabs("tab20");
                        }}
                      >
                        <span>Summary</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeSecondTab === "tab22",
                        })}
                        onClick={() => {
                          this.toggleSecondTabs("tab22");
                        }}
                      >
                        <span>Post Performance</span>
                      </NavLink>
                    </NavItem>
                    {this.state.packageName === "Influencer" ||
                    this.state.packageName === "Micro Influencer" ? (
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.activeSecondTab === "tab23",
                          })}
                          onClick={() => {
                            this.toggleSecondTabs("tab23");
                          }}
                        >
                          <span>Campaign Performance</span>
                        </NavLink>
                      </NavItem>
                    ) : null}
                    {/* <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeSecondTab === "tab23",
                        })}
                        onClick={() => {
                          this.toggleSecondTabs("tab23");
                        }}
                      >
                        <span>Link Performance</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeSecondTab === "tab21",
                        })}
                        onClick={() => {
                          this.toggleSecondTabs("tab21");
                        }}
                      >
                        <span>Konnect.bio Analytics</span>
                      </NavLink>
                    </NavItem> */}
                  </Nav>

                  <TabContent
                    className="tab-content affiliate_tab_ift"
                    activeTab={this.state.activeSecondTab}
                  >
                    <TabPane tabId="tab20">
                      {this.state.activeSecondTab === "tab20" ? (
                        <SummaryComponent
                          username={this.state.username}
                          packageName={this.state.packageName}
                        />
                      ) : null}
                    </TabPane>
                    <TabPane tabId="tab22">
                      {this.state.activeSecondTab === "tab22" ? (
                        <PostAnalytic username={this.state.username} />
                      ) : null}
                    </TabPane>
                    {this.state.packageName === "Influencer" ||
                    this.state.packageName === "Micro Influencer" ? (
                      <TabPane tabId="tab23">
                        {this.state.activeSecondTab === "tab23" ? (
                          <CampaignAnalytics username={this.state.username} />
                        ) : null}
                      </TabPane>
                    ) : null}
                    {/* <TabPane tabId="tab21">
                      <HighCharts username={this.state.username} />
                    </TabPane> */}

                    {/* <TabPane tabId="tab23">
                      <LinkAnalytic username={this.state.username} />
                    </TabPane> */}
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
// const mapStateToProps = (store) => ({
//   user: store.user,
// });
export default Analysis;
