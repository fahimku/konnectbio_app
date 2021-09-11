import axios from "axios";
import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import {withRouter, Link} from "react-router-dom";
import {connect} from "react-redux";
import {Container, Alert, Button} from "reactstrap";
import Widget from "../../../components/Widget";
import {registerUser, authError} from "../../../actions/auth";

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
      country: "",

      city: "",
      password: "",
      confirmPassword: "",
    };

    this.doRegister = this.doRegister.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changeCountry = this.changeCountry.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeConfirmPassword = this.changeConfirmPassword.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.isPasswordValid = this.isPasswordValid.bind(this);
  }

  async componentDidMount() {
    await this.getCountries();
  }

  getCountries = async () => {
    await axios
      .post(`/common/receive/countries`)
      .then((response) => {
        const selectCountries = [];

        const countries = response.data.message;
        countries.map(({name, selected}) => {
          selectCountries.push({value: name, label: name});
          if (selected) {
            this.setState({country: name});
          }
        });
        this.setState({countries: selectCountries});
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  changeName(event) {
    this.setState({name: event.target.value});
  }

  changeEmail(event) {
    this.setState({email: event.target.value});
  }

  changeCountry(event) {
    this.setState({country: event.value});
  }

  changePassword(event) {
    this.setState({password: event.target.value});
  }

  changeConfirmPassword(event) {
    this.setState({confirmPassword: event.target.value});
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
          country: this.state.country,
          city: "karachi",
          password: this.state.password,
        })
      );
    }
  }

  render() {
    return (
      <div className="auth-page">
        <Container>
          <h5 className="auth-logo">
            <i className="la la-circle text-gray" />
            KONNECT BIO
            <i className="la la-circle text-warning" />
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
                {this.state.country ? (
                  <Select
                    onChange={this.changeCountry}
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
            <Link className="d-block text-center" to="login">
              Login
            </Link>
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
