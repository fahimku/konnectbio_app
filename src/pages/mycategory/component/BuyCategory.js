import React from "react";
import { Col, Button, Modal } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader/Loader";

class BuyCategory extends React.Component {
  state = {
    buySelectedCategory: "",
  };

  handleBuySelect = (e, options) => {
    this.setState({
      buySelectedCategory: options,
    });
  };

  buyCategory = async (e) => {
    e.preventDefault();
    alert(this.state.buySelectedCategory.value);
  };

  render() {
    return (
      <>
        <form onSubmit={this.buyCategory}>
          <p
            style={{
              color: "gray",
              borderBottom: "1px solid lightgray",
              paddingBottom: 10,
            }}
          >
            Buy Additional Categories
          </p>
          <Row>
            <Col md={12}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <label>No. of category</label>
              </div>

              <Select
                name="category"
                className="selectCustomization"
                options={buyCategory}
                value={this.state.buySelectedCategory}
                placeholder="Select No. of Category"
                onChange={(options, e) => this.handleBuySelect(e, options)}
              />
            </Col>
          </Row>

          <Row>
            <Col md={12} xl={12}>
              <Button
                variant="primary"
                type="submit"
                className="category-btn btn-block mt-2"
              >
                Upgrade Category
              </Button>
            </Col>
          </Row>
        </form>
      </>
    );
  }
}
export default BuyCategory;
