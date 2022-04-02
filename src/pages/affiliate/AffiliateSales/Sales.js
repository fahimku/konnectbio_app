import React, { useEffect, useState } from "react";
import { Row, Col, Button, Table, Modal } from "react-bootstrap";
import * as affiliateTransactionsActions from "../../../actions/affiliateSales";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import Loader from "../../../components/Loader/Loader";
import Select from "react-select";
import NoDataFound from "../../../components/NoDataFound/NoDataFound";
import moment from "moment";
import numeral from "numeral";
// import CampaignDetailTransaction from "./CampaignDetailTransaction";

function AffiliateSales({
    getAffiliateSalesByBrand,
    getAffiliateSalesByInfluencer,
    affiliateSales
}) {
    const [loading, setLoading] = useState(true);

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
                          <form className="mb-3" >
                          </form>
                          {dataTable()}
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