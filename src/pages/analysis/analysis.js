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
import classnames from "classnames";
import placeholder from "../../images/placeholder.png";
import s from "./analysis.module.scss";

class Analysis extends React.Component {
  constructor(props) {
    super(props);

    this.toggleFirstTabs = this.toggleFirstTabs.bind(this);
    this.toggleSecondTabs = this.toggleSecondTabs.bind(this);

    this.state = {
      activeFirstTab: "tab11",
      activeSecondTab: "tab22",
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
          <div className="header">
            <div className="linkin-text">Konnect.Bio</div>
            <div className="profile">
              <div className="placeholder">
                <img src={placeholder} />
              </div>
              <div className="instagram-account">
                <div className="instagram-username">@{this.state.username}</div>
                <div className="instagram-label">Instagram</div>
              </div>
            </div>
          </div>
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
                        <span>Konnect.bio Analytics</span>
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
                        <span>Post Performance</span>
                      </NavLink>
                    </NavItem>
                  
                  </Nav>

                  <TabContent
                    className="mb-lg"
                    activeTab={this.state.activeSecondTab}
                  >
                    <TabPane tabId="tab22">
                      <HighCharts />
                    </TabPane>
                    <TabPane tabId="tab21">
                      <p></p>
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
export default Analysis;