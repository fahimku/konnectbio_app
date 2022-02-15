import React from "react";
import "antd/dist/antd.css";
import SummaryDataComponent from "./SummaryDataComponent";
import CampaignSummaryComponent from "./CampaignSummaryComponent";
import AffiliateSummaryComponent from "../../affiliate/AffiliateDashboard/AffiliateSummaryComponent";
import BioShopSummaryComponent from "./BioShopSummaryComponent";

class SummaryComponent extends React.Component {
  state = {
    username: this.props.username,
    packageName: this.props.packageName,
  };


  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <h4 className="page-title">Analytics</h4>
            </div>
            <div className="analytics-summery-box col-md-4">
              {/* <h4 className="page-title">Post Summary</h4> */}
              <BioShopSummaryComponent
                username={this.state.username}
                packageName={this.state.packageName}
              />
            </div>
            <div className="analytics-summery-box col-md-4">
              {/* <h4 className="page-title">Post Summary</h4> */}
              <SummaryDataComponent
                username={this.state.username}
                packageName={this.state.packageName}
              />
            </div>
            <div className="analytics-summery-box col-md-4">
              <CampaignSummaryComponent
                username={this.state.username}
                packageName={this.state.packageName}
              />
            </div>
            {this.state.packageName ==="61d695e9bccdaf69f46efc66" ? (
              <div className="analytics-summery-box col-md-4">
                <AffiliateSummaryComponent
                  username={this.state.username}
                  // className="col-md-12"
                />
              </div>
            ) : null}
            {/* {this.state.packageName ==="61c02d43f40bec74fac2c9a0" ? (
              <div className=" col-md-6 col-sm-6 col-lg-6 col-xl-4">
                <CampaignSummaryComponent username={this.state.username} />
              </div>
            ) : ( */}

            {/* )} */}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SummaryComponent;
