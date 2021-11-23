import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//import {Progress, Alert} from "reactstrap";
import { withRouter } from "react-router-dom";
import { dismissAlert } from "../../actions/alerts";
import s from "./Sidebar.module.scss";
import LinksGroup from "./LinksGroup/LinksGroup";
import {
  openSidebar,
  closeSidebar,
  changeActiveSidebarItem,
} from "../../actions/navigation";
import isScreen from "../../core/screenHelper";
import { logoutUser } from "../../actions/auth";
import PermissionHelper from "../PermissionHelper";

class Sidebar extends React.Component {
  static propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    activeItem: PropTypes.string,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  };

  static defaultProps = {
    sidebarStatic: true,
    sidebarOpened: true,
    activeItem: "",
  };

  constructor(props) {
    super(props);
    this.state = {
      userType: "",
    };
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.doLogout = this.doLogout.bind(this);
  }

  componentDidMount() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.setState({ userType: userInfo.user_type });
  }

  onMouseEnter() {
    if (!this.props.sidebarStatic && (isScreen("lg") || isScreen("xl"))) {
      const paths = this.props.location.pathname.split("/");
      paths.pop();
      this.props.dispatch(openSidebar());
      this.props.dispatch(changeActiveSidebarItem(paths.join("/")));
    }
  }

  onMouseLeave() {
    if (!this.props.sidebarStatic && (isScreen("lg") || isScreen("xl"))) {
      this.props.dispatch(closeSidebar());
      this.props.dispatch(changeActiveSidebarItem(null));
    }
  }

  dismissAlert(id) {
    this.props.dispatch(dismissAlert(id));
  }

  doLogout() {
    this.props.dispatch(logoutUser());
  }

  render() {
    // let userInfo1 = JSON.parse(localStorage.getItem("userInfo"));
    return (
      <div className={`${s.sidebarWrapper} sidebar`}>
        <nav className={s.root}>
          <header
            className={s.logo}
            // onClick={() => {
            //   this.props.history.push("/app/home");
            // }}
          >
            {/* <a href="#"> */}
            <span className={s.logoStyle}>&nbsp;</span> {/* </a> */}
          </header>

          <ul className={s.nav}>
            <>
              <LinksGroup
                className="sidebar-nav-links"
                header="Dashboard"
                link="/app/dashboard"
                isHeader
                iconElement={
                  <span className="glyphicon glyphicon-dashboard"></span>
                }
                iconName="flaticon-users"
                labelColor="info"
              />

              <LinksGroup
                className="sidebar-nav-links"
                header="BioShop"
                link="/app/linkinbio-shop"
                isHeader
                iconElement={
                  <span className="glyphicon glyphicon-shopping-cart"></span>
                }
                // label="Awesome"
                iconName="flaticon-users"
                labelColor="info"
              />
              <LinksGroup
                className="sidebar-nav-links"
                header="All Posts"
                link="/app/linkinbio"
                isHeader
                iconElement={
                  <span className="glyphicon glyphicon-th-list"></span>
                }
                // label="Awesome"
                iconName="flaticon-users"
                labelColor="info"
              />

              <LinksGroup
                className="sidebar-nav-links"
                header="Links"
                link="/app/my/links"
                isHeader
                iconElement={<span className="glyphicon glyphicon-link"></span>}
                // label="Awesome"
                iconName="flaticon-users"
                labelColor="info"
              />

              {PermissionHelper.validate(["affiliate_access"]) ? (
                <LinksGroup
                  className="sidebar-nav-links"
                  header="Affiliate"
                  link="/app/campaign"
                  isHeader
                  iconElement={
                    <span className="glyphicon glyphicon-bullhorn"></span>
                  }
                  // label="Awesome"
                  iconName="flaticon-users"
                  labelColor="info"
                />
              ) : null}
              {PermissionHelper.validate(["marketplace_access"]) ? (
                <LinksGroup
                  className="sidebar-nav-links"
                  header="Marketplace"
                  link="/app/marketplace"
                  isHeader
                  iconElement={<span className="fa fa-shopping-bag"></span>}
                  // label="Awesome"
                  iconName="flaticon-users"
                  labelColor="info"
                />
              ) : null}

              {PermissionHelper.validate(["analytics_access"]) ? (
                <LinksGroup
                  className="sidebar-nav-links"
                  header="Analytics"
                  link="/app/analysis"
                  isHeader
                  iconElement={<span className="fa fa-bar-chart-o"></span>}
                  // label="Awesome"
                  iconName="flaticon-users"
                  labelColor="info"
                />
              ) : null}

              <div className={`settings-bottom ${s.bottomLinks}`}>
                <LinksGroup
                  className="sidebar-nav-links "
                  onActiveSidebarItemChange={(activeItem) =>
                    this.props.dispatch(changeActiveSidebarItem(activeItem))
                  }
                  activeItem={this.props.activeItem}
                  header="Settings"
                  isHeader
                  labelColor="danger"
                  iconElement={<span className="fa fa-cogs"></span>}
                  iconName="flaticon-user"
                  link="/admin"
                  index="admin"
                  exact={false}
                  childrenLinks={[
                    {
                      header: "Home Screen",
                      link: "/app/account/profile",
                    },
                    {
                      header: "Category Setup",
                      link: "/app/account/categories",
                    },
                    {
                      header: "Account Setup",
                      link: "/app/account/setup",
                    },
                    {
                      header: "Delete Account",
                      link: "/app/account/delete",
                    },
                  ]}
                />
                <LinksGroup
                  className="sidebar-nav-links"
                  header="Sign Out"
                  link="/logout"
                  isHeader
                  iconElement={
                    <span className="glyphicon glyphicon-log-out"></span>
                  }
                  // label="Awesome"
                  iconName="flaticon-users"
                  labelColor="info"
                />
              </div>
            </>
          </ul>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
    alertsList: store.alerts.alertsList,
    activeItem: store.navigation.activeItem,
    navbarType: store.navigation.navbarType,
    sidebarColor: store.layout.sidebarColor,
  };
}
export default withRouter(connect(mapStateToProps)(Sidebar));
