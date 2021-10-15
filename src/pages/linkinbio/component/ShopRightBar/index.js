import React, {useEffect, useState, useRef} from "react";
import Video from "../../../../components/Video";
import {Row, Col, Button} from "reactstrap";
import moment from "moment";
import {Select} from "antd";
import Loader from "../../../../components/Loader";
import InputValidation from "../../../../components/InputValidation";
import Formsy from "formsy-react";
import {DatePicker} from "antd";
import "antd/dist/antd.css";

const {Option} = Select;
const {RangePicker} = DatePicker;
const dateFormat = "YYYY-MM-DD";

const ShopRightBar = (props) => {
  const [subCategories, setSubCategories] = useState([]);
  const media_id = props.singlePost.id
    ? props.singlePost.id
    : props.singlePost.media_id;
  const redirectedUrlRef = useRef(null);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [showDateRange, setDateRange] = useState(false);
  const formRef = useRef("");

  useEffect(() => {
    console.log("start date");
    console.log(props.startDate);
    console.log("end date");
    console.log(props.endDate);
    setSubCategories(props.subCategories);
  }, [
    props.subCategories,
    props.changeSubCategory,
    props.changePostType,
    props.postType,
  ]);

  useEffect(() => {}, [props.startDate, props.endDate]);

  function dateRangePickerChanger(value, dataString) {
    let startDate = dataString[0];
    let endDate = dataString[1];
    setStartDate(startDate);
    setEndDate(endDate);
    props.dateRange(startDate, endDate);
  }

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
              {props.redirectedUrl ? "Edit Post" : "Add Post"}
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

              <div className="date-range mt-3">
                {props.startDate && props.endDate && (
                  <RangePicker
                    key={1}
                    defaultValue={[
                      moment(props.startDate),
                      moment(props.endDate),
                    ]}
                    defaultPickerValue={moment(new Date(), "YYYY-MM-DD")}
                    allowClear={false}
                    ranges={{
                      Today: [moment(), moment()],
                      Today: [moment(), moment()],
                      Tomorrow: [
                        moment().add(1, "days"),
                        moment().add(1, "days"),
                      ],
                      "This Month": [
                        moment().startOf("month"),
                        moment().endOf("month"),
                      ],
                    }}
                    style={{width: "100%"}}
                    format={dateFormat}
                    onChange={dateRangePickerChanger}
                  />
                )}
              </div>
              <div className="pane-button">
                {props.singlePost.linked || props.updatePage ? (
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
                              className="update-buttons"
                              color="primary"
                              onClick={(ev) =>
                                props.updatePost(media_id, props.redirectedUrl)
                              }
                            >
                              &nbsp;Update&nbsp;
                            </Button>
                          </Col>
                          <Col lg="3" sm="6" xs="6">
                            <Button
                              className="update-buttons"
                              color="primary"
                              onClick={() => props.testUrl(props.redirectedUrl)}
                            >
                              &nbsp;Test&nbsp;
                            </Button>
                          </Col>
                          <Col lg="3" sm="6" xs="6">
                            <Button
                              className="update-buttons"
                              color="primary"
                              onClick={() => {
                                props.selectPost(false, "");
                                props.closeModel(false);
                              }}
                            >
                              &nbsp;Cancel&nbsp;
                            </Button>
                          </Col>
                          <Col lg="3" sm="6" xs="6">
                            <Button
                              className="update-buttons"
                              color="primary"
                              onClick={() => props.deletePost(media_id)}
                            >
                              &nbsp;Remove&nbsp;
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
                              className="update-buttons save-btn btn btn-primary"
                              color="primary"
                              onClick={(ev) =>
                                props.savePost && props.savePost(this)
                              }
                            >
                              &nbsp;Save&nbsp;
                            </Button>
                          </Col>
                          <Col lg="4" sm="6" xs="6">
                            <Button
                              className="update-buttons"
                              color="primary"
                              onClick={() => props.testUrl(props.redirectedUrl)}
                            >
                              &nbsp;Test&nbsp;
                            </Button>
                          </Col>
                          <Col lg="4" sm="6" xs="6">
                            <Button
                              className="update-buttons"
                              color="primary"
                              onClick={() => {
                                props.selectPost(false, "");
                                props.closeModel(false);
                              }}
                            >
                              &nbsp;Cancel&nbsp;
                            </Button>
                          </Col>
                        </Row>
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
