import React from "react";
import axios from "axios";
import Select from "react-select";
import { Row, Col, Button, Modal } from "react-bootstrap";
import { Label, Input } from "reactstrap";
import { toast } from "react-toastify";
import { createBrowserHistory } from "history";
// import style from "./AccountSetup.module.scss";
export const history = createBrowserHistory({
  forceRefresh: true,
});
const userInfo = JSON.parse(localStorage.getItem("userInfo"));

class AccountSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPaymentButton: false,
      allPackages: "",
      singlePackage: "",
      myCategory: "",
      user_id: "",
      category: [],
      categoryIncluded: 0,
      linksIncluded: 0,
      defaultCategory: "",
      saveCategories: "",
      categoryError: "",
      isInstagramConnected: false,
      loading: false,
      modal: false,
      loadingInsta: false,
      alert: true,
      packages: "",
      package: userInfo.package.package_name,
      packageId: userInfo.package.package_id,
      categoryAllow: userInfo.package.category_count,
      package_amount: userInfo.package.package_amount,
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
    this.getPackages();
  }

  getPackages = async () => {
    await axios
      .get(`/package/receive`)
      .then((response) => {
        const selectPackages = [];
        const packages = response.data.message;
        const singlePackage = packages.filter(
          (x) => x.package_id === this.state.packageId
        );
        this.setState({ allPackages: packages });
        this.setState({ singlePackage: singlePackage[0] });
        packages.map(({ package_id, package_name }) => {
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
      .get("/category/receive")
      .then((response) => {
        const selectCategories = [];
        const myCategories = response.data.message;
        myCategories.map(({ category_id, category_name, image_url }) => {
          return selectCategories.push({
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

  handlePackage = (event) => {
    const singlePackage = this.state.allPackages.filter(
      (x) => x.package_id === event.value
    );
    this.setState({ singlePackage: singlePackage[0] });
    this.setState({ showPaymentButton: true });
    this.setState({ package: event.value, package: event.label });
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
        <div
          className={this.props.className ? this.props.className : "container"}
        >
          <div className="justify-content-md-center">
            <div className="connections mt-5">
              <div className="page-title text-center">
                <h3>Account Setup</h3>
              </div>
              <div className="white-box mt-5">
                <h5 className="page-title line-heading">Manage Plan</h5>
                <Row>
                  <Col md={8}>
                    <h4 className="package_name">
                      Current Plan{" "}
                      {userInfo1.package ? userInfo1.package.package_name : ""}
                    </h4>
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col md={4}>Status Activity:(Monthly)</Col>
                  <Col md={4}>
                    <Button variant="primary" className="btn-block">
                      Cancel Subscription
                    </Button>
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Col md={4}>Change Plan:</Col>
                  <Col md={4}>
                    <Select
                      options={this.state.packages}
                      placeholder="Select package"
                      value={{
                        label: this.state.package,
                        value: this.state.package,
                      }}
                      onChange={(event) => this.handlePackage(event)}
                    />
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Col md={4}>
                    Categories Included:{" "}
                    {this.state.singlePackage.category_count}
                  </Col>
                  <Col md={4}>
                    <p>Change Plan to have more categories</p>
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Col md={4}>
                    Links Included: {this.state.singlePackage.link_count}
                  </Col>
                  <Col md={4}>
                    <p>Change Plan to have more links</p>
                  </Col>
                </Row>
              </div>

              <Row className="white-box">
                <Col md={12}>
                  <h5 className="page-title line-heading">Payment</h5>
                </Col>
                <div className="checkbox abc-checkbox">
                  <Input
                    className="mt-0"
                    id="checkbox1"
                    type="checkbox"
                    checked
                    // onClick={() => this.checkTable(0)}
                    // checked={this.state.checkedArr[0]}
                    readOnly
                  />{" "}
                  <Label for="checkbox1" />
                  Pay Monthly ${this.state.singlePackage.package_amount}
                </div>

                <div className="checkbox abc-checkbox">
                  <Input
                    className="mt-0"
                    id="checkbox2"
                    type="checkbox"
                    // onClick={() => this.checkTable(0)}
                    // checked={this.state.checkedArr[0]}
                    readOnly
                  />{" "}
                  <Label for="checkbox2" />
                  Pay Yearly & Save $
                  {this.state.singlePackage.package_amount * 12}{" "}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <sub>(Save 20%)</sub>
                </div>
              </Row>
              {this.state.showPaymentButton && (
                <Row>
                  <Col>
                    <Button variant="primary" className="">
                      Make Payment
                    </Button>
                  </Col>
                </Row>
              )}

              <Row className="white-box">
                <Col md={12}>
                  <h5 className="page-title line-heading">
                    Instagram Connection
                  </h5>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <div className="category_count">Connection Status</div>
                </Col>
                <Col md={4} className="text-right">
                  {(userInfo1.username !== "" && !this.props.username) ||
                  (userInfo1.username !== "" && this.props.username !== "") ? (
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
          </div>
        </div>

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
            <span class="strong"> @{userInfo1.username}</span> account from
            Konnect.bio? This will remove all your content from our platform.
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
      </div>
    );
  }
}
export default AccountSetup;
