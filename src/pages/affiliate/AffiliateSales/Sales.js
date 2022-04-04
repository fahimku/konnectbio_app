import React, { useEffect, useState } from "react";
import { Row, Col, Button, Table, Modal } from "react-bootstrap";
import * as affiliateTransactionsActions from "../../../actions/affiliateSales";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import Loader from "../../../components/Loader/Loader";
import Select from "react-select";
import NoDataFound from "../../../components/NoDataFound/NoDataFound";
import moment from "moment";
import { DatePicker } from "antd";
import numeral from "numeral";
// import CampaignDetailTransaction from "./CampaignDetailTransaction";

const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

function AffiliateSales({
    getAffiliateSalesByBrand,
    getAffiliateSalesByInfluencer,
    affiliateSales
}) {
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const fromDate =
   
      moment(new Date()).format("YYYY-MM-DD")
      moment().startOf("year").format("YYYY-MM-DD");
  const toDate =
       moment().add(1, "year").format("YYYY-MM-DD")
       moment(new Date()).format("YYYY-MM-DD");
  const [startDate, setStartDate] = useState(fromDate);
  const [endDate, setEndDate] = useState(toDate);


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

    const limit = 12;
    const detailLimit = 12;
    const influncerLimit = 12;
    const dateRangePickerChanger = (value, dataString) => {
      const startDate = dataString[0];
      const endDate = dataString[1];
      setStartDate(startDate);
      setEndDate(endDate);
    };

    const handleSubmit = (e) => {
      // setLoading(true);
      // e.preventDefault();
      // setCurrentPage(0);
      // getAffiliateTransactions(
      //   status.value,
      //   campaignId.value,
      //   // influencerId.value,
      //   // transactionType.value,
      //   // groupBy.value,
      //   1,
      //   limit
      // ).then((data) => {
      //   setLoading(false);
      //   setSubmit(groupBy.value);
      // });
    };

    const handlePageClick = (e) => {
      const page = e.selected;
      setCurrentPage(page);
      setLoading(true);
      getAffiliateSalesByBrand(
       // status.value,
       // campaignId.value,
        // influencerId.value,
        // transactionType.value,
        // groupBy.value,
       // page + 1,
       // limit
      ).then(() => {
        if (affiliateSales?.message?.data?.length > 0) {
          setLoading(false);
        }
      });
    }
  
  useEffect(() => {
    
    const currentUser = JSON.parse(localStorage.getItem('userInfo'));
     const accountType = currentUser.account_type;
     const UserId = currentUser.user_id;
  

    if(accountType === 'brand'){
    getAffiliateSalesByBrand(UserId).then(() => {
        setLoading(false);
      });
    }
    if(accountType === 'influencer'){
        getAffiliateSalesByInfluencer(UserId).then(() => {
            setLoading(false);
          });
        }
  }, []);

  function dataTable() {
      let data = affiliateSales;
      
      console.log('update',affiliateSales)

    if (data) {
      return (
          <>
              {loading ? (
                  <Loader size="30" />
              ) : (
                
                  <Table responsive="sm" className="transactions-box">
                      <thead>
                          <tr>
                              <th>S.#</th>
                              <th>Date</th>
                              <th>Campaign Name</th>
                              <th>Promo</th>
                              <th>Order Id</th>
                              <th>Pixel Id</th>
                              <th>Inf.Name </th>
                              <th>Email</th>
                              <th>Account Type</th>
                              <th>Country</th>
                              <th>Instagram UserName </th>
                              <th>Total Qty</th>
                              <th>Total Sale</th>
                              <th>Order Total Price</th>
                          </tr>
                      </thead>
                      <tbody>
                          {data.map((item, i) => {
                              return (
                  
                                   <tr key={i}>
                 
                                      <td>{i+1}</td>
                                      <td>{moment(item?.createdAt).format("YYYY-MM-DD")}</td>
                                      <td>{item?.campaign?.campaign_name}</td>
                                      <td>{item?.campaign?.promo}</td>
                                      <td>{item?.order_id}</td>
                                      <td>{item?.pixel_id}</td>
                                      <td>{item?.publisher?.name}</td>
                                      <td>{item?.publisher?.email}</td>
                    
                                      <td>{item?.publisher?.account_type}</td>
                                      <td>{item?.publisher?.country}</td>
                                      <td>{item?.publisher?.instagram_username}</td>
                                      <td>{item?.totalQty}</td>
                                      <td>{item?.totalSale}</td>
                                      <td>{item?.order_totalprice}</td>
                   
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
      <h4 className="page-title">Sales</h4>
      <div className="brand_container_main aff-payment">
        <Row>
          <div className="col-md-12">
          <form className="mb-3" onSubmit={handleSubmit}>
                <Row>
                <Col xs={12} xl md={6}>
                  <p>Select Start Date / End Date</p>
                  <RangePicker
                    key={4}
                    value={
                      startDate && endDate
                        ? [moment(startDate), moment(endDate)]
                        : []
                    }
                    allowClear={false}
                    ranges={{
                      Today: [moment(), moment()],
                      Tomorrow: [
                        moment().add(1, "days"),
                        moment().add(1, "days"),
                      ],
                      Yesterday: [
                        moment().subtract(1, "days"),
                        moment().subtract(1, "days"),
                      ],
                      "This Month": [
                        moment().startOf("month"),
                        moment().endOf("month"),
                      ],
                      "Last Month": [
                        moment().subtract(1, "month").startOf("month"),
                        moment().subtract(1, "month").endOf("month"),
                      ],
                    }}
                    format={dateFormat}
                    onChange={dateRangePickerChanger}
                  />
                </Col>
                <Col xs={12} xl={3} md={6}>
                    <p>Select Status</p>
                    <Select
                     // value={status}
                      name="status"
                      className="selectCustomization"
                     // options={statusList}
                      placeholder="Select Status"
                      //onChange={changeStatus}
                      styles={style}
                    />
                  </Col>
                  <Col xs={12} xl={3} md={6}>
                    <p>Select Campaign</p>
                    <Select
                      //value={campaignId}
                      name="category"
                      className="selectCustomization"
                      //options={affiliateCampaigns}
                      placeholder="Select Campaign"
                      //onChange={changeCampaign}
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
                        //onClick={refreshPage}
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
                  {affiliateSales?.message?.data?.length === 0 ? (
                    <>
                      <NoDataFound />
                    </>
                  ) : (
                    <>
                      { dataTable()
                       }
                    </>
                  )}
                </>
              )}

                {/* {affiliateSales?.message?.data?.length > 0 && !loading && ( */}
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
                      affiliateSales?.message?.total_records / limit
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
               {/* )} */}

                      </div>
                  </Row>
              </div>
          </div>
          </React.Fragment>
  );
}

function mapStateToProps({
  affiliateSales,
  getAffiliateSalesByBrand,
  getAffiliateSalesByInfluencer,
}) {
  return {
    affiliateSales,
    getAffiliateSalesByBrand,
    getAffiliateSalesByInfluencer,
  };
}
export default connect(mapStateToProps, { ...affiliateTransactionsActions })(
  AffiliateSales
);