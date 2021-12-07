import React from "react";
import "antd/dist/antd.css";
import CampaignDataComponent from "./CampaignDataComponent";
import AffiliateDataComponent from "./AffiliateDataComponent";

class CampaignAnalytics extends React.Component {
  state = {
    username: this.props.username,
    packageName: this.props.packageName,
  };

  render() {
    return (
      <>
        <div className="container-fluid">
          <h4 className="page-title">Campaign Performance</h4>
          {this.state.packageName === "Influencer" ||
          this.state.packageName === "Micro Influencer" ? (
            <CampaignDataComponent username={this.state.username} />
          ) : (
            <AffiliateDataComponent username={this.state.username} />
          )}
        </div>
      </>
    );
  }
}
export default CampaignAnalytics;
