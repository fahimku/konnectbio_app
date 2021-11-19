import React from "react";
import {
  Row,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
// import HighCharts from "./highcharts/HighCharts";
// import PostPerfomance from "./postperformance/postperformance";
import classnames from "classnames";
//import {connect} from "react-redux";
// import placeholder from "../../images/placeholder.png";
import s from "./analysis.module.scss";
import PostAnalytic from "./postperformance/postanalytics";
// import LinkAnalytic from "./Linkperformance/linkanalytics";
import SummaryComponent from "./Summary/SummaryComponent";

class Analysis extends React.Component {
  constructor(props) {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let username = userInfo.username;
    super(props);
    // console.log("I am a user");
    // console.log(props.user);
    this.toggleFirstTabs = this.toggleFirstTabs.bind(this);
    this.toggleSecondTabs = this.toggleSecondTabs.bind(this);

    this.state = {
      activeFirstTab: "tab11",
      activeSecondTab: "tab20",
      username: username,
    };
  }

  toggleFirstTabs(tab) {
    if (this.state.activeFirstTab !== tab) {
      this.setState({
        activeFirstTab: tab,
      });
    }
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
          <Row className="tab-section">
            <div className="affiliate_p_col">
              <Row>
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
                      <SummaryComponent username={this.state.username} />
                    </TabPane>
                    <TabPane tabId="tab22">
                      <PostAnalytic username={this.state.username} />
                    </TabPane>
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
