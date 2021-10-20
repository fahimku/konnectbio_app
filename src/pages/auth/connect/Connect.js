import axios from "axios";
import React from "react";
import {Button, Row, Col, FormLabel} from "react-bootstrap";
import {withRouter, NavLink} from "react-router-dom";
import {connect} from "react-redux";
import logo from "../../../images/logo.svg";
import MyCategory from "pages/mycategory/MyCategory";

class Connect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      instagramCode: "",
      isInstagramConnected: false
    };
  }

  async getInstagramUrl() {
    await axios
      .post(`/social/ig/url/instagram`)
      .then((response) => {
        this.setState({url: response.data});
      })
      .catch(function (error) {});
  }

  componentDidMount() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let access_token = userInfo.access_token;
    if (access_token !== "") {
      this.props.history.push("/app/linkinbio");
    }

    const instagramCodeUrl = window.location.href;
    if (instagramCodeUrl.includes("code")) {
      const code = instagramCodeUrl.split("?")[1].split("=");
      this.setState({ instagramCode: code[1] });
      this.setState({isInstagramConnected: true});
    }
    this.getInstagramUrl();
  }

  render() {
    return (
      <>
        <div className="connect-page-header">
          <div>
            <img className="img-connect" src={logo} />
          </div>
          <div className="btn-div">
            <Button
              className="btn-connect"
              onClick={() => this.props.history.push("/logout")}
            >
              Logout
            </Button>
          </div>
        </div>
        <MyCategory
          isInstagramConnected={this.state.isInstagramConnected}
          url={this.state.url} />
        <div className="category-page">
          <div className="container">
            <div className="justify-content-md-center">
              <Row>
                <Col md={10}></Col>
                <Col md={2}>
                  <Button
                    disabled={this.state.instagramCode == "" ? true : false}
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
              </Row>
              {this.state.instagramCode == "" && (
                <FormLabel className="label-insta">
                  Please Connect your Instagram Account
                </FormLabel>
              )}
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