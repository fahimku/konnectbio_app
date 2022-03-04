import React, { useEffect, useState } from "react";
import { Row, Col, Button, Table, Modal } from "react-bootstrap";
import * as affiliateTransactionsActions from "../../../actions/affiliateTransactions";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import Loader from "../../../components/Loader/Loader";
import Select from "react-select";
import NoDataFound from "../../../components/NoDataFound/NoDataFound";
import moment from "moment";
import numeral from "numeral";

function CampaignDetailTransaction({
  getAffiliateActiveCampaign,
  affiliateCampaigns,
  getActiveInfluencer,
  affiliateInfluencers,
  getAffiliateTransactions,
  affiliateTransactions,
  getCampaignDetailTransactions,
  campaignDetailTransactions,
}) {
  // const transactionTypeList = [
  //   {
  //     label: "ALL",
  //     value: "",
  //   },
  //   {
  //     label: "Click",
  //     value: "click",
  //   },
  //   {
  //     label: "Impression",
  //     value: "impression",
  //   },
  // ];

  function dataDetailTable() {
    let data = campaignDetailTransactions?.message?.data;
    if (data) {
      return (
        <>
          <Table responsive="sm" className="transactions-box">
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Category </th>
                <th>Influencer </th>
                <th>Clicks</th>
                <th>Impressions</th>
                <th>CTR</th>
                <th>Spent</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <button
                        className="btn-link"
                        // onClick={() => {
                        //   setCampaignModal(true);
                        //   getCampaignDetailTransactions(item?.campaign_id);
                        // }}
                      >
                        {item?.campaign_name}
                      </button>
                    </td>
                    <td>{item?.c_category}</td>
                    <td>{item?.instagram_username}</td>
                    <td>{numeral(item?.clicks).format("0,0'")}</td>
                    <td>{numeral(item?.impressions).format("0,0'")}</td>
                    <td>{numeral(item?.ctr).format("0.00") + "%"}</td>
                    <td>{numeral(item?.spent).format("$0,0.00'")}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      );
    }
  }

  return (
    <React.Fragment>
      <Modal
        show={campaignModal}
        // onHide={() => {
        //   setCampaignModal(false);
        // }}
        className="campaign-detail-modal"
        centered
        // size="xl"
        animation={false}
        backdrop={true}
        keyboard={false}
        dialogClassName="modal-90w"
      >
        <Modal.Header>
          <Modal.Title>Campaign Details</Modal.Title>
          <button
            type="button"
            class="close"
            onClick={() => {
              setCampaignModal(false);
            }}
          >
            <span aria-hidden="true">×</span>
            <span class="sr-only">Close</span>
          </button>
        </Modal.Header>
        <Modal.Body className="bg-white transection-detail aff-payment">
          {detailLoading ? (
            <Loader size="30" />
          ) : (
            <>
              {campaignDetailTransactions?.message?.data?.length === 0 ? (
                <>
                  <NoDataFound />
                </>
              ) : (
                dataDetailTable()
              )}
            </>
          )}
          {campaignDetailTransactions?.message?.data?.length > 0 &&
            !detailLoading && (
              <Row>
                <ReactPaginate
                  previousLabel=""
                  nextLabel=""
                  pageClassName="page-item "
                  pageLinkClassName="page-link custom-paginate-link btn btn-primary"
                  previousClassName="page-item"
                  previousLinkClassName="page-link custom-paginate-prev btn btn-primary"
                  nextClassName="page-item"
                  nextLinkClassName="page-link custom-paginate-next btn btn-primary"
                  breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  forcePage={currentPage}
                  pageCount={Math.ceil(
                    campaignDetailTransactions?.message?.total_records /
                      detailLimit
                  )}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={window.innerWidth <= 760 ? 1 : 7}
                  onPageChange={handleDetailPageClick}
                  containerClassName={
                    "pagination justify-content-center mt-2 custom-paginate"
                  }
                  // subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                />
              </Row>
            )}
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}

export default CampaignDetailTransaction;
