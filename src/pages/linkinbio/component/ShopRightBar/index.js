import React, {useEffect, useState, useRef} from "react";
import Video from "../../../../components/Video";
import {Button} from "reactstrap";
import moment from "moment";
import {Select} from "antd";
const {Option} = Select;

const ShopRightBar = (props) => {

  const [subCategories, setSubCategories] = useState([]);
  const media_id = props.singlePost.id ? props.singlePost.id : props.singlePost.media_id;
  const redirectedUrlRef = useRef(null);

  useEffect(() => {
    setSubCategories(props.subCategories);
  }, [
    props.subCategories,
    props.changeSubCategory,
    props.changePostType,
    props.postType,
  ]);

  useEffect(() => {
    redirectedUrlRef.current.focus();
  }, [props.postType]);

  return (
    <>
      <div
        className={`image-edit-box ${props.isSelectPost ? "show" : "hidden"}`}
      >
        <div className="image-box-info">
          <span
            onClick={() => props.selectPost(false, "")}
            className="glyphicon glyphicon-arrow-left"
          ></span>
          <h4>Edit Links</h4>
          <p>
            Posted on {moment(props.singlePost.timestamp).format("MMM Do YYYY")}
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

          <form onSubmit={props.submitted}>
            <div className="image-edit-links">
              <span>Konnect.Bio</span>
              <input
                ref={redirectedUrlRef}
                required
                autoFocus
                type="url"
                value={props.redirectedUrl}
                placeholder="Add a link to any web page"
                className="form-control"
                onChange={(evt) => {
                  props.callBack(evt.target.value);
                }}
              />
              <div className="select-categories mt-3">
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

                {/* <SelectBox
                  key={Date.now()}
                  data={props.categories}
                  selected={props.dbCategoryId}
                  callBack={(a) => {
                    props.changeCategory(a);
                  }}
                /> */}
              </div>

              <div className="select-categories mt-3">
                <Select
                  key={Date.now()}
                  mode="tags"
                  clearable={false}
                  searchable={false}
                  required
                  //  \
                  value={props.subCategory}
                  // showSearch
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
              </div>

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
                    <Button
                      onClick={(ev) =>
                        props.updatePost(media_id, props.redirectedUrl)
                      }
                    >
                      &nbsp;&nbsp;Update&nbsp;&nbsp;
                    </Button>
                    <div className="remove-link">
                      <a
                        href="javascript:void(0)"
                        onClick={() => props.deletePost(media_id)}
                      >
                        <span className="glyphicon glyphicon-trash"></span>
                        Remove Link
                      </a>
                    </div>
                  </>
                ) : (
                  <Button onClick={(ev) => props.savePost(this)} color="">
                    &nbsp;&nbsp;Save&nbsp;&nbsp;
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default ShopRightBar;