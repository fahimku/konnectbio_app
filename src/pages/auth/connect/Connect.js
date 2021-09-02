import axios from "axios";
import React from "react";
import PropTypes from "prop-types";
import {withRouter, Link, Route} from "react-router-dom";
import config from "../../../config";
import {connect} from "react-redux";
import {Container, Button} from "reactstrap";
import Widget from "../../../components/Widget";
import {loginUser, receiveToken, doInit} from "../../../actions/auth";
import jwt from "jsonwebtoken";
import clap from "../../../images/clap.png";
import instagram from "../../../images/socialIcons/instagram.png";
import tiktok from "../../../images/socialIcons/tiktok.png";
import twitter from "../../../images/socialIcons/twitter.png";
import youtube from "../../../images/socialIcons/youtube.png";
import snapchat from "../../../images/socialIcons/snapchat.png";
import facebook from "../../../images/socialIcons/facebook.png";
import {push} from "connected-react-router";

import s from "./Connect.module.scss";

class Connect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
    };
  }

  async getInstagramUrl() {
    await axios
      .get(`/social/url/instagram`)
      .then((response) => {
        this.setState({url: response.data});
      }).then((response) => {
        this.setState({url: response.data});
      })
      .catch(function (error) {});
  }

  componentDidMount() {
    // let token = localStorage.getItem("token");
    // axios.defaults.headers.common = {
    //   Authorization: "Bearer " + token,
    // };

    this.getInstagramUrl();
  }

  render() {
    return (
      <div className="auth-page connect-page">
        <Container>
          <Widget
            className="widget-auth mx-auto social-auth"
            title={
              <h3 className="mt-0">
                <img src={clap}></img>
              </h3>
            }
          >
            <h3 className="text-left">Account Created</h3>
            <p className="widget-auth-info text-left">
              Connect to Instagram or Facebook to start using KONNECT BIO.
            </p>
            <div className="social-buttons">
              <Button
                onClick={this.microsoftLogin}
                color=""
                className="social-button"
              >
                <i
                  className="social-icon social-microsoft"
                  style={{backgroundImage: `url(${instagram})`}}
                />
                <p className="social-text">
                  <Route
                    path="/goToGoogle"
                    render={() => (window.location = "https://www.google.com")}
                  />
                  <div dangerouslySetInnerHTML={{__html: this.state.url}} />
                </p>
              </Button>
              {/* <Button
                onClick={this.microsoftLogin}
                color=""
                className="social-button"
              >
                <i
                  className="social-icon social-microsoft"
                  style={{backgroundImage: `url(${facebook})`}}
                />
                <p className="social-text">Connect Facebook Profile</p>
              </Button> */}
            </div>

            <p className="widget-auth-info text-center">
              You’ll be able to connect to other platforms later.
            </p>

            <div className="social-links text-center">
              <i
                className="social-icon social-microsoft"
                style={{backgroundImage: `url(${tiktok})`}}
              />
              <i
                className="social-icon social-microsoft"
                style={{backgroundImage: `url(${instagram})`}}
              />
              <i
                className="social-icon social-microsoft"
                style={{backgroundImage: `url(${twitter})`}}
              />

              <i
                className="social-icon social-microsoft"
                style={{backgroundImage: `url(${facebook})`}}
              />
              <i
                className="social-icon social-microsoft"
                style={{backgroundImage: `url(${youtube})`}}
              />
              <i
                className="social-icon social-microsoft"
                style={{backgroundImage: `url(${snapchat})`}}
              />
            </div>
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
export default withRouter(connect(mapStateToProps)(Connect));
