import React from "react";
import { Row, Col } from "reactstrap";
import axios from "axios";
// import MyPost from "../AffiliateCreateCampaign/posts/index";
import { Link } from "react-router-dom";

class AffiliateCreateCampaign extends React.Component {
  state = {
    username: this.props.username,
    user_id: this.props.user_id,
    data: [],
  };
  componentDidMount() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.setState({ userInfo: userInfo });
    this.getAllPost();
  }
  getAllPost = async () => {
    await axios
      .get(
        "profile/posts/" +
          this.state.username +
          `?limit=16&page=1&post_type=image`
      )
      .then((response) => {
        const data = response.data.message.result.data;
        console.log(data, "data");
        this.setState({ data: data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="create-affiliate">
            <Row className="app_main_cont_ift main-container">
              <Col className="left-column" md="5" xs="12" xl="3">
                <div className="row post-box no-gutters">
                  {this.state.data.map((item) => (
                    <React.Fragment>
                      <div className="col col-4 image-post-box">
                        <Link
                          to={{
                            pathname: item.redirected_url,
                          }}
                          target="_blank"
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
                              alt=""
                              className="post-image"
                            />
                          )}
                        </Link>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
                {/* <MyPost
                  data={this.state.data}
                  // postClick={postClick}
                  username={this.state.username}
                  userId={this.state.user_id}
                  // showContentLoader={showContentLoader}
                ></MyPost>
                 */}
                {/* <div className="col col-4 post-image">
                  <div className="image-box">
                    <Link
                      to={{
                        pathname: item.redirected_url,
                      }}
                      target="_blank"
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
                        <img src={item.media_url} alt="" className="rounded" />
                      )}
                    </Link>
                  </div>
                </div> */}
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
