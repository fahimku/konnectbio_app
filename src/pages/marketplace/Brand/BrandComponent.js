import React from "react";
import axios from "axios";
import { Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
//import AsyncSelectField from "./AsyncSelectField";
import Loader from "../../../components/Loader/Loader";
import Select from 'react-select';

class BrandComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      type: this.props.type,
      selectedBrands: [],
      brand: [],
      brandList: [],
      loading: false,
      brandLoading: true,
      myBrand: [],
    };
  }

  componentDidMount() {
    this.fetchMyBrand();
    this.brandList();
  }

  brandList = async (value) => {
    await axios.post("users/marketPlace/brands")
      .then((response) => {
        const loadBrand = [];
        const brands = response.data.message;
        brands.map(({ brand_id, brand_name }) => {
          return loadBrand.push({
            value: brand_id,
            label: brand_name,
          });
        });
        this.setState({ brandList: loadBrand });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  handleMultiSelect = (e, options) => {
    this.setState({
      selectedBrands: options,
    });
  };


  fetchMyBrand = async () => {
    await axios
      .post("/users/marketPlace/getUserBrands")
      .then((response) => {
        const selectBrands = [];
        const myBrands = response.data.data;
        myBrands.map(({ brand_id, brand_name }) => {
          return selectBrands.push({
            value: brand_id,
            label: brand_name,
          });
        });
        this.setState({ myBrand: selectBrands, brands: selectBrands });
        this.setState({selectedBrands: selectBrands})
        this.setState({ brandLoading: false }, () => {
        //this.props.brandTab(this.state.myBrand, this.state.brandLoading);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    let brand = this.state.selectedBrands.map((brand) => {
      return brand.value;
    });

    this.setState({ loading: true });
    await axios
      .post(`/users/marketPlace/updateUserBrands`, {
        user_brands: brand,
      })
      .then((response) => {
        this.setState({
          loading: false,
        });
        this.fetchMyBrand();
        toast.success(response.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        this.setState({ loading: false });
      });
  };

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <h4 className="page-title">{this.state.title}</h4>
          <div className="brand_container_main">
            <Row>
              <div className="profile_box_main col-md-6 col-sm-6 col-lg-6 col-xl-4">
                <div className="brand-section dash_block_profile">
                  <div className="dash_content_profile">
                    <form onSubmit={this.handleSubmit}>
                      <h5>Select Brands</h5>
                      <Row>
                        <Col md={12}>
                          {this.state.brandLoading ? (
                            <Loader />
                          ) : (
                            <React.Fragment>
                              <Select
                                defaultValue={this.state.myBrand}
                                isMulti
                                name="brands"
                                options={this.state.brandList}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={(options, e) => this.handleMultiSelect(e, options)}
                              />
                              {/* <AsyncSelectField
                                name="brand"
                                placeholder="Search By Brand"
                                getBrand={this.getBrand}
                                defaultValue={this.state.myBrand}
                              />
                            */}
                              {this.state.brands.length === 0 ? (
                                <span className="text-danger mt-2">
                                  Please select brands to unlock marketplace.
                                </span>
                              ) : null}
                            </React.Fragment>
                          )}
                        </Col>
                      </Row>

                      <Row>
                        <Col md={5} xl={3}>
                          <Button
                            variant="primary"
                            type="submit"
                            className="btn-block mt-3"
                            disabled={!this.state.loading ? false : true}
                          >
                            Save
                          </Button>
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
export default BrandComponent;