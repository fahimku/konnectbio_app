import React, { useRef, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import Loader from "../../../components/Loader/Loader";
import * as instaPostActions from "../../../actions/instaPost";
import { toast } from "react-toastify";
import Placeholder from "../../../images/placeholder.svg";
// import CreateDragDrop from "./CreateDragDrop";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import { getDroppedOrSelectedFiles } from "html5-file-selector";
import { ProgressBar } from "react-bootstrap";

function HashtagsList({ createMedia, title }) {
  const uploadRef = useRef(null);
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState({
    title: "",
    image: "",
  });

  function onCreate(e) {
    e.preventDefault();
    setSubmit(true);
    console.log(fields, "fields");
    // if (fields.title && fields.image) {
    //   setLoading(true);
    //   createMedia(fields).then(() => {
    //     toast.success("Successfully Created");
    //     setLoading(false);
    //     setFields({
    //       title: "",
    //       image: "",
    //     });
    //     setSubmit(false);
    //   });
    // }
  }
  function preview(url) {
    return URL.createObjectURL(url);
  }
  function bytesToSize(bytes) {
    var sizes = ["B", "KB", "MB", "GB", "TB", "PB"];
    for (var i = 0; i < sizes.length; i++) {
      if (bytes <= 1024) {
        return bytes + " " + sizes[i];
      } else {
        bytes = parseFloat(bytes / 1024).toFixed(2);
      }
    }
    return bytes + " P";
  }

  const fileParams = ({ meta }) => {
    return { url: "https://httpbin.org/post" };
  };

  const onSubmit = (e, files, allFiles) => {
    console.log("fields");
    // allFiles.forEach((f) => f.remove());
  };
  const getFilesFromEvent = (e) => {
    return new Promise((resolve) => {
      getDroppedOrSelectedFiles(e).then((chosenFiles) => {
        resolve(chosenFiles.map((f) => f.fileObject));
      });
    });
  };
  const selectFileInput = ({ accept, onFiles, files, getFilesFromEvent }) => {
    const textMsg = files.length > 0 ? "Upload Again" : "Browse Image";
    return (
      <>
        {/* <div className="upload_area">
          <h4>Upload your image</h4>
          <p className="text-muted">PNG, JPG and GIF files are allowed</p>
        </div>
        <div class="upload_area_3 form-group">
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="Add Media Title"
            onChange={(e) => setFields({ ...fields, title: e.target.value })}
            value={fields.title}
          />
          {submit && !fields.title ? (
            <small style={{ color: "red" }}>Please fill.</small>
          ) : null}
        </div> */}
        <div className="upload_area_2">
          <span class="pt-1 pb-4 glyphicon glyphicon-cloud-upload	fa-4x"></span>
          <h4>Drag & Drop your image here</h4>
          <h4>OR</h4>
          <label className="btn btn-primary mr-0 mb-0">
            {textMsg}
            <input
              style={{ display: "none" }}
              type="file"
              accept={accept}
              multiple
              onChange={(e) => {
                getFilesFromEvent(e).then((chosenFiles) => {
                  onFiles(chosenFiles);
                });
              }}
            />
          </label>
        </div>
      </>
    );
  };
  const Preview = ({ meta, files }) => {
    const { name, percent, status, previewUrl, size } = meta;
    return (
      <>
        <div className="upload_area">
          <h4>Upload your image</h4>
          <p className="text-muted">PNG, JPG and GIF files are allowed</p>
        </div>
        <div class="upload_area_3 form-group">
          <input
            type="text"
            class="form-control"
            placeholder="Add Media Title"
          />
        </div>
        <div className="preview-box">
          <div className="pre-img-upload">
            <img src={previewUrl} />{" "}
          </div>

          <div className="pre-content-upload">
            <div className="glry-img-name">{name}</div>{" "}
            <div className="glry-img-size">{bytesToSize(size)}</div>
            <div className="status">{status}</div>
            <div className="pro-brar-ift">
              <ProgressBar
                animated
                now={percent}
                label={`${percent.toFixed(0)}%`}
              />
              <span
                className="glyphicon glyphicon-remove"
                onClick={removeFile(files)}
              ></span>
              {/* {status !== "done" && (
              <div className="percent"> ({Math.round(percent)}%)</div>
            )} */}
            </div>
          </div>
        </div>
      </>
    );
  };
  const removeFile = (allFiles) => () => {
    allFiles.forEach((f) => f.remove());
    setFields({
      ...fields,
      image: "",
    });
  };
  const onFileChange = ({ file }) => {
    setFields({
      ...fields,
      image: file,
    });
  };

  return (
    <React.Fragment>
      <div className="container-fluid">
        <h4 className="page-title">{title}</h4>

        <div className="brand_container_main container">
          <form>
            <Row>
              <div className="profile_box_main col-md-8">
                <div className=" brand-section dash_block_profile dash_content_profile">
                  {/* <CreateDragDrop /> */}
                  <div className="upload_area">
                    <h4>Upload your image</h4>
                    <p className="text-muted">
                      PNG, JPG and GIF files are allowed
                    </p>
                  </div>
                  <div class="upload_area_3 form-group">
                    <input
                      type="text"
                      class="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Add Media Title"
                      onChange={(e) =>
                        setFields({ ...fields, title: e.target.value })
                      }
                      value={fields.title}
                    />
                    {submit && !fields.title ? (
                      <small style={{ color: "red" }}>Please fill.</small>
                    ) : null}
                  </div>
                  <Dropzone
                    // onSubmit={onSubmit}
                    onChangeStatus={onFileChange}
                    InputComponent={selectFileInput}
                    getUploadParams={fileParams}
                    getFilesFromEvent={getFilesFromEvent}
                    accept="image/*"
                    maxFiles={1}
                    // inputContent="Drop A File"
                    addClassNames={{
                      dropzone: "drag-drop-ift dash_content_profile",
                    }}
                    PreviewComponent={Preview}
                    submitButtonContent="Create"
                    styles={{
                      dropzoneActive: { borderColor: "green" },
                    }}
                  />
                  {submit && !fields.image ? (
                    <small style={{ color: "red" }}>Please Select.</small>
                  ) : null}
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
                </div>
              </div>
            </Row>
          </form>
        </div>
        {/* <div className="brand_container_main container">
          <Row>
            <div className="profile_box_main col-md-8">
              <div className="brand-section dash_block_profile">
                <div className="dash_content_profile">
                  <form>
                    <Row>
                      <Col md={12}>
                        <div class="form-group">
                          <label for="exampleFormControlFile1">Media</label>
                          <div className="dp_cont mb-4">
                            <span>
                              <img
                                style={{ width: "76px", height: "76px" }}
                                className="circle profile-icon"
                                alt="profile-icon"
                                src={
                                  fields.image
                                    ? preview(fields.image)
                                    : Placeholder
                                }
                              />
                              {submit && !fields.image ? (
                                <small style={{ color: "red" }}>
                                  Please Select.
                                </small>
                              ) : null}
                            </span>
                            <div className="dp_buttons">
                              <input
                                accept="image/*"
                                ref={uploadRef}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  setFields({
                                    ...fields,
                                    image: e.target.files[0],
                                  });
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
                                onClick={() =>
                                  setFields({ ...fields, image: "" })
                                }
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
        </div> */}
      </div>
    </React.Fragment>
  );
}
// function mapStateToProps({ hashtags }) {
//     return { hashtags };
// }
export default connect(null, instaPostActions)(HashtagsList);
