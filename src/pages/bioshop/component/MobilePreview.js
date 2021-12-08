import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Loader from "../../../components/Loader/Loader";
import InfiniteScroll from "react-infinite-scroller";

const MobilePreview = ({
  placeholder,
  username,
  limit,
  nextPageInstagramPosts,
  page,
  instagramPosts,
  selectPost,
  pageName,
  postLoading,
  hasMore,
}) => {

  const instaPosts = [];
  if (instagramPosts) {
    for (let i = 0; i < instagramPosts.data.length; i++) {
      if (instagramPosts.data[i].media_type === "IMAGE" || instagramPosts.data[i].media_type === "CAROUSEL_ALBUM") {
        instaPosts.push(<Col key={i} xs="4">
          <div className="mobile-image-box">
            <div onClick={instagramPosts.data[i].post_type === "campaign" ? null : (ev) => selectPost(true, i)} className="mobile_box_inr">
              <img className={instagramPosts.data[i].linked || instagramPosts.data[i].select ? "linked" : ""} key={i} id={"img" + i} src={instagramPosts.data[i].media_url} alt="instagramPosts"/>
              {instagramPosts.data[i].linked &&
                instagramPosts.data[i].post_type === "campaign" ? (
                <span className="linked-label">CAMPAIGN</span>
              ) : instagramPosts.data[i].linked ? (
                <span className="linked-label">LINKED</span>
              ) : (
                ""
              )}
            </div>
          </div>
        </Col>
        );
      } else {
        instaPosts.push(
          <Col key={i} xs="4" onClick={(ev) => selectPost(true, i)}>
            <div className="mobile-image-box">
              <div className="mobile_box_inr">
                <video
                  oncontextmenu="return false;"
                  // id="myVideo"
                  autoplay
                  controlsList="nodownload"
                  className={
                    instagramPosts.data[i].linked ||
                      instagramPosts.data[i].select
                      ? "linked"
                      : ""
                  }
                  key={i}
                  id={"img" + i}
                >
                  <source
                    src={instagramPosts.data[i].media_url}
                    type="video/mp4"
                  ></source>
                </video>
                <span
                  className="video-label fa fa-play"
                  aria-hidden="true"
                ></span>
                {instagramPosts.data[i].linked && instagramPosts.data[i].post_type === "campaign" ? (<span className="linked-label">CAMPAIGN</span>) : instagramPosts.data[i].linked ? (
                  <span className="linked-label">LINKED</span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </Col>
        );
      }
    }
  }

  if (!postLoading) {
    return (
      <div className="mobile-preview">
        <div className="mobile-header">
          <img
            className="place-holder-image"
            src={placeholder}
            alt="placeholder"
          />
          <span className="place-holder-name">{username}</span>
          <div className="page-name">{pageName}</div>
        </div>
        <div >
          <div id='scrollableDiv' className="mobile-gallery">
            <InfiniteScroll
              getScrollParent={() => document.getElementById('scrollableDiv')}
              pageStart={0}
              threshold={1}
              className="af-rm-mn row"
              loadMore={() =>
                nextPageInstagramPosts('', limit, page)

              }
              hasMore={page?true:false}
              loader={
                <div className="col-md-12">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: 5,
                    }}
                  >
                    <i
                      className="la la-spinner la-spin"
                      style={{ fontSize: 40 }}
                    />
                  </div>
                </div>
              }
              useWindow={false}
            >
              <Row>
                {instaPosts}
              </Row>
            </InfiniteScroll>

          </div>
        </div>
      </div>
    );
  }
  else { return ('') }
}
export default MobilePreview;