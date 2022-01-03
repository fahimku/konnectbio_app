import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Navbar, Nav, NavbarToggler, Collapse } from "reactstrap";
import { logoutUser } from "../../actions/auth";
import { STATUS } from "react-joyride";
import LinksGroup from "../../components/Sidebar/LinksGroup/LinksGroup";
import {
  toggleSidebar,
  openSidebar,
  closeSidebar,
  changeActiveSidebarItem,
} from "../../actions/navigation";
import logo from "../../images/logo.svg";

import config from "../../../src/config";
import { toast } from "react-toastify";
import TopBar from "../../components/Topbar";
// import PermissionHelper from "../PermissionHelper";
// import { NavLink } from "react-router-dom";
import { Modal, Button, Row, Col } from "react-bootstrap";
import Select from "react-select";
import Loader from "../Loader/Loader";
import axios from "axios";

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
      showAddBio: false,
      showSupport: false,
      feedbackLoading: false,
      feedback_about: "",
      feedback_text: "",
      feedbackerror: false,
      feedbackerror1: false,
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
    if (newState[3]) {
      document.body.classList.add("mb-menu-show");
    } else {
      document.body.classList.remove("mb-menu-show");
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
  handleClose = () => {
    this.setState({ showAddBio: false });
    this.setState({ showSupport: false });
    this.setState({
      feedbackerror: false,
      feedbackerror1: false,
      feedback_about: "",
      feedback_text: "",
    });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.state.feedback_about === "" && this.state.feedback_text === "") {
      this.setState({ feedbackerror: true, feedbackerror1: true });
    } else {
      this.setState({ feedbackLoading: true });
      await axios
        .post(`/support/feedback/submit`, {
          feedback_about: this.state.feedback_about,
          feedback_text: this.state.feedback_text,
        })
        .then((response) => {
          this.setState({ feedbackLoading: false });
          this.setState({
            showSupport: false,
            feedback_about: "",
            feedback_text: "",
          });
          let res = response.data;
          toast.success(res.message);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          this.setState({ feedbackLoading: false });
        });
    }
  };
  handleSelect = (e, options) => {
    this.setState({ feedback_about: options.value, feedbackerror: false });
  };
  handleChange = (e) => {
    this.setState({
      feedback_text: e.target.value,
      feedbackerror1: false,
    });
  };

  render() {
    const url = config.visitorURL + "/";
    const supportOptions = [
      { value: "subscription", label: "Subscription" },
      { value: "technical", label: "Technical" },
      { value: "feedback", label: "Feedback" },
      { value: "dashboard", label: "Dashboard" },
      { value: "bioshop", label: "Bioshop" },
      { value: "links", label: "Links" },
      { value: "my_posts", label: "My Posts" },
      { value: "schedule_post", label: "Schedule Post" },
      { value: "monitor_mention", label: "Monitor Mention" },
    ];
    return (
      <>
        <div className="mobile-header-responsive">
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
                    onClick={() => this.toggle(3)}
                    className="sidebar-nav-links"
                    header="Manage BioShop"
                    link="/app/linkinbio"
                    isHeader
                    iconElement={
                      <span className="glyphicon glyphicon-th-list"></span>
                    }
                    iconName="flaticon-users"
                    labelColor="info"
                  />

                  {/* <LinksGroup
                    onClick={() => this.toggle(3)}
                    className="sidebar-nav-links"
                    header="Manage BioShop"
                    link="/app/linkinbio-shop"
                    isHeader
                    iconElement={
                      <span className="glyphicon glyphicon-shopping-cart"></span>
                    }
                    iconName="flaticon-users"
                    labelColor="info"
                  /> */}

                  <LinksGroup
                    onClick={() => this.toggle(3)}
                    className="sidebar-nav-links"
                    header="Manage Links"
                    link="/app/my/links"
                    isHeader
                    iconElement={
                      <span className="glyphicon glyphicon-link"></span>
                    }
                    iconName="flaticon-users"
                    labelColor="info"
                  />
                  {/* {PermissionHelper.validate(["affiliate_access"]) ? ( */}
                  <LinksGroup
                    onClick={() => this.toggle(3)}
                    className="sidebar-nav-links"
                    header="My Posts"
                    link="/app/my/posts"
                    isHeader
                    iconElement={
                      <span className="glyphicon glyphicon-shopping-cart"></span>
                    }
                    // label="Awesome"
                    iconName="flaticon-users"
                    labelColor="info"
                  />
                  {/* ) : null} */}
                  <LinksGroup
                    onClick={() => this.toggle(3)}
                    className="sidebar-nav-links"
                    header="Schedule Post"
                    link="/app/schedule/posts"
                    isHeader
                    iconElement={
                      <span className="glyphicon glyphicon-th-list"></span>
                    }
                    // label="Awesome"
                    iconName="flaticon-users"
                    labelColor="info"
                  />
                  <LinksGroup
                    onClick={() => this.toggle(3)}
                    className="sidebar-nav-links"
                    header="Monitor Mentions"
                    link="/app/monitor/mentions"
                    isHeader
                    iconElement={<span className="fa fa-at"></span>}
                    // label="Awesome"
                    iconName="flaticon-users"
                    labelColor="info"
                  />

                  <LinksGroup
                    onClick={() => this.toggle(3)}
                    className="sidebar-nav-links"
                    header="Monitor Hashtags"
                    link="/app/monitor/hash/tags"
                    isHeader
                    iconElement={<span className="fa fa-hashtag"></span>}
                    // label="Awesome"
                    iconName="flaticon-users"
                    labelColor="info"
                  />
                  <LinksGroup
                    onClick={() => this.toggle(3)}
                    className="sidebar-nav-links"
                    header="Monitor Profiles"
                    link="/app/search/profile"
                    isHeader
                    iconElement={
                      <span className="glyphicon glyphicon-user"></span>
                    }
                    // label="Awesome"
                    iconName="flaticon-users"
                    labelColor="info"
                  />

                  {/* <LinksGroup
                    onClick={() => this.toggle(3)}
                    className="sidebar-nav-links"
                    header="Direct Messaging"
                    link="/app/direct/messaging"
                    isHeader
                    iconElement={<span className="fa fa-envelope"></span>}
                    // label="Awesome"
                    iconName="flaticon-users"
                    labelColor="info"
                  /> */}

                  {/* {PermissionHelper.validate(["affiliate_access"]) ? (
                    <LinksGroup
                      onClick={() => this.toggle(3)}
                      className="sidebar-nav-links"
                      header="Manage Affiliate"
                      link="/app/campaign"
                      isHeader
                      iconElement={
                        <span className="glyphicon glyphicon-bullhorn"></span>
                      }
                      // label="Awesome"
                      iconName="flaticon-users"
                      labelColor="info"
                    />
                  ) : null} */}

                  {/* {PermissionHelper.validate(["marketplace_access"]) ? (
                    <LinksGroup
                      onClick={() => this.toggle(3)}
                      className="sidebar-nav-links"
                      header="Manage Affiliate"
                      link="/app/marketplace"
                      isHeader
                      iconElement={<span className="fa fa-shopping-bag"></span>}
                      // label="Awesome"
                      iconName="flaticon-users"
                      labelColor="info"
                    />
                  ) : null} */}

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
                    header="Home Screen"
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
                    header="Category Setup"
                    link="/app/account/categories"
                    isHeader
                    iconElement={
                      <span className="glyphicon glyphicon-th"></span>
                    }
                    iconName="flaticon-users"
                    labelColor="info"
                  />

                  <LinksGroup
                    onClick={() => this.toggle(3)}
                    className="sidebar-nav-links"
                    header="Account Setup"
                    link="/app/account/setup"
                    isHeader
                    iconElement={
                      <span className="glyphicon glyphicon-cog"></span>
                    }
                    iconName="flaticon-users"
                    labelColor="info"
                  />

                  <LinksGroup
                    onClick={() => this.toggle(3)}
                    className="sidebar-nav-links"
                    header="Delete Account"
                    link="/app/account/Delete"
                    isHeader
                    iconElement={
                      <span className="glyphicon glyphicon-trash"></span>
                    }
                    iconName="flaticon-users"
                    labelColor="info"
                  />
                  <LinksGroup
                    onClick={() => this.toggle(3)}
                    className="sidebar-nav-links"
                    header="Logout"
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

            <div className="top-logo">
              <div
                className="logo"
                onClick={() => {
                  window.location.href = "/app/dashboard";
                }}
                // onClick={() => this.toggle(3)}
              >
                {/* <NavLink to="/app/dashboard"> */}
                <img src={logo} alt="logo" />
                {/* </NavLink> */}
              </div>
            </div>
            <TopBar text={true} username={this.state.username} />
          </div>
        </div>
        <div className="header bg-white">
          <div className="linkin-text">Konnect.Bio</div>
          <div className="left-top-bar">
            <div className="your-copy-link">
              <div className="item-a">
                Bio Link:{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={url + this.props.username}
                >
                  {url + this.props.username}
                </a>
              </div>
              <div onClick={this.copyToClipboard} className="item-b">
                Copy
              </div>
            </div>
          </div>
          <div className="addbio-topbar">
            <button
              className="btn btn-addbio"
              onClick={() => {
                this.setState({
                  showAddBio: true,
                });
              }}
            >
              Add To Instagram Account
            </button>
          </div>
          <div className="right-top-bar">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                this.setState({
                  showSupport: true,
                });
              }}
            >
              Support
            </button>
          </div>
        </div>
        <Modal
          className="addbio-modal"
          show={this.state.showAddBio}
          onHide={this.handleClose}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Add BioLink to Instagram account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="steps">
              <h6 className="add-step">Step 1</h6>
              <div>Copy your BioLink page link.</div>
              <div className="add-bio-input">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={url + this.props.username}
                  className="ml-3"
                >
                  {url + this.props.username}
                </a>
              </div>

              <button
                onClick={this.copyToClipboard}
                className="btn btn-block btn-outline-primary mt-3"
              >
                Copy Link
              </button>
            </div>
            <div className="mt-4 steps">
              <h6 className="add-step">Step 2</h6>
              <div>Log in to Instagram on the web.</div>
              <div className="add-bio-input">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.instagram.com/accounts/edit/"
                  className="goto-insta"
                >
                  Go to Instagram Profile{" "}
                  <i class="fa fa-external-link" aria-hidden="true"></i>
                </a>
              </div>
            </div>
            <div className="mt-4 steps">
              <h6 className="add-step">Step 3</h6>
              <div>
                Paste your link into the website field of your profile and
                submit.
              </div>
            </div>

            <Button className="mt-4 btn-block" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Body>
        </Modal>
        <Modal
          className="addbio-modal"
          show={this.state.showSupport}
          onHide={this.handleClose}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Konnect.Bio Feedback Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmit}>
              <Row>
                <Col md={12}>
                  <label>Feedback About</label>
                  <Select
                    name="feedback_about"
                    options={supportOptions}
                    placeholder="Select Feedback About"
                    onChange={(options, e) => this.handleSelect(e, options)}
                  />
                  {this.state.feedbackerror ? (
                    <span className="text-danger">This field is required</span>
                  ) : null}
                </Col>
                <Col md={12} className="mt-2">
                  <label>Enter Feedback</label>
                  <textarea
                    name="feedback_text"
                    placeholder="Enter Feedback..."
                    onInput={this.handleChange}
                    className="form-control pt-2"
                    rows="4"
                  />
                  {this.state.feedbackerror1 ? (
                    <span className="text-danger">This field is required</span>
                  ) : null}
                </Col>
                <Col md={12} className="mt-3">
                  {this.state.feedbackLoading ? (
                    <Button>
                      <Loader />
                    </Button>
                  ) : (
                    <Button color="default" type="submit">
                      Submit
                    </Button>
                  )}

                  <Button className="" onClick={this.handleClose}>
                    Close
                  </Button>
                </Col>
              </Row>
            </form>
          </Modal.Body>
        </Modal>
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
    currentUser: store.auth.currentUser,
  };
}
export default withRouter(connect(mapStateToProps)(Header));
