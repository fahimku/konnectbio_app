import React from "react";
import axios from "axios";
import { Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader/Loader";

class AffiliateBrand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brand_name: "",
      loading: false,
      brandError: "",
      myBrand: "",
    };
  }

  componentDidMount() {
    this.getMyBrands();
  }

  getMyBrands = async () => {
    await axios
      .get(`/affiliate/getUserBrandName`)
      .then((response) => {
        this.setState({ myBrand: response.data.data.brand_name });
      })
      .catch(function (error) {
        console.log(error);
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
        brandError: "Please enter your brand name",
      });
    } else {
      this.setState({ loading: true });
      await axios
        .post(`/affiliate/createAndUpdateBrandName`, {
          brand_name: this.state.brand_name,
        })
        .then((response) => {
          this.setState({ loading: false });
          toast.success(response.data.message);
          this.getMyBrands();
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          this.setState({ loading: false, brandError: "" });
        });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="profile-page account-setup">
          <div
            className={
              this.props.className ? this.props.className : "container-fluid"
            }
          >
            <div className="row">
              <div class="col-md-12">
                <h4 class="page-title">Brand</h4>
              </div>
            </div>
            <div className="profile_container_main container">
              <div className="row">
                <div className="profile_box_main col-md-6">
                  <div className="dash_block_profile">
                    <div className="dash_content_profile">
                      <form onSubmit={this.handleSubmit}>
                        <div className="dp_fields mb-0">
                          <h5>Enter Brand Name</h5>
                          <div className="row">
                            <div className="col-md-9 brand-input">
                              <input
                                type="text"
                                name="brand_name"
                                placeholder="Enter Brand"
                                onInput={this.handleChange}
                                className="form-control"
                                defaultValue={this.state.myBrand}
                              />
                            </div>

                            <div className="col-md-3 brand-button">
                              {this.state.loading ? (
                                <Button>
                                  <Loader />
                                </Button>
                              ) : (
                                <Button
                                  color="default"
                                  type="submit"
                                  className="btn-block"
                                >
                                  Save
                                </Button>
                              )}
                            </div>
                            <span className="text-danger col-md-12">
                              {this.state.brandError}
                            </span>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default AffiliateBrand;
