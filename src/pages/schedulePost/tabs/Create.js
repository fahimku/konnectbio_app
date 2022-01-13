import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import Loader from "../../../components/Loader/Loader";
import * as instaPostActions from "../../../actions/instaPost";
import { toast } from "react-toastify";

function HashtagsList({ createMedia, title }) {
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

  return (
    <React.Fragment>
      <div className="container-fluid">
        <h4 className="page-title">{title}</h4>
        <div className="brand_container_main">
          <Row>
            <div className="profile_box_main col-md-6 col-sm-6 col-lg-6 col-xl-4">
              <div className="brand-section dash_block_profile">
                <div className="dash_content_profile">
                  <form onSubmit={onCreate}>
                    <Row>
                      <Col md={12}>
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
                            <p style={{ color: "red" }}>Please fill.</p>
                          ) : null}
                        </div>
                        <div class="form-group">
                          <label for="exampleFormControlFile1">Media</label>
                          <input
                            type="file"
                            onChange={(e) =>
                              setFields({ ...fields, image: e.target.files[0] })
                            }
                            class="form-control-file"
                            id="exampleFormControlFile1"
                          />
                          {submit && !fields.image ? (
                            <p style={{ color: "red" }}>Please Select.</p>
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
                            type="submit"
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
      </div>
    </React.Fragment>
  );
}
// function mapStateToProps({ hashtags }) {
//     return { hashtags };
// }
export default connect(null, instaPostActions)(HashtagsList);
