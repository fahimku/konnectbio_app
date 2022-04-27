import React from "react";
import axios from "axios";
import { Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader/Loader";
import { DropdownButton, InputGroup, Dropdown, FormControl } from 'react-bootstrap';
// import { Input } from "reactstrap";
// import { ClassNames } from "@emotion/react";

class AffiliateBrand extends React.Component {
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
      brandDiscount: "0",
      discount_type: "%"
    };
  }

  componentDidMount() {
    this.getMyBrands();
  }

  getMyBrands = async () => {
    await axios
      .get(`/affiliate/getUserBrandName`)
      .then((response) => {
        this.setState({
          oldBrand: response?.data?.data?.brand_name,
          brand_name: response?.data?.data?.brand_name,
          is_affiliate_enabled: response?.data?.data?.is_affiliate_enabled,
          affiliateCheck: response?.data?.data?.is_affiliate_enabled,
          brandDiscount: response?.data?.data?.website_discount,
          discount_type: response?.data?.data?.discount_type || "%"
        });
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };

  handleChange = (e) => {
    this.setState({
      brand_name: e.target.value,
      brandError: "",
    });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.state.brand_name === "") {
      this.setState({
        brandError: "Enter brand name",
      });
    } else {
      this.setState({ loading: true });
      await axios
        .post(`/affiliate/createAndUpdateBrandName`, {
          brand_name: this.state.brand_name,
          is_affiliate_enabled: this.state.affiliateCheck,
          website_discount: this.state.brandDiscount,
          discount_type: this.state.discount_type
        })
        .then((response) => {
          this.setState({
            loading: false,
            brandEdit: false,
            checkDisabled: undefined,
          });
          toast.success(response.data.message);
          this.getMyBrands();
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          this.setState({
            loading: false,
            brandError: err.response.data.message,
          });
        });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <h4 className="page-title">Brand</h4>
          <div className="brand_container_main container">
            <Row>
              <div className="profile_box_main col-md-8">
                <div className="brand-section dash_block_profile">
                  <div className="dash_content_profile">
                    <form onSubmit={this.handleSubmit}>
                      <h5>Enter Brand Name</h5>
                      <Row className="brandrow">
                        <Col xs={4}>
                          <span>Brand Name:</span>
                        </Col>
                        <Col xs={8}>
                          {!this.state.brandEdit ? (
                            <>
                              <div className="row">
                                <Col xs={4}>
                                  <span className="float-left">
                                    {this.state.brand_name ? (
                                      this.state.brand_name
                                    ) : (
                                      <Loader />
                                    )}
                                  </span>
                                </Col>
                                <Col xs={8}>
                                  {this.state.brand_name ? (
                                    <i
                                      onClick={() => {
                                        this.setState({
                                          brandEdit: true,
                                          checkDisabled:
                                            !this.state.checkDisabled,
                                        });
                                      }}
                                      className="fa fa-pencil edit-icon"
                                      title="Edit"
                                    ></i>
                                  ) : null}
                                </Col>
                              </div>
                            </>
                          ) : (
                            <div className="row brandInput">
                              <Col xs={4}>
                                <span>
                                  <input
                                    type="text"
                                    name="brand_name"
                                    placeholder="Enter Brand"
                                    onInput={this.handleChange}
                                    className="form-control"
                                    defaultValue={this.state.brand_name}
                                  />
                                </span>
                                {this.state.brandError && (
                                  <span className="text-danger pl-0 error-brand">
                                    {this.state.brandError}
                                  </span>
                                )}
                              </Col>
                              <Col xs={8}>
                                <i
                                  onClick={() => {
                                    this.setState({
                                      brandEdit: false,
                                      checkDisabled: !this.state.checkDisabled,
                                      brand_name: this.state.oldBrand,
                                    });
                                  }}
                                  className="fa fa-times-circle-o edit-icon"
                                  title="Reset"
                                ></i>
                              </Col>
                            </div>
                          )}
                        </Col>
                      </Row>
                      {this.state.brand_name ? (
                        <>
                          <Row className="brandrow">
                            <Col xs={4}>
                              <span>
                                {this.state.affiliateCheck
                                  ? "Disabled "
                                  : "Enable "}
                                Affiliate:
                              </span>
                            </Col>
                            <Col xs={8}>
                              <div className="form-check custom-switch custom-switch-md">
                                <input
                                  type="checkbox"
                                  defaultChecked={
                                    this.state.is_affiliate_enabled
                                  }
                                  className="custom-control-input"
                                  id={`customSwitch`}
                                  readOnly
                                  onChange={(e) => {
                                    this.setState({
                                      affiliateCheck: e.target.checked,
                                      checkDisabled: !this.state.checkDisabled,
                                    });
                                  }}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor={`customSwitch`}
                                ></label>
                              </div>
                            </Col>
                          </Row>
                          <Row className="brandrow align-items-center">
                            <Col xs={4}>
                              <span>Website Discount:</span>
                            </Col>
                            <Col xs={8}>
                              <div className="row brandInput demographic-section">
                                <Col xs={5}>
                                  <div className="input-group">

                                    {/* <span class="input-group-text">%</span> */}
                                    <InputGroup size="sm" className="">

                                      <input
                                        type="number"
                                        id="discount"
                                        name="discount"
                                        // style={{marginRight:"15px"}}
                                        className="form-control mrpx-5"
                                        // placeholder="Enter Discount"
                                        value={this.state.brandDiscount}
                                        onChange={(e) => {
                                          if (e.target.value <= 100) {
                                            this.setState({
                                              brandDiscount: e.target.value,
                                              checkDisabled:
                                                !this.state.checkDisabled,
                                            });
                                          } else {
                                            this.setState({
                                              checkDisabled:
                                                !this.state.checkDisabled,
                                            });
                                          }
                                        }}
                                        autoComplete="off"
                                        onKeyDown={(evt) =>
                                          ["e", "E", "+", "-"].includes(
                                            evt.key
                                          ) && evt.preventDefault()
                                        }
                                        min="0"
                                        max="100"
                                      />
                                      <DropdownButton size="sm" className="drop-style-new"
                                        variant="outline-secondary"
                                        title={this.state.discount_type}
                                        id="input-group-dropdown-1"
                                      >
                                        <Dropdown.Item onClick={() => this.setState({ discount_type: "$", checkDisabled: !this.state.checkDisabled })}>$</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.setState({ discount_type: "%", checkDisabled: !this.state.checkDisabled })}>%</Dropdown.Item>
                                        {/* <Dropdown.Divider /> */}

                                      </DropdownButton><span class="text-align">OFF</span>
                                    </InputGroup>


                                  </div>
                                </Col>
                              </div>
                            </Col>
                          </Row>
                        </>
                      ) : null}

                      <Row>
                        <Col md={5} xl={3}>
                          {this.state.loading ? (
                            <Button>
                              <Loader />
                            </Button>
                          ) : (
                            <Button
                              color="default"
                              type="submit"
                              className="btn-block mt-3"
                              disabled={
                                // !this.state.brandEdit ||
                                this.state.checkDisabled === undefined
                                  ? true
                                  : false
                              }
                            >
                              Save
                            </Button>
                          )}
                        </Col>
                      </Row>
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
export default AffiliateBrand;
