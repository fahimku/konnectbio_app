import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { Formik } from "formik";
import Loader from "../../../components/Loader/Loader";
import * as Yup from "yup";
import * as affiliateBillingActions from "../../../actions/affiliateBilling";
import { connect } from "react-redux";

function AffiliateContractTerm({
  getAffiliateBillingDetail,
  affiliateBillingDetail,
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // getAffiliateBillingDetail().then(() => {
    //   setLoading(true);
    // });
  }, []);

  return (
    <React.Fragment>
      <div className="container-fluid">
        <h4 className="page-title">Contract Term</h4>
        <div className="brand_container_main container">
          <Row>
            <div className="profile_box_main col-md-8">
              <div className="brand-section dash_block_profile">
                <div className="dash_content_profile">
                  <h5>Contract Info</h5>
                  <Row className="brandrow">
                    <Col xs={4}>
                      <span>Platform Fee:</span>
                    </Col>
                    <Col xs={8}>3%</Col>
                  </Row>
                  <Row className="brandrow">
                    <Col xs={4}>
                      <span>Commission Maximum:</span>
                    </Col>
                    <Col xs={8}>50%</Col>
                  </Row>
                  <Row className="brandrow">
                    <Col xs={4}>
                      <span>Commission Minimum:</span>
                    </Col>
                    <Col xs={8}>10%</Col>
                  </Row>
                </div>
              </div>
            </div>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
}
// export default AffiliateBilling;

function mapStateToProps({ affiliateBillingDetail }) {
  return { affiliateBillingDetail };
}
export default connect(mapStateToProps, { ...affiliateBillingActions })(
  AffiliateContractTerm
);
