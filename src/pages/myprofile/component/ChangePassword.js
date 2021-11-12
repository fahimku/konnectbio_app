import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader/Loader";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory({
  forceRefresh: false,
});

class ChangePassword extends React.Component {
  state = {
    loading: false,
    pass_modal: false,
  };

  onSubmitting = async (values, actions) => {
    delete values.changepassword;

    this.setState({ loading: true });
    await axios
      .put(`/users/revise/userpassword/${this.props.userID}`, values)
      .then((response) => {
        this.setState({ loading: false });
        let passwordResponse = response.data;

        toast.success(passwordResponse.message);
        history.push("/logout");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        this.setState({ loading: false });
      });
    setTimeout(() => {
      actions.setSubmitting(false);
      actions.resetForm();
    }, 400);
  };

  passwordToggleModal = () => {
    const { pass_modal } = this.state;
    this.setState({
      pass_modal: !pass_modal,
    });
  };

  passwordModal = () => {
    const Schema = Yup.object().shape({
      currentPassword: Yup.string().required("This field is required"),
      newPassword: Yup.string().required("This field is required"),
      changepassword: Yup.string()
        .required("This field is required")
        .when("newPassword", {
          is: (val) => (val && val.length > 0 ? true : false),
          then: Yup.string().oneOf(
            [Yup.ref("newPassword")],
            "Both password need to be the same"
          ),
        }),
    });
    return (
      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
          changepassword: "",
        }}
        validationSchema={Schema}
        onSubmit={(values, actions) => {
          this.onSubmitting(values, actions);
        }}
      >
        {({ values, errors, handleSubmit, handleChange, handleBlur }) => {
          return (
            <form onSubmit={handleSubmit} className="white-box">
              <Row className="mb-3">
                <Col md={12}>
                  <label>Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    placeholder="Enter Current Password"
                    onInput={this.handleChange}
                    className="form-control comment-field"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.currentPassword}
                    autoComplete="off"
                  />
                  <span className="text-danger">
                    {errors.currentPassword}
                  </span>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={12}>
                  <label for="passowrd">Enter New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.newPassword}
                    placeholder="Enter New Password"
                    className="form-control comment-field"
                    autoComplete="off"
                  />
                  <span className="text-danger">{errors.newPassword}</span>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={12}>
                  <label for="passowrd">Confirm Password</label>
                  <input
                    type="password"
                    name="changepassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.changepassword}
                    placeholder="Enter Confirm Password"
                    className="form-control comment-field"
                    autoComplete="off"
                  />
                  <span className="text-danger">{errors.changepassword}</span>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={12} className="update-col">
                  {this.state.loading ? (
                    <Button>
                      <Loader />
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      type="submit"
                      className="category-btn btn-block "
                    >
                      Change Password
                    </Button>
                  )}
                </Col>
              </Row>
            </form>
          );
        }}
      </Formik>

    );
  };

  render() {
    const Schema = Yup.object().shape({
      currentPassword: Yup.string().required("This field is required"),
      newPassword: Yup.string().required("This field is required"),
      changepassword: Yup.string()
        .required("This field is required")
        .when("newPassword", {
          is: (val) => (val && val.length > 0 ? true : false),
          then: Yup.string().oneOf(
            [Yup.ref("newPassword")],
            "Both password need to be the same"
          ),
        }),
    });
    return (
      <>
        <Formik
          initialValues={{
            currentPassword: "",
            newPassword: "",
            changepassword: "",
          }}
          validationSchema={Schema}
          onSubmit={(values, actions) => {
            this.onSubmitting(values, actions);
          }}
        >
          {({ values, errors, handleSubmit, handleChange, handleBlur }) => {

            return (
              <form onSubmit={handleSubmit} className="white-box">
                <div className="row">
                  <div className="profile_password profile_box_main col-md-6">
                    <div className="dash_block_profile">
                      <div className="dash_content_profile">
                        <h5>Change Password</h5>
                        <div className="dp_fields mb-0">
                          <div className="mb-3">
                            <label>Enter Old Password</label>
                            <input
                              type="password"
                              name="currentPassword"
                              placeholder="Enter Current Password"
                              onInput={this.handleChange}
                              className="form-control comment-field"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.currentPassword}
                              autoComplete="off"
                            />
                            <span className="text-danger">
                              {errors.currentPassword}
                            </span>
                          </div>
                          <div className="mb-3">
                            <label>Enter New Password</label>
                            <input
                              type="password"
                              name="newPassword"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.newPassword}
                              placeholder="Enter New Password"
                              className="form-control comment-field"
                              autoComplete="off"
                            />
                            <span className="text-danger">{errors.newPassword}</span>
                          </div>
                          <div className="mb-0">
                            <label>Confirm Password</label>
                            <input
                              type="password"
                              name="changepassword"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.changepassword}
                              placeholder="Enter Confirm Password"
                              className="form-control comment-field"
                              autoComplete="off"
                            />
                            <span className="text-danger">{errors.changepassword}</span>
                          </div>
                          <div className="pr-sv-btn mt-3">
                            {/* <Button
                              type="button"
                              color="default"
                              className="select-image"
                            >
                              <label htmlFor="fileupload2">Save</label>
                            </Button> */}

                            {this.state.loading ? (
                              <Button
                                type="submit"
                                color="default"

                              >
                                <Loader />
                              </Button>
                            ) : (
                              <Button
                                type="submit"
                                color="default"

                              >
                                <label htmlFor="">Save</label>
                              </Button>
                            )}
                            <Button
                              type="button"
                              color="default"
                              className="select-image"
                            >
                              <label htmlFor="fileupload2">Cancel</label>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            );
          }}
        </Formik>
      </>
    );
  }
}
export default ChangePassword;