import React from "react";
import axios from "axios";
import { Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import AsyncSelectField from "./AsyncSelectField";
import Loader from "../../../components/Loader/Loader";

class BrandComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      type: this.props.type,
      brands: [],
      loading: false,
      brandLoading: true,
      myBrand: [],
    };
  }

  componentDidMount() {
    this.fetchMyBrand();
  }
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
        this.props.brandTab(this.state.myBrand);
        this.setState({ brandLoading: false });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    let brand = this.state.brands.map((brand) => {
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
  getBrand = (options) => {
    this.setState({ brands: options });
  };

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <h4 className="page-title">{this.state.title}</h4>
          <Row>
            <div className="profile_box_main col-md-6">
              <div className="brand-section dash_block_profile">
                <div className="dash_content_profile">
                  <form onSubmit={this.handleSubmit}>
                    <h5>Select Brands</h5>
                    <Row>
                      <Col md={12}>
                        {this.state.brandLoading ? (
                          <Loader />
                        ) : (
                          <AsyncSelectField
                            name="brand"
                            placeholder="Search By Brand"
                            getBrand={this.getBrand}
                            defaultValue={this.state.myBrand}
                          />
                        )}
                      </Col>
                      {this.state.brands.length === 0 ? (
                        <span className="text-danger col-md-12 mt-2">
                          Please select brands to unlock marketplace.
                        </span>
                      ) : null}
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
      </React.Fragment>
    );
  }
}
export default BrandComponent;
