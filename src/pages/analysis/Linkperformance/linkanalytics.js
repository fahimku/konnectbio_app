import axios from "axios";
import HtmlTable from "../../../components/HtmlTable/HtmlTable";
import React from "react";
import { DatePicker } from "antd";
import moment from "moment";
import "antd/dist/antd.css";
import LinkDataComponent from "./LinkDataComponent";

class LinkAnalytic extends React.Component {
  state = {
    username: this.props.username,
  };

  render() {
    return (
      <>
        <div className="container-fluid">
          <h3>Link Performance</h3>
          <LinkDataComponent username={this.state.username} />
        </div>
      </>
    );
  }
}
export default LinkAnalytic;
