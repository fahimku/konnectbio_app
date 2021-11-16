import React from "react";
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
          {/* <SummaryDataComponent username={this.state.username} /> */}
        </div>
      </React.Fragment>
    );
  }
}
export default AffiliateDashboard;
