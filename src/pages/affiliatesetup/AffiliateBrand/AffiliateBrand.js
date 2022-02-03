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
      // myBrand: "",
    };
  }

  componentDidMount() {
    this.getMyBrands();
  }

  getMyBrands = async () => {
    await axios
      .get(`/affiliate/getUserBrandName`)
      .then((response) => {
        this.setState({ brand_name: response.data.data.brand_name });
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
                      <Row>
                        <Col md={12}>
                          <input
                            type="text"
                            name="brand_name"
                            placeholder="Enter Brand"
                            onInput={this.handleChange}
                            className="form-control"
                            defaultValue={this.state.brand_name}
                          />
                          <span className="text-danger col-md-12 pl-0">
                            {this.state.brandError}
                          </span>
                        </Col>
                      </Row>

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
                              className="btn-block"
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
