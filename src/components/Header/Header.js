import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {withRouter} from "react-router";
import {
  Navbar,
  Nav,
  Dropdown,
  NavItem,
  NavLink,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledTooltip,
  InputGroupAddon,
  InputGroup,
  Input,
  Form,
  FormGroup,
} from "reactstrap";
import cx from "classnames";
import {NavbarTypes} from "../../reducers/layout";
import Notifications from "../Notifications";
import {logoutUser} from "../../actions/auth";
import Joyride, {STATUS} from "react-joyride";
import {
  toggleSidebar,
  openSidebar,
  closeSidebar,
  changeActiveSidebarItem,
} from "../../actions/navigation";
import adminDefault from "../../images/chat/chat2.png";
import MenuIcon from "../../images/sidebar/Fill/MenuIcon";
import FlipIcon from "../../images/sidebar/Outline/Flip";
import CloseIcon from "../../images/sidebar/Fill/CloseIconOne";
import SearchIcon from "../../images/sidebar/Outline/Search";
import SettingsIcon from "../../images/sidebar/Outline/Settings";
import CalendarIcon from "../../images/sidebar/Outline/Calendar";
import PersonIcon from "../../images/sidebar/Outline/Person";
import EmailIcon from "../../images/sidebar/Outline/Email";
import PowerIcon from "../../images/sidebar/Outline/Power";

import s from "./Header.module.scss"; // eslint-disable-line css-modules/no-unused-class

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
    super(props);

    this.toggleMenu = this.toggleMenu.bind(this);
    this.switchSidebar = this.switchSidebar.bind(this);
    this.toggleNotifications = this.toggleNotifications.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.doLogout = this.doLogout.bind(this);

    this.state = {
      menuOpen: false,
      notificationsOpen: false,
      notificationsTabSelected: 1,
      focus: true,
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
      this.setState({run: false});
    }
  }

  handleJoyrideCallback = (CallBackProps) => {
    const {status} = CallBackProps;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      this.setState({run: false});
    }
  };

  start = () => {
    this.setState({
      run: true,
    });
  };

  toggleFocus = () => {
    this.setState({focus: !this.state.focus});
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

  render() {
    const {focus} = this.state;
    const {openUsersList} = this.props;
    const navbarType = localStorage.getItem("navbarType") || "static";
    const user = this.props.currentUser;
    const avatar =
      user && user.avatar && user.avatar.length && user.avatar[0].publicUrl;
    const firstUserLetter =
      user && (user.firstName || user.email)[0].toUpperCase();

    return (
      <>
        <div className="header bg-white">
          <div className="linkin-text">Konnect.Bio</div>
          <div className="profile">
            <div className="placeholder">
              <img src={this.props.placeholder} />
            </div>
            <div className="instagram-account">
              <div className="instagram-username">@{this.props.username}</div>
              <div className="instagram-label">Instagram</div>
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
