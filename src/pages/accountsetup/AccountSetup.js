import React from "react";
import axios from "axios";
import Select from "react-select";
import { Button } from "react-bootstrap";
import { Label, Input } from "reactstrap";
import { PaymentButton } from "../../components/PaymentButton/PaymentButton";
import ResetAccount from "./ResetAccount";
import DisconnectInstagram from "./DisconnectInstagram";
import { createBrowserHistory } from "history";
// import CancelSubsciption from "./CancelSubsciption";
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
    this.setState({ promoLoading: true });
    await axios
      .post("/payment/validatepromocode", { promo_code: this.state.promo_code })
      .then((response) => {
        this.setState({ promoLoading: false });
        this.setState({ showPaymentButton: false });
        toast.success("Promo Code Applied SuccessFully");
        const userInformation = localStorage.getItem("userInfo");
        const parseUserInformation = JSON.parse(userInformation);
        parseUserInformation.package = response.data.message;
        const storeUserInformation = JSON.stringify(parseUserInformation);
        localStorage.setItem("userInfo", storeUserInformation);
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        this.setState({ promoLoading: false, promo_code: "" });
      });
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

  promoChange = (e) => this.setState({ promo_code: e.target.value });

  render() {
    let userInfo1 = JSON.parse(localStorage.getItem("userInfo"));
    return (
      <div
        className={`profile-page account-setup ${
          this.props.className ? "container" : ""
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

          <div className={`profile_container_main container  container`}>
            <div className="row">
              <div className="profile_box_main col-md-4 hidden">
                <div className="dash_block_profile">
                  <div className="dash_content_profile">
                    <h5>Manage Plan</h5>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="dp_fields-setup mb-0">
                          <h4 className="package_name">
                            Current Plan:{" "}
                            {userInfo1?.package
                              ? userInfo1.package.package_name
                              : ""}
                          </h4>
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
                              "Business Plus" && (
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
                              "Business Plus" && (
                              <span>Change Plan to have more links</span>
                            )}
                          </div>
                        </div>
                        {this.state.singlePackage.package_name !==
                          "Micro Influencer" &&
                          this.state.upgrade && (
                            <div className="dp_fields-setup">
                              <>
                                <div className="mt-3">
                                  <Button
                                    variant="primary"
                                    className="btn-block"
                                    onClick={() => {
                                      this.setState({
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

            {this.state.singlePackage.package_name !== "Micro Influencer" &&
              this.state.showPaymentButton && (
                <>
                  <div className="row">
                    <div className="profile_box_payment profile_box_main col-md-8">
                      <div className="dash_block_profile">
                        <div className="dash_content_profile">
                          <h5>Manage Plan</h5>
                          <div className="row">
                            <div className="colbx-inr col-md-12">
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
                                {
                                  this.state.singlePackage
                                    .package_amount_monthly
                                }
                              </div>
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
                                      required
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
      </div>
    );
  }
}
export default AccountSetup;
