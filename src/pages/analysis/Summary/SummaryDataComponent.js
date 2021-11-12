import axios from "axios";
import React from "react";
import { Row, Col } from "react-bootstrap";
import moment from "moment";
import Loader from "../../../components/Loader/Loader"; // eslint-disable-line css-modules/no-unused-class
import { DatePicker } from "antd";
import "antd/dist/antd.css";

const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

const twodecimalplace = (value = 0) => {
  if (value) {
    return parseFloat(value).toFixed(2);
  }
};
const numberWithCommas = (x) => {
  if (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};
class SummaryDataComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      data: "",
      loading: false,
      fromDate: moment().startOf("year").format("YYYY-MM-DD"),
      toDate: moment(new Date()).format("YYYY-MM-DD"),
      today: moment(new Date()).format("YYYY-MM-DD"),
      lastYear: moment().startOf("year").format("YYYY-MM-DD"),
      page: 1,
      limit: 6,
      previous: "",
    };
    this.dateRangePickerChanger = this.dateRangePickerChanger.bind(this);
  }

  componentDidMount() {
    this.fetchSummeryPerformance(
      this.state.username,
      this.state.lastYear,
      moment(new Date()).format("YYYY-MM-DD"),
      this.state.limit,
      this.state.page
    );
  }
  fetchSummeryPerformance = async (username, fromDate, toDate, limit, page) => {
    this.setState({ loading: true });
    await axios
      .post("analytics/receive/analyseSummary", {
        username: username,
        from_date: fromDate,
        to_date: toDate,
        page: page,
        limit: limit,
        post_type: "image",
      })
      .then((response) => {
        this.setState({ data: response.data.message, loading: false });
      });
  };

  dateRangePickerChanger(value, dataString) {
    let fromDate = dataString[0];
    let toDate = dataString[1];
    this.setState({ fromDate: fromDate, toDate: toDate });
    this.fetchSummeryPerformance(
      this.state.username,
      fromDate,
      toDate,
      this.state.limit,
      1
    );
  }

  disabledDate(current) {
    return current && current > moment().endOf("day");
  }

  render() {
    const data = this.state.data;
    return (
      <>
        <Row className="summary-tab">
          <Col xs={12} xl={4} md={6}>
            <Row>
              <Col xs={12} xl={6} md={6}>
                <p>Select Start Date / End Date</p>
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
            </Row>
          </Col>
        </Row>
        <hr />
        {this.state.loading ? (
          <Loader className="analytics-loading" size={60} />
        ) : (
          <Row>
            <Col xs={12} xl={4} md={6}>
              <div className="card summary-box">
                <div className="row summary-main-box">
                  <div className="col-12 count-box">
                    <h5 className="count-title">Total Impressions</h5>
                    <h3 className="count">
                      {data.post_views === 0
                        ? "0"
                        : numberWithCommas(data.post_views)}
                    </h3>
                  </div>
                  <div className="col-12 count-box">
                    <h5 className="count-title">Total Clicks</h5>
                    <h3 className="count">
                      {data.post_clicks === 0
                        ? "0"
                        : numberWithCommas(data.post_clicks)}
                    </h3>
                  </div>
                  <div className="col-12 count-box">
                    <h5 className="count-title">Engagement</h5>
                    <h3 className="count">
                      {data.ctr === null ? "-" : twodecimalplace(data.ctr)}%
                    </h3>
                  </div>
                  <div className="col-12 count-box">
                    <h5 className="count-title">Revenue</h5>
                    <h3 className="count">{data.revenue}</h3>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </>
    );
  }
}
export default SummaryDataComponent;
