import axios from "axios";
import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import moment from "moment";
import Loader from "../../../components/Loader/Loader"; // eslint-disable-line css-modules/no-unused-class
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import Select from "react-select";

const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

// const limitCharacter = (text, limit = 20) => {
//   let shortText = text;
//   if (text && text.length > limit) {
//     shortText = text.slice(0, limit) + "...";
//   }
//   return shortText;
// };
const twodecimalplace = (value = 0) => {
  return parseFloat(value).toFixed(2);
};
const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
class PostDataComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      data: [],
      loading: false,
      fromDate: moment().startOf("year").format("YYYY-MM-DD"),
      toDate: moment(new Date()).format("YYYY-MM-DD"),
      today: moment(new Date()).format("YYYY-MM-DD"),
      lastYear: moment().startOf("year").format("YYYY-MM-DD"),
      page: 1,
      limit: 9,
      previous: "",
      myCategory: "",
      saveCategory: "",
      optionCategory: "",
      saveSort: "",
      optionSort: "",
      saveSortOrder: "asc",
      optionSortOrder: "",
    };
    this.dateRangePickerChanger = this.dateRangePickerChanger.bind(this);
  }

  componentDidMount() {
    // const date_to = moment(this.state.today).format("YYYY-MM-DD");
    this.fetchPostPerformance(
      this.state.username,
      this.state.lastYear,
      moment(new Date()).format("YYYY-MM-DD"),
      this.state.limit,
      this.state.page,
      "",
      "",
      "asc"
    );
    this.fetchMyCategory();
  }
  async fetchPostPerformance(
    username,
    fromDate,
    toDate,
    limit,
    page,
    categoryId,
    sortId,
    orderBy
  ) {
    this.setState({ loading: true });
    await axios
      .post("analytics/receive/analyseAllPosts", {
        username: username,
        from_date: fromDate,
        to_date: toDate,
        page: page,
        limit: limit,
        post_type: "image",
        category_id: categoryId,
        sort: sortId,
        order_by: orderBy,
      })
      .then((response) => {
        this.setState({ data: response.data.message.data, loading: false });
        if (response.data.message.hasOwnProperty("next")) {
          this.setState({ page: response.data.message.next.page });
        } else {
          this.setState({ page: 0 });
        }
        if (response.data.message.hasOwnProperty("previous")) {
          this.setState({ previous: response.data.message.previous.page });
        } else {
          this.setState({ previous: 0 });
        }
      });
  }
  fetchMyCategory = async () => {
    await axios
      .get("/users/receive/categories")
      .then((response) => {
        const selectCategories = [];
        const myCategories = response.data.message;
        myCategories.map(({ category_id, category_name, image_url }) => {
          return selectCategories.push({
            value: category_id,
            label: category_name,
            image: image_url,
          });
        });
        this.setState({ myCategory: selectCategories });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  dateRangePickerChanger(value, dataString) {
    let fromDate = dataString[0];
    let toDate = dataString[1];
    this.setState({ fromDate: fromDate, toDate: toDate });
    // this.fetchPostPerformance(
    //   this.state.username,
    //   fromDate,
    //   toDate,
    //   this.state.limit,
    //   1
    // );
  }
  pagination = () => {
    let { username, fromDate, toDate, limit, page } = this.state;
    this.fetchPostPerformance(
      username,
      fromDate,
      toDate,
      limit,
      page,
      this.state.saveCategory,
      this.state.saveSort,
      this.state.saveSortOrder
    );
  };
  paginationPrev = () => {
    let { username, fromDate, toDate, limit, previous } = this.state;
    this.fetchPostPerformance(
      username,
      fromDate,
      toDate,
      limit,
      previous,
      this.state.saveCategory,
      this.state.saveSort,
      this.state.saveSortOrder
    );
  };
  disabledDate(current) {
    return current && current > moment().endOf("day");
  }
  handleSelect = (event) => {
    this.setState({
      saveCategory: event.value,
      optionCategory: event,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();

    this.fetchPostPerformance(
      this.state.username,
      this.state.fromDate,
      this.state.toDate,
      this.state.limit,
      1,
      this.state.saveCategory,
      this.state.saveSort,
      this.state.saveSortOrder
    );
  };
  clearFilter = () => {
    this.setState({
      optionCategory: "",
      optionSort: "",
      optionSortOrder: "",
      fromDate: moment().startOf("year").format("YYYY-MM-DD"),
      toDate: moment(new Date()).format("YYYY-MM-DD"),
    });
    this.fetchPostPerformance(
      this.state.username,
      this.state.lastYear,
      moment(new Date()).format("YYYY-MM-DD"),
      this.state.limit,
      1,
      "",
      "",
      this.state.saveSortOrder
    );
  };
  handleSort = (event) => {
    this.setState({
      saveSort: event.value,
      optionSort: event,
    });
  };
  handleSortOrder = (event) => {
    this.setState({
      saveSortOrder: event.value,
      optionSortOrder: event,
    });
  };

  render() {
    const sortOptions = [
      // { value: "date", label: "Date" },
      { value: "impressions", label: "Impressions" },
      { value: "clicks", label: "Clicks" },
      { value: "engagement", label: "Engagement" },
      // { value: "revenue", label: "Revenue" },
    ];
    const sortOrderOptions = [
      { value: "asc", label: "ASC" },
      { value: "desc", label: "DESC" },
    ];
    const style = {
      control: (base, state) => ({
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
        <Row className="post-analytics-tab">
          <Col xs={12} xl={12} md={12}>
            <form onSubmit={this.handleSubmit}>
              <Row>
                <Col xs={12} xl={2} md={6}>
                  <p>Select Start Date / End Date</p>
                  <RangePicker
                    disabledDate={this.disabledDate}
                    key={4}
                    defaultValue={[
                      moment(this.state.lastYear),
                      moment(this.state.today),
                    ]}
                    value={[
                      moment(this.state.fromDate),
                      moment(this.state.toDate),
                    ]}
                    defaultPickerValue={moment(new Date(), "YYYY-MM-DD")}
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
                    onChange={this.dateRangePickerChanger.bind(this)}
                  />
                </Col>
                <Col xs={12} xl={2} md={6}>
                  <p>Select Category</p>
                  <Select
                    name="category"
                    className="selectCustomization"
                    options={this.state.myCategory}
                    value={this.state.optionCategory}
                    placeholder="Select Category"
                    onChange={(event) => this.handleSelect(event)}
                    styles={style}
                  />
                </Col>
                <Col xs={12} xl={2} md={6}>
                  <p>Sort By</p>
                  <Select
                    name="sort"
                    className="selectCustomization"
                    options={sortOptions}
                    value={this.state.optionSort}
                    placeholder="Sort By"
                    onChange={(event) => this.handleSort(event)}
                    styles={style}
                  />
                </Col>
                <Col xs={12} xl={2} md={6}>
                  <p>Order By</p>
                  <Select
                    name="sort"
                    className="selectCustomization"
                    options={sortOrderOptions}
                    value={
                      this.state.optionSortOrder === ""
                        ? { value: "asc", label: "ASC" }
                        : this.state.optionSortOrder
                    }
                    placeholder="Order By"
                    onChange={(event) => this.handleSortOrder(event)}
                    isDisabled={this.state.optionSort === "" ? true : false}
                    styles={style}
                  />
                </Col>
                <Col xs={12} xl={2} md={6}>
                  <Button
                    type="submit"
                    variant="primary"
                    className="post-search btn-block"
                  >
                    Search
                  </Button>
                </Col>
                <Col xs={12} xl={2} md={6}>
                  <Button
                    onClick={this.clearFilter}
                    variant="gray"
                    className="post-search btn-block"
                  >
                    Clear
                  </Button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>

        <hr />
        {this.state.loading ? (
          <Loader className="analytics-loading" size={60} />
        ) : (
          <>
            <Row>
              {!this.state.data.length ? (
                <div className="no-data col-md-12">No Data Available</div>
              ) : (
                this.state.data.map((record) => (
                  <>
                    <Col xs={12} xl={4} md={6}>
                      <div className="card analytic-box">
                        <div className="row">
                          <div className="col-4">
                            <img
                              src={record.media_url}
                              className="img-fluid media-image"
                              alt={record.media_type}
                            />
                          </div>
                          <div className="col-8 analytic-caption">
                            {/* <div className="card-block px-2">
                              <p className="card-text">
                                {record.caption === ""
                                  ? "No Caption Added"
                                  : limitCharacter(record.caption, 55)}
                              </p>
                            </div> */}
                            <div className="row count-main-box">
                              <div className="col-12 count-box">
                                <h5 className="count-title">Impressions</h5>
                                <h3 className="count">
                                  {numberWithCommas(record.views)}
                                </h3>
                              </div>
                              <div className="col-12 count-box">
                                <h5 className="count-title">Clicks</h5>
                                <h3 className="count">
                                  {numberWithCommas(record.clicks)}
                                </h3>
                              </div>
                              <div className="col-12 count-box">
                                <h5 className="count-title">Engagement</h5>
                                <h3 className="count">
                                  {twodecimalplace(record.ctr)}%
                                </h3>
                              </div>
                              <div className="col-12 count-box">
                                <h5 className="count-title">Revenue</h5>
                                <h3 className="count">{record.revenue}</h3>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div className="row count-main-box">
                          <div className="col-6 count-box">
                            <h5 className="count-title">Impressions</h5>
                            <h3 className="count">
                              {numberWithCommas(record.views)}
                            </h3>
                          </div>
                          <div className="col-6 count-box">
                            <h5 className="count-title">Clicks</h5>
                            <h3 className="count">
                              {numberWithCommas(record.clicks)}
                            </h3>
                          </div>
                          <div className="col-6 count-box">
                            <h5 className="count-title">Engagement</h5>
                            <h3 className="count">
                              {twodecimalplace(record.ctr)}%
                            </h3>
                          </div> */}
                        {/* <div className="col-6 count-box">
                        <h4>Date Start</h4>
                        <h3 className="count">1st October 2021</h3>
                      </div>
                      <div className="col-6 count-box">
                        <h4>Date Start</h4>
                        <h3 className="count">31st October 2021</h3>
                      </div> */}
                        {/* </div> */}
                      </div>
                    </Col>
                  </>
                ))
              )}
            </Row>
          </>
        )}
        {this.state.loading || !this.state.data.length ? null : (
          <div className="text-right next-button">
            <Button
              variant="primary"
              onClick={this.paginationPrev}
              disabled={this.state.previous !== 0 ? false : true}
            >
              Prev
            </Button>
            <Button
              variant="primary"
              onClick={this.pagination}
              disabled={this.state.page !== 0 ? false : true}
            >
              Next
            </Button>
          </div>
        )}
      </>
    );
  }
}
export default PostDataComponent;
