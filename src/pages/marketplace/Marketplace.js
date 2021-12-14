import React from "react";
import s from "./Affiliate.module.scss";
import "./selector.css";
import { Row, TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import AllMarketPlace from "./AllMarketPlace";
import ActiveMarketPlace from "./ActiveMarketPlace/ActiveMarketPlace";
import BrandComponent from "./Brand/BrandComponent";

class MarketPlace extends React.Component {
  constructor(props) {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let username = userInfo.username;
    super(props);
    this.toggleTabs = this.toggleTabs.bind(this);
    this.state = {
      activeTab: "brand",
      username: username,
      brandtab: [],
      brandLoading: true,
    };
  }

  toggleTabs(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }
  brandTab = (brand, brandLoading) => {
    this.setState({ brandtab: brand, brandLoading: brandLoading });
  };

  render() {
    const { brandtab, brandLoading } = this.state;

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
                        active: this.state.activeTab === "brand",
                      })}
                      onClick={() => {
                        this.toggleTabs("brand");
                      }}
                    >
                      <span>Brand</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "marketplace",
                      })}
                      onClick={() => {
                        this.toggleTabs("marketplace");
                      }}
                      disabled={
                        !brandLoading && brandtab.length === 0 ? true : false
                      }
                    >
                      <span>New</span>
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
                      disabled={
                        !brandLoading && brandtab.length === 0 ? true : false
                      }
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
                      disabled={
                        !brandLoading && brandtab.length === 0 ? true : false
                      }
                    >
                      <span>Paused</span>
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
                      disabled={
                        !brandLoading && brandtab.length === 0 ? true : false
                      }
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
                  <TabPane tabId="brand">
                    {this.state.activeTab === "brand" ? (
                      <BrandComponent
                        title="Brand"
                        type="brand"
                        brandTab={this.brandTab}
                      />
                    ) : null}
                  </TabPane>
                  <TabPane tabId="marketplace">
                    {this.state.activeTab === "marketplace" ? (
                      <AllMarketPlace title="New Campaign" type="marketplace" />
                    ) : null}
                  </TabPane>
                  <TabPane tabId="active">
                    {this.state.activeTab === "active" ? (
                      <ActiveMarketPlace
                        title="Active Campaign"
                        type="active"
                        endPoint="users/marketPlace/getCampaigns"
                      />
                    ) : null}
                  </TabPane>
                  <TabPane type="inActive" tabId="in-active">
                    {this.state.activeTab === "in-active" ? (
                      <ActiveMarketPlace
                        title="Paused Campaign"
                        type="in_active"
                        endPoint="users/marketPlace/getAllPusedCampaignPost"
                      />
                    ) : null}
                  </TabPane>
                  <TabPane tabId="expired" className="tab-expired">
                    {this.state.activeTab === "expired" ? (
                      <ActiveMarketPlace
                        title="Expired Campaign"
                        type="expired"
                        endPoint="users/marketPlace/getExpiredCampaigns"
                      />
                    ) : null}
                  </TabPane>

                  <TabPane tabId="accounting" className="tab-accounting">
                    {this.state.activeTab === "accounting" ? "" : null}
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
