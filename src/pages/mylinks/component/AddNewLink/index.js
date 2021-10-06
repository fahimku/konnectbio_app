import React, {useRef, useEffect} from "react";
import {Button} from "reactstrap";
import Loader from "../../../../components/Loader";
import InputValidation from "../../../../components/InputValidation";
import Formsy from "formsy-react";

const AddNewLink = (props) => {
  const formRef = useRef("");

  function resetForm() {
    formRef.current.reset();
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
              } else {
                props.saveLink && props.saveLink();
                resetForm();
              }
            }}
            ref={formRef}
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
                      <Button type="submit">
                        &nbsp;&nbsp;Update&nbsp;&nbsp;
                      </Button>
                    )}
                    <div className="remove-link">
                      <a
                        href="javascript:void(0)"
                        onClick={() => {
                          props.deleteLink();
                          resetForm();
                        }}
                      >
                        <span className="glyphicon glyphicon-trash"></span>
                        Remove Link
                      </a>
                    </div>
                  </>
                ) : (
                  <>
                    {props.loading ? (
                      <Button>
                        <Loader />
                      </Button>
                    ) : (
                      <Button type="submit" color="">
                        &nbsp;&nbsp;Save&nbsp;&nbsp;
                      </Button>
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
