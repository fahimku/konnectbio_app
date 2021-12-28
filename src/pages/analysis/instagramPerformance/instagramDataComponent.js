import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { createBrowserHistory } from "history";
import { connect } from "react-redux";
import * as instagramActions from "../../../actions/instagramAnalytic";
import Loader from "../../../components/Loader/Loader"; // eslint-disable-line css-modules/no-unused-class
import { Row, Col } from "react-bootstrap";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";

export const history = createBrowserHistory({
  forceRefresh: true,
});

function InstagramDataComponent({ getInstagramAnalytic, instagramAnalytic }) {
  // const [myCustomCategory, setMyCustomCategory] = useState("");

  useEffect(() => {
    getInstagramAnalytic();
  }, []);

  console.log(instagramAnalytic, "instagramAnalytic");
  return (
    <>
      <div class="instagram-analytics">
        {instagramAnalytic?.loading ? (
          <Loader size={30} />
        ) : instagramAnalytic?.insta_data?.length > 0 ? (
          <InfiniteScroll
            dataLength={instagramAnalytic?.insta_data?.length}
            next={() => {
              getInstagramAnalytic(instagramAnalytic?.pagination?.next, true);
            }}
            hasMore={instagramAnalytic?.pagination?.next ? true : false}
            loader={
              <div
                style={{
                  height: 100,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Loader size={40} />
              </div>
            }
            // pullDownToRefreshThreshold={50}
          >
            <Row>
              {" "}
              {instagramAnalytic?.insta_data?.map((record) => (
                <Col xs={12} xl={4} md={6}>
                  <div className="card analytic-box">
                    <div className="card-row row">
                      <div className="any-post-img-col col-5">
                        <div className="any-post-image">
                          <div className="any-image-box">
                            <div className="any-image-box-iner">
                              {record.media_type === "IMAGE" ? (
                                <img
                                  src={record.media_url}
                                  className="img-fluid media-image"
                                  alt={record.media_type}
                                />
                              ) : (
                                <video
                                  className="img-fluid media-image"
                                  controlsList="nodownload"
                                >
                                  <source
                                    src={record.media_url}
                                    type="video/mp4"
                                  ></source>
                                </video>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-7 analytic-caption">
                        <div className="row count-main-box">
                          <div className="col-12 count-box">
                            <h5 className="count-title">Like Count</h5>
                            <h3 className="count">{record.like_count}</h3>
                          </div>
                          <div className="col-12 count-box">
                            <h5 className="count-title">Comment Count</h5>
                            <h3 className="count">{record.comments_count}</h3>
                          </div>
                          <div className="col-12 count-box">
                            <h5 className="count-title">Engagement</h5>
                            <h3 className="count">
                              {record.insights[0].engagement}
                            </h3>
                          </div>
                          <div className="col-12 count-box">
                            <h5 className="count-title">Impressions</h5>
                            <h3 className="count">
                              {record.insights[1].impressions}
                            </h3>
                          </div>
                          <div className="col-12 count-box">
                            <h5 className="count-title">Reach</h5>
                            <h3 className="count">
                              {record.insights[2].reach}
                            </h3>
                          </div>
                          <div className="col-12 count-box">
                            <h5 className="count-title">Posted Date</h5>
                            <h3 className="count">
                              {moment(record.timestamp).format("YYYY-MM-DD")}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </InfiniteScroll>
        ) : (
          <div
            style={{
              height: 300,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1 style={{ textAlign: "center" }}>No result Found</h1>
          </div>
        )}
      </div>
    </>
  );
}
function mapStateToProps({ instagramAnalytic }) {
  return {
    instagramAnalytic,
  };
}
export default connect(
  mapStateToProps,
  instagramActions
)(InstagramDataComponent);
