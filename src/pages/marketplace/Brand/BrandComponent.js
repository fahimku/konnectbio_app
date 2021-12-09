import React from "react";
import axios from "axios";
import Select from "react-select";
import { Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";

class BrandComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      type: this.props.type,
    };
  }

  componentDidMount() {}

  getPackages = async () => {
    await axios
      .get(`/package/receive`)
      .then((response) => {
        const selectPackages = [];
        const packages = response.data.message;
        packages.map(({ package_id, package_name, package_amount }) => {
          return selectPackages.push({
            value: package_id,
            label: package_name,
          });
        });
        this.setState({ packages: selectPackages });
      })
      .catch(function (error) {
        console.log(error);
      });
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
                        <Select
                          isMulti={true}
                          name="category"
                          className="selectCustomization"
                          options={this.state.myCategory}
                          value={this.state.saveCategories}
                          placeholder="Select Brand"
                          onChange={(options, e) =>
                            this.handleSelect(e, options)
                          }
                        />

                        <span className="text-danger">
                          {this.state.categoryError}
                        </span>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={5} xl={3}>
                        <Button
                          variant="primary"
                          type="submit"
                          className="btn-block mt-3"
                          // disabled={
                          //   this.state.saveCategories.length &&
                          //   !this.state.loading
                          //     ? false
                          //     : true
                          // }
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
