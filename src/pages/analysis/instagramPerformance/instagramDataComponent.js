import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as instagramActions from "../../../actions/instagramAnalytic";
import Loader from "../../../components/Loader/Loader";
import { Row, Col, Button } from "react-bootstrap";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";
// import { DatePicker } from "antd";
// const { RangePicker } = DatePicker;
// const dateFormat = "YYYY-MM-DD";

function InstagramDataComponent({ getInstagramAnalytic, instagramAnalytic }) {
  const [searchLoading, setSearchLoading] = useState(false);
  const [clearLoading, setClearLoading] = useState(false);
  const [sortBy, setSortBy] = useState({
    value: "date",
    label: "DATE",
  });
  const [orderBy, setOrderBy] = useState({ value: "desc", label: "DESC" });
  // const fromDate = moment().subtract(4, "year").format("YYYY-MM-DD");
  // const toDate = moment(new Date()).format("YYYY-MM-DD");
  // const [startDate, setStartDate] = useState(fromDate);
  // const [endDate, setEndDate] = useState(toDate);

  useEffect(() => {
    getInstagramAnalytic();
  }, []);
  function onSubmitData(e) {
    e.preventDefault();
    // setSearchLoading(true);
    // getTags(
    //   {
    //     from_date: startDate.toString(),
    //     to_date: endDate.toString(),
    //     sort: sortBy.value,
    //     order_by: orderBy.value,
    //   },
    //   1
    // ).then(() => {
    //   setSearchLoading(false);
    // });
  }
  const clearMarketPlace = (e) => {
    setClearLoading(true);
    setSortBy({ value: "date", label: "DATE" });
    setOrderBy({ value: "desc", label: "DESC" });
    // getTags({
    //   from_date: fromDate.toString(),
    //   to_date: toDate.toString(),
    //   sort: "followers",
    //   order_by: "desc",
    // }).then(() => {
    //   setClearLoading(false);
    // });
  };

  const sortByOptions = [
    { value: "likes", label: "LIKE" },
    { value: "comments", label: "COMMENT" },
    { value: "engagement", label: "ENGAGEMENT" },
    { value: "impressions", label: "IMPRESSIONS" },
    { value: "reach", label: "REACH" },
    { value: "date", label: "DATE" },
  ];
  const sortOrderOptions = [
    { value: "asc", label: "ASC" },
    { value: "desc", label: "DESC" },
  ];

  // const dateRangePickerChanger = (value, dataString) => {
  //   const startDate = dataString[0];
  //   const endDate = dataString[1];
  //   setStartDate(startDate);
  //   setEndDate(endDate);
  // };

  const style = {
    control: (base) => ({
      ...base,
      height: "44px",
      boxShadow: "none",
      "&:hover": {
        // border: "1px solid black",
      },
    }),
  };

  return (
    <>
      <div class="instagram-analytics">
        <Row className="post-analytics-tab mb-4">
          <Col xs={12} xl={12} md={12}>
            <form onSubmit={onSubmitData}>
              <Row>
                {/* <Col xs={12} xl={2} md={6}>
                  <p>Select Start Date / End Date</p>
                  <RangePicker
                    key={4}
                    value={
                      startDate && endDate
                        ? [moment(startDate), moment(endDate)]
                        : []
                    }
                    allowClear={false}
                    ranges={{
                      Today: [moment(), moment()],
                      Tomorrow: [
                        moment().add(1, "days"),
                        moment().add(1, "days"),
                      ],
                      Yesterday: [
                        moment().subtract(1, "days"),
                        moment().subtract(1, "days"),
                      ],
                      "This Month": [
                        moment().startOf("month"),
                        moment().endOf("month"),
                      ],
                      "Last Month": [
                        moment().subtract(1, "month").startOf("month"),
                        moment().subtract(1, "month").endOf("month"),
                      ],
                    }}
                    format={dateFormat}
                    onChange={dateRangePickerChanger}
                  />
                </Col> */}
                <Col xs={12} xl={2} md={6}>
                  <p>Sort By</p>
                  <Select
                    value={sortBy}
                    name="sort"
                    className="selectCustomization"
                    options={sortByOptions}
                    onChange={(e) => {
                      setSortBy(e);
                    }}
                    placeholder="Sort By"
                    styles={style}
                  />
                </Col>
                <Col xs={12} xl={2} md={6}>
                  <p>Order By</p>
                  <Select
                    value={orderBy}
                    name="order"
                    className="selectCustomization"
                    options={sortOrderOptions}
                    onChange={(e) => {
                      setOrderBy(e);
                    }}
                    placeholder="Order By"
                    styles={style}
                  />
                </Col>
                <Col className="d-flex" xs={12} xl={2} md={6}>
                  {searchLoading ? (
                    <Button
                      type="button"
                      variant="primary"
                      className="fltr-hpr"
                    >
                      <Loader />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="primary"
                      className="fltr-hpr"
                    >
                      Search
                    </Button>
                  )}
                  {clearLoading ? (
                    <Button variant="gray" className="fltr-hpr btn-primary">
                      <Loader />
                    </Button>
                  ) : (
                    <Button
                      // onClick={clearMarketPlace}
                      variant="gray"
                      className="fltr-hpr btn-primary"
                    >
                      Reset
                    </Button>
                  )}
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
        <hr />
        {instagramAnalytic?.loading ? (
          <Loader size={30} />
        ) : instagramAnalytic?.insta_data?.length > 0 ? (
          <>
            <InfiniteScroll
              dataLength={instagramAnalytic?.insta_data?.length}
              next={() => {
                getInstagramAnalytic(instagramAnalytic?.pagination?.next, true);
              }}
              hasMore={instagramAnalytic?.pagination?.next ? true : false}
              loader={
                <div
                  style={{
                    height: 100,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Loader size={40} />
                </div>
              }
              // pullDownToRefreshThreshold={50}
            >
              <Row>
                {" "}
                {instagramAnalytic?.insta_data?.map((record) => (
                  <Col xs={12} xl={4} md={6}>
                    <div className="card analytic-box">
                      <div className="card-row row">
                        <div className="any-post-img-col col-5">
                          <div className="any-post-image">
                            <div className="any-image-box">
                              <div className="any-image-box-iner">
                                {record.media_type === "IMAGE" ? (
                                  <img
                                    src={record.media_url}
                                    className="img-fluid media-image"
                                    alt={record.media_type}
                                  />
                                ) : (
                                  <video
                                    className="img-fluid media-image"
                                    controlsList="nodownload"
                                  >
                                    <source
                                      src={record.media_url}
                                      type="video/mp4"
                                    ></source>
                                  </video>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-7 analytic-caption">
                          <div className="row count-main-box">
                            <div className="col-12 count-box">
                              <h5 className="count-title">Like Count</h5>
                              <h3 className="count">{record.like_count}</h3>
                            </div>
                            <div className="col-12 count-box">
                              <h5 className="count-title">Comment Count</h5>
                              <h3 className="count">{record.comments_count}</h3>
                            </div>
                            <div className="col-12 count-box">
                              <h5 className="count-title">Engagement</h5>
                              <h3 className="count">
                                {record.insights[0].engagement}
                              </h3>
                            </div>
                            <div className="col-12 count-box">
                              <h5 className="count-title">Impressions</h5>
                              <h3 className="count">
                                {record.insights[1].impressions}
                              </h3>
                            </div>
                            <div className="col-12 count-box">
                              <h5 className="count-title">Reach</h5>
                              <h3 className="count">
                                {record.insights[2].reach}
                              </h3>
                            </div>
                            <div className="col-12 count-box">
                              <h5 className="count-title">Posted Date</h5>
                              <h3 className="count">
                                {moment(record.timestamp).format("YYYY-MM-DD")}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </InfiniteScroll>
          </>
        ) : (
          <div
            style={{
              height: 300,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1 style={{ textAlign: "center" }}>No result Found</h1>
          </div>
        )}
      </div>
    </>
  );
}
function mapStateToProps({ instagramAnalytic }) {
  return {
    instagramAnalytic,
  };
}
export default connect(
  mapStateToProps,
  instagramActions
)(InstagramDataComponent);
