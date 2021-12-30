import React from "react";
import s from "./Affiliate.module.scss";
import "./selector.css";
import { Row, TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import SearchProfile from "./SearchProfile";
import AddProfile from "./AddProfile"

class MainSearchProfile extends React.Component {

    constructor(props) {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        let username = userInfo.username;
        super(props);
        this.toggleTabs = this.toggleTabs.bind(this);
        this.state = {
            activeTab: "profiles",
            username: username,
            profilestab: [],
            profilesLoading: true,
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
                            <div className="affiliate_in_col marketing-tabs">
                                <Nav tabs className={`${s.coloredNav}`}>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({
                                                active: this.state.activeTab === "profiles",
                                            })}
                                            onClick={() => {
                                                this.toggleTabs("profiles");
                                            }}
                                        >
                                            <span>Profiles</span>
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
                                    <TabPane tabId="profiles">
                                        {this.state.activeTab === "profiles" ? (
                                            <SearchProfile
                                                title="profiles"
                                                type="profiles"
                                            />
                                        ) : null}
                                    </TabPane>
                                    <TabPane tabId="accounting">
                                        {this.state.activeTab === "accounting" ? (
                                            <SearchProfile
                                                title="accounting"
                                                type="accounting"
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
export default MainSearchProfile;