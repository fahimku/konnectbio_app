import React, {useEffect, useState} from "react";
import {Button} from "reactstrap";
import moment from "moment";
import SelectBox from "../../../../components/SelectBox";
import {Select} from "antd";

const {Option} = Select;

const ShopRightBar = (props) => {
  const [subCategories, setSubCategories] = useState([]);
  const media_id = props.singlePost.id ? props.singlePost.id : props.singlePost.media_id;

  useEffect(() => {
    console.log("props");
    setSubCategories(props.subCategories);
  }, []);

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
            {props.singlePost.media_type == "IMAGE" ? (
              <img src={`${props.singlePost.media_url}`} />
            ) : (
              <video
                oncontextmenu="return false;"
                id="myVideo"
                autoplay
                controls
                controlsList="nodownload"
              >
                <source
                  src={`${props.singlePost.media_url}`}
                  type="video/mp4"
                ></source>
              </video>
            )}
          </div>
          <form onSubmit={props.submited}>
            <div className="image-edit-links">
              <span>Konnect.Bio</span>
              <input
                required
                type="url"
                value={props.redirectedUrl}
                placeholder="Add a link to any web page"
                className="form-control"
                onChange={(evt) => {
                  props.callBack(evt.target.value);
                }}
              />
              <div className="select-categories mt-3">
                {/* <Select
                  key={Date.now()}
                  //value={props.dbCategoryId}
                  showSearch
                  style={{width: "100%"}}
                  placeholder="Select a person"
                  optionFilterProp="children"
                  //      onChange={props.changeSubCategory}
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
                </Select> */}

                <SelectBox
                  key={Date.now()}
                  data={props.categories}
                  selected={props.dbCategoryId}
                  callBack={(a) => {
                    props.changeCategory(a);
                  }}
                />
              </div>
              <div className="select-categories mt-3">
                <Select
                  key={Date.now()}
                  mode="tags"
                  defaultValue={[]}
                  showSearch
                  style={{width: "100%"}}
                  placeholder="Select a person"
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
              <div className="pane-button">
                {props.singlePost.linked  || props.updatePage ? (
                  <>
                    <Button
                      onClick={(ev) =>
                        props.updatePost(
                          media_id,
                          props.redirectedUrl
                        )
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
