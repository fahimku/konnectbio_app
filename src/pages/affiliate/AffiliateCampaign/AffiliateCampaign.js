import React from "react";
// import SummaryDataComponent from "./SummaryDataComponent";

class AffiliateCampaign extends React.Component {
  state = {
    username: this.props.username,
  };

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <h3>Affiliate Campaign</h3>
          {/* <SummaryDataComponent username={this.state.username} /> */}
        </div>
      </React.Fragment>
    );
  }
}
export default AffiliateCampaign;
