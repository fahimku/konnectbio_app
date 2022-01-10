import React from "react";
import { Button } from "react-bootstrap";
import logo from "../../images/konnectbiologo.svg";
import queryString from "query-string";
import axios from "axios";
// import s from "./payment.module.scss";
// const userInfo = JSON.parse(localStorage.getItem("userInfo"));
import { createBrowserHistory } from "history";
export const history = createBrowserHistory({
  forceRefresh: true,
});
class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      responseSuccess: false,
    };

    const params = queryString.parse(window.location.search);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (params.status === "return") {
      if (!userInfo?.package) {
        history.push("/package");
      } else if (
        params.status === "return" &&
        !userInfo?.fb_token &&
        !userInfo?.page_token &&
        !userInfo?.access_token
      ) {
        history.push("/connect");
      } else if (
        params.status === "return" &&
        !userInfo?.fb_token &&
        !userInfo?.page_token
      ) {
        history.push("/connect");
      } else {
        history.push("/app/account/setup/");
      }
    }
  }

  componentDidMount() {
    const params = queryString.parse(window.location.search);
    if (Object.keys(params).length === 0) {
      this.props.history.push("/app/main/");
    }

    if (params.status === "success") {
      this.setState({ success: true });
      this.updatePackage();
    }
  }
  updatePackage = async () => {
    await axios
      .get("/package/retrieve/")
      .then((response) => {
        const userInformation = localStorage.getItem("userInfo");
        const parseUserInformation = JSON.parse(userInformation);
        parseUserInformation.package = response.data.message;
        const storeUserInformation = JSON.stringify(parseUserInformation);
        localStorage.setItem("userInfo", storeUserInformation);
        this.setState({ responseSuccess: response.data.success });
        // this.props.history.push("/connect");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  returnToBackPage = () => {
    let redirectURL;
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const params = queryString.parse(window.location.search);

    if (params.status === "success") {
      if (
        userInfo?.package?.package_name == "Premium" &&
        !userInfo?.fb_token &&
        !userInfo?.page_token
      ) {
        redirectURL = "/connect";
      } else if (
        userInfo?.package?.package_name == "Premium Plus" &&
        userInfo?.fb_token &&
        userInfo?.page_token
      ) {
        redirectURL = "/app/account/setup";
      } else if (
        userInfo?.package?.package_name == "Premium Plus" &&
        !userInfo?.fb_token &&
        !userInfo?.page_token
      ) {
        redirectURL = "/connect";
      }
    } else if (params.status === "error") {
      if (!userInfo?.package) {
        redirectURL = "/package";
      } else {
        redirectURL = "/app/account/setup/";
      }
    } else if (params.status === "return") {
      if (!userInfo?.package) {
        redirectURL = "/package";
      } else {
        redirectURL = "/app/account/setup/";
      }
    }

    return history.push(redirectURL);
  };

  render() {
    return (
      <>
        {/* <div className={s.errorPage}> */}
        <div className="login_header">
          <div className="container group">
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

        <div className="container">
          <div className="payment-page mt-5">
            <div className="page-title">
              <h3>Payment</h3>
            </div>
            <div className="white-box mt-5">
              {this.state.success ? (
                <div className="success-msg">
                  <h2>Thank you!</h2>
                  <p>Your payment has been successfully received.</p>
                </div>
              ) : (
                <div className="error-msg danger">
                  <h2>Oh no, your payment failed</h2>
                  <p>Please check your card detail and try again.</p>
                </div>
              )}
            </div>
            <div className="mt-5 text-right">
              <Button
                // disabled={this.state.responseSuccess ? false : true}
                onClick={() => this.returnToBackPage()}
                variant="primary"
                type="submit"
                className="payment-next"
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Payment;
