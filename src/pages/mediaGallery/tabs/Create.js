import React, { useRef, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import Loader from "../../../components/Loader/Loader";
import * as instaPostActions from "../../../actions/instaPost";
import { toast } from "react-toastify";
import Placeholder from "../../../images/placeholder.svg";
import CreateDragDrop from "./CreateDragDrop";


function HashtagsList({ createMedia, title }) {
  const uploadRef = useRef(null)
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState({
    title: "",
    image: "",
  });

  function onCreate(e) {
    e.preventDefault();
    setSubmit(true);
    if (fields.title && fields.image) {
      setLoading(true);
      createMedia(fields).then(() => {
        toast.success("Successfully Created");
        setLoading(false);
        setFields({
          title: "",
          image: "",
        });
        setSubmit(false);
      });
    }
  }
  console.log(fields.image)
  function preview(url) {
    return URL.createObjectURL(url)
  }
  return (
    <React.Fragment>
      <div className="container-fluid">
        <h4 className="page-title">{title}</h4>
        <div className="brand_container_main container">
          <Row>
            <div className="profile_box_main col-md-8">
              <div className="brand-section dash_block_profile">
                <div className="dash_content_profile">
                  <form>
                    <Row>
                      <Col md={12}>
                        <div class="form-group">
                          {/* <label for="exampleFormControlFile1">Media</label> */}
                          <div className="dp_cont mb-4">
                            <span>
                              <img
                                style={{ width: "76px", height: "76px" }}
                                className="circle profile-icon"
                                alt="profile-icon"
                                src={fields.image ? preview(fields.image) : Placeholder}
                              />
                              {submit && !fields.image ? (
                                <small style={{ color: "red" }}>Please Select.</small>
                              ) : null}
                            </span>
                            <div className="dp_buttons">
                              <input
                                accept="image/*"
                                ref={uploadRef}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  setFields({ ...fields, image: e.target.files[0] })
                                }}
                                type="file"
                                className="d-none"
                              />
                              <Button
                                type="button"
                                onClick={() => uploadRef?.current?.click()}
                                className="select-image"
                              >
                                {fields.image ? "Change Image" : "Upload Image"}
                              </Button>
                              <Button
                                onClick={() => setFields({ ...fields, image: "" })}
                                type="button"
                                color="default"
                                className="select-image"
                              >
                                <label>Cancel</label>
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div class="form-group">
                          <label for="exampleFormControlInput1">Caption</label>
                          <input
                            type="text"
                            class="form-control"
                            id="exampleFormControlInput1"
                            placeholder="caption"
                            onChange={(e) =>
                              setFields({ ...fields, title: e.target.value })
                            }
                            value={fields.title}
                          />
                          {submit && !fields.title ? (
                            <small style={{ color: "red" }}>Please fill.</small>
                          ) : null}
                        </div>
                      </Col>
                      <Col>
                        {loading ? (
                          <Button
                            style={{
                              borderTopLeftRadius: 0,
                              borderBottomLeftRadius: 0,
                              width: "15%",
                            }}
                            variant="primary"
                            className="btn-block"
                          >
                            <Loader />
                          </Button>
                        ) : (
                          <Button
                            style={{
                              width: "15%",
                            }}
                            variant="primary"
                            onClick={onCreate}
                            className="btn-block"
                          >
                            Create
                          </Button>
                        )}
                      </Col>
                    </Row>
                  </form>
                </div>
              </div>
            </div>
          </Row>
        </div>
        <div className="brand_container_main container" >
          <Row>
            <div className="profile_box_main col-md-8">
              <div className="drg-drop-main brand-section dash_block_profile">
                <CreateDragDrop/>
              </div>
            </div>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
}
// function mapStateToProps({ hashtags }) {
//     return { hashtags };
// }
export default connect(null, instaPostActions)(HashtagsList);
