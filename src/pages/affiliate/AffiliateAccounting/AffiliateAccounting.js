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
          <h4 className="page-title">Affiliate Accounting</h4>
          {/* <SummaryDataComponent username={this.state.username} /> */}
        </div>
      </React.Fragment>
    );
  }
}
export default AffiliateAccounting;
