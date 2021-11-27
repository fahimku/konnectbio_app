import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Box from "./Box";
import Select from "react-select";
import Loader from "../../components/Loader/Loader";
import { connect } from "react-redux";
import * as markActions from "../../actions/marketPlace"
import * as catActions from "../../actions/category"
import ReactPaginate from "react-paginate";

function Marketplace({ getMarketPlace, marketPlace, addCampaignToShop, getUserCategories, categories }) {

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const limit = 9;

  useEffect(() => {

    setLoading(true);

    getMarketPlace(1, limit).then(() => {
      setLoading(false);
    })

    getUserCategories().then(() => {
    });

    return () => {
    }
  }, [])

  const searchMarketPlace = (e) => {
    setSearchLoading(true);
    e.preventDefault();
  }

  const handlePageClick = (e) => {
    const page = e.selected;
    setCurrentPage(page);
    getMarketPlace(page + 1, limit).then(() => {
      setLoading(false);
    })
  }

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

  const sortOrderOptions = [
    { value: "asc", label: "ASC" },
    { value: "desc", label: "DESC" },
  ];

  if (!loading) {
    return (
      <>
        <div className="analytics-page affiliate-page linkin-bio">
          <div className="container-fluid">
            <h4 className="page-title mt-4">Marketplace</h4>
            <Row className="post-analytics-tab mb-4">
              <Col xs={12} xl={12} md={12}>
                <form onSubmit={searchMarketPlace}>
                  <Row>
                    <Col xs={12} xl={2} md={6}>
                      <p>Select Category</p>
                      <Select

                        name="sort"
                        className="selectCustomization"
                        options={categories}
                        placeholder="Select Category"
                        styles={style}
                      />
                    </Col>
                    <Col xs={12} xl={2} md={6}>
                      <p>Order By</p>
                      <Select
                        name="sort"
                        className="selectCustomization"
                        options={sortOrderOptions}
                        placeholder="Order By"
                        styles={style}
                      />
                    </Col>
                    <Col xs={12} xl={4} md={6}>
                      {searchLoading ? <Button
                        type="button"
                        variant="primary"
                        className="fltr-h btn btn-primary"
                      >
                        <Loader />
                      </Button> :
                        <Button
                          type="submit"
                          variant="primary"
                          className="fltr-h btn btn-primary"
                        >
                          Search
                        </Button>
                      }
                      <Button
                        variant="gray"
                        className="fltr-h btn btn-primary"
                      >
                        Clear
                      </Button>
                    </Col>
                  </Row>
                </form>
              </Col>
            </Row>
            <hr />
            {marketPlace?.message?.length > 0 && (
              <>
                <Row>
                  {marketPlace.message.map((item, index) =>
                    <Col key={index} xs={12} xl={3} md={6}>
                      <Box key={index}
                        userInfo={userInfo}
                        addCampaignToShop={addCampaignToShop}
                        item={item}
                        index={index} />
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
      </>
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

function mapStateToProps({ marketPlace, categories }) {
  return { marketPlace, categories }
}

export default connect(mapStateToProps, { ...markActions, ...catActions })(Marketplace);