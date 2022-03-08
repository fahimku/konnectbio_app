import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Row, Col, Table } from "react-bootstrap";
import AffiliateDeposit from "./AffiliateDeposit";
import { Label, Input } from "reactstrap";

function AffiliateBalance() {
  const [deposit, setDeposit] = useState("");

  // useEffect(() => {
  //   getConfig();
  // }, []);

  const depositAmount = async () => {
    await axios
      .post(`/deposit/intent`)
      .then((response) => {
        console.log(response.data.message, "response");
        setDeposit(response.data.message);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

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
          {/* <AffiliateDeposit config={config} /> */}
          <Row>
            <div className="col-md-8">
              <div className="conn-set-inner">
                <div className="amount-box">
                  <h6>Choose an existing deposit method</h6>

                  <div className="checkbox abc-checkbox abc-checkbox-primary">
                    <Input
                      defaultChecked
                      name="payment"
                      value="Monthly"
                      className="mt-0"
                      id="checkbox1"
                      type="radio"
                      onChange={(e) => {
                        this.setState({ plan: e.target.value });
                      }}
                    />{" "}
                    <Label for="checkbox1" />
                    Pay Monthly: $
                  </div>
                </div>
                <div className="amount-box">
                  <form onSubmit={depositAmount}>
                    <h6>Enter Amount</h6>

                    <div className="d-flex flex-row hashtag-box">
                      <span className="input-group-text">$</span>
                      <input
                        // onChange={(e) => setHash(e.target.value)}
                        type="number"
                        name="name"
                        placeholder="Enter Amount"
                        className="form-control comment-field"
                        required
                        // value={hash}
                      />
                    </div>
                    <Button variant="primary" type="submit" className="mt-3">
                      Continue
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
}
export default AffiliateBalance;
