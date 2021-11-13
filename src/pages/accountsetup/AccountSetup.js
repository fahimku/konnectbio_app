import React from "react";
import axios from "axios";
import Select from "react-select";
import { Row, Col, Button } from "react-bootstrap";
import { Label, Input } from "reactstrap";
import { PaymentButton } from "../../components/PaymentButton/PaymentButton";
import ResetAccount from "./ResetAccount";
import DisconnectInstagram from "./DisconnectInstagram";
import { createBrowserHistory } from "history";
import CancelSubsciption from "./CancelSubsciption";
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
      package: userInfo.package.package_name,
      packageId: userInfo.package.package_id,
      categoryAllow: userInfo.package.category_count,
      package_amount: userInfo.package.package_amount,
    };
  }

  componentDidMount() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.setState({ userInfo: userInfo });
    // const params = queryString.parse(window.location.search);
    if (this.props.resetAccount === false) {
      this.setState({ resetAccount: false });
    }
    if (userInfo.access_token !== "") {
      this.setState({ isInstagramConnected: true });
    }
    this.setState({ userId: userInfo.user_id });
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
          if (index > index1) {
            disabledSelect = true;
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
    } else if (event.index === this.state.packageIndex) {
      this.setState({ upgrade: false });
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

  render() {
    let userInfo1 = JSON.parse(localStorage.getItem("userInfo"));
    return (
      <div className="category-page">
        <div
          className={
            this.props.className ? this.props.className : "container-fluid"
          }
        >
          <div className="justify-content-md-center">
            <div className="connections mt-5">
              <div className="page-title">
                <h3>Account Setup</h3>
              </div>
              <div className="white-box mt-5">
                <h5 className="page-title line-heading">Manage Plan</h5>
                <Row>
                  <Col md={8}>
                    <h4 className="package_name">
                      Current Plan:{" "}
                      {userInfo1.package ? userInfo1.package.package_name : ""}
                    </h4>
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col md={4} xl={2}>
                    Change Plan:
                  </Col>
                  <Col md={4} xl={3}>
                    <Select
                      isSearchable={false}
                      isOptionDisabled={(option) => option.isdisabled} // disable an option
                      options={this.state.packages}
                      placeholder="Select package"
                      value={{
                        label: this.state.package,
                        value: this.state.package,
                      }}
                      onChange={(event) => this.handlePackage(event)}
                    />
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Col xl={2} md={4}>
                    Categories Included:{" "}
                    {this.state.singlePackage.category_count}
                  </Col>
                  {this.state.singlePackage.package_name !==
                    "Business Plus" && (
                    <Col xl={4} lg={4} md={6}>
                      <p>Change Plan to have more categories</p>
                    </Col>
                  )}
                </Row>

                <Row className="mt-4">
                  <Col md={4} xl={2}>
                    Links Included: {this.state.singlePackage.link_count}
                  </Col>

                  {this.state.singlePackage.package_name !==
                    "Business Plus" && (
                    <Col md={6} xl={3}>
                      <p>Change Plan to have more links</p>
                    </Col>
                  )}
                </Row>
                {this.state.singlePackage.package_name !== "Micro Influencer" &&
                  this.state.upgrade && (
                    <Row className="mt-4">
                      <>
                        <Col md={4} xl={2}>
                          {/* Status Activity: */}
                        </Col>
                        <Col md={4} xl={3}>
                          <Button
                            variant="primary"
                            className="btn-block"
                            onClick={() => {
                              if (
                                this.state.singlePackage.package_name ===
                                  "Business" ||
                                this.state.singlePackage.package_name ===
                                  "Business Plus"
                              ) {
                                alert(
                                  "For support please contact support@konnect.bio"
                                );
                                this.setState({ showPaymentButton: false });
                              } else {
                                this.setState({ showPaymentButton: true });
                              }
                            }}
                          >
                            Upgrade Subscription
                          </Button>
                        </Col>
                      </>
                    </Row>
                  )}
                {/* <Row className="mt-4">
                  <Col md={4} xl={2}>
                    Cancel Subscription:
                  </Col>
                  <Col md={4} xl={3}>
                    
                    <CancelSubsciption userId={userInfo1.user_id} />
                  </Col>
                </Row> */}
              </div>
              {this.state.singlePackage.package_name !== "Micro Influencer" &&
                this.state.showPaymentButton && (
                  <>
                    <div className="white-box">
                      <Row>
                        <Col xl={12}>
                          <h5 className="page-title line-heading">Payment</h5>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={5} xl={3}>
                          <div className="checkbox abc-checkbox">
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
                            {this.state.singlePackage.package_amount_monthly}
                          </div>
                        </Col>
                        <Col md={4} xl={4}>
                          <div className="checkbox abc-checkbox">
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
                        </Col>
                      </Row>
                      <br />
                      <PaymentButton
                        plan={this.state.plan}
                        userId={userInfo1.user_id}
                        packageId={this.state.singlePackage.package_id}
                        paymentMethod={this.state.singlePackage.package_name}
                      />
                    </div>
                  </>
                )}

              <DisconnectInstagram
                userId={userInfo1.user_id}
                username={this.props.username}
                username1={userInfo1.username}
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
              {this.state.resetAccount && (
                <ResetAccount
                  userId={userInfo1.user_id}
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
          </div>
        </div>
      </div>
    );
  }
}
export default AccountSetup;
