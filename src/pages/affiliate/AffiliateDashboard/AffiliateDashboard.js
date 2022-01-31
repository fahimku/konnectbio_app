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
        <h4 className="page-title">Dashboard</h4>
          <div className="brand_container_main container">
            <div className="row">
              <AffiliateSummaryComponent username={this.state.username} /> 
            </div>
            </div>
        </div>
      </React.Fragment>
    );
  }
}
export default AffiliateDashboard;
