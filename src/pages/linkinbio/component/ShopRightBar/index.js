import React, {useEffect, useState, useRef} from "react";
import Video from "../../../../components/Video";
import {Button} from "reactstrap";
import moment from "moment";
import {Select} from "antd";
import Loader from "../../../../components/Loader";
import InputValidation from "../../../../components/InputValidation";
import Formsy from "formsy-react";

const {Option} = Select;

const ShopRightBar = (props) => {
  const [subCategories, setSubCategories] = useState([]);
  const media_id = props.singlePost.id
    ? props.singlePost.id
    : props.singlePost.media_id;
  const redirectedUrlRef = useRef(null);
  const formRef = useRef("");

  useEffect(() => {
    setSubCategories(props.subCategories);
  }, [
    props.subCategories,
    props.changeSubCategory,
    props.changePostType,
    props.postType,
  ]);

  // useEffect(() => {
  //   redirectedUrlRef.current.focus();
  // }, [props.postType]);

  function resetForm() {
    formRef.current.reset();
  }

  return (
    <>
      <Formsy.Form onValidSubmit={() => {}} ref={formRef}>
        <div
          className={`image-edit-box ${props.isSelectPost ? "show" : "hidden"}`}
        >
          <div className="image-box-info">
            <h4>
              Edit Post
              <span
                onClick={() => props.selectPost(false, "")}
                className="fa fa-times"
              ></span>
            </h4>
            <p>
              Posted on{" "}
              {moment(props.singlePost.timestamp).format("MMM Do YYYY")}
            </p>
          </div>

          <div className="image-wrapper">
            <div className="image-box">
              {props.singlePost.media_type == "IMAGE" && (
                <img src={`${props.singlePost.media_url}`} />
              )}
              {props.singlePost.media_type == "VIDEO" && (
                <Video src={props.singlePost.media_url} />
              )}
            </div>
            <div className="image-edit-links">
              <span>URL</span>
              <input
                ref={redirectedUrlRef}
                required
                autoFocus
                type="text"
                value={props.redirectedUrl}
                placeholder="Add a link to any web page"
                className="form-control"
                onChange={(evt) => {
                  props.callBack(evt.target.value);
                }}
              />
              {/* <InputValidation
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
                onChange={(value) => {
                  props.callBack(value);
                }}
              /> */}

              <div className="select-categories mt-3">
              <span>Select Category</span>
                <Select
                  key={Date.now()}
                  value={props.category}
                  showSearch
                  style={{width: "100%"}}
                  placeholder="Select Category"
                  optionFilterProp="children"
                  clearable={false}
                  searchable={false}
                  required
                  onChange={props.changeCategory}
                  // onFocus={onFocus}
                  // onBlur={onBlur}
                  // onSearch={onSearch}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {props.categories.map(({value, label}, i) => (
                    <Option value={value}>{label}</Option>
                  ))}
                </Select>
              </div>

              {/* <div className="select-categories mt-3">
                <Select
                  key={Date.now()}
                  mode="tags"
                  clearable={false}
                  searchable={false}
                  required
                  value={props.subCategory}
                  style={{width: "100%"}}
                  placeholder="Select Sub Category"
                  optionFilterProp="children"
                  onChange={props.changeSubCategory}
                  // onFocus={onFocus}
                  // onBlur={onBlur}
                  // onSearch={onSearch}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {subCategories.map(({value, label}, i) => (
                    <Option value={value}>{label}</Option>
                  ))}
                </Select>
              </div> */}

              {props.singlePost.media_type == "VIDEO" && (
                <>
                  <div className="form-check form-check-inline mt-3">
                    <input
                      onChange={props.changePostType}
                      className="form-check-input"
                      type="radio"
                      checked={props.postType == "video" ? "checked" : ""}
                      name="postType"
                      id="inlineRadio1"
                      value="video"
                    />
                    <label className="form-check-label" htmlFor="inlineRadio1">
                      Video
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      onChange={props.changePostType}
                      className="form-check-input"
                      type="radio"
                      checked={
                        props.postType == "advertisement" ? "checked" : ""
                      }
                      name="postType"
                      id="inlineRadio2"
                      value="advertisement"
                    />
                    <label className="form-check-label" htmlFor="inlineRadio2">
                      Advertisement
                    </label>
                  </div>
                </>
              )}
              <div className="pane-button">
                {props.singlePost.linked || props.updatePage ? (
                  <>
                    {props.loading ? (
                      <Button>
                        <Loader />
                      </Button>
                    ) : (
                      <>
                        <Button
                        className="update-buttons"
                        color="primary"
                          onClick={(ev) =>
                            props.updatePost(media_id, props.redirectedUrl)
                          }
                        >
                          &nbsp;&nbsp;Update&nbsp;&nbsp;
                        </Button>
                        <Button
                        className="update-buttons"
                          color="primary"
                          onClick={() => props.testUrl(props.redirectedUrl)}
                        >
                          &nbsp;&nbsp;Test&nbsp;&nbsp;
                        </Button>

                        <Button
                        className="update-buttons"
                          color="primary"
                          onClick={() => {
                            props.selectPost(false, "");
                            props.closeModel(false);
                            }
                          }
                        >
                          &nbsp;&nbsp;Cancel&nbsp;&nbsp;
                        </Button>
                      </>
                    )}
                    <div className="remove-link">
                      <a
                        href="javascript:void(0)"
                        onClick={() => props.deletePost(media_id)}
                      >
                        <span className="glyphicon glyphicon-trash"></span>
                        Remove Post
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
                      <>
                        <Button
                          onClick={(ev) =>
                            props.savePost && props.savePost(this)
                          }
                          className="save-btn btn btn-primary"
                        >
                          &nbsp;&nbsp;Save&nbsp;&nbsp;
                        </Button>
                        <Button
                          color="primary"
                          onClick={() => props.testUrl(props.redirectedUrl)}
                        >
                          &nbsp;&nbsp;Test&nbsp;&nbsp;
                        </Button>
                        <Button
                          color="danger"
                          onClick={() => {
                            props.selectPost(false, "");
                            props.closeModel(false);
                            }
                          }
                        >
                          &nbsp;&nbsp;Cancel&nbsp;&nbsp;
                        </Button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Formsy.Form>
    </>
  );
};
export default ShopRightBar;
