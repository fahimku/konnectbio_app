import React from "react";
import "antd/dist/antd.css";
import SummaryDataComponent from "./SummaryDataComponent";

class SummaryComponent extends React.Component {
  state = {
    username: this.props.username,
  };

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <h4 className="page-title">Summary</h4>
          <SummaryDataComponent username={this.state.username} />
        </div>
      </React.Fragment>
    );
  }
}

export default SummaryComponent;