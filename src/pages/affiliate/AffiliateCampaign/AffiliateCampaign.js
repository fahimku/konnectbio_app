import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Row, Col } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import moment from "moment";
import Loader from "../../../components/Loader/Loader"; // eslint-disable-line css-modules/no-unused-class
//import { DatePicker } from "antd";
import "antd/dist/antd.css";
//import Select from "react-select";
import ReactPaginate from "react-paginate";

// const { RangePicker } = DatePicker;
// const dateFormat = "YYYY-MM-DD";

// const twodecimalplace = (value = 0) => {
//   return parseFloat(value).toFixed(2);
// };

// const numberWithCommas = (x) => {
//   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// };


const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={e => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    <i class="fa fa-ellipsis-h fa-2x" aria-hidden="true"></i>

  </a>
));

class AffiliateCampaign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      toggleCampaign: false,
      data: [],
      loading: false,
      fromDate: moment().startOf("year").format("YYYY-MM-DD"),
      toDate: moment(new Date()).format("YYYY-MM-DD"),
      today: moment(new Date()).format("YYYY-MM-DD"),
      lastYear: moment().startOf("year").format("YYYY-MM-DD"),
      page: "1",
      limit: "8",
      previous: "",
      myCategory: "",
      saveCategory: "",
      optionCategory: "",
      saveSort: "date",
      optionSort: "",
      saveSortOrder: "desc",
      optionSortOrder: "",
      offset: 0,
      perPage: 8,
      currentPage: 0,
    };
    //    this.dateRangePickerChanger = this.dateRangePickerChanger.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    // const date_to = moment(this.state.today).format("YYYY-MM-DD");
    this.fetchPostPerformance(
      this.state.username,
      this.state.lastYear,
      moment(new Date()).format("YYYY-MM-DD"),
      this.state.limit,
      this.state.page,
      "",
      this.state.saveSort,
      this.state.saveSortOrder
    );
    //this.fetchMyCategory();
  }

  toggleCampaign = async (status, campaignId) => {
    let statusName = status ? "disable" : "enable";
    Swal.fire({
      title: `Are you sure you want to ${statusName} this campaign?`,
      // text: "You won't be able to revert this!",
      icon: status ? "warning" : 'success',
      showCancelButton: true,
      confirmButtonColor: "#010b40",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`campaigns/revise/campaignstatus/${campaignId}`, {
            is_active: !status
          })
          .then(() => {
            this.fetchPostPerformance(
              this.state.username,
              this.state.lastYear,
              moment(new Date()).format("YYYY-MM-DD"),
              this.state.limit,
              this.state.page,
              "",
              this.state.saveSort,
              this.state.saveSortOrder
            );
            toast.success("Campaign Disabled Successfully");
          })
          .catch((err) => {
            toast.error(err.response.data.message);
          });
      }
    });
  };

  deleteCampaign = async (campaignId) => {
    Swal.fire({
      title: `Are you sure you want to delete this campaign?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#010b40",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/campaigns/remove/${campaignId}`)
          .then(() => {
            this.fetchPostPerformance(
              this.state.username,
              this.state.lastYear,
              moment(new Date()).format("YYYY-MM-DD"),
              this.state.limit,
              this.state.page,
              "",
              this.state.saveSort,
              this.state.saveSortOrder
            );
            toast.success("Campaign Deleted Successfully");
          })
          .catch((err) => {
            toast.error(err.response.data.message);
          });
      }
    });
  };

  async fetchPostPerformance(
    username,
    fromDate,
    toDate,
    limit,
    page,
    categoryId,
    sortId,
    orderBy
  ) {
    this.setState({ loading: true });
    await axios
      .get("campaigns/receive", {
        username: username,
        from_date: fromDate,
        to_date: toDate,
        page: page,
        limit: limit,
        post_type: "image",
        category_id: categoryId === "all" ? "" : categoryId,
        sort: sortId,
        order_by: orderBy,
      })
      .then((response) => {
        this.setState({ data: response.data.message, loading: false });
        this.postData();
        // if (response.data.message.hasOwnProperty("next")) {
        //   this.setState({ page: response.data.message.next.page });
        // } else {
        //   this.setState({ page: 0 });
        // }
        // if (response.data.message.hasOwnProperty("previous")) {
        //   this.setState({ previous: response.data.message.previous.page });
        // } else {
        //   this.setState({ previous: 0 });
        // }
      });
  }

  // fetchMyCategory = async () => {
  //   await axios
  //     .get("/users/receive/categories")
  //     .then((response) => {
  //       const selectCategories = [];
  //       const myCategories = response.data.message;
  //       myCategories.map(({ category_id, category_name, image_url }) => {
  //         return selectCategories.push({
  //           value: category_id,
  //           label: category_name,
  //           image: image_url,
  //         });
  //       });
  //       let all = {};
  //       all.value = "all";
  //       all.label = "ALL";
  //       selectCategories.unshift(all);
  //       this.setState({ myCategory: selectCategories });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // dateRangePickerChanger(value, dataString) {
  //   let fromDate = dataString[0];
  //   let toDate = dataString[1];
  //   this.setState({ fromDate: fromDate, toDate: toDate });
  //   // this.fetchPostPerformance(
  //   //   this.state.username,
  //   //   fromDate,
  //   //   toDate,
  //   //   this.state.limit,
  //   //   1
  //   // );
  // }

  pagination = () => {
    let { username, fromDate, toDate, limit, page } = this.state;
    this.fetchPostPerformance(
      username,
      fromDate,
      toDate,
      limit,
      page,
      this.state.saveCategory,
      this.state.saveSort,
      this.state.saveSortOrder
    );
  };

  paginationPrev = () => {
    let { username, fromDate, toDate, limit, previous } = this.state;
    this.fetchPostPerformance(
      username,
      fromDate,
      toDate,
      limit,
      previous,
      this.state.saveCategory,
      this.state.saveSort,
      this.state.saveSortOrder
    );
  };

  disabledDate(current) {
    return current && current > moment().endOf("day");
  }

  // handleSelect = (event) => {
  //   this.setState({
  //     saveCategory: event.value,
  //     optionCategory: event,
  //   });
  // };

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   this.setState({
  //     offset: 0,
  //     currentPage: 0,
  //   });
  //   this.fetchPostPerformance(
  //     this.state.username,
  //     // this.state.fromDate,
  //     // this.state.toDate,
  //     // this.state.limit,
  //     // this.state.page,
  //     // this.state.saveCategory,
  //     // this.state.saveSort,
  //     // this.state.saveSortOrder
  //   );
  // };

  // clearFilter = () => {
  //   this.setState({
  //     optionCategory: "",
  //     optionSort: "",
  //     optionSortOrder: "",
  //     saveCategory: "",
  //     // saveSort: "",
  //     // saveSortOrder: "",
  //     fromDate: moment().startOf("year").format("YYYY-MM-DD"),
  //     toDate: moment(new Date()).format("YYYY-MM-DD"),
  //   });
  //   this.fetchPostPerformance(
  //     this.state.username,
  //     this.state.lastYear,
  //     moment(new Date()).format("YYYY-MM-DD"),
  //     this.state.limit,
  //     this.state.page,
  //     "",
  //     this.state.saveSort,
  //     "desc"
  //   );
  // };

  // handleSort = (event) => {
  //   this.setState({
  //     saveSort: event.value,
  //     optionSort: event,
  //   });
  // };

  // handleSortOrder = (event) => {
  //   this.setState({
  //     saveSortOrder: event.value,
  //     optionSortOrder: event,
  //   });
  // };

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.postData();
      }
    );
  };

  postData = () => {
    const data = this.state.data;
    const slice = data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    const postData = slice.map((record, index) => (
      <React.Fragment>
        <Col xs={12} xl={3} md={6}>
          <div className="card analytic-box campaign-box">
            <div className="camp-row row">
              <div className="campaign-header col-12">
                <h6>{record.campaign_name}</h6>
                <div className="cmp-h-right col-md-6">
                <div class="form-check custom-switch custom-switch-md">
                  <input
                    type="checkbox"
                    checked={record.is_active}
                    onClick={() => {
                      this.toggleCampaign(record.is_active, record.campaign_id);
                    }}
                    class="custom-control-input"
                    id={`customSwitch` + index}
                    readOnly
                  />
                  <label
                    class="custom-control-label"
                    htmlFor={`customSwitch` + index}
                  ></label>
                </div>
                <Dropdown alignRight>
                  <Dropdown.Toggle as={CustomToggle} />
                  <Dropdown.Menu size="sm" title="">
                    <Dropdown.Item>View</Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        this.deleteCampaign(record.campaign_id);
                      }}
                    >
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                </div>
              </div>
              <div className="any-post-img-col col-12">
                <div className="any-post-image">
                  <div className="any-image-box">
                    <div className="any-image-box-iner">
                      <img
                        src={record.media_url}
                        className="img-fluid media-image"
                        alt={record.media_type}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 analytic-caption">
                <div className="row count-main-box">
                  <div className="col-12 count-box">
                    <h5 className="count-title">Category</h5>
                    <h3 className="count">
                      {record.categories.map((item) => item.category_name)}
                    </h3>
                  </div>
                  <div className="col-12 count-box">
                    <h5 className="count-title">Campaign Type</h5>
                    <h3 className="count">{record.campaign_type}</h3>
                  </div>
                  <div className="col-12 count-box">
                    <h5 className="count-title">Budget</h5>
                    <h3 className="count">${record.budget}</h3>
                  </div>
                  <div className="col-12 count-box">
                    <h5 className="count-title">
                      Pay per 100 {record.campaign_type}
                    </h5>
                    <h3 className="count">${record.pay_per_hundred}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </React.Fragment>
    ));

    this.setState({ pageCount: Math.ceil(data.length / this.state.perPage), postData, });
  };

  render() {

    // const sortOptions = [
    //   { value: "date", label: "DATE" },
    //   { value: "impressions", label: "IMPRESSIONS" },
    //   { value: "clicks", label: "CLICKS" },
    //   { value: "engagement", label: "ENGAGEMENT" },
    //   // { value: "revenue", label: "Revenue" },
    // ];

    // const sortOrderOptions = [
    //   { value: "asc", label: "ASC" },
    //   { value: "desc", label: "DESC" },
    // ];

    // const style = {
    //   control: (base, state) => ({
    //     ...base,
    //     height: "44px",
    //     boxShadow: "none",
    //     "&:hover": {
    //       // border: "1px solid black",
    //     },
    //   }),
    // };

    return (
      <>
        <div className="container-fluid">
          {/* <Row className="post-analytics-tab d-none">
            <Col xs={12} xl={12} md={12}>
              <form onSubmit={this.handleSubmit}>
                <Row>
                  <Col xs={12} xl={2} md={6}>
                    <p>Select Start Date / End Date</p>
                    <RangePicker
                      disabledDate={this.disabledDate}
                      key={4}
                      defaultValue={[
                        moment(this.state.lastYear),
                        moment(this.state.today),
                      ]}
                      value={[
                        moment(this.state.fromDate),
                        moment(this.state.toDate),
                      ]}
                      defaultPickerValue={moment(new Date(), "YYYY-MM-DD")}
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
                      onChange={this.dateRangePickerChanger.bind(this)}
                    />
                  </Col>
                  <Col xs={12} xl={2} md={6}>
                    <p>Select Category</p>
                    <Select
                      name="category"
                      className="selectCustomization"
                      options={this.state.myCategory}
                      // value={this.state.optionCategory}
                      value={
                        this.state.optionCategory === ""
                          ? { value: "all", label: "ALL" }
                          : this.state.optionCategory
                      }
                      placeholder="Select Category"
                      onChange={(event) => this.handleSelect(event)}
                      styles={style}
                    />
                  </Col>
                  <Col xs={12} xl={2} md={6}>
                    <p>Sort By</p>
                    <Select
                      name="sort"
                      className="selectCustomization"
                      options={sortOptions}
                      // value={this.state.optionSort}
                      value={
                        this.state.optionSort === ""
                          ? { value: "date", label: "DATE" }
                          : this.state.optionSort
                      }
                      placeholder="Sort By"
                      onChange={(event) => this.handleSort(event)}
                      styles={style}
                    />
                  </Col>
                  <Col xs={12} xl={2} md={6}>
                    <p>Order By</p>
                    <Select
                      name="sort"
                      className="selectCustomization"
                      options={sortOrderOptions}
                      value={
                        this.state.optionSortOrder === ""
                          ? { value: "desc", label: "DESC" }
                          : this.state.optionSortOrder
                      }
                      placeholder="Order By"
                      onChange={(event) => this.handleSortOrder(event)}
                      // isDisabled={this.state.optionSort === "" ? true : false}
                      styles={style}
                    />
                  </Col>
                  <Col xs={12} xl={4} md={6}>
                    <Button
                      type="submit"
                      variant="primary"
                      className="fltr-h btn btn-primary"
                    >
                      Search
                    </Button>
                    <Button
                      onClick={this.clearFilter}
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
          <hr />*/}
          {this.state.loading ? (
            <Loader className="analytics-loading" size={60} />
          ) : !this.state.data.length ? (
            <div className="row no-data col-md-12">No Data Available</div>
          ) : (
            <>
              <Row>{this.state.postData}</Row>
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
                pageCount={this.state.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={"pagination justify-content-center mt-2 custom-paginate"}
                // subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </>
          )}
        </div>
      </>
    );
  }
}
export default AffiliateCampaign;