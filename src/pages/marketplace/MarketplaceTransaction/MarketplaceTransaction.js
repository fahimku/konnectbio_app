import React, { useEffect, useState } from "react";
import { Row, Col, Button, Table, Modal } from "react-bootstrap";
import * as marketplaceTransactionsActions from "../../../actions/MarketplaceTransactions";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import Loader from "../../../components/Loader/Loader";
import Select from "react-select";
import NoDataFound from "../../../components/NoDataFound/NoDataFound";
import moment from "moment";

function MarketplaceTransaction({
  getMarketplaceActiveCampaign,
  marketplaceCampaigns,
  // getActiveInfluencer,
  // affiliateInfluencers,
  getMarketplaceBrand,
  marketplaceBrands,
  getMarketplaceTransactions,
  marketplaceTransactions,
}) {
  const [loading, setLoading] = useState(true);
  const [transactionModal, setTransactionModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [campaignId, setCampaignId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [brandStatus, setBrandStatus] = useState("");
  const [influencerStatus, setInfluencerStatus] = useState("");
  const [singleData, setSingleData] = useState([]);

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

  const brandStatusList = [
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
  const influencerStatusList = [
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
    setBrandStatus({ value: "active", label: "Active" });
    setInfluencerStatus({ value: "active", label: "Active" });
    setLoading(true);
    getMarketplaceActiveCampaign("active", "active", "all");
    // getActiveInfluencer("");
    getMarketplaceBrand("");
    getMarketplaceTransactions("active", "active", "", "", "", 1, limit).then(
      () => {
        setLoading(false);
      }
    );
  }, []);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    // let page = currentPage === 0 ? 1 : currentPage;
    // console.log('pages',page)
    setCurrentPage(0);
    getMarketplaceTransactions(
      brandStatus.value,
      influencerStatus.value,
      campaignId.value,
      brandId.value,
      transactionType.value,
      1,
      limit
    ).then((data) => {
      setLoading(false);
    });
  };

  const refreshPage = (e) => {
    setCurrentPage(0);
    setLoading(true);
    getMarketplaceActiveCampaign("active", "active", "all");
    // getActiveInfluencer("");
    getMarketplaceBrand("");
    getMarketplaceTransactions("active", "active", "", "", "", 1, limit).then(
      () => {
        setLoading(false);
      }
    );
    setBrandStatus({ value: "active", label: "Active" });
    setInfluencerStatus({ value: "active", label: "Active" });
    setCampaignId("");
    setBrandId("");
    setTransactionType("");
  };

  const handlePageClick = (e) => {
    const page = e.selected;
    setCurrentPage(page);
    setLoading(true);
    getMarketplaceTransactions(
      brandStatus.value,
      influencerStatus.value,
      campaignId.value,
      brandId.value,
      transactionType.value,
      page + 1,
      limit
    ).then(() => {
      if (marketplaceTransactions?.message?.data?.length > 0) {
        setLoading(false);
      }
    });
  };

  const changeCampaign = (e) => {
    // setBrandId("");
    // getActiveInfluencer(e.value);
    setCampaignId(e);
  };

  const changeBrand = (e) => {
    setCampaignId("");
    setBrandId(e);
    getMarketplaceActiveCampaign(
      brandStatus.value,
      influencerStatus.value,
      e.value
    );
  };

  const changeTransactionType = (e) => {
    setTransactionType(e);
  };

  const changeBrandStatus = (e) => {
    setCampaignId("");
    setBrandStatus(e);
    getMarketplaceActiveCampaign(
      e.value,
      influencerStatus.value,
      brandId.value
    );
  };
  const changeInfluencerStatus = (e) => {
    setCampaignId("");
    setInfluencerStatus(e);
    getMarketplaceActiveCampaign(brandStatus.value, e.value, brandId.value);
  };

  function dataTable() {
    let data = marketplaceTransactions?.message?.data;
    if (data) {
      return (
        <>
          {data.map((item, i) => {
            return (
              <tr key={i}>
                <td>{item?.user?.pixel_id}</td>
                <td>{moment(item?.created_at).format("YYYY-MM-DD h:mm A")}</td>
                <td>{item?.campaign.instagram_username}</td>
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
                    onClick={() => {
                      setSingleData(item);
                      setTransactionModal(true);
                    }}
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
                  <Col xs={12} xl md={6}>
                    <p>Select Brand</p>
                    <Select
                      value={brandId}
                      name="category"
                      className="selectCustomization"
                      options={marketplaceBrands}
                      placeholder="Select Brand"
                      onChange={changeBrand}
                      styles={style}
                    />
                  </Col>
                  <Col xs={12} xl md={6}>
                    <p>Brand Status</p>
                    <Select
                      value={brandStatus}
                      name="status"
                      className="selectCustomization"
                      options={brandStatusList}
                      placeholder="Select Brand Status"
                      onChange={changeBrandStatus}
                      styles={style}
                    />
                  </Col>
                  <Col xs={12} xl md={6}>
                    <p>Influencer Status</p>
                    <Select
                      value={influencerStatus}
                      name="status"
                      className="selectCustomization"
                      options={influencerStatusList}
                      placeholder="Select Influencer Status"
                      onChange={changeInfluencerStatus}
                      styles={style}
                    />
                  </Col>
                  <Col xs={12} xl md={6}>
                    <p>Select Campaign</p>
                    <Select
                      value={campaignId}
                      name="category"
                      className="selectCustomization"
                      options={marketplaceCampaigns}
                      placeholder="Select Campaign"
                      onChange={changeCampaign}
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
                  {marketplaceTransactions?.message?.data?.length === 0 ? (
                    <>
                      <NoDataFound />
                    </>
                  ) : (
                    <Table responsive="sm" className="transactions-box">
                      <thead>
                        <tr>
                          <th>PID</th>
                          <th>Date/Time</th>
                          <th>Brand </th>
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
                </>
              )}
              {marketplaceTransactions?.message?.data?.length > 0 && !loading && (
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
                      marketplaceTransactions?.message?.total_records / limit
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
                        <h5 class="count-title">Campaign Username</h5>
                        <h3 class="count" title="Test 3">
                          {singleData?.campaign?.instagram_username}
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
    </React.Fragment>
  );
}

function mapStateToProps({
  marketplaceTransactions,
  marketplaceBrands,
  marketplaceCampaigns,
}) {
  return {
    marketplaceTransactions,
    marketplaceBrands,
    marketplaceCampaigns,
  };
}
export default connect(mapStateToProps, { ...marketplaceTransactionsActions })(
  MarketplaceTransaction
);
