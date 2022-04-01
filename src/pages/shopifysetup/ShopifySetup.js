import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import * as shopifyActions from "../../actions/shopifySetup";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";

function ShopifySetup({ getShopifyDetail, shopifyDetail }) {
  const [saveloading, setSaveLoading] = useState(false);
  const [data, setData] = useState("");
  const [ShopifyLoading, setShopifyLoading] = useState(true);
  const [type, setType] = useState("password");

  useEffect(() => {
    // getShopifyDetail();
    getShopifyDetail().then(() => {
      setShopifyLoading(false);
    });
  }, []);

  React.useEffect(() => {
    console.log(shopifyDetail, "shopifyDetail");
    setData(shopifyDetail.shopify);
  }, [shopifyDetail]);

  // const getShopifyDetail = async () => {
  //   await axios
  //     .get("users/receive/shopify")
  //     .then((response) => {
  //       const shopifyData = response.data.message;
  //       setData(shopifyData.shopify);
  //       setShopifyLoading(false);
  //     })
  //     .catch(function (error) {
  //       console.log(error.response);
  //       setShopifyLoading(false);
  //     });
  // };

  const onSubmitting = async (values, actions) => {
    console.log(values, "values");
    setSaveLoading(true);
    await axios
      .post(`/users/revise/shopify`, values)
      .then((response) => {
        setSaveLoading(false);
        let res = response.data;
        toast.success("Shopify Credential Added!");
        getShopifyDetail();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setSaveLoading(false);
      });
    // setTimeout(() => {
    //   actions.setSubmitting(false);
    //   actions.resetForm();
    // }, 400);
  };
  const Schema = Yup.object().shape({
    shopName: Yup.string().required("This field is required"),
    apiKey: Yup.string().required("This field is required"),
    password: Yup.string().required("This field is required"),
  });
  const showHide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setType(type === "input" ? "password" : "input");
  };
  console.log(data, "data");

  return (
    <React.Fragment>
      <div className="container-fluid mt-4">
        <h4 className="page-title">Shopify Setup</h4>
        <div className="brand_container_main container">
          <Row>
            <div className="profile_box_main col-md-8">
              <div className="brand-section dash_block_profile">
                <div className="dash_content_profile">
                  {!ShopifyLoading && (
                    <Row className="shopify_heading">
                      <div className="col-md-8 col-7">
                        <h5>Enter Shopify Detail</h5>
                      </div>
                      <div className="col-md-4 col-5">
                        {data ? (
                          <span class="connection-status-badge-green connection">
                            Connected
                          </span>
                        ) : (
                          <span class="connection-status-badge-red connection">
                            Not Connected
                          </span>
                        )}
                      </div>
                    </Row>
                  )}

                  {!ShopifyLoading ? (
                    <Formik
                      initialValues={{
                        shopName: data?.shop_name,
                        apiKey: data?.api_key,
                        password: data?.password,
                      }}
                      validationSchema={Schema}
                      onSubmit={(values, actions) => {
                        onSubmitting(values, actions);
                      }}
                    >
                      {({
                        values,
                        errors,
                        handleSubmit,
                        handleChange,
                        // handleBlur,
                      }) => {
                        return (
                          <form onSubmit={handleSubmit}>
                            <div className="dp_fields mb-0">
                              <div className="mb-3">
                                <label>Enter Shop Name</label>
                                <input
                                  type="text"
                                  name="shopName"
                                  placeholder="Enter Shop Name"
                                  onInput={handleChange}
                                  className="form-control comment-field"
                                  // onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.shopName}
                                  autoComplete="off"
                                />
                                <span className="text-danger">
                                  {errors.shopName}
                                </span>
                              </div>
                              <div className="mb-3">
                                <label>Enter API Key</label>
                                <input
                                  type="text"
                                  name="apiKey"
                                  // onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.apiKey}
                                  placeholder="Enter API Key"
                                  className="form-control comment-field"
                                  autoComplete="off"
                                />
                                <span className="text-danger">
                                  {errors.apiKey}
                                </span>
                              </div>
                              <div className="mb-0 password-box password-api">
                                <label>Enter API Secret Key</label>
                                <input
                                  type={type}
                                  name="password"
                                  // onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.password}
                                  placeholder="Enter API Secret Key"
                                  className="form-control comment-field"
                                  autoComplete="off"
                                />
                                <span
                                  className="password_show"
                                  onClick={showHide}
                                >
                                  {type === "input" ? (
                                    <span class="glyphicon glyphicon-eye-open"></span>
                                  ) : (
                                    <span class="glyphicon glyphicon-eye-close"></span>
                                  )}
                                </span>
                                <span className="text-danger">
                                  {errors.password}
                                </span>
                              </div>
                              <div className="pr-sv-btn mt-3">
                                {saveloading ? (
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
                          </form>
                        );
                      }}
                    </Formik>
                  ) : (
                    <Loader />
                  )}
                </div>
              </div>
            </div>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
}
function mapStateToProps({ shopifyDetail }) {
  return { shopifyDetail };
}
// export default ShopifySetup;
export default connect(mapStateToProps, { ...shopifyActions })(ShopifySetup);
