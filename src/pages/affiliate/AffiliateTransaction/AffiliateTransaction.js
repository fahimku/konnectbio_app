import React, { useEffect, useState } from "react";
import { Row, Col, Button, Table } from "react-bootstrap";
import * as affiliateTransactionsActions from "../../../actions/affiliateTransactions";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import Loader from "../../../components/Loader/Loader";
import Select from "react-select";
import NoDataFound from "../../../components/NoDataFound/NoDataFound";
import moment from 'moment';

function AffiliateTransaction({
  getAffiliateActiveCampaign,
  affiliateCampaigns,
  getActiveInfluencer,
  affiliateInfluencers,
  getAffiliateTransactions,
  affiliateTransactions
}) {

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [campaignId, setCampaignId] = useState('');
  const [influencerId, setInfluencerId] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const transactionTypeList = [{
    label: 'ALL',
    value: ''
  },
  {
    label: 'Click',
    value: 'click',
  },
  {
    label: 'Impression',
    value: 'impression',
  }
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
    getActiveInfluencer('');
    getAffiliateTransactions('', '', '', 1, limit).then((data) => {
      setLoading(false);
    });
  }, []);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    let page = currentPage === 0 ? 1 : currentPage;
    getAffiliateTransactions(campaignId.value, influencerId.value, transactionType.value, 1, limit).then(() => {
      setLoading(false);
    });
  }

  const refreshPage = (e) => {
    setLoading(true);
    getAffiliateActiveCampaign();
    getActiveInfluencer('');
    getAffiliateTransactions('', '', '', 1, limit).then(() => {
      setLoading(false);
    });
    setCampaignId('');
    setInfluencerId('');
  }

  const handlePageClick = (e) => {
    const page = e.selected;
    setCurrentPage(page);
    setLoading(true);
    getAffiliateTransactions(campaignId.value, influencerId.value, transactionType.value, page + 1, limit).then(() => {
      setLoading(false);
    });
  };

  const changeCampaign = (e) => {
    setInfluencerId('');
    getActiveInfluencer(e.value);
    setCampaignId(e);

  }

  const changeInfluencer = (e) => {
    setInfluencerId(e);
  }

  const changeTransactionType = (e) => {
    setTransactionType(e);
  }



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
                {moment(item?.campaign?.created_at).format("YYYY-MM-DD HH:MM:SS A")}
                </td>
                <td>{item?.instagram_username}</td>
                <td>{item?.campaign?.instagram_username}</td>
                <td>{item?.campaign?.campaign_name}</td>
                <td>{moment(item?.campaign?.start_date).format("YYYY-MM-DD")}</td>
                <td>{moment(item?.campaign?.end_date).format("YYYY-MM-DD")}</td>
                <td>{item?.parent_category?.category_name}</td>
                <td>{item?.campaign?.campaign_type}</td>
                <td>${item.campaign?.budget}</td>
                <td>${item.campaign?.pay_per_hundred}</td>
                <td>{item?.ip_address}</td>
                <td>{item?.transaction_type}</td>
                <td className="text-center">
                  <i class="fa fa-eye"></i>
                </td>
              </tr>
            )
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
                      name="category"
                      className="selectCustomization"
                      options={transactionTypeList}
                      placeholder="Select Influencer"
                      onChange={changeTransactionType}
                      styles={style}
                    />
                  </Col>
                  <Col className="transaction-search d-flex" xs={12} xl={3} md={3}>
                    <Button
                      type="submit"
                      variant="primary"
                      className='fltr-hpr'
                    >
                      Search
                    </Button>
                    <Button
                      className='fltr-hpr btn-gray'
                      onClick={refreshPage}
                      type="button"
                      variant="primary"
                    >
                      Refresh
                    </Button>
                  </Col>
                </Row>
              </form>
              {
                loading ? <Loader size="30" /> : affiliateTransactions?.message?.data?.length > 0 ?
                  (
                    <>
                      <Table responsive="sm" className="transactions-box">
                        <thead>
                          <tr>
                            <th>PID</th>
                            <th>Date/Time</th>
                            <th>Source Name</th>
                            <th>Destination Name</th>
                            <th>Campaign Name</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Category</th>
                            <th>Campaign Type</th>
                            <th>Budget</th>
                            <th>Click Rate</th>
                            <th>IP</th>
                            <th>Transaction Type</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dataTable()}
                        </tbody>
                      </Table>
                    </>
                  ) : (<NoDataFound />)
              }
              {affiliateTransactions?.message?.data?.length > 0 &&
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
                    pageCount={Math.ceil(affiliateTransactions?.message?.total_records / limit)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={window.innerWidth <= 760 ? 1 : 7}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination justify-content-center mt-2 custom-paginate"}
                    // subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                  />
                </Row>
              }
            </div>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
}

function mapStateToProps({ affiliateTransactions, affiliateCampaigns, affiliateInfluencers }) {
  return { affiliateTransactions, affiliateCampaigns, affiliateInfluencers };
}
export default connect(mapStateToProps, { ...affiliateTransactionsActions })(
  AffiliateTransaction
);