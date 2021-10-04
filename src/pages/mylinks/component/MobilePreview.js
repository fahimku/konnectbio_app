import React, {useEffect} from "react";
import {Row, Col} from "reactstrap";
import {Link} from "react-router-dom";

const MobilePreview = ({
  placeholder,
  username,
  error,
  paneDidMount,
  myLinks,
  addNewLink,
  fetchSingleLink,
  style,
}) => {
  useEffect(() => {
    // Update the document title using the browser API
    console.log("my Links");
  }, [myLinks]);

  const links = [];
  if (myLinks.data) {
    for (let i = 0; i < myLinks.data.length; i++) {
      links.push(
        <Col key={i} xs="12">
          <div
            onClick={() => {
              fetchSingleLink(myLinks.data[i].link_id);
            }}
            className={style.links}
          >
            {myLinks.data[i].title}
          </div>
        </Col>
      );
    }
  }
  return (
    <div className={`mobile-preview ` + style.myLinks}>
      <div className="mobile-header">
        <img className="place-holder-image" src={placeholder} />
        <span className="place-holder-name">{username}</span>
      </div>
      {error ? (
        <div className="error">
          {error.message}
          <br></br>
          <Link to="/connect">Connect Instagram</Link>
        </div>
      ) : (
        <div>
          <div className="visit-website" onClick={addNewLink}>
            Add a New Link
          </div>
          <div
            ref={paneDidMount}
            className={`mobile-gallery ` + style.myLinksGallery}
          >
            <Row>{links}</Row>
          </div>
        </div>
      )}
    </div>
  );
};
export default MobilePreview;
