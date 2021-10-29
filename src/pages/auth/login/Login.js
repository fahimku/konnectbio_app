import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
//import {Redirect} from "react-router";
import config from "../../../config";
import { connect } from "react-redux";
import { Container, Alert, Button } from "reactstrap";
import Widget from "../../../components/Widget";
import { loginUser, receiveToken } from "../../../actions/auth";
import jwt from "jsonwebtoken";
// import microsoft from '../../../images/microsoft.png';
import { push } from "connected-react-router";
import logo from "../../../images/logo.svg";
import queryString from "query-string";
import { toast } from "react-toastify";

import { createBrowserHistory } from "history";
export const history = createBrowserHistory({
  forceRefresh: true,
});

class Login extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  static isAuthenticated() {
    const token = localStorage.getItem("token");
    if (!config.isBackend && token) return true;
    if (!token) return;
    const date = new Date().getTime() / 1000;
    const data = jwt.decode(token);
    if (!data) return;
    return date < data.exp;
  }

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };

    this.doLogin = this.doLogin.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  changeEmail(event) {
    this.setState({ email: event.target.value });
  }

  changePassword(event) {
    this.setState({ password: event.target.value });
  }

  doLogin(e) {
    e.preventDefault();
    this.props.dispatch(
      loginUser({ email: this.state.email, password: this.state.password })
    );
  }

  componentDidMount() {
    const query = queryString.parse(window.location.search);

    if (query.bio_code && query.email) {
      this.tokenVerify(query.bio_code, query.email);
    }
    //const params = new URLSearchParams(this.props.location.search);
    const token = localStorage.getItem("token");
    if (token) {
      const instagramCodeUrl = window.location.href;
      this.props.dispatch(receiveToken(token));
      if (instagramCodeUrl.includes("code")) {
        const code = instagramCodeUrl.split("?")[1].split("=");
        this.props.history.push("/connect?code=" + code[1]);
      }
      //      this.props.dispatch(doInit());
    }
  }

  tokenVerify = async (code, email) => {
    const endPoint = config.baseURLApiToken + "/verify?email=" + email;
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + code,
      },
    };
    fetch(endPoint, requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        if (response.success) {
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      });
  };

  signUp() {
    this.props.dispatch(push("/register"));
  }

  render() {
    return (
      <div className="auth-page">
        <Container>
          <h5 className="auth-logo">
            <img className="logo" src={logo} alt="logo" />
          </h5>
          <Widget
            className="widget-auth mx-auto"
            title={<h3 className="mt-0">Login</h3>}
          >
            <form className="mt" onSubmit={this.doLogin}>
              {this.props.errorMessage && (
                <Alert className="alert-sm" color="danger">
                  {this.props.errorMessage}
                </Alert>
              )}
              <div className="form-group">
                <input
                  className="form-control"
                  value={this.state.email}
                  onChange={this.changeEmail}
                  type="email"
                  required
                  name="email"
                  placeholder="Email"
                />
              </div>
              <div className="form-group mb-0">
                <input
                  className="form-control"
                  value={this.state.password}
                  onChange={this.changePassword}
                  type="password"
                  required
                  name="password"
                  placeholder="Password"
                />
              </div>
              <span
                className="d-block text-right mb-3 mt-1 fs-sm  link"
                onClick={() => {
                history.push("/forgot");
                }}
              >
                Forgot password?
              </span>
              <Button
                type="submit"
                color="info"
                className="auth-btn mb-3"
                size="sm"
              >
                {this.props.isFetching ? "Loading..." : "Login"}
              </Button>
            </form>
            <p className="widget-auth-info">
              Don't have an account? Sign up now!
            </p>
            <span
              className="d-block text-center  link"
              onClick={() => {
                history.push("/register");
              }}
            >
              Create an Account
            </span>
          </Widget>
        </Container>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage,
  };
}
export default withRouter(connect(mapStateToProps)(Login));