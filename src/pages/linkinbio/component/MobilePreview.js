import React from "react";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

const MobilePreview = ({
  placeholder,
  username,
  error,
  paneDidMount,
  instagramPosts,
  selectPost,
  pageName,
}) => {
  const instaPosts = [];
  if (instagramPosts) {
    for (let i = 0; i < instagramPosts.data.length; i++) {
      if (instagramPosts.data[i].media_type == "IMAGE") {
        instaPosts.push(
          <Col key={i} xs="4">
            <div className="mobile-image-box">
              <img
                className={
                  instagramPosts.data[i].linked || instagramPosts.data[i].select
                    ? "linked"
                    : ""
                }
                key={i}
                id={"img" + i}
                onClick={(ev) => selectPost(true, i)}
                src={instagramPosts.data[i].media_url}
              />
              {instagramPosts.data[i].linked ? (
                <span className="linked-label">LINKED</span>
              ) : (
                ""
              )}
            </div>
          </Col>
        );
      } else {
        instaPosts.push(
          <Col key={i} xs="4" onClick={(ev) => selectPost(true, i)}>
            <div className="mobile-image-box">
              <video
                oncontextmenu="return false;"
                id="myVideo"
                autoplay
                controlsList="nodownload"
                className={
                  instagramPosts.data[i].linked || instagramPosts.data[i].select
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
              {instagramPosts.data[i].linked ? (
                <span className="linked-label">LINKED</span>
              ) : (
                ""
              )}
            </div>
          </Col>
        );
      }
    }
  }
  return (
    <div className="mobile-preview">
      <div className="mobile-header">
        <img className="place-holder-image" src={placeholder} />
        <span className="place-holder-name">{username}</span>
        <div className="page-name">
          {pageName}
        </div>
      </div>
      {error ? (
        <div className="error">
          {error.message}
          <br></br>
          <Link to="/connect">Connect Instagram</Link>
        </div>
      ) : (
        <div>
          {/* <div className="visit-website">Visit Website</div> */}
          <div ref={paneDidMount} className="mobile-gallery">
            <Row>{instaPosts}</Row>
          </div>
        </div>
      )}
    </div>
  );
};
export default MobilePreview;
