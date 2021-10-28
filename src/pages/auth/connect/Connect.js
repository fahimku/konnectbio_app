import axios from "axios";
import React from "react";
import { Button, Row, Col, FormLabel } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../../../images/logo.svg";
import MyCategory from "../../../pages/mycategory/MyCategory";
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
    };
  }

  async getInstagramUrl() {
    await axios
      .post(`/social/ig/url/instagram`)
      .then((response) => {
        this.setState({ url: response.data });
      })
      .catch(function (error) {});
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
        console.log(err.response.data.message, "error");
        toast.error(err.response.data.message, {
          autoClose: false,
        });
        this.setState({
          errorInsta: err.response.data.message,
          instagramCode: "",
        });
        // if (err.response.data.message) {
        //   this.setState({
        //     error: {
        //       type: "accountExist",
        //       message:
        //         "This account is already connected to another Konnect.Bio account. Please contact support for further assistance.",
        //     },
        //   });
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
        <div className="main-header">
          <div className="container">
            <Row className="connect-page-header">
              <Col md={10} xs={8}>
                <img className="img-connect" src={logo} alt="logo" />
              </Col>
              <Col md={2} xs={4} className="text-right">
                <Button
                  className="btn-connect"
                  onClick={() => this.props.history.push("/logout")}
                >
                  Logout
                </Button>
              </Col>
            </Row>
          </div>
        </div>
        <MyCategory
          username={this.state.username}
          isInstagramConnected={this.state.isInstagramConnected}
          url={this.state.url}
          errorInsta={this.state.errorInsta}
        />
        <div className="category-page">
          <div className="container">
            <div className="white-box pt-0">
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
