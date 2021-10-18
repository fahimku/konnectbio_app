import React from "react";
import {
  Row,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
} from "reactstrap";
import HighCharts from "./highcharts/HighCharts";
import PostPerfomance from "./postperformance/postperformance";
import classnames from "classnames";
//import {connect} from "react-redux";
import placeholder from "../../images/placeholder.png";
import s from "./analysis.module.scss";
import PostAnalytic from "./postperformance/postanalytics";

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
      activeSecondTab: "tab22",
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
            <Col md="12" xs="12">
              <Row>
                <Col xs="12" className="mb-5">
                  <Nav tabs className={`${s.coloredNav}`}>
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
                    </NavItem>
                  </Nav>

                  <TabContent
                    className="mb-lg"
                    activeTab={this.state.activeSecondTab}
                  >
                    <TabPane tabId="tab21">
                      <HighCharts username={this.state.username} />
                    </TabPane>
                    <TabPane tabId="tab22">
                      <PostAnalytic username={this.state.username} />
                    </TabPane>
                  </TabContent>
                </Col>
              </Row>
            </Col>
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
