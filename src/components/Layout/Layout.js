import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//import { Switch, Route, withRouter, Redirect } from "react-router";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  Redirect,
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Hammer from "rc-hammerjs";

import { SidebarTypes } from "../../reducers/layout";
import Header from "../Header";
import Sidebar from "../Sidebar";
import placeholder from "../../images/placeholder.png";
import s from "./Layout.module.scss";
import { DashboardThemes } from "../../reducers/layout";
import BreadcrumbHistory from "../BreadcrumbHistory";
/*ROI SWITCH DASHBOARD PAGES*/
import LinkinBio from "../../pages/linkinbio/LinkinBio";
import Analysis from "../../pages/analysis/analysis";
import BioShop from "../../pages/bioshop/BioShop";
import AccountDelete from "../../pages/accountdelete/AccountDelete";
import MyLinks from "../../pages/mylinks/MyLinks";
import MyProfile from "../../pages/myprofile/MyProfile";
import MyCategory from "../../pages/mycategory/MyCategory";
import AccountSetup from "../../pages/accountsetup/AccountSetup";
import Dashboard from "../../pages/dashboard/Dashboard";
import { createBrowserHistory } from "history";
import Affiliate from "../../pages/affiliate/Affiliate";
import Marketplace from "../../pages/marketplace/Marketplace";
import ComingSoon from "../../pages/comingsoon/comingsoon";
import { PrivateRoute } from "../RouteComponents";
import DirectMessaging from "../../pages/directMessaging/Index"
import ChatPage from "../../pages/chat";
import AllPosts from "../../pages/allposts/BioShop";

export const history = createBrowserHistory({
  forceRefresh: false,
});

//import ConnectPagee from "../../pages/auth/connect";
class Layout extends React.Component {
  static propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dashboardTheme: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    sidebarStatic: false,
    sidebarOpened: true,
    dashboardTheme: DashboardThemes.DARK,
  };

  constructor(props) {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const username = userInfo.username;
    super(props);

    this.state = {
      username: username,
    };
  }

  render() {
    return (
      <div
        className={[
          s.root,
          `${s.sidebarStatic}`,
          "sing-dashboard",
          `dashboard-${localStorage.getItem("sidebarType") === SidebarTypes.TRANSPARENT
            ? "light"
            : localStorage.getItem("dashboardTheme")
          }`,
          `header-${localStorage.getItem("navbarColor")
            ? localStorage.getItem("navbarColor").replace("#", "")
            : "FFFFFF"
          }`,
        ].join(" ")}
      >
        <Sidebar />
        <div className={"LayoutWrap " + s.wrap}>
          <Header username={this.state.username} placeholder={placeholder} />
          <Hammer onSwipe={this.handleSwipe}>
            <main className={s.content}>
              <BreadcrumbHistory url={this.props.location.pathname} />
              <TransitionGroup>
                <CSSTransition
                  key={this.props.location.key}
                  classNames="fade"
                  timeout={0}
                >
                  <Router history={history}>
                    <Switch>
                      <Route
                        path="/app/main"
                        exact
                        render={() => {
                          this.props.history.push("/connect");
                        }}
                      />
                      <Route
                        path="/admin"
                        exact
                        render={() => <Redirect to="/admin/users" />}
                      />
                      <Route
                        path="/app/linkinbio"
                        exact
                        component={LinkinBio}
                      />

                      <Route
                        path="/app/linkinbio-shop"
                        exact
                        component={BioShop}
                      />
                      <PrivateRoute
                        exact
                        path="/app/analysis"
                        component={Analysis}
                        permissions={["analytics_access"]}
                        dispatch={this.props.dispatch}
                      />
                      <Route
                        path="/app/linkinbio/:code"
                        exact
                        component={LinkinBio}
                      />
                      <Route
                        path="/app/account/delete"
                        exact
                        component={AccountDelete}
                      />
                      <Route
                        path="/app/account/profile"
                        exact
                        component={MyProfile}
                      />
                      <Route
                        path="/app/account/categories"
                        exact
                        component={MyCategory}
                      />
                      <Route
                        path="/app/account/setup"
                        exact
                        component={AccountSetup}
                      />
                      <Route path="/app/my/links" exact component={MyLinks} />
                      <Route
                        path="/app/dashboard"
                        exact
                        component={Dashboard}
                      />
                      <PrivateRoute
                        path="/app/campaign"
                        exact
                        component={Affiliate}
                        dispatch={this.props.dispatch}
                        permissions={["affiliate_access"]}
                      />
                      <PrivateRoute
                        path="/app/marketplace"
                        exact
                        component={Marketplace}
                        dispatch={this.props.dispatch}
                        permissions={["marketplace_access"]}
                      />
                      <Route
                        path="/app/schedule/posts"
                        exact
                        component={ComingSoon}
                      />

                      <Route
                        path="/app/monitor/hash/tags"
                        exact
                        component={ComingSoon}
                      />

                      <Route
                        path="/app/monitor/mentions"
                        exact
                        component={ComingSoon}
                      />

                      <Route
                        path="/app/direct/messaging"
                        exact
                        component={ComingSoon}
                      />
                      <Route path="/app/chat" exact component={ChatPage} />
                      <Route path="/app/all/posts" exact component={AllPosts} />                      
                    </Switch>
                  </Router>
                </CSSTransition>
              </TransitionGroup>
            </main>
          </Hammer>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
    dashboardTheme: store.layout.dashboardTheme,
    navbarColor: store.layout.navbarColor,
    sidebarType: store.layout.sidebarType,
    currentUser: store.auth.currentUser,
  };
}
export default withRouter(connect(mapStateToProps)(Layout));