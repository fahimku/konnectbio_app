import React from "react";
// import { Row, Col } from "reactstrap";
import { Col, Row, Modal, ModalBody, Alert } from "react-bootstrap";
import axios from "axios";
import CarouselComponent from "./components/CarouselComponent";
import AffiliateForm from "./components/AffiliateForm";

class AffiliateCreateCampaign extends React.Component {
  state = {
    username: this.props.username,
    user_id: this.props.user_id,
    data: [],
    allCategory: [],
    aff_modal: false,
    affData: "",
    countries: "",
  };
  componentDidMount() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.setState({ userInfo: userInfo });
    this.getAllPost();
    this.fetchAllCategory();
  }
  getAllPost = async () => {
    await axios
      .get("shop/posts" + `?limit=16&page=1&post_type=image`)
      .then((response) => {
        const allpost = response.data.message.result.data;
        this.setState({ data: allpost });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  fetchAllCategory = async () => {
    await axios
      .get("/usercategory/receive")
      .then((response) => {
        const myCategories = response.data.message;
        // myCategories.map(({ category_id, category_name, image_url }) => {
        //   return selectCategories.push({
        //     value: category_id,
        //     label: category_name,
        //     image: image_url,
        //   });
        // });
        this.setState({ allCategory: myCategories });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  selectPost = (postId) => {
    this.setState({
      aff_modal: true,
    });
    this.fetchSinglePost(postId);
    this.getCountries();
  };

  // Fetch Single Post
  fetchSinglePost = async (post_id) => {
    await axios
      .get(`/posts/retrieve/${post_id}`)
      .then((response) => {
        this.setState({ affData: response.data.message });
        // this.setState({ media_id: media_id });
        // let category = response.data.message.categories[0].category_id;
        // this.setState({ category: category });

        console.log(response.data.message, "data");
      })
      .catch((err) => {
        console.log(err, "err");
        // this.setState({
        //   category: [],
        // });
        // this.setState({ subCategory: [] });
        // this.setState({ postType: "image" });
      });
  };
  getCountries = async () => {
    await axios
      .post(`/common/receive/countries`)
      .then((response) => {
        const selectCountries = [];
        const countries = response.data.message;
        countries.map(({ name, code1 }) => {
          return selectCountries.push({ value: code1, label: name });
        });
        this.setState({ countries: selectCountries });

        // countries.map(({ name, code1, selected }) => {
        //   if (selected) {
        //     // console.log({name, code1, selected});
        //     this.setState({ country: name, countryCode: code1 });
        //   } else {
        //     this.setState({ country: "Pakistan", countryCode: "PK" });
        //   }
        //   return selectCountries.push({ value: code1, label: name });
        // });
        // this.setState({ countries: selectCountries });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  categoryFilter = async (id) => {
    await axios
      .get(`/shop/filter?limit=16&page=1&post_type=image&id=${id}`)
      .then((response) => {
        const allpost = response.data.message.result.data;
        console.log(response.data.message, "data");
        this.setState({ data: allpost });
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
  affToggleModal = () => {
    const { aff_modal } = this.state;
    this.setState({
      aff_modal: !aff_modal,
    });
  };
  affiliateModal = () => {
    return this.state.aff_modal ? (
      <div className="affiliate-model image-edit-box">
        <Alert onClose={this.affToggleModal} dismissible>
          <Alert.Heading>Create Campaign</Alert.Heading>
          <AffiliateForm
            affData={this.state.affData}
            countries={this.state.countries}
          />
        </Alert>
        {window.innerWidth <= 760 && (
          <Modal
            show={this.state.aff_modal}
            onHide={this.affToggleModal}
            backdrop="static"
            className="affiliate-model"
          >
            <Modal.Header closeButton>
              <Modal.Title>Create Campaign</Modal.Title>
            </Modal.Header>

            <AffiliateForm affData={this.state.affData} />
          </Modal>
        )}
      </div>
    ) : (
      "Create campaign"
    );
  };
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="create-affiliate">
            <Row className="app_main_cont_ift main-container">
              <Col className="left-column" md="5" xs="12" xl="3">
                <div className="">
                  <CarouselComponent
                    allCategory={this.state.allCategory}
                    categoryFilter={this.categoryFilter}
                  />
                </div>
                <div className="row post-box no-gutters">
                  {this.state.data.map((item) => (
                    <React.Fragment>
                      <div className="col col-4 image-post-box">
                        <div
                          onClick={() => this.selectPost(item.post_id)}
                          className="mobile_box_inr link"
                        >
                          {item.media_type === "VIDEO" ? (
                            <video
                              id={`post-video-${item.post_id}`}
                              autoPlay
                              controls
                              controlsList="nodownload"
                            >
                              <source
                                src={item.media_url}
                                type="video/mp4"
                              ></source>
                            </video>
                          ) : (
                            <img
                              src={item.media_url}
                              alt="post-img"
                              className="post-image"
                            />
                          )}
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </Col>
              <Col className="right-bar bg-white" md="7" xs="12" xl="9">
                {this.affiliateModal()}
              </Col>
            </Row>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default AffiliateCreateCampaign;
