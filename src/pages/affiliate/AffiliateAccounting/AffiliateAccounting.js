import React from "react";
// import SummaryDataComponent from "./SummaryDataComponent";

class AffiliateAccounting extends React.Component {
  state = {
    username: this.props.username,
  };

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <h3>Affiliate Accounting</h3>
          {/* <SummaryDataComponent username={this.state.username} /> */}
        </div>
      </React.Fragment>
    );
  }
}
export default AffiliateAccounting;
