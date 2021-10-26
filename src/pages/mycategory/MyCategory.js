import React from "react";
import axios from "axios";
import Select from "react-select";
import { Row, Col, Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import placeholder from "../../../src/images/placeholder.svg";
import { createBrowserHistory } from "history";
export const history = createBrowserHistory({
  forceRefresh: true,
});

const userInfo = JSON.parse(localStorage.getItem("userInfo"));

class MyCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myCategory: "",
      user_id: "",
      category: [],
      defaultCategory: "",
      saveCategories: "",
      categoryError: "",
      isInstagramConnected: false,
      loading: false,
      modal: false,
      loadingInsta: false,
    };
  }

  componentDidMount() {
    if (userInfo.access_token !== "") {
      this.setState({ isInstagramConnected: true });
    }
    // let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.setState({ user_id: userInfo.user_id });
    this.fetchMyCategory();
    this.fetchSaveCategory();

    //Connect Instagram Code
  }

  fetchMyCategory = async () => {
    await axios
      .get("/category/receive")
      .then((response) => {
        const selectCategories = [];
        const myCategories = response.data.message;
        myCategories.map(({ category_id, category_name, image_url }) => {
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
        //const myCategories = response.data.message;
        const optionCategories = response.data.message;
        optionCategories.map(({ category_id, category_name, image_url }) => {
          saveCategories.push({
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
    this.setState({ loading: true });

    await axios
      .put(`/users/revise/categories/${userInfo.user_id}`, {
        categories: category,
      })
      .then((response) => {
        let categoryResponse = response.data;
        if (categoryResponse.success) {
          toast.success(categoryResponse.message);
          this.setState({ categoryError: "" });
          this.setState({ loading: false });
          this.fetchSaveCategory();
        }
      })
      .catch((err) => {
        console.log(err.response, "err");
        this.setState({ loading: false });
        this.setState({ categoryError: err.response.data.message });
      });
    // }
  };

  UpgradePlan = () => {
    alert("Please Contact Customer Support Team");
  };
  toggleModal = () => {
    const { modal } = this.state;
    this.setState({
      modal: !modal,
    });
  };
  disconnect = async () => {
    this.setState({ loadingInsta: true });
    await axios
      .put(`/users/revise/disconnectInstagram/disconnected`, {
        user_id: this.state.user_id,
      })
      .then((response) => {
        this.setState({ modal: false });
        this.setState({ loadingInsta: false });
        localStorage.removeItem("access_token");
        localStorage.setItem("userInfo", JSON.stringify(response.data.data));
        history.push("/connect");
      })
      .catch((err) => {
        this.setState({ loadingInsta: false });
        console.log(err.response, "err");
      });
  };

  render() {
    let userInfo1 = JSON.parse(localStorage.getItem("userInfo"));
    return (
      <div className="category-page">
        <div className="container">
          <div className="justify-content-md-center">
            <div className="connections white-box mt-5">
              <Row>
                <Col md={12}>
                  <h5 className="page-title line-heading">Connect Instagram</h5>
                </Col>
                <Col md={8}>
                  {/* <h3 className="package_name">Connect Instagram</h3> */}
                  <div className="category_count">
                    Connect your Instagram to start using KONNECT BIO.
                  </div>
                </Col>
                <Col md={4} className="text-right">
                  {/* <Button variant="primary" className="btn-block cat-right-btn">
                    <i className="fa fa-instagram" />
                    &nbsp;&nbsp;
                    {this.props.isInstagramConnected ||
                    this.state.isInstagramConnected ? (
                      "Connected"
                    ) : (
                      <>
                        {" "}
                        <div
                          dangerouslySetInnerHTML={{ __html: this.props.url }}
                        />
                      </>
                    )}
                  </Button> */}
                  {userInfo1.username !== "" || this.props.username !== "" ? (
                    <>
                      <div className="connected-text text-center mb-2">
                        Connected Instagram: @
                        {userInfo1.username !== ""
                          ? userInfo1.username
                          : this.props.username}
                      </div>
                      <Button
                        variant="primary"
                        className="btn-block cat-right-btn"
                        onClick={() => {
                          this.setState({ modal: true });
                        }}
                      >
                        Disconnect Instagram
                      </Button>
                      <Modal
                        show={this.state.modal}
                        onHide={this.toggleModal}
                        className="change-password"
                        centered
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Disconnect Instagram</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="bg-white">
                          Are you sure you want to disconnect
                          <span class="strong">
                            {" "}
                            @{userInfo1.username}
                          </span>{" "}
                          account from Konnect.bio? This will remove all your
                          content from our platform.
                          <p>This action is not reversible.</p>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            onClick={() => {
                              this.setState({ modal: false });
                            }}
                          >
                            Close
                          </Button>
                          <Button
                            className="disconnect-btn"
                            onClick={this.disconnect}
                            disabled={this.state.loadingInsta ? true : false}
                          >
                            Yes
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={() => {
                          window.location.replace(this.props.url);
                        }}
                        variant="primary"
                        className="btn-block cat-right-btn"
                      >
                        <i className="fa fa-instagram" />
                        &nbsp;&nbsp; Connect Instagram
                      </Button>
                    </>
                  )}
                </Col>
              </Row>
            </div>
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
                  <Button
                    variant="primary"
                    className="btn-block cat-right-btn"
                    onClick={this.UpgradePlan}
                  >
                    Upgrade Plan
                  </Button>
                </Col>
              </Row>
            </div>

            {/* <Row className="mt-4">
              <Col md={12}>
                <h4 className="page-title">My Categories</h4>
              </Col>
            </Row> */}

            <form onSubmit={this.handleSubmit} className="white-box">
              <h5 className="page-title line-heading">My Categories</h5>
              <Row>
                <Col md={8}>
                  <label>Select Category: </label>
                  {this.state.saveCategories === "" ? null : (
                    <Select
                      isMulti={true}
                      name="category"
                      className="selectCustomization"
                      options={this.state.myCategory}
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
                      this.state.saveCategories.map((cat, i) => (
                        <React.Fragment key={i}>
                          <div key={i} className="cat-box col-sm-3 col-6">
                            <img
                              key={i}
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
                    disabled={
                      this.state.saveCategories.length && !this.state.loading
                        ? false
                        : true
                    }
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
