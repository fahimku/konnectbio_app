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
          <h3>Summary</h3>
          <SummaryDataComponent username={this.state.username} />
        </div>
      </React.Fragment>
    );
  }
}

export default SummaryComponent;