import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Box from "./Box";
import { connect } from "react-redux";
import * as markActions from "../../actions/marketPlace"
import ReactPaginate from "react-paginate";

function Marketplace({ getMarketPlace, marketPlace, addCampaignToShop }) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 9;

  useEffect(() => {
    setLoading(true);
    getMarketPlace(1, limit).then(() => {
      setLoading(false);
    })

  }, [])

  const handlePageClick = (e) => {
    let page = e.selected;
    setCurrentPage(page);
    getMarketPlace(page + 1, limit).then(() => {
      setLoading(false);
    })
  }

  if (!loading) {
    return (
      <div>
        <div className="analytics-page affiliate-page linkin-bio">
          <div className="container-fluid">
            <h4 className="page-title mt-4">Marketplace</h4>
            {marketPlace.message && (
              <>
                <Row>
                  {marketPlace.message.map((item, index) =>
                    <Col key={index} xs={12} xl={3} md={6}>
                      <Box key={index}
                        userInfo={userInfo}
                        addCampaignToShop={addCampaignToShop}
                        item={item} index={index} />
                    </Col>)}
                </Row>
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
                  pageCount={Math.ceil(marketPlace.totalCount / limit)}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination justify-content-center mt-2 custom-paginate"}
                  // subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                />
              </>
            )}
          </div>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className="col-md-12">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 5,
            height: 300,
          }}
        >
          <i className="la la-spinner la-spin" style={{ fontSize: 40 }} />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ marketPlace }) {
  return { marketPlace }
}
export default connect(mapStateToProps, markActions)(Marketplace);