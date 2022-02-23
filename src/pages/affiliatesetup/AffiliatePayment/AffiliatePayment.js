import React from "react";
import axios from "axios";
import { Button, Row, Col, Table } from "react-bootstrap";

function AffiliatePayment() {
  return (
    <React.Fragment>
      <div className="container-fluid">
        <h4 className="page-title">Balance</h4>
        <div className="brand_container_main container aff-payment">
          <Row>
            <div className="col-md-4">
              <div className="conn-set-inner">
                <div className="affiliate-wallet">
                  <h5>Current Balance</h5>
                  <div className="aff-amount">$0</div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="conn-set-inner">
                <div className="affiliate-wallet">
                  <h5>Spent Amount</h5>
                  <div className="aff-amount">$0</div>
                </div>
              </div>
            </div>
          </Row>

          <Row>
            <div className="col-md-4">
              <Button color="default" className="btn-block mt-3">
                Make Deposit
              </Button>
            </div>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
}
export default AffiliatePayment;
