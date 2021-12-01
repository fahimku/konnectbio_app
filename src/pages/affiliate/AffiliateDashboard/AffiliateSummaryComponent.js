import axios from "axios";
import React from "react";
// import { Row, Col } from "react-bootstrap";
import moment from "moment";
import Loader from "../../../components/Loader/Loader"; // eslint-disable-line css-modules/no-unused-class
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { getCampaignSummary } from "../../../actions/campaignSummary";

const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

// const twodecimalplace = (value = 0) => {
//   if (value) {
//     return parseFloat(value).toFixed(2);
//   }
// };

// const numberWithCommas = (x) => {
//   if (x) {
//     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   }
// };

class AffiliateSummaryComponent extends React.Component {
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
    // this.fetchSummeryPerformance(
    //   this.state.username,
    //   this.state.lastYear,
    //   moment(new Date()).format("YYYY-MM-DD"),
    //   this.state.limit,
    //   this.state.page
    // );
    this.props.dispatch(
      getCampaignSummary(
        this.state.username,
        this.state.lastYear,
        moment(new Date()).format("YYYY-MM-DD")
      )
    );
  }
  // fetchSummeryPerformance = async (username, fromDate, toDate, limit, page) => {
  //   this.setState({ loading: true });
  //   await axios
  //     .post("analytics/receive/analyseSummary", {
  //       username: username,
  //       from_date: fromDate,
  //       to_date: toDate,
  //       page: page,
  //       limit: limit,
  //       post_type: "image",
  //     })
  //     .then((response) => {
  //       this.setState({ data: response.data.message, loading: false });
  //     });
  // };

  dateRangePickerChanger(value, dataString) {
    let fromDate = dataString[0];
    let toDate = dataString[1];
    this.setState({ fromDate: fromDate, toDate: toDate });
    this.props.dispatch(
      getCampaignSummary(this.state.username, fromDate, toDate)
    );
    // this.fetchSummeryPerformance(
    //   this.state.username,
    //   fromDate,
    //   toDate,
    //   this.state.limit,
    //   1
    // );
  }

  disabledDate(current) {
    return current && current > moment().endOf("day");
  }

  render() {
    const data = this.props.campaignSummary;
    console.log(data, "campaignSummary");
    return (
      <>
        <div className="summary_container_main container">
          <div className="row">
            <div className="summary_box_main col-md-6">
              <div className="summary_block_profile">
                <div className="summary_content_profile">
                  <label>Select Start Date / End Date</label>
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
                  {!data.loading ? (
                    <Loader className="analytics-loading" size={60} />
                  ) : (
                    <div className="card analytic-box">
                      <div className="col-12 count-box">
                        <h5 className="count-title">Total Campaigns</h5>
                        <h3 className="count">10</h3>
                      </div>
                      <div className="col-12 count-box">
                        <h5 className="count-title">Total Active Campaigns</h5>
                        <h3 className="count">5</h3>
                      </div>

                      <div className="col-12 count-box">
                        <h5 className="count-title">Total Budget</h5>
                        <h3 className="count">$40.00</h3>
                      </div>
                      <div className="col-12 count-box">
                        <h5 className="count-title">Total Clicks</h5>
                        <h3 className="count">90</h3>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
function mapStateToProps({ campaignSummary }) {
  return {
    campaignSummary: campaignSummary,
  };
}
export default connect(mapStateToProps)(AffiliateSummaryComponent);
