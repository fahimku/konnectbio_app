import axios from "axios";
import React from "react";
import { Button, Row, Col, FormLabel } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../../../images/logo.svg";
import AccountSetup from "../../../pages/accountsetup/AccountSetup";
import { toast } from "react-toastify";

class Connect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      instagramCode: "",
      isInstagramConnected: false,
      username: "",
      errorInsta: "",
      cancelSubscription: false,
      resetAccount: false,
    };
  }

  async getInstagramUrl() {
    await axios
      .post(`/social/ig/url/instagram`)
      .then((response) => {
        this.setState({ url: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let access_token = userInfo.access_token;
    const instagramCodeUrl = window.location.href;
    if (access_token !== "") {
      this.props.history.push("/app/linkinbio");
    }

    if (instagramCodeUrl.includes("code")) {
      const code = instagramCodeUrl.split("?")[1].split("=");
      this.setState({ instagramCode: code[1] });
      this.setState({ isInstagramConnected: true });
      this.fetchInstagramPostsFirstTime(code[1]);
    }
    this.getInstagramUrl();
  }

  async fetchInstagramPostsFirstTime(token) {
    const userInformation = localStorage.getItem("userInfo");
    const parseUserInformation = JSON.parse(userInformation);
    await axios
      .post(`/social/ig/data/${token}`, { email: parseUserInformation.email })
      .then((response) => {
        localStorage.setItem("access_token", response.data.access_token);
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        parseUserInformation.username = response.data.username;
        this.setState({ username: response.data.username });
        parseUserInformation.access_token = response.data.access_token;
        const storeUserInformation = JSON.stringify(parseUserInformation);
        localStorage.setItem("userInfo", storeUserInformation);
        this.updateAccessToken(
          userInfo.user_id,
          response.data.username,
          response.data.access_token
        );
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          autoClose: false,
        });
        this.setState({
          errorInsta: err.response.data.message,
          instagramCode: "",
        });

        // }
      });
  }

  //First Request From User
  async updateAccessToken(user_id, username, accessToken) {
    await axios.put(`/users/revise/ig/instagram`, {
      user_id: user_id,
      username: username,
      access_token: accessToken,
    });
  }

  render() {
    return (
      <>
        <div className="login_header">
          <div className="header_inr group">
            <div className="header_inr_left">
              <div className="konnect_logo">
                <img className="logo" src={logo} alt="logo" />
              </div>
            </div>
            <div className="header_inr_right">
              <div className="create_account">
                <Button
                  className="btn-connect"
                  onClick={() => this.props.history.push("/logout")}
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
        <AccountSetup
          resetAccount={this.state.resetAccount}
          cancelSubscription={this.state.cancelSubscription}
          className="container"
          username={this.state.username}
          isInstagramConnected={this.state.isInstagramConnected}
          url={this.state.url}
          errorInsta={this.state.errorInsta}
        />
        <div className="category-page">
          <div className="container">
            <div className="p-0">
              <Row>
                <Col md={10}></Col>
                <Col md={2}>
                  <Button
                    disabled={this.state.instagramCode === "" ? true : false}
                    onClick={() => {
                      this.props.history.push(
                        `/app/linkinbio/${this.state.instagramCode}`
                      );
                    }}
                    variant="primary"
                    type="submit"
                    className="category-btn btn-block"
                  >
                    Next
                  </Button>
                </Col>
                {this.state.instagramCode === "" && (
                  <FormLabel className="label-insta col-md-12">
                    Please Connect your Instagram Account
                  </FormLabel>
                )}
              </Row>
            </div>
          </div>
        </div>
      </>
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
