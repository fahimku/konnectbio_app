import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Box from "./Box";
import Select from "react-select";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader/Loader";
import { connect } from "react-redux";
import * as markActions from "../../../actions/marketPlace";
import * as catActions from "../../../actions/category";
import * as brandActions from "../../../actions/brands";
import ReactPaginate from "react-paginate";
import { DatePicker } from "antd";
import moment from "moment";
import Swal from "sweetalert2";

const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

function ActiveMarketPlace({
  getMarketPlace,
  marketPlace,
  getUserCategories,
  getBrandsCategory,
  activateDeactivateCampaign,
  type,
  title,
  getBrands,
  brands,
  endPoint,
}) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [clearLoading, setClearLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);

  const [category, setCategory] = useState({ value: "all", label: "ALL" });
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [brand, setBrand] = useState({ value: "all", label: "ALL" });
  const [sortBy, setSortBy] = useState({
    value: "commission",
    label: "COMMISSION",
  });
  const [orderBy, setOrderBy] = useState({ value: "desc", label: "DESC" });
  const [currentPage, setCurrentPage] = useState(0);

  const fromDate = moment(new Date()).format("YYYY-MM-DD");
  const toDate = moment().add(1, "year").format("YYYY-MM-DD");
  const [startDate, setStartDate] = useState(fromDate);
  const [endDate, setEndDate] = useState(toDate);
  const limit = 8;

  useEffect(() => {
    setLoading(true);
    getMarketPlace(
      1,
      limit,
      "all",
      "commission",
      "desc",
      startDate,
      endDate,
      type,
      brand.value,
      endPoint
    ).then(function () {
      setLoading(false);
    });

    getUserCategories().then(
      function (res) {
        setCategoryOptions(
          res.map((item) => {
            return { value: item.category_id, label: item.category_name };
          })
        );
      },
      function (error) {
        toast.error(error?.response?.data?.message);
      }
    );
    getBrands();
    return () => {};
  }, []);

  useEffect(() => {
    setCategoryLoading(true);
    setCategory({ value: "all", label: "ALL" });
    if (brand.value === "all") {
      getUserCategories().then(
        function (res) {
          setCategoryOptions([
            { value: "all", label: "ALL" },
            ...res.map((item) => {
              return { value: item.category_id, label: item.category_name };
            }),
          ]);
        },
        function (error) {
          toast.error(error?.response?.data?.message);
        }
      );
    } else {
      getBrandsCategory(brand.value).then(
        function (res) {
          setCategoryOptions([
            { value: "all", label: "ALL" },
            ...res.map((item) => {
              return { value: item.category_id, label: item.category_name };
            }),
          ]);
          setCategoryLoading(false);
        },
        function (error) {
          toast.error(error?.response?.data?.message);
        }
      );
    }
    return () => {};
  }, [brand]);

  const searchMarketPlace = (e) => {
    setSearchLoading(true);
    setCurrentPage(0);
    e.preventDefault();
    getMarketPlace(
      1,
      limit,
      category.value,
      sortBy.value,
      orderBy.value,
      startDate,
      endDate,
      type,
      brand.value,
      endPoint
    ).then(
      function () {
        setLoading(false);
        setSearchLoading(false);
      },
      function (error) {
        toast.error(error?.response?.data?.message);
      }
    );
  };

  const clearMarketPlace = (e) => {
    //e.preventDefault();
    setClearLoading(true);
    setCategory({ value: "all", label: "ALL" });
    setBrand({ value: "all", label: "ALL" });
    setSortBy({ value: "commission", label: "COMMISSION" });
    setOrderBy({ value: "desc", label: "DESC" });
    setCurrentPage();
    setStartDate(fromDate);
    setEndDate(toDate);
    getMarketPlace(
      1,
      limit,
      "all",
      "commission",
      "desc",
      fromDate,
      toDate,
      type,
      "all",
      endPoint
    ).then(
      function () {
        setLoading(false);
        setSearchLoading(false);
        setClearLoading(false);
      },
      function (error) {
        toast.error(error?.response?.data?.message);
      }
    );
  };

  const handlePageClick = (e) => {
    const page = e.selected;
    setCurrentPage(page);
    getMarketPlace(
      page + 1,
      limit,
      category.value,
      sortBy.value,
      orderBy.value,
      startDate,
      endDate,
      type,
      brand.value,
      endPoint
    ).then(function () {
      setLoading(false);
    });
  };

  const toggleCampaigns = async (status, campaignId) => {
    let promise = new Promise((resolve, reject) => {
      let statusName = status ? "Deactivate" : "Activate";
      Swal.fire({
        title: `Are you sure you want to ${statusName} this campaign?`,
        icon: status ? "warning" : "success",
        cancelButtonText: "No",
        showCancelButton: true,
        confirmButtonColor: "#010b40",
        cancelButtonColor: "#d33",
        confirmButtonText: `Yes`,
      }).then((result) => {
        if (result.isConfirmed) {
          activateDeactivateCampaign(campaignId, status).then(
            function () {
              clearMarketPlace();
              resolve("success");
              toast.success("Campaign " + statusName + " Successfully");
            },
            function (error) {
              reject("error");
              toast.error(error.response?.data.message);
            }
          );
        }
      });
    });
    return promise;
  };

  const style = {
    control: (base) => ({
      ...base,
      height: "44px",
      boxShadow: "none",
      "&:hover": {
        // border: "1px solid black",
      },
    }),
  };

  const sortByOptions = [
    { value: "commission", label: "COMMISSION" },
    { value: "date", label: "DATE" },
  ];

  const sortOrderOptions = [
    { value: "asc", label: "ASC" },
    { value: "desc", label: "DESC" },
  ];

  const dateRangePickerChanger = (value, dataString) => {
    const startDate = dataString[0];
    const endDate = dataString[1];
    setStartDate(startDate);
    setEndDate(endDate);
  };

  if (!loading) {
    return (
      <>
        <div className="analytics-page affiliate-page linkin-bio">
          <div className="container-fluid">
            <h4 className="page-title">{title}</h4>
            <Row className="post-analytics-tab mb-4">
              <Col xs={12} xl={12} md={12}>
                <form onSubmit={searchMarketPlace}>
                  <Row>
                    <Col xs={12} xl={2} md={6}>
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
                    <Col xs={12} xl={2} md={6}>
                      <p>Brands</p>
                      <Select
                        value={brand}
                        name="sort"
                        className="selectCustomization"
                        options={brands}
                        onChange={(e) => {
                          setBrand(e);
                        }}
                        placeholder="Select Brand"
                        styles={style}
                      />
                    </Col>
                    <Col xs={12} xl={2} md={6}>
                      <p>Select Category</p>
                      <Select
                        value={category}
                        name="sort"
                        className="selectCustomization"
                        options={categoryOptions}
                        onChange={(e) => {
                          setCategory(e);
                        }}
                        placeholder="Select Category"
                        styles={style}
                      />
                    </Col>
                    <Col xs={12} xl={2} md={6}>
                      <p>Sort By</p>
                      <Select
                        value={sortBy}
                        name="sort"
                        className="selectCustomization"
                        options={sortByOptions}
                        onChange={(e) => {
                          setSortBy(e);
                        }}
                        placeholder="Sort By"
                        styles={style}
                      />
                    </Col>
                    <Col xs={12} xl={2} md={6}>
                      <p>Order By</p>
                      <Select
                        value={orderBy}
                        name="sort"
                        className="selectCustomization"
                        options={sortOrderOptions}
                        onChange={(e) => {
                          setOrderBy(e);
                        }}
                        placeholder="Order By"
                        styles={style}
                      />
                    </Col>
                    <Col className="d-flex" xs={12} xl={2} md={6}>
                      {searchLoading ? (
                        <Button
                          type="button"
                          variant="primary"
                          className="fltr-hpr"
                        >
                          <Loader />
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          variant="primary"
                          className="fltr-hpr"
                        >
                          Search
                        </Button>
                      )}
                      {clearLoading ? (
                        <Button variant="gray" className="fltr-hpr btn-primary">
                          <Loader />
                        </Button>
                      ) : (
                        <Button
                          onClick={clearMarketPlace}
                          variant="gray"
                          className="fltr-hpr btn-primary"
                        >
                          Reset
                        </Button>
                      )}
                    </Col>
                  </Row>
                </form>
              </Col>
            </Row>
            <hr />
            {marketPlace?.message?.length > 0 ? (
              <>
                <Row className="post-analytics-tab-boxes-ift">
                  {marketPlace.message.map((item, index) => (
                    <Col key={index} xs={12} xl={3} md={6}>
                      <Box
                        key={index}
                        userInfo={userInfo}
                        toggleCampaigns={toggleCampaigns}
                        item={item}
                        index={index}
                      />
                    </Col>
                  ))}
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
                  containerClassName={
                    "pagination justify-content-center mt-2 custom-paginate"
                  }
                  // subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                />
              </>
            ) : (
              "No Data Found"
            )}
          </div>
        </div>
      </>
    );
  } else {
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
function mapStateToProps({ marketPlace, brands }) {
  return {
    marketPlace,
    brands,
  };
}

export default connect(mapStateToProps, {
  ...markActions,
  ...catActions,
  ...brandActions,
})(ActiveMarketPlace);
