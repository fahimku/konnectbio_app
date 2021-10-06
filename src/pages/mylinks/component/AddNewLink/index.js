import React from "react";
import {Button} from "reactstrap";
import Loader from "../../../../components/Loader";
import InputValidation from "../../../../components/InputValidation";
import Formsy from 'formsy-react';


const AddNewLink = (props) => {
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
        <Formsy.Form>
            <div className="image-edit-links">
              <span>Title</span>
              <input
                required
                autoFocus
                type="text"
                value={props.title}
                placeholder="Add a link title"
                className="form-control"
                onChange={(evt) => {
                  props.titleChange(evt.target.value);
                }}
              />
              <span>Redirected URL</span>
    

              <div className="pane-button">
                {props.updatePage ? (
                  <>
                    {props.loading ? (
                      <Button>
                        <Loader />
                      </Button>
                    ) : (
                      <Button onClick={props.updateLink}>
                        &nbsp;&nbsp;Update&nbsp;&nbsp;
                      </Button>
                    )}
                    <div className="remove-link">
                      <a href="javascript:void(0)" onClick={props.deleteLink}>
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
                      <Button
                        onClick={(ev) => props.saveLink && props.saveLink(this)}
                        color=""
                      >
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
