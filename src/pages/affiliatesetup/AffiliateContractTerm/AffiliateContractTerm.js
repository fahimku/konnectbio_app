import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { Formik } from "formik";
import Loader from "../../../components/Loader/Loader";
import * as Yup from "yup";
import * as affiliateBillingActions from "../../../actions/affiliateBilling";
import { connect } from "react-redux";

function AffiliateContractTerm({
  getAffiliateContractDetail,
  affiliateContractDetail,
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAffiliateContractDetail().then(() => {
      setLoading(false);
    });
  }, []);

  let data = affiliateContractDetail?.message;

  return (
    <React.Fragment>
      <div className="container-fluid">
        <h4 className="page-title">Contract Term</h4>
        <div className="brand_container_main container">
          <Row>
            <div className="profile_box_main col-md-8">
              <div className="brand-section dash_block_profile">
                <div className="dash_content_profile">
                  {loading ? (
                    <Loader />
                  ) : (
                    <>
                      <h5>Contract Info</h5>
                      <Row className="brandrow">
                        <Col xs={4}>
                          <span>Platform Fee:</span>
                        </Col>
                        <Col xs={8}>{data?.fee ? data?.fee : "0"}%</Col>
                      </Row>
                      <Row className="brandrow">
                        <Col xs={4}>
                          <span>Commission Maximum:</span>
                        </Col>
                        <Col xs={8}>
                          {data?.max_commission ? data?.max_commission : "0"}%
                        </Col>
                      </Row>
                      <Row className="brandrow">
                        <Col xs={4}>
                          <span>Commission Minimum:</span>
                        </Col>
                        <Col xs={8}>
                          {data?.min_commission ? data?.min_commission : "0"}%
                        </Col>
                      </Row>
                    </>
                  )}
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

function mapStateToProps({ affiliateContractDetail }) {
  return { affiliateContractDetail };
}
export default connect(mapStateToProps, { ...affiliateBillingActions })(
  AffiliateContractTerm
);
