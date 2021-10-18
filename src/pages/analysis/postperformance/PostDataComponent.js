import axios from "axios";
import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import moment from "moment";
import Loader from "../../../components/Loader/Loader"; // eslint-disable-line css-modules/no-unused-class
import { DatePicker } from "antd";
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
class PostDataComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      data: [],
      loading: false,
      fromDate: moment().startOf("year").format("YYYY-MM-DD"),
      toDate: moment(new Date(), "YYYY-MM-DD"),
      // today: moment().startOf("year").format("YYYY-MM-DD"),
      // lastSevenDays: moment().subtract(7, "days").format("YYYY-MM-DD"),
      page: 1,
      limit: 6,
    };
    this.dateRangePickerChanger = this.dateRangePickerChanger.bind(this);
  }

  componentDidMount() {
    // const date_to = moment(this.state.today).format("YYYY-MM-DD");
    this.fetchPostPerformance(this.state.username, "2020-01-01", "2021-12-31");
    // this.fetchPostPerformance(
    //   this.state.username,
    //   this.state.toDate,
    //   moment(new Date(), "YYYY-MM-DD")
    // );
  }

  fetchPostPerformance(username, fromDate, toDate) {
    this.setState({ loading: true });
    axios
      .post("analytics/receive/analyseAllPosts", {
        username: username,
        from_date: fromDate,
        to_date: toDate,
      })
      .then((response) => {
        this.setState({ data: response.data.message, loading: false });
        // if (response.data.message.hasOwnProperty("next")) {
        //   this.setState({ page: response.data.message.next.page });
        // } else {
        //   this.setState({ page: 0 });
        // }
      });
  }
  dateRangePickerChanger(value, dataString) {
    let fromDate = dataString[0];
    let toDate = dataString[1];
    this.setState({ fromDate: fromDate, toDate: toDate });
    this.fetchPostPerformance(this.state.username, fromDate, toDate);
  }
  pagination = () => {
    let { username, fromDate, toDate, limit, page } = this.state;
    this.fetchPostPerformance(username, fromDate, toDate, limit, page);
  };

  render() {
    console.log(this.state.page, "page");
    return (
      <>
        {this.state.loading ? (
          <Loader className="analytics-loading" size={60} />
        ) : (
          <React.Fragment>
            {/* <Row>
              <Col xs={12} xl={12} md={12}>
                <RangePicker
                  key={2}
                  defaultValue={[
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
                  style={{ width: "20%" }}
                  format={dateFormat}
                  onChange={this.dateRangePickerChanger.bind(this)}
                />
                <hr />
              </Col>
            </Row> */}
            <Row>
              {this.state.data.map((record) => (
                <React.Fragment>
                  <Col xs={12} xl={4} md={6}>
                    <div className="card analytic-box">
                      <div className="row">
                        <div className="col-4">
                          <img
                            src={record.media_url}
                            class="img-fluid media-image"
                            alt={record.media_type}
                          />
                        </div>
                        <div class="col-8 analytic-caption">
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
                          <h3 className="count">{record.views}</h3>
                        </div>
                        <div className="col-6 count-box">
                          <h5 className="count-title">Clicks</h5>
                          <h3 className="count">{record.clicks}</h3>
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
                </React.Fragment>
              ))}
            </Row>
          </React.Fragment>
        )}
        {/* {this.state.page !== 0 ? (
          <div className="text-right">
            <Button
              variant="primary"
              // className="text-right"
              onClick={this.pagination}
            >
              Next
            </Button>
          </div>
        ) : null} */}
      </>
    );
  }
}
export default PostDataComponent;
