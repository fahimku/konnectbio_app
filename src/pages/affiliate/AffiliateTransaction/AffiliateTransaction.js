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

function AffiliateTransaction({
  getAffiliateActiveCampaign,
  affiliateCampaigns,
  getActiveInfluencer,
  affiliateInfluencers,
  getAffiliateTransactions,
  affiliateTransactions,
  getCampaignDetailTransactions,
  campaignDetailTransactions,
}) {
  const [loading, setLoading] = useState(true);
  const [transactionModal, setTransactionModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [campaignId, setCampaignId] = useState({
    label: "ALL",
    value: "all",
  });
  const [influencerId, setInfluencerId] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [status, setStatus] = useState("");
  const [singleData, setSingleData] = useState([]);
  const [groupBy, setGroupBy] = useState("");
  const [submit, setSubmit] = useState("");
  const [campaignModal, setCampaignModal] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);

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

  const statusList = [
    {
      label: "Active",
      value: "active",
    },
    {
      label: "Paused",
      value: "paused",
    },
    {
      label: "Expired",
      value: "expired",
    },
  ];
  // const groupByList = [
  //   {
  //     label: "Influencer",
  //     value: "influencer",
  //   },
  //   {
  //     label: "Campaign",
  //     value: "campaign",
  //   },
  // ];

  const limit = 12;
  const detailLimit = 12;
  const style = {
    control: (base, state) => ({
      ...base,
      height: "44px",
      boxShadow: "none",
      "&:hover": {
        // border: "1px solid black",
      },
    }),
  };

  useEffect(() => {
    setStatus({ value: "active", label: "Active" });
    setLoading(true);
    getAffiliateActiveCampaign("active");
    getActiveInfluencer("");
    getAffiliateTransactions("active", "", 1, limit).then(() => {
      setLoading(false);
    });
  }, []);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    setCurrentPage(0);
    getAffiliateTransactions(
      status.value,
      campaignId.value,
      // influencerId.value,
      // transactionType.value,
      // groupBy.value,
      1,
      limit
    ).then((data) => {
      setLoading(false);
      setSubmit(groupBy.value);
    });
  };

  const refreshPage = (e) => {
    setCurrentPage(0);
    setLoading(true);
    getAffiliateActiveCampaign("active");
    getActiveInfluencer("");
    getAffiliateTransactions("active".value, "", 1, limit).then(() => {
      setLoading(false);
    });
    setStatus({ value: "active", label: "Active" });
    setCampaignId({
      label: "ALL",
      value: "all",
    });

    // setInfluencerId("");
    // setTransactionType("");
    // setGroupBy("");
    setSubmit("");
  };

  const handlePageClick = (e) => {
    const page = e.selected;
    setCurrentPage(page);
    setLoading(true);
    getAffiliateTransactions(
      status.value,
      campaignId.value,
      // influencerId.value,
      // transactionType.value,
      // groupBy.value,
      page + 1,
      limit
    ).then(() => {
      if (affiliateTransactions?.message?.data?.length > 0) {
        setLoading(false);
      }
    });
  };

  const changeCampaign = (e) => {
    // setInfluencerId("");
    // getActiveInfluencer(e.value);
    setCampaignId(e);
  };

  // const changeInfluencer = (e) => {
  //   setInfluencerId(e);
  // };

  // const changeTransactionType = (e) => {
  //   setTransactionType(e);
  // };

  const changeStatus = (e) => {
    setStatus(e);
    getAffiliateActiveCampaign(e.value);
  };

  // const changeGroupBy = (e) => {
  //   setGroupBy(e);
  // };
  const handleDetailPageClick = (e) => {
    const page = e.selected;
    setCurrentPage(page);
    setDetailLoading(true);
    getCampaignDetailTransactions(campaignId.value, page + 1, detailLimit).then(
      () => {
        if (campaignDetailTransactions?.message?.data?.length > 0) {
          setDetailLoading(false);
        }
      }
    );
  };

  function dataTable() {
    let data = affiliateTransactions?.message?.data;
    if (data) {
      return (
        <>
          <Table responsive="sm" className="transactions-box">
            <thead>
              <tr>
                <th>Campaign</th>
                <th>No. of Influencers</th>
                <th>Category </th>
                <th>Budget </th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Type</th>
                <th>Rate/click</th>
                <th>Clicks</th>
                <th>Impressions</th>
                <th>CTR</th>
                <th>Spent</th>
                {/* <th className="text-center">View</th> */}
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <button
                        className="btn-link"
                        onClick={() => {
                          setCampaignModal(true);
                          setDetailLoading(true);
                          getCampaignDetailTransactions(
                            item?.campaign_id,
                            1,
                            detailLimit
                          ).then(() => {
                            setDetailLoading(false);
                          });
                          // getCampaignDetailTransactions(item?.campaign_id);
                        }}
                      >
                        {item?.campaign_name}
                      </button>
                    </td>
                    <td>{numeral(item?.influencers).format("0,0'")}</td>
                    <td>{item?.c_category}</td>
                    <td>{numeral(item?.budget).format("$0,0.0'")}</td>
                    <td>{moment(item?.start_date).format("YYYY-MM-DD")}</td>
                    <td>{moment(item?.end_date).format("YYYY-MM-DD")}</td>
                    <td className="text-capitalize">{item?.campaign_type}</td>
                    <td>{numeral(item?.rate).format("$0,0.00'")}</td>
                    <td>{numeral(item?.clicks).format("0,0'")}</td>
                    <td>{numeral(item?.impressions).format("0,0'")}</td>
                    <td>{numeral(item?.ctr).format("0.00") + "%"}</td>
                    <td>{numeral(item?.spent).format("$0,0.00'")}</td>

                    {/* <td className="text-center">
                      <i
                        role="button"
                        onClick={() => {
                          setSingleData(item);
                          setTransactionModal(true);
                        }}
                        className="fa fa-eye"
                      ></i>
                    </td> */}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      );
    }
  }

  function dataTable1() {
    let data = affiliateTransactions?.message?.data;
    if (data) {
      return (
        <>
          <Table responsive="sm" className="transactions-box">
            <thead>
              <tr>
                <th>PID</th>
                <th>Date/Time</th>
                <th>Influencer </th>
                <th>Campaign </th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Category</th>
                <th>Campaign Type</th>
                <th>Budget</th>
                <th>Click Rate</th>
                <th>Transaction Type</th>
                <th>Count</th>
                {/* <th className="text-center">View</th> */}
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{item?.doc?.user?.pixel_id}</td>
                    <td>
                      {moment(item?.doc?.created_at).format(
                        "YYYY-MM-DD h:mm A"
                      )}
                    </td>
                    <td>{item?.doc?.instagram_username}</td>
                    <td>{item?.doc?.campaign?.campaign_name}</td>
                    <td>
                      {moment(item?.doc?.campaign?.start_date).format(
                        "YYYY-MM-DD"
                      )}
                    </td>
                    <td>
                      {moment(item?.doc?.campaign?.end_date).format(
                        "YYYY-MM-DD"
                      )}
                    </td>
                    <td>{item?.doc?.parent_category?.category_name}</td>
                    <td>{item?.doc?.campaign?.campaign_type}</td>
                    <td>${item?.doc?.campaign?.budget}</td>
                    <td>${item?.doc?.campaign?.pay_per_hundred}</td>
                    <td>{item?.doc?.transaction_type}</td>
                    <td>{item?.count}</td>
                    {/* <td className="text-center">
                      <i
                        role="button"
                        onClick={() => {
                          setSingleData(item);
                          setTransactionModal(true);
                        }}
                        className="fa fa-eye"
                      ></i>
                    </td> */}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      );
    }
  }

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
      <div className="container-fluid">
        <h4 className="page-title">Transactions</h4>
        <div className="brand_container_main aff-payment">
          <Row>
            <div className="col-md-12">
              <form className="mb-3" onSubmit={handleSubmit}>
                <Row>
                  <Col xs={12} xl={3} md={6}>
                    <p>Select Status</p>
                    <Select
                      value={status}
                      name="status"
                      className="selectCustomization"
                      options={statusList}
                      placeholder="Select Status"
                      onChange={changeStatus}
                      styles={style}
                    />
                  </Col>
                  <Col xs={12} xl={3} md={6}>
                    <p>Select Campaign</p>
                    <Select
                      value={campaignId}
                      name="category"
                      className="selectCustomization"
                      options={affiliateCampaigns}
                      placeholder="Select Campaign"
                      onChange={changeCampaign}
                      styles={style}
                    />
                  </Col>

                  {/* <Col xs={12} xl md={6}>
                    <p>Select Influencer</p>
                    <Select
                      value={influencerId}
                      name="category"
                      className="selectCustomization"
                      options={affiliateInfluencers}
                      placeholder="Select Influencer"
                      onChange={changeInfluencer}
                      styles={style}
                    />
                  </Col>
                  <Col xs={12} xl md={6}>
                    <p>Transaction Type</p>
                    <Select
                      value={transactionType}
                      name="transactionType"
                      className="selectCustomization"
                      options={transactionTypeList}
                      placeholder="Select Transaction Type"
                      onChange={changeTransactionType}
                      styles={style}
                    />
                  </Col>
                  <Col xs={12} xl md={6}>
                    <p>Group By</p>
                    <Select
                      value={groupBy}
                      name="transactionType"
                      className="selectCustomization"
                      options={groupByList}
                      placeholder="Select Group By"
                      onChange={changeGroupBy}
                      styles={style}
                    />
                  </Col> */}
                  <Col
                    className="transaction-search d-flex"
                    xs={12}
                    xl={3}
                    md={3}
                  >
                    <Button
                      type="submit"
                      variant="primary"
                      className="fltr-hpr"
                    >
                      Search
                    </Button>
                    {loading ? (
                      <Button
                        className="fltr-hpr btn-gray"
                        type="button"
                        variant="primary"
                      >
                        <Loader size="30" />
                      </Button>
                    ) : (
                      <Button
                        className="fltr-hpr btn-gray"
                        onClick={refreshPage}
                        type="button"
                        variant="primary"
                      >
                        Refresh
                      </Button>
                    )}
                  </Col>
                </Row>
              </form>

              {loading ? (
                <Loader size="30" />
              ) : (
                <>
                  {affiliateTransactions?.message?.data?.length === 0 ? (
                    <>
                      <NoDataFound />
                    </>
                  ) : (
                    <>
                      {submit === "" || submit === undefined
                        ? dataTable()
                        : dataTable1()}
                    </>
                  )}
                </>
              )}
              {affiliateTransactions?.message?.data?.length > 0 && !loading && (
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
                      affiliateTransactions?.message?.total_records / limit
                    )}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={window.innerWidth <= 760 ? 1 : 7}
                    onPageChange={handlePageClick}
                    containerClassName={
                      "pagination justify-content-center mt-2 custom-paginate"
                    }
                    // subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                  />
                </Row>
              )}
            </div>
          </Row>
        </div>
      </div>
      <Modal
        show={transactionModal}
        onHide={() => {
          setTransactionModal(false);
        }}
        className="change-password"
        centered
        size="xl"
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Transaction Information</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-white transection-detail">
          <Row>
            <Col xs={12} xl={6} md={6}>
              <div class="card analytic-box analytics-page">
                <h5 className="mb-4">User Information</h5>
                <div class="col-12 count-box">
                  <h5 class="count-title">Pixel ID</h5>
                  <h3 class="count">{singleData?.user?.pixel_id}</h3>
                </div>
                <div class="col-12 count-box">
                  <h5 class="count-title">Username</h5>
                  <h3 class="count">{singleData?.instagram_username}</h3>
                </div>
                <div class="col-12 count-box">
                  <h5 class="count-title">Email</h5>
                  <h3 class="count">{singleData?.user?.email}</h3>
                </div>
                <div class="col-12 count-box">
                  <h5 class="count-title">Country</h5>
                  <h3 class="count">{singleData?.user?.country}</h3>
                </div>
                <div class="col-12 count-box">
                  <h5 class="count-title">State</h5>
                  <h3 class="count">{singleData?.user?.state}</h3>
                </div>
                <div class="col-12 count-box">
                  <h5 class="count-title">City</h5>
                  <h3 class="count">{singleData?.user?.city}</h3>
                </div>
                <div class="col-12 count-box">
                  <h5 class="count-title">Gender</h5>
                  <h3 class="count">{singleData?.user?.gender}</h3>
                </div>
              </div>
            </Col>
            <Col xs={12} xl={6} md={6}>
              <div class="card analytic-box analytics-page">
                <h5 className="mb-4">Campaign Information</h5>
                <div class="card-row row">
                  <div class="any-post-img-col col-5">
                    <div class="any-post-image">
                      <div class="any-image-box">
                        <div class="any-image-box-iner">
                          <img
                            src={singleData?.campaign?.media_url}
                            class="img-fluid media-image"
                            alt="IMAGE"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-7 analytic-caption">
                    <div class="row count-main-box">
                      <div class="col-12 count-box">
                        <h5 class="count-title">Campaign Name</h5>
                        <h3 class="count" title="Test 3">
                          {singleData?.campaign?.campaign_name}
                        </h3>
                      </div>
                      <div class="col-12 count-box">
                        <h5 class="count-title">Campaign Type</h5>
                        <h3 class="count">
                          {singleData?.campaign?.campaign_type}
                        </h3>
                      </div>
                      <div class="col-12 count-box">
                        <h5 class="count-title">Category</h5>
                        <h3 class="count">
                          {singleData?.parent_category?.category_name}
                        </h3>
                      </div>
                      <div class="col-12 count-box">
                        <h5 class="count-title">Budget</h5>
                        <h3 class="count">${singleData?.campaign?.budget}</h3>
                      </div>
                      <div class="col-12 count-box">
                        <h5 class="count-title">Click Rate</h5>
                        <h3 class="count">
                          ${singleData?.campaign?.pay_per_hundred}
                        </h3>
                      </div>
                      <div class="col-12 count-box">
                        <h5 class="count-title">Start Date</h5>
                        <h3 class="count">
                          {moment(singleData?.campaign?.start_date).format(
                            "YYYY-MM-DD"
                          )}
                        </h3>
                      </div>
                      <div class="col-12 count-box">
                        <h5 class="count-title">End Date</h5>
                        <h3 class="count">
                          {moment(singleData?.campaign?.end_date).format(
                            "YYYY-MM-DD"
                          )}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={12} xl={6} md={6}>
              <div class="card analytic-box analytics-page">
                <h5 className="mb-4">System Information</h5>
                <div class="col-12 count-box">
                  <h5 class="count-title">IP Address</h5>
                  <h3 class="count">{singleData?.ip_address}</h3>
                </div>
                <div class="col-12 count-box">
                  <h5 class="count-title">User Agent</h5>
                  <h3 class="count">{singleData?.user_agent?.substr(0, 50)}</h3>
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setTransactionModal(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
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

function mapStateToProps({
  affiliateTransactions,
  affiliateCampaigns,
  affiliateInfluencers,
  campaignDetailTransactions,
}) {
  return {
    affiliateTransactions,
    affiliateCampaigns,
    affiliateInfluencers,
    campaignDetailTransactions,
  };
}
export default connect(mapStateToProps, { ...affiliateTransactionsActions })(
  AffiliateTransaction
);
