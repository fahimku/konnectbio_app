import React from "react";
import AffiliateSummaryComponent from "./AffiliateSummaryComponent";

class AffiliateDashboard extends React.Component {
  state = {
    username: this.props.username,
  };

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <h4 className="page-title">Dashboard</h4>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-4">
            <AffiliateSummaryComponent username={this.state.username} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default AffiliateDashboard;
