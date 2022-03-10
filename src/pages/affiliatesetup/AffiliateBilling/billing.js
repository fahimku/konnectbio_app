import React from "react";
import axios from "axios";
import { Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { Formik } from "formik";
import Loader from "../../../components/Loader/Loader";
import * as Yup from "yup";
// import { Input } from "reactstrap";
// import { ClassNames } from "@emotion/react";

class AffiliateBilling extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brand_name: "",
      loading: false,
      brandError: "",
      // myBrand: "",
      affiliateCheck: false,
      brandEdit: false,
      oldBrand: "",
    };
  }

  handleChange = (e) => {};
  handleSubmit = async (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <h4 className="page-title">Billing</h4>
          <div className="brand_container_main container">
            <Row>
              <div className="profile_box_main col-md-8">
                <div className="brand-section dash_block_profile">
                  <div className="dash_content_profile">
                    <form onSubmit={this.handleSubmit}>
                      <Formik
                        initialValues={{
                          legalEntity: "",
                          address: "",
                          contactPerson: "",
                        }}
                        onSubmit={(values, actions) => {
                          this.onSubmitting(values, actions);
                        }}
                      >
                        {({
                          values,
                          errors,
                          handleSubmit,
                          handleChange,
                          handleBlur,
                        }) => {
                          return (
                            <form onSubmit={handleSubmit}>
                              {/* <div className="row">
                  <div className="profile_password profile_box_main col-md-6"> */}

                              <div className="">
                                <h5>Enter Billing Information</h5>
                                <div className="dp_fields mb-0">
                                  <div className="mb-3">
                                    <label>legal Entity</label>
                                    <input
                                      type="text"
                                      name="legalEntity"
                                      placeholder="Enter legal Entity"
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
                                    <label>Address</label>
                                    <input
                                      type="text"
                                      name="address"
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      value={values.newPassword}
                                      placeholder="Enter Address"
                                      className="form-control comment-field"
                                      autoComplete="off"
                                    />
                                    <span className="text-danger">
                                      {errors.newPassword}
                                    </span>
                                  </div>
                                  <div className="mb-0">
                                    <label>Contact Person</label>
                                    <input
                                      type="text"
                                      name="contactPerson"
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      value={values.changepassword}
                                      placeholder="Enter Contact Person"
                                      className="form-control comment-field"
                                      autoComplete="off"
                                    />
                                    <span className="text-danger">
                                      {errors.changepassword}
                                    </span>
                                  </div>
                                  <div className="pr-sv-btn mt-3">
                                    {this.state.loading ? (
                                      <Button type="submit" color="default">
                                        <Loader />
                                      </Button>
                                    ) : (
                                      <Button type="submit" color="default">
                                        Save
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* </div>
                </div> */}
                            </form>
                          );
                        }}
                      </Formik>
                    </form>
                  </div>
                </div>
              </div>
            </Row>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default AffiliateBilling;
