import React from "react";
import axios from "axios";
import { route } from "react-router";
import { Link } from "react-router-dom";
import s from "./ErrorPage.module.scss";
import Select from "react-select";
import { Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import placeholder from "../../../src/images/placeholder.svg";

const userInfo = JSON.parse(localStorage.getItem("userInfo"));
// const packagesInfo = JSON.parse(localStorage.getItem("packages"));

class MyCategory extends React.Component {
  state = {
    myCategory: "",
    user_id: "",
    category: [],
    defaultCategory: "",
    saveCategories: "",
    categoryError: "",
  };

  componentDidMount() {
    this.setState({ user_id: userInfo.user_id });
    this.fetchMyCategory();
    this.fetchSaveCategory();
  }

  fetchMyCategory = async () => {
    await axios
      .get("/category/receive")
      .then((response) => {
        const selectCategories = [];
        const mycategories = response.data.message;
        mycategories.map(({ category_id, category_name, image_url }) => {
          selectCategories.push({
            value: category_id,
            label: category_name,
            image: image_url,
          });
        });
        this.setState({ myCategory: selectCategories });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  fetchSaveCategory = async () => {
    await axios
      .get(`/users/receive/categories?id=${userInfo.user_id}`)
      .then((response) => {
        const saveCategories = [];
        const mycategories = response.data.message;
        const optioncategories = response.data.message;
        optioncategories.map(({ category_id, category_name, image_url }) => {
          saveCategories.push({
            value: category_id,
            label: category_name,
            image: image_url,
          });
        });
        this.setState({
          // defaultCategory: mycategories,
          saveCategories: saveCategories,
        });
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  handleSelect = (e, options) => {
    options = options === null ? [] : options;
    if (options.length > userInfo.package.category_count) {
      this.setState({
        saveCategories: options,
      });
      options.pop();
      this.setState({
        saveCategories: options,
        categoryError: `You have only ${userInfo.package.category_count} categories allowed in this plan`,
      });
    } else {
      this.setState({
        saveCategories: options === null ? [] : options,
        categoryError: "",
      });
    }
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    let category =
      this.state.saveCategories === null
        ? []
        : this.state.saveCategories.map((category) => {
            return category.value;
          });
    console.log(this.state.saveCategories, "sds");
    // if (category.length === 0) {
    //   this.setState({ categoryError: "Please Select Category" });
    // } else if (category.length < userInfo.package.category_count) {
    //   this.setState({
    //     categoryError: "You have only 3 categories allowed in this plan",
    //   });
    // } else {
    await axios
      .put(`/users/revise/categories/${userInfo.user_id}`, {
        categories: category,
      })
      .then((response) => {
        let categoryResponse = response.data;
        if (categoryResponse.success) {
          toast.success(categoryResponse.message);
          this.setState({ categoryError: "" });
          this.fetchSaveCategory();
        }
      })
      .catch((err) => {
        console.log(err.response, "err");
        this.setState({ categoryError: err.response.data.message });
      });
    // }
  };

  render() {
    // console.log(this.state.saveCategories, "saveCategories");
    console.log(this.state.saveCategories, "saveCategories");

    return (
      <div className="category-page">
        <div className="container">
          <div className="justify-content-md-center">
            <div className="white-box mt-5">
              <h5 className="page-title line-heading">Current Plan</h5>
              <Row>
                <Col md={8}>
                  <h3 className="package_name">
                    {userInfo.package.package_name}
                  </h3>
                  <div className="category_count">
                    You have only {userInfo.package.category_count} categories
                    allowed in this plan
                  </div>
                </Col>
                <Col md={4} className="text-right">
                  <Button variant="primary" className="btn-block">
                    Upgrade Plan
                  </Button>
                </Col>
              </Row>
            </div>

            <Row className="mt-4">
              <Col md={12}>
                <h4 className="page-title">My Categories</h4>
              </Col>
            </Row>

            <form onSubmit={this.handleSubmit} className="white-box">
              <Row>
                <Col md={8}>
                  <label>Select Category: </label>
                  {this.state.saveCategories === "" ? null : (
                    <Select
                      isMulti={true}
                      name="category"
                      className="selectCustomization"
                      options={this.state.myCategory}
                      // value={this.state.defaultCategory}
                      // defaultValue={this.state.defaultCategory}
                      defaultValue={this.state.saveCategories}
                      placeholder="Select Category"
                      onChange={(options, e) => this.handleSelect(e, options)}
                    />
                  )}
                  <span className="text-danger">
                    {this.state.categoryError}
                  </span>
                  <Row>
                    {this.state.saveCategories.length === 0 ? (
                      <span className="ml-4">No Category Selected</span>
                    ) : (
                      this.state.saveCategories.map((cat) => (
                        <React.Fragment>
                          <div className="cat-box col-sm-3">
                            <img
                              src={
                                cat.image === "" || cat.image === undefined
                                  ? placeholder
                                  : cat.image
                              }
                              alt="cat-image"
                              className="img-fluid cat-image"
                            />
                            <div>{cat.label}</div>
                          </div>
                        </React.Fragment>
                      ))
                    )}
                  </Row>
                </Col>
                <Col md={4}>
                  <Button
                    variant="primary"
                    type="submit"
                    className="category-btn btn-block"
                  >
                    Save Category
                  </Button>
                </Col>
              </Row>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default MyCategory;
