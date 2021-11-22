import React from "react";
import AffiliateSummaryComponent from "./AffiliateSummaryComponent";
// import SummaryDataComponent from "./SummaryDataComponent";

class AffiliateDashboard extends React.Component {
  state = {
    username: this.props.username,
  };

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <h3>Dashboard</h3>
          <AffiliateSummaryComponent username={this.state.username} />
        </div>
      </React.Fragment>
    );
  }
}
export default AffiliateDashboard;
