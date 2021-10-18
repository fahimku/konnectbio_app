import axios from "axios";
import React from "react";
import { Row, Col } from "react-bootstrap";
import moment from "moment";
import Loader from "../../../components/Loader/Loader"; // eslint-disable-line css-modules/no-unused-class
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

const limit = (text, limit = 20) => {
  let shortText = text;
  if (text && text.length > limit) {
    shortText = text.slice(0, limit) + "...";
  }
  return shortText;
};
class PostDataComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      data: [],
      loading: false,
      fromDate: moment(new Date()).format("YYYY-MM-DD"),
      toDate: moment().endOf("year").format("YYYY-MM-DD"),
      today: moment(new Date()).format("YYYY-MM-DD"),
      lastSevenDays: moment().subtract(7, "days").format("YYYY-MM-DD"),
    };
    this.dateRangePickerChanger = this.dateRangePickerChanger.bind(this);
  }

  componentDidMount() {
    const date_to = moment(this.state.today).format("YYYY-MM-DD");
    // this.fetchPostPerformance(this.state.username, "2020-01-01", "2021-12-31");
    this.fetchPostPerformance(
      this.state.username,
      this.state.today,
      moment().endOf("year").format("YYYY-MM-DD")
    );
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
      });
  }
  dateRangePickerChanger(value, dataString) {
    let fromDate = dataString[0];
    let toDate = dataString[1];
    this.setState({ fromDate: fromDate, toDate: toDate });
    this.fetchPostPerformance(this.state.username, fromDate, toDate);
  }

  render() {
    return (
      <>
        {this.state.loading ? (
          <Loader className="analytics-loading" size={60} />
        ) : (
          <React.Fragment>
            <Row>
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
                    "Get All Records": [
                      moment().subtract(200, "month"),
                      moment().add(200, "month"),
                    ],
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
            </Row>
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
                                : limit(record.caption, 55)}
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
                          <h3 className="count">4,607</h3>
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
      </>
    );
  }
}
export default PostDataComponent;
