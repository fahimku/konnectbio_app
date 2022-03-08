import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Row, Col, Table } from "react-bootstrap";
// import AffiliateDeposit from "./AffiliateDeposit";
import { connect } from "react-redux";
import * as affiliateDepositActions from "../../../actions/affiliateDeposit";

function AffiliateBalance({ getAffiliateCards, affiliateCards }) {
  const [deposit, setDeposit] = useState("");
  const [changeCard, setChangeCard] = useState("");
  const [cardLoading, setCardLoading] = useState(false);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    setCardLoading(true);
    getAffiliateCards().then(() => {
      setCardLoading(false);
    });
  }, []);

  const depositAmount = async (e) => {
    e.preventDefault();
    await axios
      .post(`/deposit/intent`)
      .then((response) => {
        console.log(response.data.message, "response");
        setDeposit(response.data.message);
        setAmount("");
      })
      .catch((err) => {
        console.log(err.response, "err");
      });
  };
  console.log(affiliateCards, "affiliateCards");
  console.log(cardLoading, "cardLoading");

  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="brand_container_main container aff-payment">
          <h4 className="page-title">Balance</h4>
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
          <h4 className="page-title">Deposit</h4>
          <Row>
            <div className="col-md-8">
              <div className="conn-set-inner">
                <div className="amount-box">
                  <h6>Choose an existing deposit method</h6>
                  <div className="deposit_card">
                    <input
                      type="radio"
                      name="card"
                      id="card1"
                      class="infchecked"
                      value="card1"
                      defaultChecked
                      onChange={(e) => {
                        setChangeCard(e.target.value);
                      }}
                    />
                    <label for="card1">
                      <div className="pull-left">Card1 ending in 1002</div>
                      <div className="text-right">expires: 07/2022</div>
                    </label>
                  </div>
                  <div className="deposit_card">
                    <input
                      type="radio"
                      name="card"
                      id="card2"
                      class="infchecked"
                      value="card2"
                      onChange={(e) => {
                        setChangeCard(e.target.value);
                      }}
                    />
                    <label for="card2">
                      <div className="pull-left">Card2 ending in 3022</div>
                      <div className="text-right">Expires: 01/2023</div>
                    </label>
                  </div>
                </div>
                <div className="amount-box">
                  <form onSubmit={depositAmount}>
                    <h6>Enter Amount</h6>

                    <div className="d-flex flex-row hashtag-box">
                      <span className="input-group-text">$</span>
                      <input
                        onChange={(e) => setAmount(e.target.value)}
                        type="number"
                        name="name"
                        placeholder="Enter Amount"
                        className="form-control comment-field"
                        required
                        value={amount}
                      />
                    </div>
                    <Button variant="primary" type="submit" className="mt-3">
                      Deposit
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
function mapStateToProps({ affiliateCards }) {
  return {
    affiliateCards,
  };
}
export default connect(mapStateToProps, { ...affiliateDepositActions })(
  AffiliateBalance
);
