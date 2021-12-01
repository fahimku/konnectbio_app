import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Row, Col, Modal } from "react-bootstrap";
//import Dropdown from "react-bootstrap/Dropdown";
import "antd/dist/antd.css";
import ReactPaginate from "react-paginate";
import UpdateModal from "./UpdateModal";
import Loader from "../../../components/Loader/Loader";
import * as countryAct from "../../../actions/countries";
import * as campAct from "../../../actions/campaign";
import { connect } from "react-redux";

// const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
//   <a
//     href="#"
//     ref={ref}
//     onClick={(e) => {
//       e.preventDefault();
//       onClick(e);
//     }}
//   >
//     {children}
//     <i class="fa fa-ellipsis-h fa-2x" aria-hidden="true"></i>
//   </a>
// ));

function AffiliateCampaign(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const perPage = 8;
  const [currentPage, setCurrentPage] = useState(0);
  const [modal, setModal] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [currentCampaign, setCurrentCampaign] = useState({});

  useEffect(() => {
    props.getCountries();
    fetchPostPerformance();
  }, []);

  const toggleCampaigns = async (status, campaignId) => {
    let statusName = status ? "disable" : "enable";
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
        axios
          .put(`campaigns/revise/campaignstatus/${campaignId}`, {
            is_active: !status,
          })
          .then(() => {
            let data1 = [...data];
            let objIndex = data1.findIndex(
              (obj) => obj.campaign_id === campaignId
            );
            data1[objIndex].is_active = !status;
            setData(data1);
            toast.success("Campaign " + statusName + " Successfully");
          })
          .catch((err) => {
            toast.error(err.response?.data.message);
          });
      }
    });
  };

  const deleteCampaign = async (campaignId) => {
    Swal.fire({
      title: `Are you sure you want to delete this campaign?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      cancelButtonText: "No",
      showCancelButton: true,
      confirmButtonColor: "#010b40",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/campaigns/remove/${campaignId}`)
          .then(() => {
            let data1 = [...data].filter(function (item) {
              return item.campaign_id !== campaignId;
            });
            setData(data1);
            toast.success("Campaign Deleted Successfully");
          })
          .catch((err) => {
            toast.error(err.response.data.message);
          });
      }
    });
  };

  const fetchPostPerformance = async () => {
    setLoading(true);
    await axios
      .get("campaigns/receive")
      .then((response) => {
        setData(response.data.message);
        setLoading(false);
        setPageCount(Math.ceil(response.data.totalCount / perPage));
        postData();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * perPage;
    setCurrentPage(selectedPage);
    setOffset(offset);
    postData();
  };

  const postData = () => {
    const data1 = data;
    const slice = data1.slice(offset, offset + perPage);
    const postDataInner = slice.map((record, index) => (
      <React.Fragment>
        <Col xs={12} xl={3} md={6}>
          <div className="card any_bx analytic-box campaign-box">
            <div className="camp-row row">
              <div className="campaign-header col-12">
                <h6>{record.campaign_name}</h6>
                <div className="cmp-h-right">
                  {/* {toggleLoading && <Loader />} */}
                  <div class="form-check custom-switch custom-switch-md">
                    <input
                      type="checkbox"
                      checked={record.is_active}
                      onClick={() => {
                        toggleCampaigns(record.is_active, record.campaign_id);
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
                  {/* <Dropdown alignRight>
                    <Dropdown.Toggle as={CustomToggle} />
                    <Dropdown.Menu size="sm" title="">
                      <Dropdown.Item
                        onClick={() => {
                          setCurrentCampaign(record);
                          setModal(true)
                        }}
                      >
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          deleteCampaign(record.campaign_id);
                        }}
                      >
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown> */}
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
                    <h5 className="count-title">Total Budget</h5>
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
            <div className="cam-buttons col-12">
              <button
                className="btn"
                onClick={() => {
                  setCurrentCampaign(record);
                  setModal(true);
                }}
              >
                <i className="fa fa-pencil-square-o" /> Edit
              </button>
              <button
                className="btn"
                onClick={() => {
                  deleteCampaign(record.campaign_id);
                }}
              >
                <i className="fa fa-trash" /> Delete
              </button>
              <button
                className="btn"
                // onClick={() => {
                //   deleteCampaign(record.campaign_id);
                // }}
              >
                <i className="fa fa-bar-chart" /> Analytics
              </button>
            </div>
          </div>
        </Col>
      </React.Fragment>
    ));
    return postDataInner;
  };

  if (!loading) {
    return (
      <>
        <div className="container-fluid">
          {data.length > 0 ? (
            <>
              <Row>{postData()}</Row>
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
                pageCount={pageCount}
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
            <>No Data Found</>
          )}
          <Modal
            show={modal}
            onHide={() => setModal(false)}
            className="edit-campaign linkin-bio"
            centered
            size="xl"
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit Campaign</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-white affiliate-model image-edit-box p-3">
              <UpdateModal
                affData={currentCampaign}
                countries={props.countries}
                affCloseModal={() => setModal(false)}
                reload={() => {
                  fetchPostPerformance();
                }}
              />
            </Modal.Body>
          </Modal>
        </div>
      </>
    );
  } else {
    return (
      <div className="container-fluid">
        <Loader />
      </div>
    );
  }
}

function mapStateToProps({ countries, campaign }) {
  return { countries, campaign };
}
export default connect(mapStateToProps, { ...countryAct, ...campAct })(
  AffiliateCampaign
);
