import axios from "axios";
import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import moment from "moment";
import Loader from "../../../components/Loader/Loader"; // eslint-disable-line css-modules/no-unused-class
import { DatePicker } from "antd";
import "antd/dist/antd.css";

const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

const limitCharacter = (text, limit = 20) => {
  let shortText = text;
  if (text && text.length > limit) {
    shortText = text.slice(0, limit) + "...";
  }
  return shortText;
};
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
      // fromDate: moment().startOf("year").format("YYYY-MM-DD"),
      // toDate: moment(new Date(), "YYYY-MM-DD"),
      // today: moment().startOf("year").format("YYYY-MM-DD"),
      // lastSevenDays: moment().subtract(7, "days").format("YYYY-MM-DD"),
      fromDate: "",
      toDate: "",
      today: moment(new Date()).format("YYYY-MM-DD"),
      lastYear: moment().startOf("year").format("YYYY-MM-DD"),
      page: 1,
      limit: 6,
      previous: "",
    };
    this.dateRangePickerChanger = this.dateRangePickerChanger.bind(this);
  }

  componentDidMount() {
    // const date_to = moment(this.state.today).format("YYYY-MM-DD");
    this.fetchPostPerformance(
      this.state.username,
      this.state.lastYear,
      "2021-10-20",
      this.state.limit,
      this.state.page
    );
  }
  async fetchPostPerformance(username, fromDate, toDate, limit, page) {
    this.setState({ loading: true });
    await axios
      .post("analytics/receive/analyseAllPosts", {
        username: username,
        from_date: fromDate,
        to_date: toDate,
        page: page,
        limit: limit,
        post_type: "image",
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
      })
      .catch((error) => {
        console.log(error, "error");
      });
  }
  dateRangePickerChanger(value, dataString) {
    let fromDate = dataString[0];
    let toDate = dataString[1];
    this.setState({ fromDate: fromDate, toDate: toDate });
    this.fetchPostPerformance(
      this.state.username,
      fromDate,
      toDate,
      this.state.limit,
      1
    );
  }
  pagination = () => {
    let { username, fromDate, toDate, limit, page } = this.state;
    this.fetchPostPerformance(username, fromDate, toDate, limit, page);
  };
  paginationPrev = () => {
    let { username, fromDate, toDate, limit, previous } = this.state;
    this.fetchPostPerformance(username, fromDate, toDate, limit, previous);
  };
  disabledDate(current) {
    return current && current > moment().endOf("day");
  }

  render() {
    return (
      <>
        <Row>
          <Col xs={12} xl={12} md={12}>
            <RangePicker
              disabledDate={this.disabledDate}
              key={4}
              defaultValue={[
                moment(this.state.lastYear),
                moment(this.state.today),
              ]}
              defaultPickerValue={moment(new Date(), "YYYY-MM-DD")}
              allowClear={false}
              ranges={{
                Today: [moment(), moment()],
                Tomorrow: [moment().add(1, "days"), moment().add(1, "days")],
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
              style={{ width: "20%" }}
              format={dateFormat}
              onChange={this.dateRangePickerChanger.bind(this)}
            />
          </Col>
        </Row>
        <hr />
        {this.state.loading ? (
          <Loader className="analytics-loading" size={60} />
        ) : (
          <>
            <Row>
              {!this.state.data.length ? (
                <div className="no-data">No Data Available</div>
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
                            <div className="card-block px-2">
                              <p className="card-text">
                                {record.caption === ""
                                  ? "No Caption Added"
                                  : limitCharacter(record.caption, 55)}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="row count-main-box">
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
                          </div>
                          {/* <div className="col-6 count-box">
                        <h4>Date Start</h4>
                        <h3 className="count">1st October 2021</h3>
                      </div>
                      <div className="col-6 count-box">
                        <h4>Date Start</h4>
                        <h3 className="count">31st October 2021</h3>
                      </div> */}
                        </div>
                      </div>
                    </Col>
                  </>
                ))
              )}
            </Row>
          </>
        )}
        {this.state.loading || !this.state.data.length ? null : (
          <div className="text-right">
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