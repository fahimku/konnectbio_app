import React, {useRef, useEffect, useState} from "react";
import {Row, Col, Button} from "reactstrap";
import Loader from "../../../../components/Loader";
import InputValidation from "../../../../components/InputValidation";
import Formsy from "formsy-react";

const AddNewLink = (props) => {
  const [canSubmit, setCanSubmit] = useState(false);
  const formRef = useRef("LinkForm");

  function resetForm() {
    formRef.current.reset();
  }

  function disableButton() {
    setCanSubmit(true);
  }

  function enableButton() {
    setCanSubmit(false);
  }

  return (
    <>
      <div className={`image-edit-box ${props.isPreview ? "show" : "hidden"}`}>
        <div className="image-box-info">
          <h4>
            Add New Link
            <span
              onClick={() => props.preview(false, "")}
              className="fa fa-times"
            ></span>
          </h4>
        </div>
        <div className="image-wrapper">
          <Formsy.Form
            onValidSubmit={() => {
              if (props.updatePage) {
                props.updateLink();
                props.preview(false, "");
              } else {
                props.saveLink && props.saveLink();
                props.preview(false, "");
                resetForm();
              }
            }}
            ref={formRef}
            onValid={enableButton}
            onInvalid={disableButton}
          >
            <div className="image-edit-links">
              <span>Title</span>
              <InputValidation
                type="text"
                id="basic"
                name="basic"
                required
                value={props.title}
                placeholder="Add a link title"
                onChange={(evt) => {
                  props.titleChange(evt.target.value);
                }}
              />
              <span>URL</span>
              <InputValidation
                placeholder="Please Enter Website Address"
                type="text"
                id="website"
                required
                name="website"
                trigger="change"
                validations="isUrl"
                validationError={{
                  isUrl: "This value should be a valid url.",
                }}
                value={props.redirectedUrl}
                onChange={(evt) => {
                  props.redirectedUrlChange(evt.target.value);
                }}
              />
              <div className="pane-button">
                {props.updatePage ? (
                  <>
                    {props.loading ? (
                      <Button>
                        <Loader />
                      </Button>
                    ) : (
                      <>
                        <Row className="mt-3">
                          <Col lg="3" sm="6" xs="6">
                            <Button
                              type="submit"
                              color="primary"
                              className="update-buttons"
                            >
                              &nbsp;&nbsp;Update&nbsp;&nbsp;
                            </Button>
                          </Col>
                          <Col lg="3" sm="6" xs="6">
                            <Button
                              disabled={canSubmit}
                              className="update-buttons"
                              color="primary"
                              onClick={() => props.testUrl(props.redirectedUrl)}
                            >
                              &nbsp;&nbsp;Test&nbsp;&nbsp;
                            </Button>
                          </Col>
                          <Col lg="3" sm="6" xs="6">
                            <Button
                              className="update-buttons"
                              color="primary"
                              onClick={() => {
                                props.preview(false, "");
                                props.closeModel();
                              }}
                            >
                              &nbsp;&nbsp;Cancel&nbsp;&nbsp;
                            </Button>
                          </Col>
                          <Col lg="3" sm="6" xs="6">
                            <Button
                              className="update-buttons"
                              color="primary"
                              onClick={() => {
                                props.deleteLink();

                                resetForm();
                              }}
                            >
                              Delete
                            </Button>
                          </Col>
                        </Row>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {props.loading ? (
                      <Button>
                        <Loader />
                      </Button>
                    ) : (
                      <>
                        <Row className="mt-3">
                          <Col lg="4" sm="6" xs="6">
                            <Button
                              type="submit"
                              color="primary"
                              className="update-buttons"
                            >
                              &nbsp;&nbsp;Save&nbsp;&nbsp;
                            </Button>
                          </Col>

                          <Col lg="4" sm="6" xs="6">
                            <Button
                              disabled={canSubmit}
                              className="update-buttons"
                              color="primary"
                              onClick={() => props.testUrl(props.redirectedUrl)}
                            >
                              &nbsp;&nbsp;Test&nbsp;&nbsp;
                            </Button>
                          </Col>

                          <Col lg="4" sm="6" xs="6">
                            <Button
                              className="update-buttons"
                              color="primary"
                              onClick={() => {
                                props.preview(false, "");
                                props.closeModel();
                              }}
                            >
                              &nbsp;&nbsp;Cancel&nbsp;&nbsp;
                            </Button>
                          </Col>
                        </Row>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </Formsy.Form>
        </div>
      </div>
    </>
  );
};
export default AddNewLink;
