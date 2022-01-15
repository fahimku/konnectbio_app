import axios from "axios";
import React from "react";
import BaseSelect, { createFilter } from "react-select";
import FixRequiredSelect from "../../../hooks/FixRequiredSelect";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Alert, Button } from "reactstrap";
import Widget from "../../../components/Widget";
import { registerUser, authError, authSuccess } from "../../../actions/auth";
import logo from "../../../images/konnectbiologo.svg";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";

const Select = (props) => (
  <FixRequiredSelect {...props} SelectComponent={BaseSelect} />
);

class Register extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      countryLoading: false,
      stateLoading: false,
      cityLoading: false,
      resendEmail: false,
      name: "",
      email: "",
      countries: "",
      countryStates: "",
      countryStateCode: "",
      countryState: "",
      cities: "",
      genderList: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" },
      ],
      gender: "",
      userType: "",
      accountTypes: [
        { value: "Influencer", label: "Influencer" },
        { value: "Brand", label: "Brand" },
      ],
      country: "",
      city: "",
      password: "",
      confirmPassword: "",
      countryCode: "",
      packages: "",
      packageType: "",
      zip: "",
      referred_by: "",
    };

    this.doRegister = this.doRegister.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changeGender = this.changeGender.bind(this);
    this.changeUserType = this.changeUserType.bind(this);
    this.changeCountry = this.changeCountry.bind(this);
    this.changeState = this.changeState.bind(this);
    this.changeCity = this.changeCity.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeConfirmPassword = this.changeConfirmPassword.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.isPasswordValid = this.isPasswordValid.bind(this);
    this.changeZip = this.changeZip.bind(this);
    this.changeReferred = this.changeReferred.bind(this);
    this.resendEmail = this.resendEmail.bind(this);
  }

  async componentDidMount() {
    await this.getCountries();
    await this.getStates(this.state.countryCode);
  }

  resendEmail = async () => {
    await axios
      .post(`/signin/resendemail`, {
        email: this.state.email,
      })
      .then(() => {
        this.setState({ resendEmail: true });
        toast.success("The verification has been sent to your email account.");
      })
      .catch(function (error) {
        this.setState({ resendEmail: false });
      });
  };

  getCountries = async () => {
    await axios
      .post(`/common/receive/countries`)
      .then((response) => {
        const selectCountries = [];
        const countries = response.data.message;
        countries.map(({ name, code1, selected }) => {
          if (selected) {
            // console.log({name, code1, selected});
            this.setState({ country: name, countryCode: code1 });
          } else {
            this.setState({ country: "Pakistan", countryCode: "PK" });
          }
          return selectCountries.push({ value: code1, label: name });
        });
        this.setState({ countries: selectCountries });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getStates = async (countryCode) => {
    this.setState({ stateLoading: true });
    await axios
      .post(`/common/receive/states`, { country_code: countryCode })
      .then((response) => {
        const selectStates = [];
        const states = response.data.message;
        states.map(({ name, isoCode, selected }) => {
          if (selected) {
            this.setState({ countryState: name, countryStateCode: isoCode });
          }
          return selectStates.push({ value: isoCode, label: name });
        });
        this.setState({ countryStates: selectStates });
        this.setState({ stateLoading: false });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getCities = async (countryCode, stateCode) => {
    this.setState({ cityLoading: true });
    await axios
      .post(`/common/receive/cities`, {
        country_code: countryCode,
        state_code: stateCode,
      })
      .then((response) => {
        const selectCities = [];
        const cities = response.data.message;
        cities.map(({ name }) => {
          return selectCities.push({
            value: name,
            label: name,
          });
        });
        this.setState({ cities: selectCities });
        this.setState({ cityLoading: false });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  changeName(event) {
    this.setState({ name: event.target.value });
  }

  changeEmail(event) {
    this.setState({ email: event.target.value });
  }

  changeGender(event) {
    this.setState({ gender: event.value });
  }

  changeUserType(event) {
    this.setState({ userType: event.value });
  }

  changeCountry(event) {
    this.setState({ city: "" });
    this.setState({ countryState: "" });
    this.setState({ country: event.label, countryCode: event.value });
    this.getStates(event.value);
  }

  changeState(event) {
    this.setState({ city: "" });
    this.setState({ countryState: event.label, countryStateCode: event.value });
    this.getCities(this.state.countryCode, event.value);
  }

  changeCity(event) {
    this.setState({ city: event.value });
  }

  changePassword(event) {
    this.setState({ password: event.target.value });
  }

  changeConfirmPassword(event) {
    this.setState({ confirmPassword: event.target.value });
  }

  checkPassword() {
    if (!this.isPasswordValid()) {
      if (!this.state.password) {
        this.props.dispatch(authError("Password field is empty"));
      } else {
        this.props.dispatch(
          authError("The password and confirmation password do not match.")
        );
      }
      setTimeout(() => {
        this.props.dispatch(authError());
      }, 3 * 1000);
    }
  }

  isPasswordValid() {
    return (
      this.state.password && this.state.password === this.state.confirmPassword
    );
  }

  validateEmail(emailAdress) {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailAdress.match(regexEmail)) {
      return true;
    } else {
      return false;
    }
  }

  changeZip(event) {
    this.setState({ zip: event.target.value });
  }

  changeReferred(event) {
    this.setState({ referred_by: event.target.value });
  }

  doRegister(e) {
    e.preventDefault();

    if (this.state.name === "") {
      this.props.dispatch(authError("The name field is required"));
    } else if (this.state.email === "") {
      this.props.dispatch(authError("The email field is required"));
    } else if (!this.validateEmail(this.state.email)) {
      this.props.dispatch(authError("The email address is not valid"));
    } else if (this.state.gender === "") {
      this.props.dispatch(authError("The gender field is required"));
    } else if (this.state.countryCode === "") {
      this.props.dispatch(authError("The country field is required"));
    } else if (this.state.countryStateCode === "") {
      this.props.dispatch(authError("The state field is required"));
    } else if (this.state.city === "") {
      this.props.dispatch(authError("The city field is required"));
    } else if (!this.isPasswordValid()) {
      this.checkPassword();
    } else {
      this.props.dispatch(
        registerUser({
          name: this.state.name,
          email: this.state.email,
          gender: this.state.gender,
          country: this.state.countryCode,
          state: this.state.countryStateCode,
          city: this.state.city,
          password: this.state.password,
          zip: this.state.zip,
          referred_by: this.state.referred_by,
          account_type:
            this.state.accountType === "brand"
              ? "business"
              : this.state.accountType,
        })
      );
    }
  }

  changeType = (e) => {
    const { value } = e.target;
    this.setState({
      accountType: value,
    });
  };

  render() {
    const styles = {
      menuList: (base) => ({
        ...base,

        "::-webkit-scrollbar": {
          width: "12px",
        },
      }),
    };
    return (
      <div className="auth-page">
        <div className="login_header">
          <div className="header_inr group">
            <div className="header_inr_left">
              <div className="konnect_logo">
                <a href="https://get.konnect.bio/" className="mt-2">
                  <img className="logo" src={logo} alt="logo" />
                </a>
              </div>
              <h3 className="kon_pg_title">Create Account</h3>
            </div>
            <div className="header_inr_right">
              <div className="create_account">
                <span>Already have an account?</span>&nbsp;
                <button
                  className="btn btn-link"
                  onClick={() => {
                    this.props.history.push("/login");
                  }}
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="custome_container_auth_ift">
          <div className="custome_container_auth_inr">
            {this.props.successMessage ? (
              <Widget className="custom_confirmation">
                <div className="confirm_ift align-items-center">
                  <span className="env-ift">
                    <i className="fa fa-envelope-open-o" aria-hidden="true"></i>
                  </span>
                  {this.state.resendEmail ? (
                    <>
                      <p className="we_have_ift">
                        The verification email has been sent to your email
                        account.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="we_have_ift">{this.props.successMessage}</p>
                      <p className="we_have_ift">
                        If verification is not done within 10 minutes,
                        registration process will be cancelled and you will have
                        to register again. It may take up to 3 minutes to
                        receive verification mail. In case you don,t receive
                        mail, check your spam folder.
                      </p>
                      <p className="we_have_ift">
                        Didn't receive email? <br />
                        <a href="#" onClick={this.resendEmail}>
                          Re-send
                        </a>
                      </p>
                    </>
                  )}
                  <span
                    className="continue_link_ifti"
                    onClick={() => {
                      this.props.history.push("/login");
                      this.props.dispatch(authSuccess(""));
                    }}
                  >
                    Continue
                  </span>
                </div>
              </Widget>
            ) : (
              <>
                <Widget
                  className="custome_signup"
                  title={<h3 className="mt-0">Create an Account</h3>}
                >
                  <form
                    id="registerForm"
                    className="mt"
                    onSubmit={this.doRegister}
                  >
                    {this.props.errorMessage && (
                      <Alert className="alert-sm" color="danger">
                        {this.props.errorMessage}
                      </Alert>
                    )}

                    <div className="form-group">
                      <input
                        className="form-control"
                        value={this.state.name}
                        onChange={this.changeName}
                        type="text"
                        name="name"
                        placeholder="Name"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        value={this.state.email}
                        onChange={this.changeEmail}
                        type="text"
                        name="email"
                        placeholder="Email"
                      />
                    </div>
                    <div className="form-group">
                      <Select
                        className="form_select_group"
                        value={
                          this.state.gender && {
                            label:
                              this.state.gender.charAt(0).toUpperCase() +
                              this.state.gender.slice(1),
                            value: this.state.gender,
                          }
                        }
                        onChange={this.changeGender}
                        placeholder="Select Gender"
                        options={this.state.genderList}
                        styles={styles}
                      />
                    </div>

                    <div className="form-group">
                      {this.state.country && (
                        <Select
                          className="form_select_group"
                          defaultValue={{
                            label: this.state.country,
                            value: this.state.country,
                          }}
                          value={
                            this.state.country && {
                              label: this.state.country,
                              value: this.state.country,
                            }
                          }
                          onChange={this.changeCountry}
                          filterOption={createFilter({
                            ignoreAccents: false,
                          })}
                          placeholder="Select Country"
                          options={this.state.countries}
                          styles={styles}
                        />
                      )}
                    </div>

                    <div className="form-group">
                      {this.state.stateLoading && <Loader />}
                      {this.state.country && !this.state.stateLoading && (
                        <Select
                          className="form_select_group"
                          onChange={this.changeState}
                          filterOption={createFilter({
                            ignoreAccents: false,
                          })}
                          placeholder="Select State"
                          options={this.state.countryStates}
                          value={
                            this.state.countryState && {
                              label: this.state.countryState,
                              value: this.state.countryState,
                            }
                          }
                          styles={styles}
                        />
                      )}
                    </div>
                    <div className="form-group">
                      {this.state.cityLoading && <Loader />}
                      {this.state.countryState && !this.state.cityLoading && (
                        <Select
                          className="form_select_group"
                          onChange={this.changeCity}
                          filterOption={createFilter({
                            ignoreAccents: false,
                          })}
                          placeholder="Select City"
                          options={this.state.cities}
                          value={
                            this.state.city && {
                              label: this.state.city,
                              value: this.state.city,
                            }
                          }
                          styles={styles}
                        />
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        value={this.state.password}
                        onChange={this.changePassword}
                        type="password"
                        name="password"
                        placeholder="Password"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        value={this.state.confirmPassword}
                        onChange={this.changeConfirmPassword}
                        onBlur={this.checkPassword}
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        value={this.state.zip}
                        onChange={this.changeZip}
                        type="number"
                        name="zip"
                        placeholder="Zip code - Optional"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        value={this.state.referred_by}
                        onChange={this.changeReferred}
                        type="text"
                        name="referred_by"
                        placeholder="Referred by - Optional"
                      />
                    </div>
                    <Button
                      type="submit"
                      color="inverse"
                      className="register_button"
                      size="lg"
                    >
                      {this.props.isFetching ? "Loading..." : "Create Account"}
                    </Button>
                    <p className="already">
                      Already have an account?&nbsp;
                      <span
                        className="text-center link"
                        onClick={() => {
                          this.props.dispatch(authError(""));
                          this.props.history.push("/login");
                        }}
                      >
                        Sign in
                      </span>
                    </p>
                  </form>
                </Widget>

                <div className="signup_right">
                  <h3>Turn your Followers into Customers</h3>
                  <p>
                    Staying just an influencer is not all! Turn your followers
                    into customers with just a few clicks. Create a trackable
                    link, find out what is popular, and aim to monetize on it.
                    Design your social media accordingly and become an
                    entrepreneur.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    isFetching: state.auth.isFetching,
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
  };
}
export default withRouter(connect(mapStateToProps)(Register));
