import React from "react";
import axios from "axios";
import Select from "react-select";
import { Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import placeholder from "../../../src/images/placeholder.svg";
// import CustomCategory from "./component/CustomCategory";
import { createBrowserHistory } from "history";
import EditCustomCategory from "./component/EditCustomCategory";
import Swal from "sweetalert2";
import {
  SortableContainer,
  SortableElement,
  arrayMove,
} from "react-sortable-hoc";
export const history = createBrowserHistory({
  forceRefresh: true,
});

const userInfo = JSON.parse(localStorage.getItem("userInfo"));

class MyCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myCategory: "",
      myCustomCategory: "",
      user_id: "",
      category: [],
      defaultCategory: "",
      saveCategories: "",
      categoryError: "",
      loading: false,
      packages: "",
      package: userInfo.package.package_name,
      categoryAllow: userInfo.package.category_count,
      package_amount: userInfo.package.package_amount,
      sort: false,
    };
  }

  componentDidMount() {
    // let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.setState({ user_id: userInfo.user_id });
    this.fetchMyCategory();
    this.fetchSaveCategory();
    // this.getPackages();
    // this.fetchCustomCategory();
    //Connect Instagram Code
  }

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

  fetchMyCategory = async () => {
    await axios
      .get("/usercategory/receive")
      .then((response) => {
        const selectCategories = [];
        const myCategories = response.data.message;
        myCategories.map(({ parent_id, category_name, image_url }) => {
          return selectCategories.push({
            value: parent_id,
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
        //const myCategories = response.data.message;
        const optionCategories = response.data.message;
        optionCategories.map(
          ({ parent_id, category_name, image_url, editable, category_id }) => {
            return saveCategories.push({
              value: parent_id,
              label: category_name,
              image: image_url,
              editable: editable,
              category_id: category_id,
            });
          }
        );
        this.setState({
          // defaultCategory: myCategories,
          saveCategories: saveCategories,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  fetchCustomCategory = async () => {
    await axios
      .get("/customcategory/receive?custom=1")
      .then((response) => {
        const selectCategories = [];
        const myCustomCategories = response.data.message;
        myCustomCategories.map(({ category_id, category_name, image_url }) => {
          return selectCategories.push({
            value: category_id,
            label: category_name,
            image: image_url,
          });
        });
        this.setState({ myCustomCategory: selectCategories });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleSelect = (e, options) => {
    let difference = this.state.saveCategories.filter(
      (x) => !options.includes(x)
    );
    if (difference.length > 0) {
      Swal.fire({
        title: "Are you sure you want to delete this category?",
        text: "This will uncategorize all your post related to this category.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#010b40",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.setState({
            saveCategories: options,
          });
        } else {
          this.setState({
            saveCategories: this.state.saveCategories,
          });
        }
      });
    } else {
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
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    let category =
      this.state.saveCategories === null
        ? []
        : this.state.saveCategories.map((category) => {
            return {
              category_name: category.label,
              category_id: category.editable
                ? category.category_id
                : category.value,
              image_url: category.image,
              editable: category.editable,
            };
          });
    // console.log({ categories: category, sort: this.state.sort });
    this.setState({ loading: true });
    await axios
      .post(`/usercategory/reserve`, {
        categories: category,
        sort: this.state.sort,
      })
      .then((response) => {
        this.setState({
          loading: false,
          categoryError: "",
          sort: false,
        });
        let imageResponse = response.data;
        toast.success(imageResponse.message);
        this.fetchSaveCategory();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        this.setState({ loading: false, categoryError: "" });
      });
  };
  deleteCustomCat = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#010b40",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/customcategory/remove/${id}`)
          .then((response) => {
            let categoryResponse = response.data;
            if (categoryResponse.success) {
              // toast.success(categoryResponse.message);
              Swal.fire("Deleted!", categoryResponse.message, "success");
              this.fetchCustomCategory();
            }
          })
          .catch((err) => {
            console.log(err.response, "err");
            toast.error(err.response.data.message);
          });
      }
    });
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      saveCategories: arrayMove(this.state.saveCategories, oldIndex, newIndex),
      sort: true,
    });
  };

  render() {
    let userInfo1 = JSON.parse(localStorage.getItem("userInfo"));
    const SortableItem = SortableElement(({ value }) => (
      <div key={value.value} className="cat-box col-sm-3 col-4">
        <img
          key={value.value}
          src={
            value.image === "" || value.image === undefined
              ? placeholder
              : value.image
          }
          alt="cat-logo"
          className="img-fluid cat-image"
        />
        <div className="cat-lable">{value.label}</div>
        {value.editable ? (
          <div className="action">
            <EditCustomCategory
              userID={userInfo1.user_id}
              fetchMyCategory={this.fetchMyCategory}
              // fetchCustomCategory={this.fetchCustomCategory}
              fetchSaveCategory={this.fetchSaveCategory}
              catData={value}
            />
          </div>
        ) : null}
      </div>
    ));
    const SortableList = SortableContainer(({ items }) => (
      <Row>
        {items.map((value, index) => (
          <SortableItem
            key={`item-${index.toString()}`}
            index={index}
            value={value}
          />
        ))}
      </Row>
    ));
    // console.log(this.state.saveCategories, "saveCategories");

    return (
      <React.Fragment>
        <div className="profile-page account-setup">
          <div
            className={
              this.props.className ? this.props.className : "container-fluid"
            }
          >
            <div className="mt-4 row">
              <div class="col-md-12">
                <h4 class="page-title">Category Setup</h4>
              </div>
            </div>

            <div className="profile_container_main container">
              <div className="row-rev row">
                <div className="profile_box_main col-md-4">
                  <div className="dash_block_profile">
                    <div className="dash_content_profile">
                      <h5>Plan Details</h5>
                      <div className="category-box">
                        <div className="category-count-row col-12">
                          <h4 className="category-count-title">
                            Current Plan:
                          </h4>
                          <h3 className="category-count-right">
                            {userInfo1.package
                              ? userInfo1.package.package_name
                              : ""}
                          </h3>
                        </div>
                      </div>

                      <div className="category-box">
                        <div className="category-count-row col-12">
                          <h4 className="category-count-title">
                            Categories Included:{" "}
                          </h4>
                          <h3 className="category-count-right">
                            {userInfo1.package
                              ? userInfo1.package.category_count
                              : ""}
                          </h3>
                        </div>
                      </div>

                      {userInfo1.package.package_name !== "Business Plus" ? (
                        <div className="category-box">
                          <div className="category-count-row col-12">
                            <h4 className="category-count-title">
                              Change plan to have more features:
                            </h4>
                          </div>
                          <div className="category-count-row col-12">
                            <Button
                              variant="primary"
                              className="btn-block mr-0"
                              onClick={() => history.push("/app/account/setup")}
                            >
                              Upgrade
                            </Button>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* <div className="white-box mt-5">
                  <h5 className="page-title line-heading">Custom Categories</h5>
                  <Row className="mt-4 align-items-center">
                    <Col md={6} xl={2}>
                      <div className="package_name">Custom Categories:</div>
                    </Col>

                    <Col md={5} xl={3} lg={3}>
                      <CustomCategory
                        userID={userInfo1.user_id}
                        fetchMyCategory={this.fetchMyCategory}
                        fetchCustomCategory={this.fetchCustomCategory}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-4 align-items-center">
                    <Col md={12} xl={7}>
                      <Row>
                        {this.state.myCustomCategory.length === 0 ? (
                          <span className="ml-4">
                            No Custom Category Selected
                          </span>
                        ) : (
                          // <SortableList
                          //   items={this.state.myCustomCategory}
                          //   onSortEnd={this.onSortEnd}
                          //   axis="x"
                          // />
                          this.state.myCustomCategory.map((cat, i) => (
                            <React.Fragment key={i}>
                              <div key={i} className="cat-box col-sm-3 col-12">
                                <img
                                  key={i}
                                  src={
                                    cat.image === "" || cat.image === undefined
                                      ? placeholder
                                      : cat.image
                                  }
                                  alt="cat-logo"
                                  className="img-fluid cat-image"
                                />
                                <div>{cat.label}</div>
                                <div className="action">
                                  <EditCustomCategory
                                    userID={userInfo1.user_id}
                                    fetchMyCategory={this.fetchMyCategory}
                                    fetchCustomCategory={
                                      this.fetchCustomCategory
                                    }
                                    catData={cat}
                                  />
                                  <button
                                    className="btn btn-link edit-icon"
                                    onClick={() =>
                                      this.deleteCustomCat(cat.value)
                                    }
                                  >
                                    <span
                                      className="fa fa-trash"
                                      title="Delete"
                                    ></span>
                                  </button>
                                </div>
                              </div>
                            </React.Fragment>
                          ))
                        )}
                      </Row>
                    </Col>
                  </Row>
                </div> */}

                <div className="profile_box_main col-md-8">
                  <div className="dash_block_profile">
                    <div className="dash_content_profile">
                      <form onSubmit={this.handleSubmit}>
                        <h5>Select Categories</h5>
                        <Row>
                          <Col md={12}>
                            {/* <label>Select Category: </label> */}
                            {this.state.saveCategories === "" ? null : (
                              <Select
                                isMulti={true}
                                name="category"
                                className="selectCustomization"
                                options={this.state.myCategory}
                                value={this.state.saveCategories}
                                placeholder="Select Category"
                                onChange={(options, e) =>
                                  this.handleSelect(e, options)
                                }
                              />
                            )}
                            <span className="text-danger">
                              {this.state.categoryError}
                            </span>

                            {this.state.saveCategories.length === 0 ? (
                              <Row>
                                <span className="ml-4">
                                  No Category Selected
                                </span>
                              </Row>
                            ) : (
                              <SortableList
                                items={this.state.saveCategories}
                                onSortEnd={this.onSortEnd}
                                axis="xy"
                                lockToContainerEdges={true}
                                lockOffset="0%"
                                distance={1}
                              />
                            )}
                          </Col>
                        </Row>

                        <Row>
                          <Col md={5} xl={3}>
                            <Button
                              variant="primary"
                              type="submit"
                              className="category-btn btn-block"
                              disabled={
                                this.state.saveCategories.length &&
                                !this.state.loading
                                  ? false
                                  : true
                              }
                            >
                              Save
                            </Button>
                          </Col>
                        </Row>
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
export default MyCategory;
