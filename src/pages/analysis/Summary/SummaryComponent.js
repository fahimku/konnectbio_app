import React from "react";
import "antd/dist/antd.css";
import SummaryDataComponent from "./SummaryDataComponent";
import CampaignSummaryComponent from "./CampaignSummaryComponent";

class SummaryComponent extends React.Component {
  state = {
    username: this.props.username,
  };

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              <h4 className="page-title">Post Summary</h4>
              <SummaryDataComponent username={this.state.username} />
            </div>
            <div className="col-md-4">
              <h4 className="page-title">Campaign Summary</h4>
              <CampaignSummaryComponent username={this.state.username} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SummaryComponent;
