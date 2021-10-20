import axios from "axios";
import HtmlTable from "../../../components/HtmlTable";
import React from "react";
import { DatePicker } from "antd";
import moment from "moment";
import "antd/dist/antd.css";
import PostDataComponent from "./PostDataComponent";

// const { RangePicker } = DatePicker;
// const dateFormat = "YYYY-MM-DD";

class PostAnalytic extends React.Component {
  state = {
    username: this.props.username,
  };

  // componentDidMount() {
  //   this.fetchPostPerformance(this.state.username, "2020-01-01", "2021-12-31");
  // }

  // fetchPostPerformance(username, fromDate, toDate) {
  //   axios
  //     .post("analytics/receive/analyseAllPosts", {
  //       username: username,
  //       from_date: fromDate,
  //       to_date: toDate,
  //     })
  //     .then((response) => {
  //       this.setState({ columns: response.data.message.columns });
  //       this.setState({ data: response.data.message.data });
  //     });
  // }

  render() {
    return (
      <>
        <div className="container-fluid">
          <h3>Post Performance</h3>
          <PostDataComponent username={this.state.username} />
        </div>
      </>
    );
  }
}
export default PostAnalytic;
