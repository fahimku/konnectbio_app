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
          <h4 className="page-title">Affiliate Publish Performance</h4>
          <AffiliateDataComponent username={this.state.username} />
          {/* {this.state.packageName === "Basic" ? (
            <CampaignDataComponent username={this.state.username} />
          ) : (
            
          )} */}
        </div>
      </>
    );
  }
}
export default CampaignAnalytics;
