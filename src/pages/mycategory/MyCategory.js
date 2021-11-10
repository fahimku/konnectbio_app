import React from "react";
import axios from "axios";
import Select from "react-select";
import {Row, Col, Button} from "react-bootstrap";
import {toast} from "react-toastify";
import placeholder from "../../../src/images/placeholder.svg";
import CustomCategory from "./component/CustomCategory";
import {createBrowserHistory} from "history";
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
    };
  }

  componentDidMount() {
    // let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.setState({user_id: userInfo.user_id});
    this.fetchMyCategory();
    this.fetchSaveCategory();
    this.getPackages();
    this.fetchCustomCategory();
    //Connect Instagram Code
  }

  getPackages = async () => {
    await axios
      .get(`/package/receive`)
      .then((response) => {
        const selectPackages = [];
        const packages = response.data.message;
        packages.map(({package_id, package_name, package_amount}) => {
          return selectPackages.push({
            value: package_id,
            label: package_name,
          });
        });
        this.setState({packages: selectPackages});
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  fetchMyCategory = async () => {
    await axios
      .get("/customcategory/receive")
      .then((response) => {
        const selectCategories = [];
        const myCategories = response.data.message;
        myCategories.map(({category_id, category_name, image_url}) => {
          return selectCategories.push({
            value: category_id,
            label: category_name,
            image: image_url,
          });
        });
        this.setState({myCategory: selectCategories});
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
        optionCategories.map(({category_id, category_name, image_url}) => {
          return saveCategories.push({
            value: category_id,
            label: category_name,
            image: image_url,
          });
        });
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
        myCustomCategories.map(({category_id, category_name, image_url}) => {
          return selectCategories.push({
            value: category_id,
            label: category_name,
            image: image_url,
          });
        });
        this.setState({myCustomCategory: selectCategories});
      })
      .catch((error) => {
        console.log(error);
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
    this.setState({loading: true});

    await axios
      .put(`/users/revise/categories/${userInfo.user_id}`, {
        categories: category,
      })
      .then((response) => {
        let categoryResponse = response.data;
        if (categoryResponse.success) {
          toast.success(categoryResponse.message);
          this.setState({categoryError: ""});
          this.setState({loading: false});
          this.fetchSaveCategory();
        }
      })
      .catch((err) => {
        console.log(err.response, "err");
        this.setState({loading: false});
        this.setState({categoryError: err.response.data.message});
      });
    // }
  };
  deleteCustomCat = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
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
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      saveCategories: arrayMove(this.state.saveCategories, oldIndex, newIndex),
    });
  };

  render() {
    let userInfo1 = JSON.parse(localStorage.getItem("userInfo"));
    const SortableItem = SortableElement(({value}) => (
      <div key={value.value} className="cat-box col-sm-3 col-6">
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
        <div>{value.label}</div>
      </div>
    ));
    const SortableList = SortableContainer(({items}) => (
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

    return (
      <React.Fragment>
        <div className="category-page">
          <div
            className={
              this.props.className ? this.props.className : "container-fluid"
            }
          >
            <div className="">
              <div className="connections mt-5">
                <div className="page-title">
                  <h3>Category Setup</h3>
                </div>
                <div className="white-box mt-5">
                  <h5 className="page-title line-heading">Current Plan</h5>
                  <Row className="mt-4 align-items-center">
                    <Col xl={2} md={4}>
                      <div className="package_name">Current Plan:</div>
                    </Col>
                    <Col md={6} xl={6} lg={3}>
                      <div className="package_detail">
                        {userInfo1.package
                          ? userInfo1.package.package_name
                          : ""}
                      </div>
                    </Col>
                    <Col md={5}></Col>
                  </Row>
                  <Row className="mt-4 align-items-center">
                    <Col md={4} xl={2}>
                      <div className="package_name">Categories Included: </div>
                    </Col>
                    <Col md={4} xl={3} lg={3}>
                      <div className="package_detail">
                        {userInfo1.package
                          ? userInfo1.package.category_count
                          : ""}
                        {/* Change Plan to have more categories */}
                      </div>
                    </Col>
                    <Col md={5}></Col>
                  </Row>
                  <Row className="mt-4 align-items-center">
                    <Col md={6} xl={2}>
                      <div className="package_name">
                        Change plan to have more categories:
                      </div>
                    </Col>
                    <Col md={5} xl={3} lg={3}>
                      <div className="package_detail">
                        <Button
                          variant="primary"
                          className="btn-block"
                          onClick={() =>
                            this.props.history.push("/app/account/setup")
                          }
                        >
                          Upgrade
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className="white-box mt-5">
                  <h5 className="page-title line-heading">Custom Categories</h5>
                  <Row className="mt-4 align-items-center">
                    <Col md={6} xl={2}>
                      <div className="package_name">Custom Categories:</div>
                    </Col>

                    <Col  md={5} xl={3} lg={3}>
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
                </div>

                <form onSubmit={this.handleSubmit} className="white-box">
                  <h5 className="page-title line-heading">Select Categories</h5>
                  <Row>
                    <Col md={12} xl={7}>
                      {/* <label>Select Category: </label> */}
                      {this.state.saveCategories === "" ? null : (
                        <Select
                          isMulti={true}
                          name="category"
                          className="selectCustomization"
                          options={this.state.myCategory}
                          defaultValue={this.state.saveCategories}
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
                          <span className="ml-4">No Category Selected</span>
                        </Row>
                      ) : (
                        <SortableList
                          items={this.state.saveCategories}
                          onSortEnd={this.onSortEnd}
                          axis="xy"
                        />
                      )}
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6} xl={4}></Col>
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
      </React.Fragment>
    );
  }
}
export default MyCategory;
