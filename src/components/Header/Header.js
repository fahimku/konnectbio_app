import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import {
  Navbar,
  Nav,
  NavbarToggler,
  NavItem,
  NavLink,
  Collapse,
  NavbarBrand,
} from "reactstrap";
import cx from "classnames";
import { NavbarTypes } from "../../reducers/layout";
import Notifications from "../Notifications";
import { logoutUser } from "../../actions/auth";
import Joyride, { STATUS } from "react-joyride";

import LinksGroup from "../../components/Sidebar/LinksGroup/LinksGroup";
import {
  toggleSidebar,
  openSidebar,
  closeSidebar,
  changeActiveSidebarItem,
} from "../../actions/navigation";
import logo from "../../images/logo.png";
// import adminDefault from "../../images/chat/chat2.png";
// import MenuIcon from "../../images/sidebar/Fill/MenuIcon";
// import FlipIcon from "../../images/sidebar/Outline/Flip";
// import CloseIcon from "../../images/sidebar/Fill/CloseIconOne";
// import SearchIcon from "../../images/sidebar/Outline/Search";
// import SettingsIcon from "../../images/sidebar/Outline/Settings";
// import CalendarIcon from "../../images/sidebar/Outline/Calendar";
// import PersonIcon from "../../images/sidebar/Outline/Person";
// import EmailIcon from "../../images/sidebar/Outline/Email";
// import PowerIcon from "../../images/sidebar/Outline/Power";

import s from "./Header.module.scss"; // eslint-disable-line css-modules/no-unused-class
import config from "../../../src/config";
import { toast } from "react-toastify";
import TopBar from "../../components/Topbar";
class Header extends React.Component {
  static propTypes = {
    sidebarOpened: PropTypes.bool.isRequired,
    sidebarStatic: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  };

  constructor(props) {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let username = userInfo.username;

    super(props);

    this.toggleMenu = this.toggleMenu.bind(this);
    this.switchSidebar = this.switchSidebar.bind(this);
    this.toggleNotifications = this.toggleNotifications.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.doLogout = this.doLogout.bind(this);

    this.state = {
      navs: [false, false, false, false],
      menuOpen: true,
      notificationsOpen: false,
      notificationsTabSelected: 1,
      focus: true,
      username: username,
      showNewMessage: false,
      hideMessage: true,
      run: false,
      steps: [
        {
          content: "You can adjust sidebar, or leave it closed 😃",
          placement: "bottom",
          target: "#toggleSidebar",
          textAlign: "center",
          disableBeacon: true,
        },
        {
          content: "Admin can check out his messages and tasks easily 😃",
          placement: "bottom",
          target: ".dropdown-toggle",
        },
        {
          content:
            "Clickable cog can provide you with link to important pages 😄",
          placement: "bottom",
          target: ".tutorial-dropdown",
        },
        {
          content:
            "Open theme cusomizer sidebar, play with it or watch tour! ❤️",
          placement: "left",
          target: ".helper-button",
        },
      ],
    };
  }

  componentDidMount() {
    this.toggleSidebar();
    if (window.location.href.includes("main")) {
      this.setState({ run: false });
    }
  }

  handleJoyrideCallback = (CallBackProps) => {
    const { status } = CallBackProps;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      this.setState({ run: false });
    }
  };

  start = () => {
    this.setState({
      run: true,
    });
  };

  toggleFocus = () => {
    this.setState({ focus: !this.state.focus });
  };

  toggleNotifications() {
    this.setState({
      notificationsOpen: !this.state.notificationsOpen,
    });
  }

  doLogout() {
    this.props.dispatch(logoutUser());
  }

  // collapse/uncolappse
  switchSidebar() {
    if (this.props.sidebarOpened) {
      this.props.dispatch(closeSidebar());
      this.props.dispatch(changeActiveSidebarItem(null));
    } else {
      const paths = this.props.location.pathname.split("/");
      paths.pop();
      this.props.dispatch(openSidebar());
      this.props.dispatch(changeActiveSidebarItem(paths.join("/")));
    }
  }

  // static/non-static
  toggleSidebar() {
    this.props.dispatch(toggleSidebar());
    if (this.props.sidebarStatic) {
      localStorage.setItem("staticSidebar", "false");
      this.props.dispatch(changeActiveSidebarItem(null));
    } else {
      localStorage.setItem("staticSidebar", "true");
      const paths = this.props.location.pathname.split("/");
      paths.pop();
      this.props.dispatch(changeActiveSidebarItem(paths.join("/")));
    }
  }

  toggleMenu() {
    this.setState({
      menuOpen: !this.state.menuOpen,
    });
  }

  toggle(id) {
    const newState = Array(4).fill(false);
    if (!this.state.navs[id]) {
      newState[id] = true;
    }
    this.setState({ navs: newState });
  }

  copyToClipboard = (e) => {
    let textField = document.createElement("textarea");
    const url = config.visitorURL + "/";
    textField.innerText = url + this.props.username;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    toast.success("Copied to Clipboard!");
  };

  render() {
    const { focus } = this.state;
    const { openUsersList } = this.props;
    const navbarType = localStorage.getItem("navbarType") || "static";
    const user = this.props.currentUser;
    const avatar =
      user && user.avatar && user.avatar.length && user.avatar[0].publicUrl;
    const firstUserLetter =
      user && (user.firstName || user.email)[0].toUpperCase();
    const url = config.visitorURL + "/";

    return (
      <>
        <div className="mobile-header-responsive">
          <div className="top-logo">
            <div
              className="logo"
              onClick={() => {
                this.props.history.push("/app/home");
              }}
            >
              <img src={logo} alt="logo" />
            </div>
          </div>
          <div
            className="top-mobile-header"
            style={{ borderBottom: "1px solid #c8c8c8" }}
          >
            <Navbar className="mobile-menu px-4 mt-4 mb-2" color="light" light>
              <NavbarToggler
                className="ml-auto"
                onClick={() => this.toggle(3)}
              />
              <Collapse isOpen={this.state.navs[3]} navbar>
                <Nav className="ml-auto" navbar>
                  <LinksGroup
                    onClick={() => this.toggle(3)}
                    className="sidebar-nav-links"
                    header="My Profile"
                    link="/app/account/profile"
                    isHeader
                    iconElement={
                      <span className="glyphicon glyphicon-user"></span>
                    }
                    // label="Awesome"
                    iconName="flaticon-users"
                    labelColor="info"
                  />
                  <LinksGroup
                    onClick={() => this.toggle(3)}
                    className="sidebar-nav-links"
                    header="All Posts"
                    link="/app/linkinbio"
                    isHeader
                    iconElement={
                      <span className="glyphicon glyphicon-th-list"></span>
                    }
                    iconName="flaticon-users"
                    labelColor="info"
                  />
                  <LinksGroup
                    onClick={() => this.toggle(3)}
                    className="sidebar-nav-links"
                    header="Bio Shop"
                    link="/app/linkinbio-shop"
                    isHeader
                    iconElement={
                      <span className="glyphicon glyphicon-shopping-cart"></span>
                    }
                    iconName="flaticon-users"
                    labelColor="info"
                  />

                  <LinksGroup
                    onClick={() => this.toggle(3)}
                    className="sidebar-nav-links"
                    header="Links"
                    link="/app/my/links"
                    isHeader
                    iconElement={
                      <span className="glyphicon glyphicon-link"></span>
                    }
                    iconName="flaticon-users"
                    labelColor="info"
                  />

                  <LinksGroup
                    onClick={() => this.toggle(3)}
                    className="sidebar-nav-links"
                    header="Analytics"
                    link="/app/analysis"
                    isHeader
                    iconElement={<span className="fa fa-bar-chart-o"></span>}
                    iconName="flaticon-users"
                    labelColor="info"
                  />

                  <LinksGroup
                    onClick={() => this.toggle(3)}
                    className="sidebar-nav-links"
                    header="Categories"
                    link="/app/account/categories"
                    isHeader
                    iconElement={
                      <span className="glyphicon glyphicon-th"></span>
                    }
                    // label="Awesome"
                    iconName="flaticon-users"
                    labelColor="info"
                  />

                  <LinksGroup
                    onClick={() => this.toggle(3)}
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
                </Nav>
              </Collapse>
            </Navbar>
            <TopBar text={true} username={this.state.username} />
          </div>
        </div>
        <div className="header bg-white">
          <div className="linkin-text">Konnect.Bio</div>
          <div className="left-top-bar">
            <div className="your-copy-link">
              <div className="item-a">
                Bio Link:{" "}
                <a target="_blank" href={url + this.props.username}>
                  {url + this.props.username}
                </a>
              </div>
              <div onClick={this.copyToClipboard} className="item-b">
                Copy
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
    navbarType: store.layout.navbarType,
    navbarColor: store.layout.navbarColor,
    openUsersList: store.chat.openUsersList,
    currentUser: store.auth.currentUser,
  };
}
export default withRouter(connect(mapStateToProps)(Header));
