import React from "react";
import "antd/dist/antd.css";
import CampaignDataComponent from "./CampaignDataComponent";

class CampaignAnalytics extends React.Component {
  state = {
    username: this.props.username,
  };

  render() {
    return (
      <>
        <div className="container-fluid">
          <h4 className="page-title">Campaign Performance</h4>
          <CampaignDataComponent username={this.state.username} />
        </div>
      </>
    );
  }
}
export default CampaignAnalytics;
