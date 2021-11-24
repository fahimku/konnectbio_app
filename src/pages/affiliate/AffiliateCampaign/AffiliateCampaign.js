import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Row, Col, Modal } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import moment from "moment";
import Loader from "../../../components/Loader/Loader"; // eslint-disable-line css-modules/no-unused-class
import "antd/dist/antd.css";
import ReactPaginate from "react-paginate";
import UpdateModal from "./UpdateModal";
import * as countryAct from "../../../actions/countries";
import * as campAct from "../../../actions/campaign";
import { connect } from "react-redux";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href="/"
    ref={ref}
    onClick={(e) => {
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
      page: "2",
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
      modal: false,
      currentCampaign: {},
    };

    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    this.props.getCountries();
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
      icon: status ? "warning" : "success",
      showCancelButton: true,
      confirmButtonColor: "#010b40",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`campaigns/revise/campaignstatus/${campaignId}`, {
            is_active: !status,
          })
          .then(() => {
            let data = this.state.data;
            let objIndex = data.findIndex(
              (obj) => obj.campaign_id === campaignId
            );
            data[objIndex].is_active = !status;
            this.setState({ data: data });
            this.postData();
            toast.success("Campaign " + statusName + " Successfully");
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
            let data = this.state.data.filter(function (item) {
              return item.campaign_id !== campaignId;
            });
            this.setState({ data: data });
            this.postData();
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
      });
  }

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
                        this.toggleCampaign(
                          record.is_active,
                          record.campaign_id
                        );
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
                      <Dropdown.Item
                        onClick={() => {
                          this.setState({ currentCampaign: record });
                          this.setState({ modal: true });
                        }}
                      >
                        Edit
                      </Dropdown.Item>
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

    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      postData,
    });
  };

  render() {


    return (
      <>
        <div className="container-fluid">

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
                forcePage={this.state.currentPage}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={
                  "pagination justify-content-center mt-2 custom-paginate"
                }
                // subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </>
          )}
          <Modal
            show={this.state.modal}
            onHide={() => this.setState({ modal: false })}
            className="edit-campaign linkin-bio"
            centered
            size="xl"
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit Campaign</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-white affiliate-model image-edit-box p-3">
              <UpdateModal
                affData={this.state.currentCampaign}
                countries={this.props.countries}
                affCloseModal={() => this.setState({ modal: false })}
                reload={() => {
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
                }}
              />
            </Modal.Body>
          </Modal>
        </div>
      </>
    );
  }
}

function mapStateToProps({ countries, campaign }) {
  return { countries, campaign };
}
export default connect(mapStateToProps, { ...countryAct, ...campAct })(AffiliateCampaign);