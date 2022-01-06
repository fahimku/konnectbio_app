import React from "react";
import axios from "axios";
import Select from "react-select";
import { Button, Modal, Collapse } from "react-bootstrap";
import { Label, Input } from "reactstrap";
import { PaymentButton } from "../../components/PaymentButton/PaymentButton";
import ResetAccount from "./ResetAccount";
import DisconnectInstagram from "./DisconnectInstagram";
import { createBrowserHistory } from "history";
// import CancelSubsciption from "./CancelSubsciption";
import ConnectToFb from "../auth/connect/ConnectToFb";
import { toast } from "react-toastify";
export const history = createBrowserHistory({
  forceRefresh: true,
});
const userInfo = JSON.parse(localStorage.getItem("userInfo"));
class AccountSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      packageIndex: "",
      plan: "Monthly",
      promoLoading: false,
      upgrade: false,
      userInfo: userInfo,
      cancelSubscription: true,
      resetAccount: true,
      resetModal: false,
      showPaymentButton: false,
      allPackages: "",
      singlePackage: "",
      myCategory: "",
      userId: "",
      category: [],
      categoryIncluded: 0,
      linksIncluded: 0,
      defaultCategory: "",
      saveCategories: "",
      categoryError: "",
      isInstagramConnected: false,
      loading: false,
      modal: false,
      loadingInsta: false,
      alert: true,
      packages: "",
      package: userInfo?.package?.package_name,
      packageId: userInfo?.package?.package_id,
      categoryAllow: userInfo?.package?.category_count,
      package_amount: userInfo?.package?.package_amount,
      promo_code: "",
      checkbox: {},
      showPromo: false,
      promo_error: false,
      promoCodeError: "",
      myPackage: "",
      help1: true,
      help2: true,
      help3: true,
      cancelPlan: false,
      disabledCancelPlan: false,
      showPaymentModel: false,
    };
  }

  componentDidMount() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.setState({ userInfo: userInfo });
    // const params = queryString.parse(window.location.search);
    if (this.props.resetAccount === false) {
      this.setState({ resetAccount: false });
    }
    if (userInfo?.access_token !== "") {
      this.setState({ isInstagramConnected: true });
    }
    this.setState({ userId: userInfo?.user_id });
    this.getPackages();
  }

  getPackages = async () => {
    await axios
      .get(`/package/receive`)
      .then((response) => {
        const selectPackages = [];
        const packages = response.data.message;
        const singlePackage = packages.filter(
          (item) => item.package_id === this.state.userInfo.package.package_id
        );
        const index = packages.findIndex(
          (item) => item.package_id === this.state.userInfo.package.package_id
        );
        const maxIndex = packages.length - 1;
        singlePackage[0].index = index;
        if (index !== maxIndex) {
          this.setState({ upgrade: true });
        }

        if (index) {
          this.setState({ upgrade: false });
        }

        this.setState({ packageIndex: index });
        this.setState({ allPackages: packages });
        this.setState({ singlePackage: singlePackage[0] });

        packages.map(({ package_id, package_name }, index1) => {
          let disabledSelect = false;
          // if (index > index1) {
          //   disabledSelect = true;
          // }

          //Micro Influencer Account
          if (index === 0) {
            if (index1 === 2 || index1 === 3) {
              disabledSelect = true;
            }
          }
          //Influencer Account
          if (index === 1) {
            if (index1 === 0) {
              disabledSelect = true;
            }
          }

          //Influencer Plus
          if (index === 2) {
            if (index1 === 0 || index1 === 1) {
              disabledSelect = true;
            }
          }

          return selectPackages.push({
            value: package_id,
            label: package_name,
            isdisabled: disabledSelect,
            index: index1,
          });
        });

        this.setState({ packages: selectPackages });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  handlePackage = (event) => {
    const singlePackage = this.state.allPackages.filter(
      (x) => x.package_id === event.value
    );
    // const maxIndex = this.state.allPackages.length - 1;

    this.setState({ singlePackage: singlePackage[0] });
    this.setState({ package: event.label });

    if (this.state.packageIndex < event.index) {
      this.setState({ upgrade: true });
    } else if (this.state.packageIndex > event.index) {
      this.setState({ upgrade: false });
      this.setState({ showPaymentButton: false });
    } else if (event.index === this.state.packageIndex) {
      this.setState({ upgrade: false });
      this.setState({ showPaymentButton: false });
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.state.promo_code === "") {
      this.setState({ promo_error: true });
      this.setState({ promoCodeError: " Please enter promo code" });
    } else if (
      !this.state.checkbox.instagram &&
      !this.state.checkbox.facebook &&
      !this.state.checkbox.checkbox3
    ) {
      this.setState({ showPromo: true });
    } else {
      this.setState({ promoLoading: true });
      await axios
        .post("/payment/validatepromocode", {
          promo_code: this.state.promo_code,
        })
        .then((response) => {
          this.setState({ promoLoading: false });
          this.setState({ showPaymentButton: false });
          toast.success("Promo Code Applied SuccessFully");
          const userInformation = localStorage.getItem("userInfo");
          const parseUserInformation = JSON.parse(userInformation);
          parseUserInformation.package = response.data.message;
          this.setState({ myPackage: response.data.message.package_name });

          if (response?.data?.message?.package_name && this.props.setPackage) {
            this.props.setPackage(response.data.message.package_name);
          }

          const storeUserInformation = JSON.stringify(parseUserInformation);
          localStorage.setItem("userInfo", storeUserInformation);
          history.push("/connect");
          // window.location.reload();
        })
        .catch((err) => {
          this.setState({ promo_error: true });
          this.setState({ promoCodeError: err.response.data.message });
          toast.error(err.response.data.message);
          this.setState({ promoLoading: false, promo_code: "" });
          this.setState({ checkbox: {} });
        });
    }
  };

  toggleModal = () => {
    const { modal } = this.state;
    this.setState({
      modal: !modal,
    });
  };

  togglerResetModal = () => {
    const { resetModal } = this.state;
    this.setState({
      resetModal: !resetModal,
    });
  };

  promoChange = (e) => {
    this.setState({ promo_code: e.target.value, promo_error: false });
  };

  handleClose = () => {
    this.setState({ checkbox: {} });
    this.setState({
      showPromo: false,
      showPaymentModel: false,
      promo_code: "",
    });
    this.setState({ help1: true, help2: true, help3: true });
  };

  handleCheckbox = (e) => {
    const target = e.target;
    const { checkbox } = this.state;
    const value = target.type === "checkbox" ? target.checked : target.value;
    checkbox[target.name] = value;
    this.setState({
      checkbox,
    });
  };

  cancelSubscription = async (e) => {
    this.setState({ disabledCancelPlan: true });
    await axios
      .put(`/users/revise/cancelSubscription/${this.state.userId}`)
      .then(() => history.push("/logout"));
  };

  renderFbConnection = (userInfo1) => {
    const package1 = JSON.parse(localStorage.getItem("userInfo"))?.package
      ?.package_name;
    if (package1 == "Premium" || this.state.myPackage == "Premium") {
      return (
        <ConnectToFb
          userId={userInfo1.user_id}
          setFbPageLocal={this.props.setFbPageLocal}
          username={this.props.username}
          username1={userInfo1.username}
        />
      );
    }
  };
  render() {
    let userInfo1 = JSON.parse(localStorage.getItem("userInfo"));
    return (
      <div
        className={`profile-page account-setup ${
          this.props.className ? "connect-page" : ""
        }`}
      >
        <div
          className={
            this.props.className ? this.props.className : "container-fluid"
          }
        >
          <div className="mt-4 row">
            <div className="col-md-12">
              <h4 className="page-title">Account Setup</h4>
            </div>
          </div>

          <div className={`profile_container_main container`}>
            <div className="row">
              <div className="profile_box_main col-md-4">
                <div className="dash_block_profile">
                  <div className="dash_content_profile">
                    <h5>Manage Plan</h5>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="dp_fields-setup mb-0">
                          <div className="row">
                            <div className="pkg-cncl-btn d-flex col-md-12">
                              <h6 className="package_name">
                                Current Plan:{" "}
                                {userInfo1?.package
                                  ? userInfo1.package.package_name
                                  : ""}
                              </h6>
                              {!this.props.connectPage &&
                                userInfo1.package.package_name ===
                                  "Premium" && (
                                  <button
                                    onClick={() => {
                                      this.setState({ cancelPlan: true });
                                    }}
                                    className="btn-block btn text-white btn-sm disconnect-btn"
                                  >
                                    Cancel
                                  </button>
                                )}
                            </div>
                          </div>
                        </div>

                        <div className="dp_fields-setup">
                          <div className="mb-3">
                            <label>Change Plan:</label>
                            <Select
                              isSearchable={false}
                              isOptionDisabled={(option) => option.isdisabled} // disable an option
                              options={this.state.packages}
                              placeholder="Select package"
                              value={{
                                label: this.state.package,
                                value: this.state.packageId,
                              }}
                              onChange={(event) => this.handlePackage(event)}
                            />
                          </div>
                        </div>

                        <div className="dp_fields-setup">
                          <div className="sm-b mb-2">
                            <span>
                              Categories Included:{" "}
                              <strong>
                                {this.state.singlePackage.category_count}
                              </strong>
                            </span>
                            {this.state.singlePackage.package_name !==
                              "Premium" && (
                              <span>Change Plan to have more categories</span>
                            )}
                          </div>
                        </div>

                        <div className="dp_fields-setup">
                          <div className="sm-b">
                            <span>
                              Links Included:{" "}
                              <strong>
                                {this.state.singlePackage.link_count}
                              </strong>
                            </span>

                            {this.state.singlePackage.package_name !==
                              "Premium" && (
                              <span>Change Plan to have more links</span>
                            )}
                          </div>
                        </div>
                        {this.state.singlePackage.package_name !== "Basic" &&
                          this.state.upgrade && (
                            <div className="dp_fields-setup">
                              <>
                                <div className="mt-3">
                                  <Button
                                    variant="primary"
                                    className="btn-block"
                                    onClick={() => {
                                      this.setState({
                                        promo_error: false,
                                        showPaymentButton: true,
                                      });
                                    }}
                                  >
                                    Upgrade Subscription
                                  </Button>
                                </div>
                              </>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <DisconnectInstagram
                userId={userInfo1?.user_id}
                username={this.props.username}
                username1={userInfo1?.username}
                modal={(boolean) => {
                  this.setState({ modal: boolean });
                }}
                url={this.props.url}
                show={this.state.modal}
                onHide={this.toggleModal}
                loading={(boolean) => {
                  this.setState({ loadingInsta: boolean });
                }}
                disabled={this.state.loadingInsta ? true : false}
              />
              {this.renderFbConnection(userInfo1)}
              {this.state.resetAccount && (
                <ResetAccount
                  userId={userInfo1?.user_id}
                  resetModal={(boolean) => {
                    this.setState({ resetModal: boolean });
                  }}
                  show={this.state.resetModal}
                  onHide={this.togglerResetModal}
                  disabled={this.state.loadingInsta ? true : false}
                  loading={(boolean) => {
                    this.setState({ loadingInsta: boolean });
                  }}
                />
              )}
            </div>

            {this.state.singlePackage.package_name !== "Basic" &&
              this.state.showPaymentButton && (
                <>
                  <div className="row">
                    <div className="profile_box_payment profile_box_main col-md-8">
                      <div className="dash_block_profile">
                        <div className="dash_content_profile">
                          <h5>Manage Plan</h5>
                          <div className="row">
                            <div className="colbx-inr col-md-12">
                              <div className="checkbox abc-checkbox abc-checkbox-primary">
                                <Input
                                  defaultChecked
                                  name="payment"
                                  value="Monthly"
                                  className="mt-0"
                                  id="checkbox1"
                                  type="radio"
                                  onChange={(e) => {
                                    this.setState({ plan: e.target.value });
                                  }}
                                />{" "}
                                <Label for="checkbox1" />
                                Pay Monthly: $
                                {
                                  this.state.singlePackage
                                    .package_amount_monthly
                                }
                              </div>
                              <div className="checkbox abc-checkbox abc-checkbox-primary">
                                <Input
                                  name="payment"
                                  value="Yearly"
                                  className="mt-0"
                                  id="checkbox2"
                                  type="radio"
                                  onChange={(e) => {
                                    this.setState({ plan: e.target.value });
                                  }}
                                />{" "}
                                <Label for="checkbox2" />
                                Pay Yearly & Save: $
                                {
                                  this.state.singlePackage.package_amount_yearly
                                }{" "}
                                &nbsp; (Save{" "}
                                {this.state.singlePackage.yearly_discount}%)
                              </div>
                              <form onSubmit={this.handleSubmit}>
                                <div className="acct-promo-sec">
                                  <h4>Have Promo Code?</h4>
                                  <div className="acct-promo-sec-inr">
                                    <input
                                      type="text"
                                      name="promo_code"
                                      placeholder="Enter Promo Code"
                                      value={this.state.promo_code}
                                      className="form-control"
                                      onInput={this.promoChange}
                                    />
                                    <Button
                                      type="submit"
                                      disabled={
                                        !this.state.promoLoading ? false : true
                                      }
                                    >
                                      Apply
                                    </Button>
                                  </div>

                                  <div className="make-canc-pay">
                                    {!this.state.checkbox.instagram ||
                                    !this.state.checkbox.facebook ||
                                    !this.state.checkbox.checkbox3 ? (
                                      <Button
                                        onClick={() => {
                                          this.setState({
                                            showPaymentModel: true,
                                          });
                                        }}
                                      >
                                        Make Payment
                                      </Button>
                                    ) : (
                                      <PaymentButton
                                        plan={this.state.plan}
                                        userId={userInfo1?.user_id}
                                        packageId={
                                          this.state.singlePackage.package_id
                                        }
                                        paymentMethod={
                                          this.state.singlePackage.package_name
                                        }
                                      />
                                    )}

                                    <Button
                                      onClick={() => {
                                        this.setState({
                                          showPaymentButton: false,
                                        });
                                      }}
                                      type="button"

                                      // disabled={
                                      //   !this.state.loading ? false : true
                                      // }
                                    >
                                      Cancel
                                    </Button>
                                    <Modal
                                      className="pkg_readmore"
                                      show={this.state.showPromo}
                                      onHide={this.handleClose}
                                      centered
                                      size="lg"
                                    >
                                      <Modal.Header closeButton>
                                        <Modal.Title>
                                          Premium Package
                                        </Modal.Title>
                                      </Modal.Header>
                                      <Modal.Body>
                                        <div className="funkyradio">
                                          <p>
                                            Please make sure of the following
                                            before proceeding further:
                                          </p>
                                          <div className="funkyradio-primary form-check abc-checkbox abc-checkbox-primary">
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              name="instagram"
                                              id="instagram"
                                              onChange={this.handleCheckbox}
                                            />
                                            <label for="instagram">
                                              Do you have Instagram business
                                              account?{" "}
                                              <a
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  this.setState({
                                                    help1: !this.state.help1,
                                                  });
                                                }}
                                                href="#"
                                              >
                                                Click here for help.
                                              </a>
                                            </label>

                                            <Collapse in={!this.state.help1}>
                                              <div className="card card-body">
                                                <ol
                                                  type="1"
                                                  className="insta-list"
                                                >
                                                  <li>
                                                    Login To Your Instagram
                                                    Account.
                                                  </li>
                                                  <li>Go To Profile.</li>
                                                  <li>
                                                    Select Settings{" "}
                                                    <i className="fa fa-cog"></i>
                                                  </li>
                                                  <li>
                                                    Find Account Icon{" "}
                                                    <i className="fa fa-user-circle-o"></i>
                                                  </li>
                                                  <li>
                                                    Find Switch Account Type.
                                                  </li>
                                                  <li>
                                                    Select Switch to Business
                                                    Account.
                                                  </li>
                                                </ol>
                                                <p>
                                                  You will now have an Instagram
                                                  Business Account.
                                                </p>
                                              </div>
                                            </Collapse>
                                          </div>
                                          <div className="funkyradio-primary form-check abc-checkbox abc-checkbox-primary">
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              name="facebook"
                                              id="facebook"
                                              onChange={this.handleCheckbox}
                                            />
                                            <label for="facebook">
                                              Do you have Facebook account
                                              connected to a Facebook page?{" "}
                                              <a
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  this.setState({
                                                    help2: !this.state.help2,
                                                  });
                                                }}
                                                href="#"
                                              >
                                                Click here for help.
                                              </a>
                                            </label>
                                            <Collapse in={!this.state.help2}>
                                              <div className="card card-body">
                                                <ol
                                                  type="1"
                                                  className="insta-list"
                                                >
                                                  <li>
                                                    Go to facebook.com and
                                                    create an account.
                                                  </li>
                                                  <li>
                                                    Once account is created,
                                                    connect to a facebook page.
                                                  </li>
                                                </ol>
                                                <p>
                                                  Your Facebook account will be
                                                  connected to a facebook page.
                                                </p>
                                              </div>
                                            </Collapse>
                                          </div>
                                          <div className="funkyradio-primary form-check abc-checkbox abc-checkbox-primary">
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              name="checkbox3"
                                              id="checkbox3"
                                              onChange={this.handleCheckbox}
                                            />
                                            <label for="checkbox3">
                                              Is your Facebook account connected
                                              with your Instagram account?{" "}
                                              <a
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  this.setState({
                                                    help3: !this.state.help3,
                                                  });
                                                }}
                                                href="#"
                                              >
                                                Click here for help.
                                              </a>
                                            </label>
                                            <Collapse in={!this.state.help3}>
                                              <div className="card card-body">
                                                <span className="font-weight-bold">
                                                  From Instagram:
                                                </span>
                                                <ol
                                                  type="1"
                                                  className="insta-list"
                                                >
                                                  <li>
                                                    Log in to Instagram and go
                                                    to your profile.
                                                  </li>
                                                  <li>Tap Edit Profile.</li>
                                                  <li>
                                                    Under Public
                                                    Business/Profile
                                                    Information, select Page.
                                                  </li>
                                                  <li>
                                                    Choose the Facebook page you
                                                    wish to connect to. If you
                                                    don’t have one yet, tap
                                                    Create a new Facebook page.
                                                  </li>
                                                </ol>
                                                <p>
                                                  Your Instagram account will be
                                                  connected to a Facebook
                                                  account.
                                                </p>
                                                <span className="font-weight-bold">
                                                  From Facebook:
                                                </span>
                                                <ol
                                                  type="1"
                                                  className="insta-list"
                                                >
                                                  <li>
                                                    Log in to Facebook and click
                                                    Pages in the left menu.
                                                  </li>
                                                  <li>
                                                    From your Facebook page,
                                                    click Settings.
                                                  </li>
                                                  <li>
                                                    Scroll down and select
                                                    Instagram in the left
                                                    column.
                                                  </li>
                                                  <li>
                                                    Click Connect Account, and
                                                    fill in your Instagram
                                                    username and password.
                                                  </li>
                                                </ol>
                                                <p>
                                                  Your Facebook account will be
                                                  connected to an Instagram
                                                  account.
                                                </p>
                                              </div>
                                            </Collapse>
                                          </div>
                                          <div>
                                            {this.state.checkbox.instagram &&
                                            this.state.checkbox.facebook &&
                                            this.state.checkbox.checkbox3 ? (
                                              <Button
                                                type="submit"
                                                onClick={(e) => {
                                                  this.setState({
                                                    showPromo: false,
                                                    help1: true,
                                                    help2: true,
                                                    help3: true,
                                                  });

                                                  this.handleSubmit(e);
                                                }}
                                              >
                                                Accept
                                              </Button>
                                            ) : null}
                                          </div>
                                        </div>
                                      </Modal.Body>
                                    </Modal>
                                    <Modal
                                      className="pkg_readmore"
                                      show={this.state.showPaymentModel}
                                      onHide={this.handleClose}
                                      centered
                                      size="lg"
                                    >
                                      <Modal.Header closeButton>
                                        <Modal.Title>
                                          Premium Package
                                        </Modal.Title>
                                      </Modal.Header>
                                      <Modal.Body>
                                        <div className="funkyradio">
                                          <p>
                                            Please make sure of the following
                                            before proceeding further:
                                          </p>
                                          <div className="funkyradio-primary form-check abc-checkbox abc-checkbox-primary">
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              name="instagram"
                                              id="instagram"
                                              onChange={this.handleCheckbox}
                                            />
                                            <label for="instagram">
                                              Do you have Instagram business
                                              account?{" "}
                                              <a
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  this.setState({
                                                    help1: !this.state.help1,
                                                  });
                                                }}
                                                href="#"
                                              >
                                                Click here for help.
                                              </a>
                                            </label>

                                            <Collapse in={!this.state.help1}>
                                              <div className="card card-body">
                                                <ol
                                                  type="1"
                                                  className="insta-list"
                                                >
                                                  <li>
                                                    Login To Your Instagram
                                                    Account.
                                                  </li>
                                                  <li>Go To Profile.</li>
                                                  <li>
                                                    Select Settings{" "}
                                                    <i className="fa fa-cog"></i>
                                                  </li>
                                                  <li>
                                                    Find Account Icon{" "}
                                                    <i className="fa fa-user-circle-o"></i>
                                                  </li>
                                                  <li>
                                                    Find Switch Account Type.
                                                  </li>
                                                  <li>
                                                    Select Switch to Business
                                                    Account.
                                                  </li>
                                                </ol>
                                                <p>
                                                  You will now have an Instagram
                                                  Business Account.
                                                </p>
                                              </div>
                                            </Collapse>
                                          </div>
                                          <div className="funkyradio-primary form-check abc-checkbox abc-checkbox-primary">
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              name="facebook"
                                              id="facebook"
                                              onChange={this.handleCheckbox}
                                            />
                                            <label for="facebook">
                                              Do you have Facebook account
                                              connected to a Facebook page?{" "}
                                              <a
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  this.setState({
                                                    help2: !this.state.help2,
                                                  });
                                                }}
                                                href="#"
                                              >
                                                Click here for help.
                                              </a>
                                            </label>
                                            <Collapse in={!this.state.help2}>
                                              <div className="card card-body">
                                                <ol
                                                  type="1"
                                                  className="insta-list"
                                                >
                                                  <li>
                                                    Go to facebook.com and
                                                    create an account.
                                                  </li>
                                                  <li>
                                                    Once account is created,
                                                    connect to a business page.
                                                  </li>
                                                </ol>
                                                <p>
                                                  Your Facebook account will be
                                                  connected to a business page.
                                                </p>
                                              </div>
                                            </Collapse>
                                          </div>
                                          <div className="funkyradio-primary form-check abc-checkbox abc-checkbox-primary">
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              name="checkbox3"
                                              id="checkbox3"
                                              onChange={this.handleCheckbox}
                                            />
                                            <label for="checkbox3">
                                              Is your Facebook account connected
                                              with your Instagram account?{" "}
                                              <a
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  this.setState({
                                                    help3: !this.state.help3,
                                                  });
                                                }}
                                                href="#"
                                              >
                                                Click here for help.
                                              </a>
                                            </label>
                                            <Collapse in={!this.state.help3}>
                                              <div className="card card-body">
                                                <span className="font-weight-bold">
                                                  From Instagram:
                                                </span>
                                                <ol
                                                  type="1"
                                                  className="insta-list"
                                                >
                                                  <li>
                                                    Log in to Instagram and go
                                                    to your profile.
                                                  </li>
                                                  <li>Tap Edit Profile.</li>
                                                  <li>
                                                    Under Public
                                                    Business/Profile
                                                    Information, select Page.
                                                  </li>
                                                  <li>
                                                    Choose the Facebook page you
                                                    wish to connect to. If you
                                                    don’t have one yet, tap
                                                    Create a new Facebook page.
                                                  </li>
                                                </ol>
                                                <p>
                                                  Your Instagram account will be
                                                  connected to a Facebook
                                                  account.
                                                </p>
                                                <span className="font-weight-bold">
                                                  From Facebook:
                                                </span>
                                                <ol
                                                  type="1"
                                                  className="insta-list"
                                                >
                                                  <li>
                                                    Log in to Facebook and click
                                                    Pages in the left menu.
                                                  </li>
                                                  <li>
                                                    From your Facebook page,
                                                    click Settings.
                                                  </li>
                                                  <li>
                                                    Scroll down and select
                                                    Instagram in the left
                                                    column.
                                                  </li>
                                                  <li>
                                                    Click Connect Account, and
                                                    fill in your Instagram
                                                    username and password.
                                                  </li>
                                                </ol>
                                                <p>
                                                  Your Facebook account will be
                                                  connected to an Instagram
                                                  account.
                                                </p>
                                              </div>
                                            </Collapse>
                                          </div>
                                          <div>
                                            {this.state.checkbox.instagram &&
                                            this.state.checkbox.facebook &&
                                            this.state.checkbox.checkbox3 ? (
                                              <PaymentButton
                                                plan={this.state.plan}
                                                userId={userInfo1?.user_id}
                                                packageId={
                                                  this.state.singlePackage
                                                    .package_id
                                                }
                                                paymentMethod={
                                                  this.state.singlePackage
                                                    .package_name
                                                }
                                              />
                                            ) : null}
                                          </div>
                                        </div>
                                      </Modal.Body>
                                    </Modal>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
          </div>
        </div>
        <Modal
          show={this.state.cancelPlan}
          onHide={() => {
            this.setState({ cancelPlan: false });
          }}
          className="change-password"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Cancel Subscription</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-white">
            <p>Do you want to cancel subscription?</p>
            <p>If yes, your subscription will be cancelled.</p>
            <p>All your data will be deleted.</p>
            <p>Subscription amount paid will not be refunded.</p>
            <p>
              New subscription will be required if you choose to register again.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => {
                this.setState({ cancelPlan: false });
              }}
            >
              Close
            </Button>
            <Button
              disabled={this.state.disabledCancelPlan}
              className="disconnect-btn"
              onClick={() => {
                this.cancelSubscription();
              }}
            >
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default AccountSetup;
