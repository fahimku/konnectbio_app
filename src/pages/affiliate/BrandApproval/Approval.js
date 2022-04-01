import React, { useEffect, useState } from "react";
import { Row, Col, Button, Table, Modal } from "react-bootstrap";
import * as affiliateTransactionsActions from "../../../actions/affiliateRequest";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import Loader from "../../../components/Loader/Loader";
import { toast } from "react-toastify";
import Select from "react-select";
import NoDataFound from "../../../components/NoDataFound/NoDataFound";
import moment from "moment";
import numeral from "numeral";
// import CampaignDetailTransaction from "./CampaignDetailTransaction";

function Approvals({
  AddAffiliateRequest,
  addAffiliateRequest,
  getAffiliateRequest,
  affiliateRequest,
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAffiliateRequest().then(() => {
      setLoading(false);
    });
  }, []);

  const approveMethod = (id) => {
    setLoading(true);
    let payload = {
      influencer_id: id,
      status: "Approved",
    };
    AddAffiliateRequest(payload).then(() => {
      toast.success("Approved Successfully!");
      getAffiliateRequest().then(() => {
        setLoading(false);
      });
    });
  };

  const rejectMethod = (id) => {
    setLoading(true);
    let payload = {
      influencer_id: id,
      status: "Rejected",
    };
    AddAffiliateRequest(payload).then(() => {
      toast.success("Rejected Successfully!");
      getAffiliateRequest().then(() => {
        setLoading(false);
      });
    });
  };

  function dataTable() {
    let data = affiliateRequest.message;

    if (data) {
      return (
        <>
          {loading ? (
            <Loader size="30" />
          ) : (
            <Table responsive="sm" className="transactions-box">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Request</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, i) => {
                  return (
                  
                        <tr key={i}>
                          <td>{item?.instagram_username}</td>
                          <td>{item?.status}</td>
                          <td>
                            {item?.status === "Approved" ? (
                              <span class="badge badge-success">Approved</span>
                            ) : (
                              <span
                                class="badge badge-info btn"
                                onClick={() =>
                                  approveMethod(item?.influencer_id)
                                }
                              >
                                Approve
                              </span>
                            )}
                            |
                            <span
                              class="badge badge-danger btn"
                              onClick={() => rejectMethod(item?.influencer_id)}
                            >
                              Disapproved
                            </span>
                          </td>
                        </tr>
                     
                  );
                })}
              </tbody>
            </Table>
          )}
        </>
      );
    }
  }

  return (
    <React.Fragment>
      <div className="container-fluid">
        <h4 className="page-title">Request</h4>
        <div className="brand_container_main aff-payment">
          <Row>
            <div className="col-md-12">
              <form className="mb-3"></form>
              {dataTable()}
            </div>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
}

function mapStateToProps({
  AddAffiliateRequest,
  addAffiliateRequest,
  getAffiliateRequest,
  affiliateRequest,
}) {
  return {
    AddAffiliateRequest,
    addAffiliateRequest,
    getAffiliateRequest,
    affiliateRequest,
  };
}
export default connect(mapStateToProps, { ...affiliateTransactionsActions })(
  Approvals
);
