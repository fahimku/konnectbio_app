import React, { useEffect, useState, useRef } from "react";
import Video from "../../../../components/Video";
import { Button } from "reactstrap";
import moment from "moment";
import { Select } from "antd";
import Loader from "../../../../components/Loader";
import InputValidation from "../../../../components/InputValidation";
import Formsy from "formsy-react";
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import PermissionHelper from "../../../../components/PermissionHelper";

const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

const ShopRightBar = (props) => {
  const media_id = props.singlePost.post_id;
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [redirectedUrl, setRedirectedUrl] = useState("");
  const formRef = useRef("LinkForm");

  useEffect(() => {
    setStartDate(props.startDate);
    setEndDate(props.endDate);
  }, [props.startDate, props.endDate]);

  useEffect(() => {
    setRedirectedUrl(props.redirectedUrl);
  }, [props.redirectedUrl]);

  function dateRangePickerChanger(value, dataString) {
    let startDate = dataString[0];
    let endDate = dataString[1];
    props.dateRange(startDate, endDate);
  }
  return (
    <>
      {props.startDate && props.endDate && (
        <Formsy.Form
          onValidSubmit={() => {
            if (props.updatePage) {
              props.updatePost();
            } else {
              props.savePost && props.savePost(this);
            }
          }}
          ref={formRef}
        >
          <div
            className={`image-edit-box ${
              props.isSelectPost ? "show" : "hidden"
            }`}
          >
            <span
              onClick={() => props.selectPost(false, "")}
              className="fa fa-times ift-cancel"
            ></span>
            <div className="ind-post-anlytics image-box-info">
              <div className="edit-left">
                <h4>{props.redirectedUrl ? "Edit Post" : "Add Post"}</h4>
                <p>
                  {props.redirectedUrl ? (
                    props.updatedDate === "" ? (
                      <span className="date-loader">
                        <Loader />
                      </span>
                    ) : (
                      "Updated on " +
                      moment.utc(props.updatedDate).format("MMM Do YYYY")
                    )
                  ) : (
                    "Posted on " +
                    moment.utc(props.singlePost.timestamp).format("MMM Do YYYY")
                  )}
                </p>
              </div>
             
              {props.redirectedUrl && (<>
                <div className="edit-right">
                <div className="an-col col-md-3">
                  <div className="an-col-inr">
                    <div className="an-content clearfix">
                      <span class="dash_icon-top">
                        <i class="fa fa-eye fa-2x" aria-hidden="true"></i>
                      </span>
                      <div class="imp-t text-right">{props.fetchUserPost.post_views}</div>
                      <div class="imp-tx text-uppercase text-muted text-right">
                        IMPRESSIONS
                      </div>
                    </div>
                  </div>
                </div>
                <div className="an-col col-md-3">
                  <div className="an-col-inr">
                    <div className="an-content clearfix">
                      <span class="dash_icon-top">
                        <i
                          class="fa fa-hand-pointer-o fa-2x"
                          aria-hidden="true"
                        ></i>
                      </span>
                      <div class="imp-t text-right">{props.fetchUserPost.post_clicks}</div>
                      <div class="imp-tx text-uppercase text-muted text-right">
                        CLICKS
                      </div>
                    </div>
                  </div>
                </div>
                <div className="an-col col-md-3">
                  <div className="an-col-inr">
                    <div className="an-content clearfix">
                      <span class="dash_icon-top">
                        <i
                          class="fa fa-handshake-o fa-2x"
                          aria-hidden="true"
                        ></i>
                      </span>
                      <div class="imp-t text-right">{ props.fetchUserPost.ctr}%</div>
                      <div class="imp-tx text-uppercase text-muted text-right">
                        ENGAGEMENT
                      </div>
                    </div>
                  </div>
                </div>
                <div className="an-col col-md-3">
                  <div className="an-col-inr">
                    <div className="an-content clearfix">
                      <span class="dash_icon-top">
                        <i class="fa fa-usd fa-2x" aria-hidden="true"></i>
                      </span>
                      <div class="imp-t text-right">$0.00</div>
                      <div class="imp-tx text-uppercase text-muted text-right">
                        REVENUE
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                </>)
            }
            </div>
          

            <div className="image-wrapper">
              <div className="image-box">
                {props.singlePost.media_type !== "VIDEO" && (
                  <img src={`${props.singlePost.media_url}`} alt="media_url" />
                )}
                {props.singlePost.media_type === "VIDEO" && (
                  <Video src={props.singlePost.media_url} />
                )}
              </div>
              <div className="image-edit-links">
                <label>URL</label>
                <InputValidation
                  className=""
                  placeholder="Please Enter Website Address"
                  type="text"
                  id="website"
                  required
                  name="website"
                  trigger="change"
                  validations={{
                    matchRegexp:
                      /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/,
                  }}
                  validationError={{
                    isUrl: "This value should be a valid url.",
                  }}
                  value={props.redirectedUrl}
                  onChange={(evt) => {
                    props.callBack(evt);
                  }}
                />

                <div className="select-categories mt-3">
                  <label>Select Category</label>
                  <Select
                    key={Date.now()}
                    value={props.category}
                    showSearch
                    style={{ width: "100%" }}
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
                    disabled={PermissionHelper.categoryCheck() ? true : false}
                  >
                    {props.categories.map(({ value, label }, i) => (
                      <Option value={value}>{label}</Option>
                    ))}
                  </Select>
                </div>

                {props.singlePost.media_type === "VIDEO" && (
                  <>
                    <div className="form-check form-check-inline mt-3">
                      <input
                        onChange={props.changePostType}
                        className="form-check-input"
                        type="radio"
                        checked={props.postType === "video" ? "checked" : ""}
                        name="postType"
                        id="inlineRadio1"
                        value="video"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio1"
                      >
                        Video
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        onChange={props.changePostType}
                        className="form-check-input"
                        type="radio"
                        checked={
                          props.postType === "advertisement" ? "checked" : ""
                        }
                        name="postType"
                        id="inlineRadio2"
                        value="advertisement"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio2"
                      >
                        Advertisement
                      </label>
                    </div>
                  </>
                )}

                <div className="date-range mt-3">
                  <label>BioShop</label>
                  <RangePicker
                    key={1}
                    defaultValue={[moment(startDate), moment(endDate)]}
                    value={[moment(startDate), moment(endDate)]}
                    defaultPickerValue={moment(new Date(), "YYYY-MM-DD")}
                    allowClear={false}
                    ranges={{
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
                    style={{ width: "100%" }}
                    format={dateFormat}
                    onChange={dateRangePickerChanger}
                  />
                </div>
                <div className="edit_button_main pane-button">
                  {props.singlePost.linked || props.updatePage ? (
                    <>
                      {props.loading ? (
                        <Button>
                          <Loader />
                        </Button>
                      ) : (
                        <>
                          <Button
                            className="custom_btns_ift"
                            color="primary"
                            onClick={(ev) =>
                              props.updatePost(media_id, props.redirectedUrl)
                            }
                          >
                            &nbsp;Update&nbsp;
                          </Button>

                          <Button
                            className="custom_btns_ift"
                            color="primary"
                            onClick={() => props.testUrl(props.redirectedUrl)}
                          >
                            &nbsp;Test&nbsp;
                          </Button>

                          <Button
                            className="custom_btns_ift"
                            color="primary"
                            onClick={() => {
                              props.selectPost(false, "");
                              props.closeModel(true);
                            }}
                          >
                            &nbsp;Cancel&nbsp;
                          </Button>

                          <Button
                            className="custom_btns_ift"
                            color="primary"
                            onClick={() => props.deletePost(media_id)}
                          >
                            &nbsp;Remove&nbsp;
                          </Button>
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
                          <Button
                            className="custom_btns_ift"
                            color="primary"
                            // onClick={(ev) =>
                            //   props.savePost && props.savePost(this)
                            // }
                          >
                            &nbsp;Save&nbsp;
                          </Button>

                          <Button
                            className="custom_btns_ift"
                            color="primary"
                            onClick={() => props.testUrl(props.redirectedUrl)}
                          >
                            &nbsp;Test&nbsp;
                          </Button>

                          <Button
                            className="custom_btns_ift"
                            color="primary"
                            onClick={() => {
                              props.selectPost(false, "");
                              props.closeModel(false);
                            }}
                          >
                            &nbsp;Cancel&nbsp;
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
      )}
    </>
  );
};
export default ShopRightBar;