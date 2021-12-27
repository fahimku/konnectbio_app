import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Select from "react-select";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader/Loader";
import Box from "../Box"
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import ReactPaginate from "react-paginate";
import { DatePicker } from "antd";
import moment from "moment";
import { connect } from "react-redux";
import InfiniteScroll from 'react-infinite-scroll-component';
import * as  hashActions from "../../../actions/hashtags"

const { RangePicker } = DatePicker;

const dateFormat = "YYYY-MM-DD";

function TopHashTag({
  getMarketPlace,
  marketPlace,
  addCampaignToShop,
  getUserCategories,
  getBrandsCategory,
  type,
  title,
  getBrands,
  brands,
  getHashtag,
  hashtags,
  hashtag
}) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [clearLoading, setClearLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);

  const [category, setCategory] = useState({ value: "all", label: "ALL" });
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [brand, setBrand] = useState({ value: 'all', label: 'All' });
  const [sortBy, setSortBy] = useState({
    value: "followers",
    label: "Follower",
  });
  const [orderBy, setOrderBy] = useState({ value: "desc", label: "DESC" });
  const [currentPage, setCurrentPage] = useState(0);

  const fromDate = moment().subtract(4,'year').format("YYYY-MM-DD");
  const toDate = moment(new Date()).format("YYYY-MM-DD");
  const [startDate, setStartDate] = useState(fromDate);
  const [endDate, setEndDate] = useState(toDate);
  const limit = 8;

//   useEffect(() => {
//     setLoading(true);
//     getMarketPlace(
//       1,
//       limit,
//       "all",
//       "commission",
//       "desc",
//       startDate,
//       endDate,
//       type,
//       brand.value,
//       "users/marketPlace/getCampaigns"
//     ).then(function () {
//       setLoading(false);
//     });
//     getBrands();
//     return () => {};
//   }, []);

  useEffect(() => {
    setSearchLoading(true)
    getHashtag({
      hashtag_id:brand.value,
      from_date:startDate.toString(),
      to_date:endDate.toString(),
      sort:sortBy.value,
      order_by:orderBy.value
    },1)
    .then(()=>setSearchLoading(false))
  }, []);

  function onSubmitData(e){
      e.preventDefault()
    setSearchLoading(true)
    getHashtag({
      hashtag_id:brand.value,
      from_date:startDate.toString(),
      to_date:endDate.toString(),
      sort:sortBy.value,
      order_by:orderBy.value
    },1).then(()=>{
        setSearchLoading(false)
    })
  }

//   const searchMarketPlace = (e) => {
//     setSearchLoading(true);
//     setLoading(true);
//     setCurrentPage(0);
//     e.preventDefault();
//     getMarketPlace(
//       1,
//       limit,
//       category.value,
//       sortBy.value,
//       orderBy.value,
//       startDate,
//       endDate,
//       type,
//       brand.value,
//       "users/marketPlace/getCampaigns"
//     ).then(
//       function () {
//         setLoading(false);
//         setSearchLoading(false);
//       },
//       function (error) {
//         setLoading(false);
//         setSearchLoading(false);
//         toast.error(error?.response?.data?.message);
//       }
//     );
//   };

  const clearMarketPlace = (e) => {
    setClearLoading(true);
    setBrand({ value: "all", label: "ALL" });
    setSortBy({ value: "followers", label: "Followers" });
    setOrderBy({ value: "desc", label: "DESC" });
    getHashtag({
      hashtag_id:'all',
      from_date:fromDate.toString(),
      to_date:toDate.toString(),
      sort:'followers',
      order_by:'desc'
    }).then(()=>{
        setClearLoading(false)
    })
  };

//   const handlePageClick = (e) => {
//     const page = e.selected;
//     setCurrentPage(page);
//     getMarketPlace(
//       page + 1,
//       limit,
//       category.value,
//       sortBy.value,
//       orderBy.value,
//       startDate,
//       endDate,
//       type,
//       brand.value,
//       "users/marketPlace/getCampaigns"
//     ).then(function () {
//       setLoading(false);
//     });
//   };

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
    { value: "followers", label: "FOLLOWER" },
    { value: "likes", label: "LIKE" },
    { value: "comments", label: "COMMENT" },
    { value: "date", label: "DATE" }
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

  // if (!loading) {
  return (
    <>
      <div className="analytics-page affiliate-page linkin-bio">
        <div className="container-fluid">
          <h4 className="page-title">{title}</h4>
          <Row className="post-analytics-tab mb-4">
            <Col xs={12} xl={12} md={12}>
              <form onSubmit={onSubmitData}>
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
                    <p>Hashtags</p>
                    <Select
                      value={brand}
                      name="sort"
                      className="selectCustomization"
                      options={[{hashtag_id:'all',hashtag:'All'},...hashtags.message].map((item)=>{
                          return {
                            value:item.hashtag_id,
                            label:item.hashtag
                          }
                      })}
                      onChange={(e) => {
                        setBrand(e);
                      }}
                      placeholder="Select Brand"
                      styles={style}
                    />
                  </Col>
                  {/* <Col xs={12} xl={2} md={6}>
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
                  </Col> */}
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
                      name="order"
                      className="selectCustomization"
                      options={sortOrderOptions}
                      onChange={(e) => {
                        setOrderBy(e);
                      }}
                      placeholder="Order By"
                      styles={style}
                    />
                  </Col>
                  {/* <Col xs={12} xl={2} md={6}>
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
                  </Col> */}
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
          <div style={{marginTop:20}}>
           {searchLoading || clearLoading?(
            <div style={{height:300,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <Loader size={30}/>
            </div>
        ):(
            hashtag.message.length>0?(
              <InfiniteScroll
          dataLength={hashtag.message.length}
          next={()=>{
            getHashtag({
              hashtag_id:brand.value,
              from_date:startDate.toString(),
              to_date:endDate.toString(),
              sort:sortBy.value,
              order_by:orderBy.value
            },hashtag.pagination.next?.page,true)
          }}
          hasMore={(hashtag.pagination.next)?true:false}
          loader={
            <div style={{height:100,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            <Loader size={40}/>
            </div>
          }
          // pullDownToRefreshThreshold={50}
        >
          <div>
          <ResponsiveMasonry
        columnsCountBreakPoints={{350: 1,700:2 ,1100: 3, 1500: 4}}
        >
                <Masonry gutter="15px">
                {
                    hashtag.message.map((item)=>{
                        return (
                            <Box data={item}/>
                        )
                    })
                }
            </Masonry>
        </ResponsiveMasonry>
          </div>
         </InfiniteScroll>
        ):(
            <div style={{height:300,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <h1 style={{textAlign:'center'}}>No result Found</h1>
            </div>
        )
        )}
    </div>
          {/* {!loading ? (
            marketPlace?.message?.length > 0 ? (
              <>
                <Row className="post-analytics-tab-boxes-ift">
                  {marketPlace.message.map((item, index) => (
                    <Box
                      key={index}
                      userInfo={userInfo}
                      addCampaignToShop={addCampaignToShop}
                      item={item}
                      index={index}
                    />
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
                  pageRangeDisplayed={window.innerWidth <= 760 ? 1 : 7}
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
            )
          ) : (
            <Loader size={40} />
          )} */}
        </div>
      </div>
    </>
  );
}

function mapStateToProps({hashtags,hashtag}){
    return {hashtags,hashtag}
}

export default connect(mapStateToProps,hashActions)(TopHashTag);