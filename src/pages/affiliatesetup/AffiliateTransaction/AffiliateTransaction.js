import React, { useEffect, useState } from "react";
import { Row, Col, Button, Table } from "react-bootstrap";
import * as affiliateTransactionsActions from "../../../actions/affiliateTransactions";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import Loader from "../../../components/Loader/Loader";
import Select from "react-select";
import NoDataFound from "../../../components/NoDataFound/NoDataFound";

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
  const limit = 25;

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
    getAffiliateTransactions('', '', 1, limit).then(() => {
      setLoading(false);
    });
  }, []);

  function dataTable() {
    let data = affiliateTransactions?.message?.data;
    if (data) {
      return (
        <>
          {data.map((item, i) => {
            return (
              <tr key={i}>
                <td>{item?.campaign?.campaign_name}</td>
                <td>{item?.campaign?.campaign_type}</td>
                <td>{item?.instagram_username}</td>
                <td>{item?.country}</td>
                <td>{item?.city}</td>
                <td>{item?.created_date}</td>
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

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    let page = currentPage === 0 ? 1 : currentPage;
    getAffiliateTransactions(campaignId, influencerId, page, limit).then(() => {
      setLoading(false);
    });
  }

  const refreshPage = (e) => {
    setLoading(true);
    getAffiliateActiveCampaign();
    getActiveInfluencer('');
    getAffiliateTransactions('', '', 1, limit).then(() => {
      setLoading(false);
    });
  }

  const handlePageClick = (e) => {
    const page = e.selected;
    setCurrentPage(page);
    setLoading(true);
    getAffiliateTransactions('', '', page + 1, limit).then(() => {
      setLoading(false);
    });
  };

  const changeCampaign = (e) => {
    const campaignId = e.value;
    getActiveInfluencer(campaignId);
    setCampaignId(campaignId);
  }

  const changeInfluencer = (e) => {
    const influencerId = e.value;
    setInfluencerId(influencerId);
  }

  if (!loading) {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <h4 className="page-title">Analytics</h4>
          <div className="brand_container_main container aff-payment">
            <Row>
              <div className="col-md-12">
                <form className="mb-3" onSubmit={handleSubmit}>
                  <Row>
                    <Col xs={12} xl={4} md={4}>
                      <p>Select Campaign</p>
                      <Select
                        name="category"
                        className="selectCustomization"
                        options={affiliateCampaigns}
                        placeholder="Select Campaign"
                        onChange={changeCampaign}
                        styles={style}
                      />
                    </Col>
                    <Col xs={12} xl={4} md={4}>
                      <p>Select Influencer</p>
                      <Select
                        name="category"
                        className="selectCustomization"
                        options={affiliateInfluencers}
                        placeholder="Select Influencer"
                        onChange={changeInfluencer}
                        styles={style}
                      />
                    </Col>
                    <Col className="transaction-search d-flex" xs={12} xl={4} md={4}>
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
                <Table responsive="sm" className="transactions-box">
                  <thead>
                    <tr>
                      <th>Campaign Name</th>
                      <th>Campaign Type</th>
                      <th>Influencer</th>
                      <th>Country</th>
                      <th>City</th>
                      <th>Date</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataTable()}
                  </tbody>
                </Table>
                {affiliateTransactions?.message?.data?.length > 0 ?
                  <>
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
                  </>
                  :(<NoDataFound/>)
                }
              </div>
            </Row>

          </div>
        </div>
      </React.Fragment>
    );
  }
  else {
    return <Loader size={30} />;
  }
}
function mapStateToProps({ affiliateTransactions, affiliateCampaigns, affiliateInfluencers }) {
  return { affiliateTransactions, affiliateCampaigns, affiliateInfluencers };
}
export default connect(mapStateToProps, { ...affiliateTransactionsActions })(
  AffiliateTransaction
);