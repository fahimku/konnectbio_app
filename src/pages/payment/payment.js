import React from "react";
import { Container } from "reactstrap";
import { Row, Col, Button } from "react-bootstrap";

import s from "./payment.module.scss";

class Payment extends React.Component {
  render() {
    return (
      // <div className={s.errorPage}>
      <div className="container-fluid">
        <div className="connections mt-5">
          <div className="page-title">
            <h3>Payment</h3>
          </div>
          <div className="white-box mt-5">
            {/* <h5 className="page-title line-heading">Payment</h5> */}
            <Row className="mt-4 align-items-center">
              <Col md={2}>
                <div className="package_name">
                  <div role="alert" class="alert alert-success">
                    This is a success alert—check it out!
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default Payment;
