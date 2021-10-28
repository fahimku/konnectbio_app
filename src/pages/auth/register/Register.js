import axios from "axios";
import React from "react";
import Select, { createFilter } from "react-select";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Alert, Button } from "reactstrap";
import Widget from "../../../components/Widget";
import { registerUser, authError } from "../../../actions/auth";
import logo from "../../../images/logo.svg";

class Register extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      countries: "",
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
    };

    this.doRegister = this.doRegister.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changeGender = this.changeGender.bind(this);
    this.changeUserType = this.changeUserType.bind(this);
    this.changeCountry = this.changeCountry.bind(this);
    this.changeCity = this.changeCity.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeConfirmPassword = this.changeConfirmPassword.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.isPasswordValid = this.isPasswordValid.bind(this);
  }

  async componentDidMount() {
    await this.getCountries();
    await this.getCities();
    await this.getPackages();
  }

  getCities = async () => {
    await axios
      .post(`/common/receive/cities`, { country_code: this.state.countryCode })
      .then((response) => {
        const selectCities = [];
        const cities = response.data.message;
        cities.map(({ name }) => {
          return selectCities.push({ value: name, label: name });
        });
        this.setState({ cities: selectCities });
        // this.setState({  })
      })
      .catch(function (error) {
        console.log(error);
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
          }
          this.setState({ country: "Pakistan", countryCode: "PK" });
          return selectCountries.push({ value: code1, label: name });
        });
        this.setState({ countries: selectCountries });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  getPackages = async () => {
    await axios
      .get(`/package/receive`)
      .then((response) => {
        const selectPackages = [];
        const packages = response.data.message;
        packages.map(({ package_id, package_name, package_amount }) => {
          return selectPackages.push({
            value: package_id,
            label: package_name + " ($" + package_amount + ")",
          });
        });
        this.setState({ packages: selectPackages });
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
    this.setState({ country: event.value, countryCode: event.value });
    setTimeout(() => {
      this.getCities();
    }, 500);
  }

  changeCity(event) {
    // console.log(event);
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
        this.props.dispatch(authError("Passwords are not equal"));
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

  doRegister(e) {
    e.preventDefault();
    if (!this.isPasswordValid()) {
      this.checkPassword();
    } else {
      this.props.dispatch(
        registerUser({
          name: this.state.name,
          email: this.state.email,
          gender: this.state.gender,
          package_id: this.state.packageType.value,
          country: this.state.countryCode,
          city: this.state.city,
          password: this.state.password,
        })
      );
    }
  }

  changePackage = (e, options) => {
    this.setState({
      packageType: options,
    });
  };

  render() {
    console.log(this.state.countryCode, "packageType");
    return (
      <div className="auth-page">
        <Container>
          <h5 className="auth-logo">
            <img className="logo" src={logo} alt="logo" />
          </h5>
          <Widget
            className="widget-auth mx-auto"
            title={<h3 className="mt-0">Create an account</h3>}
          >
            <form className="mt" onSubmit={this.doRegister}>
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
                  required
                  name="name"
                  placeholder="Name"
                />
              </div>
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

              <div className="form-group">
                <Select
                  onChange={this.changeGender}
                  placeholder="Select Gender"
                  options={this.state.genderList}
                />
              </div>
              <div className="form-group">
                <Select
                  onChange={(options, e) => this.changePackage(e, options)}
                  placeholder="Select Package"
                  options={this.state.packages}
                />
              </div>
              <div className="form-group">
                {this.state.country ? (
                  <Select
                    onChange={this.changeCountry}
                    filterOption={createFilter({ ignoreAccents: false })}
                    placeholder="Select Country"
                    options={this.state.countries}
                    defaultValue={{
                      label: this.state.country,
                      value: this.state.country,
                    }}
                  />
                ) : (
                  ""
                )}
              </div>
              <div className="form-group">
                {this.state.country ? (
                  <Select
                    onChange={this.changeCity}
                    filterOption={createFilter({ ignoreAccents: false })}
                    placeholder="Select City"
                    options={this.state.cities}
                    // value={{
                    //   label: this.state.city,
                    //   value: this.state.city,
                    // }}
                  />
                ) : (
                  ""
                )}
              </div>
              <div className="form-group">
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
              <div className="form-group">
                <input
                  className="form-control"
                  value={this.state.confirmPassword}
                  onChange={this.changeConfirmPassword}
                  onBlur={this.checkPassword}
                  type="password"
                  required
                  name="confirmPassword"
                  placeholder="Confirm"
                />
              </div>
              <Button
                type="submit"
                color="inverse"
                className="auth-btn mb-3"
                size="sm"
              >
                {this.props.isFetching ? "Loading..." : "Register"}
              </Button>
            </form>
            <p className="widget-auth-info">
              Already have the account? Login now!
            </p>
            <span
              className="d-block text-center link"
              onClick={() => {
                this.props.history.push("/login");
              }}
            >
              Login
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
    errorMessage: state.auth.errorMessage,
  };
}
export default withRouter(connect(mapStateToProps)(Register));
