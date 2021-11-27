import React, { useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";
import * as instaActions from "../../../actions/instagram"

const MobilePreview = ({
  placeholder,
  username,
  error,
  paneDidMount,
  instagramPosts,
  selectPost,
  pageName,
  getInstagramURL,
  instagram
}) => {

  useEffect(() => {
    getInstagramURL();
  }, [])

  const instaPosts = [];
  if (instagramPosts) {
    for (let i = 0; i < instagramPosts.data.length; i++) {
      if (
        instagramPosts.data[i].media_type === "IMAGE" ||
        instagramPosts.data[i].media_type === "CAROUSEL_ALBUM"
      ) {
        instaPosts.push(
          <Col key={i} xs="4">
            <div className="mobile-image-box">
              <div onClick={(ev) => selectPost(true, i)} class="mobile_box_inr">
                <img
                  className={
                    instagramPosts.data[i].linked ||
                      instagramPosts.data[i].select
                      ? "linked"
                      : ""
                  }
                  key={i}
                  id={"img" + i}
                  src={instagramPosts.data[i].media_url}
                  alt="instagramPosts"
                />
                {instagramPosts.data[i].linked ? (
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
                {instagramPosts.data[i].linked ? (
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
      {error ? (
        <div className="error">
          {error}
          <br></br>
          <Button
            onClick={() => {
              window.location.href = instagram
            }}
            variant="primary"
            className="btn-block btn-primary">Connect Instagram</Button>
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

function mapStateToProps({ instagram }) {
  return { instagram }
}
export default connect(mapStateToProps, instaActions)(MobilePreview);