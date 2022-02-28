import React, { useEffect, useState } from "react";
import { Row, Col, Button, Table, Modal } from "react-bootstrap";
import * as affiliateTransactionsActions from "../../../actions/affiliateTransactions";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import Loader from "../../../components/Loader/Loader";
import Select from "react-select";
import NoDataFound from "../../../components/NoDataFound/NoDataFound";
import moment from "moment";

function AffiliateTransaction({
  getAffiliateActiveCampaign,
  affiliateCampaigns,
  getActiveInfluencer,
  affiliateInfluencers,
  getAffiliateTransactions,
  affiliateTransactions,
}) {
  const [loading, setLoading] = useState(true);
  const [trnsactionModal, setTransactionModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [campaignId, setCampaignId] = useState("");
  const [influencerId, setInfluencerId] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const transactionTypeList = [
    {
      label: "ALL",
      value: "",
    },
    {
      label: "Click",
      value: "click",
    },
    {
      label: "Impression",
      value: "impression",
    },
  ];

  const limit = 12;
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
    setLoading(true);
    getAffiliateActiveCampaign();
    getActiveInfluencer("");
    getAffiliateTransactions("", "", "", 1, limit).then(() => {
      setLoading(false);
    });
  }, []);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    // let page = currentPage === 0 ? 1 : currentPage;
    // console.log('pages',page)
    setCurrentPage(0);
    getAffiliateTransactions(
      campaignId.value,
      influencerId.value,
      transactionType.value,
      1,
      limit
    ).then(() => {
      setLoading(false);
    });
  };

  const refreshPage = (e) => {
    setCurrentPage(0);
    setLoading(true);
    getAffiliateActiveCampaign();
    getActiveInfluencer("");
    getAffiliateTransactions("", "", "", 1, limit).then(() => {
      setLoading(false);
    });
    setCampaignId("");
    setInfluencerId("");
    setTransactionType("");
  };

  const handlePageClick = (e) => {
    const page = e.selected;
    setCurrentPage(page);
    setLoading(true);
    getAffiliateTransactions(
      campaignId.value,
      influencerId.value,
      transactionType.value,
      page + 1,
      limit
    ).then(() => {
      setLoading(false);
    });
  };

  const changeCampaign = (e) => {
    setInfluencerId("");
    getActiveInfluencer(e.value);
    setCampaignId(e);
  };

  const changeInfluencer = (e) => {
    setInfluencerId(e);
  };

  const changeTransactionType = (e) => {
    setTransactionType(e);
  };

  function dataTable() {
    let data = affiliateTransactions?.message?.data;
    if (data) {
      return (
        <>
          {data.map((item, i) => {
            return (
              <tr key={i}>
                <td>{item?.user?.pixel_id}</td>
                <td>
                  {moment(item?.campaign?.created_at).format(
                    "YYYY-MM-DD HH:MM:SS A"
                  )}
                </td>
                <td>{item?.instagram_username}</td>
                <td>{item?.campaign?.campaign_name}</td>
                <td>
                  {moment(item?.campaign?.start_date).format("YYYY-MM-DD")}
                </td>
                <td>{moment(item?.campaign?.end_date).format("YYYY-MM-DD")}</td>
                <td>{item?.parent_category?.category_name}</td>
                <td>{item?.campaign?.campaign_type}</td>
                <td>${item.campaign?.budget}</td>
                <td>${item.campaign?.pay_per_hundred}</td>
                <td>{item?.transaction_type}</td>
                <td className="text-center">
                  <i
                    role="button"
                    onClick={() => setTransactionModal(true)}
                    className="fa fa-eye"
                  ></i>
                </td>
              </tr>
            );
          })}
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
                  <Col xs={12} xl={3} md={3}>
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
                  <Col xs={12} xl={3} md={3}>
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
                  <Col xs={12} xl={3} md={3}>
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
                    <Button
                      className="fltr-hpr btn-gray"
                      onClick={refreshPage}
                      type="button"
                      variant="primary"
                    >
                      Refresh
                    </Button>
                  </Col>
                </Row>
              </form>
              {loading ? (
                <Loader size="30" />
              ) : affiliateTransactions?.message?.data?.length === 0 ? (
                <>
                  <NoDataFound />
                </>
              ) : (
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
                      <th className="text-center">View</th>
                    </tr>
                  </thead>
                  <tbody>{dataTable()}</tbody>
                </Table>
              )}
              {affiliateTransactions?.message?.data?.length > 0 && (
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
        show={trnsactionModal}
        onHide={() => {
          setTransactionModal(false);
        }}
        className="change-password"
        centered
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>Transaction Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-white ">
          <Row>
            <Col xs={12} xl={6} md={6}>
              <div class="card analytic-box analytics-page">
                <h5 className="mb-4">User Detail</h5>
                <div class="col-12 count-box">
                  <h5 class="count-title">Pixel ID</h5>
                  <h3 class="count">900000063</h3>
                </div>
                <div class="col-12 count-box">
                  <h5 class="count-title">Username</h5>
                  <h3 class="count">kbiouser4</h3>
                </div>
                <div class="col-12 count-box">
                  <h5 class="count-title">Email</h5>
                  <h3 class="count">kbiouser4@konnect.bio</h3>
                </div>
                <div class="col-12 count-box">
                  <h5 class="count-title">Country</h5>
                  <h3 class="count">US</h3>
                </div>
                <div class="col-12 count-box">
                  <h5 class="count-title">State</h5>
                  <h3 class="count">NY</h3>
                </div>
                <div class="col-12 count-box">
                  <h5 class="count-title">City</h5>
                  <h3 class="count">New York City</h3>
                </div>
                <div class="col-12 count-box">
                  <h5 class="count-title">Gender</h5>
                  <h3 class="count">male</h3>
                </div>
              </div>
            </Col>
            <Col xs={12} xl={6} md={6}>
              <div class="card analytic-box analytics-page">
                <h5 className="mb-4">Campaign Detail</h5>
                <div class="card-row row">
                  <div class="any-post-img-col col-5">
                    <div class="any-post-image">
                      <div class="any-image-box">
                        <div class="any-image-box-iner">
                          <img
                            src="https://cdn.konnect.bio/hangerbywajid/posts/f4fc17c1-d265-4c29-8abe-9754279b8042.jpg"
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
                          Test 3
                        </h3>
                      </div>
                      <div class="col-12 count-box">
                        <h5 class="count-title">Campaign Type</h5>
                        <h3 class="count">clicks</h3>
                      </div>
                      <div class="col-12 count-box">
                        <h5 class="count-title">Category</h5>
                        <h3 class="count">ARTS</h3>
                      </div>
                      <div class="col-12 count-box">
                        <h5 class="count-title">Budget</h5>
                        <h3 class="count">$100</h3>
                      </div>
                      <div class="col-12 count-box">
                        <h5 class="count-title">Click Rate</h5>
                        <h3 class="count">$10</h3>
                      </div>
                      <div class="col-12 count-box">
                        <h5 class="count-title">Start Date</h5>
                        <h3 class="count">2022-02-28</h3>
                      </div>
                      <div class="col-12 count-box">
                        <h5 class="count-title">End Date</h5>
                        <h3 class="count">2023-01-12</h3>
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
                  <h3 class="count">110.93.200.131</h3>
                </div>
                <div class="col-12 count-box">
                  <h5 class="count-title">User Agent</h5>
                  <h3 class="count">Mozilla/5.0</h3>
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
    </React.Fragment>
  );
}

function mapStateToProps({
  affiliateTransactions,
  affiliateCampaigns,
  affiliateInfluencers,
}) {
  return { affiliateTransactions, affiliateCampaigns, affiliateInfluencers };
}
export default connect(mapStateToProps, { ...affiliateTransactionsActions })(
  AffiliateTransaction
);
