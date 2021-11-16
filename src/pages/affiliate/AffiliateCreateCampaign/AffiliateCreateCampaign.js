import React from "react";
import { Row, Col } from "reactstrap";
import axios from "axios";
import CarouselComponent from "./components/CarouselComponent";

class AffiliateCreateCampaign extends React.Component {
  state = {
    username: this.props.username,
    user_id: this.props.user_id,
    data: [],
    allCategory: [],
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

  // Fetch Single Post
  fetchSinglePost = async (post_id) => {
    await axios
      .get(`/posts/retrieve/${post_id}`)
      .then((response) => {
        // this.setState({ postType: response.data.message.post_type });
        // this.setState({ media_id: media_id });
        // let category = response.data.message.categories[0].category_id;
        // this.setState({ category: category });

        console.log(response.data.message, "data");
        console.log("endDate");

        // this.changeDateRange(
        //   response.data.message.start_date,
        //   response.data.message.end_date
        // );

        // let subCategory = [];
        // this.fetchSubCategories(category).then(function () {
        //   response.data.message.sub_categories.map((subCategoryId) => {
        //     return subCategory.push(subCategoryId.sub_category_id);
        //   });
        //   that.setState({subCategory: subCategory});
        // });
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
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="create-affiliate">
            <Row className="app_main_cont_ift main-container">
              <Col className="left-column" md="5" xs="12" xl="3">
                <div className="">
                  <CarouselComponent allCategory={this.state.allCategory} />
                </div>
                <div className="row post-box no-gutters">
                  {this.state.data.map((item) => (
                    <React.Fragment>
                      <div className="col col-4 image-post-box">
                        <div
                          onClick={() => this.fetchSinglePost(item.post_id)}
                          class="mobile_box_inr"
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
                Right
              </Col>
            </Row>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default AffiliateCreateCampaign;
