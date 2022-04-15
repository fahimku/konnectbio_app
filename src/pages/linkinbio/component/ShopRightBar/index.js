import React, { useEffect, useState, useRef } from "react";
import Video from "../../../../components/Video";
import {
  // Modal,
  // ModalHeader,
  // ModalBody,
  Button,
} from "reactstrap";
import moment from "moment";
import { Select } from "antd";
import Loader from "../../../../components/Loader";
import InputValidation from "../../../../components/InputValidation";
import Formsy from "formsy-react";
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import * as promo from "../../../../actions/promoRequest";
import PermissionHelper from "../../../../components/PermissionHelper";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import axios from "axios";
import numeral from "numeral";


const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

let userInfo;
let dataPromo;
let PassPromoCode;
var subPromo ;
var subDiscount;
  
function ShopRightBar(
  props,
  { getPromoRequest, promoRequest, PromoPayload }
) {
  if(typeof props.promo == 'object' && props.promo !== null){    
  }else{
  subPromo = props.promo;
  subDiscount = props.discount;
  
}
  const media_id = props.singlePost.post_id;
  
 
  const [startDate, setStartDate] = useState("");
  const [connNotFound, setconnFound] = useState(true);
  const [endDate, setEndDate] = useState("");
  const [redirectedUrl, setRedirectedUrl] = useState("");
  const [copyModal, setCopyModal] = useState(false);
  const formRef = useRef("LinkForm");
  const [promoCode, setPromoCode] = useState("");
  const [loader, setLoader] = useState(true);
  const [Kbfee, setKbfee] = useState();
  const [promoCodeDsc, setPromoCodeDsc] = useState({value: "KB0",
  label: "KB0",
  discount: "0%",})
  
  const [promoCodeVal, setPromoCodeVal] = useState({
    value: "KB0",
    label: "KB0",
    discount: "0%",
  });


useEffect(() => {
  userInfo = JSON.parse(localStorage.getItem("userInfo"));
  axios.post("/fee").then((res) =>{
    console.log(res)
    setKbfee(res.data.message)  
  }).catch((res) =>{
    
})
},[])

  useEffect(() => {
    setStartDate(props.startDate);
    setEndDate(props.endDate);
  }, [props.startDate, props.endDate]);

  useEffect(() => {
    setRedirectedUrl(props.redirectedUrl);
  }, [props.redirectedUrl]);

  useEffect(() => {
    props.selectPost(false, "");
    props.closeModel(false);
  }, [props.mobileDropdown]);

  useEffect(() =>{
    
  setLoader(false);
  props.getPromoRequest().then((res) => {
    setLoader(true);
   }).catch((res) =>{
    setconnFound(false);
  
  });
}, []);


useEffect(() =>{
if(typeof props.promo == 'object' && props.promo !== null){    
  console.log(props.promo)
  
}
 else{ 
  setPromoCodeVal({
    value: props.promo,
    label: props.promo,
    discount:props.discount
  })
  setPromoCodeDsc({
    value: props.promo,
    label: props.promo,
    discount:props.discount
  })
}
// setPromoCodeVal({
//   value: a,
//   label: a,
//   discount:b,
// });
 
},[props]);

if (loader == true) {
  dataPromo = props.promoRequest.message;
  
  const promo = dataPromo;

  if (dataPromo != undefined) {
    const selectState = [];
    promo.map((x) => {
      return selectState.push({
        value: x.promo,
        label: x.promo,
        discount: x.promo_percent,
      });
    });
    PassPromoCode = selectState;
    
  } else {
  }
}

const renderConValuePromoList = (x) => {
  const filterPromo = this.state.promoList.filter((item) => {
    if (item.label == x) {
      return item;
    }
  });
  if (filterPromo.length === 0) {
    return {
      value: "",
      label: "Select Promo",
      discount: "",
    };
  } else {
    return {
      value: filterPromo[0]?.value,
      label: filterPromo[0]?.label,
      discount: filterPromo[0]?.discount,
    };
  }
};
const renderConValue = (x) => {
  const exit = this.props.countries.filter(
    (item) => item.value === x.country
  );

  return exit[0] ? exit[0] : { value: "", label: "Select Country" };
};

  function dateRangePickerChanger(value, dataString) {
    let startDate = dataString[0];
    let endDate = dataString[1];
    props.dateRange(startDate, endDate);
  }



  const changePromoCode = (e, options,item) => {
    setPromoCodeVal(options);
    setPromoCodeDsc(e)
    
  }
  // };
  return (
    <>
      {props.startDate && props.endDate && (
        <Formsy.Form
          onValidSubmit={() => {
            if (props.updatePage) {
              props.updatePost();
            } else {
              props.savePost && props.savePost(this,promoCodeVal,promoCodeDsc);
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
                <h4>
                  {" "}
                  {props.singlePost.linked || props.updatePage
                    ? "Edit Post"
                    : "Add Post"}
                </h4>
                <p>
                  {props.singlePost.linked || props.updatePage
                    ? "Updated on " +
                      moment.utc(props.updatedDate).format("MMM Do YYYY")
                    : "Posted on " +
                      moment
                        .utc(props.singlePost.timestamp)
                        .format("MMM Do YYYY")}

                  {/* {props.media_id ? (
                    props.singlePost.linked || props.updatePage ? (
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
                  )} */}
                </p>
              </div>

              {media_id && (
                <>
                  <div className="edit-right">
                    <div className="an-col col-md-3">
                      <div className="an-col-inr">
                        <div className="an-content clearfix">
                          <span class="dash_icon-top">
                            <i class="fa fa-eye fa-2x" aria-hidden="true"></i>
                          </span>
                          <div class="imp-t text-right">
                            {props.fetchUserPost.post_views
                              ? props.fetchUserPost.post_views
                              : 0}
                          </div>
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
                          <div class="imp-t text-right">
                            {props.fetchUserPost.post_clicks
                              ? props.fetchUserPost.post_clicks
                              : 0}
                          </div>
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
                          <div class="imp-t text-right">
                            {props.fetchUserPost.ctr
                              ? props.fetchUserPost.ctr === "NaN"
                                ? 0
                                : props.fetchUserPost.ctr
                              : 0}
                            %
                          </div>
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
                </>
              )}
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
                <label>
                  URL/AFFILIATE LINK -{" "}
                  <a
                    onClick={() => {
                      Swal.fire({
                        title: "Note",
                        text: "You can add link of a website or affiliate link provided by an affiliate network, example: CJ, Rakuten, Amazon, etc",
                        confirmButtonColor: "#010b40",
                      });
                    }}
                    href="javascript:void(0);"
                  >
                    {" "}
                    Copy/Paste Link
                  </a>{" "}
                </label>
                <InputValidation
                  className=""
                  placeholder="Enter URL"
                  // placeholder="Please Enter Website Address"
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
                  <label>Start Date / End Date</label>
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

                {userInfo?.account_type == "influencer" ?
                <></>:
                <div className="mt-3 row">
                  <div className="col-md-3">
                    <label>PromoCode For Customers</label>
                    <Select
                    
                      name="promoCode"
                      
                      value={promoCodeVal}
                      onChange={(options, e) => changePromoCode(e, options,PassPromoCode)}
                      placeholder="Select PromoCode"
                      style={{ width: "100%" }}
                      //formatOptionLabel={promoCode}
                      // formatOptionLabel={formatOptionLabel}
                      options={PassPromoCode}
                      
                    />
                  </div>
                  <div className="col-md-3">
                    <label>Discount</label>
                    <div className="promo_discount form-control">
                    {/* {renderConValuePromoList(this.state.promoCodeVal)} */}
                    {promoCodeDsc.discount}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label>KB Fee</label>
                    <div className="promo_discount form-control">{numeral(Kbfee).format("0,0'")}%</div>
                  </div>
                </div>
}

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
                              props.updatePost(media_id, props.redirectedUrl,promoCodeDsc)
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

function mapStateToProps({
  getPromoRequest,
  promoRequest,

}) {
  return { getPromoRequest, promoRequest };
}
export default connect(mapStateToProps, {
  ...promo,
})(ShopRightBar);