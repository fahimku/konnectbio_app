import React, { useState, useEffect } from "react";
import Loader from "../../../components/Loader/Loader";
import * as brandActions from "../../../actions/brands";
import { connect } from "react-redux";
import { Row, Modal } from "react-bootstrap";
import BrandMarketPlace from "../BrandMarketPlace";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";

function ModalCategories({ catData, categoryById, getCatbrands }) {
  const [loading, setLoading] = useState(true);
  const [brandModal, setBrandModal] = useState(false);
  const [brandId, setBrandId] = useState();
  const [brandName, setBrandName] = useState();

  let parent_id = catData.value;
  useEffect(() => {
    if (catData) {
      getCatbrands(parent_id).then((res) => {
        setLoading(false);
      });
    }
  }, [catData]);

  let data = categoryById;
  let catName = catData.label;

  const brandSelect = (id, brand_name) => {
    setBrandModal(true);
    setBrandId(id);
    setBrandName(brand_name);
  };

  const brandApproval = (item) => {
    Swal.fire({
      title: `Need To Be Approved By Brand Please Request Participation.`,
      imageUrl: item?.profile_image_url,
      customClass: {
        image: "swal-brand-image",
      },
      showCancelButton: true,
      confirmButtonColor: "#010b40",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`users/marketPlace/requestbrand`, {
            brand_id: item.brand_id,
          })
          .then((response) => {
            toast.success("Request has been send Successfully");
            getCatbrands(parent_id).then((res) => {
              setLoading(false);
            });
          })
          .catch((err) => {
            toast.error(err.response.data.message);
          });
      }
    });
  };

  return (
    <div className="brand-section">
      {loading ? (
        <Loader size="30" />
      ) : (
        <>
          <Row>
            {data.length === 0 ? (
              <div className="col-md-12 no-data-cat">
                <p className="text-muted">No Brand</p>
              </div>
            ) : (
              data.map((item, i) => {
                return (
                  <div key={i} className="brand-box col-sm-3 col-6">
                    <span
                      className={`brand_status ${
                        item.status === "Approved" ? "status_green" : ""
                      } ${item.status === "Rejected" ? "status_red" : ""}`}
                    >
                      {item.status === "Pending"
                        ? "Under Review"
                        : item.status === "Rejected"
                        ? "Disapproved"
                        : item.status}
                    </span>
                    <img
                      alt="profile-icon"
                      src={item?.profile_image_url}
                      style={{ width: "100px", height: "100px" }}
                      className={`img-fluid brand-cat ${
                        item.brand_id === "61baedec5ab558359825084e"
                          ? "custom-brand-cat"
                          : ""
                      } ${
                        item.status === "Pending" || item.status === "Rejected"
                          ? "pending-brand-cat"
                          : ""
                      }`}
                      onClick={() =>
                        item.status === ""
                          ? brandApproval(item)
                          : brandSelect(item.brand_id, item.brand_name)
                      }
                    />
                    <div className="cat-lable">{item.brand_name}</div>
                  </div>
                );
              })
            )}
          </Row>
        </>
      )}
      <Modal
        show={brandModal}
        // onHide={() => {
        //   setTransactionModal(false);
        // }}
        // className="change-password"
        centered
        className="campaign-detail-modal aff-payment"
        animation={false}
        backdrop={true}
        keyboard={false}
        dialogClassName="modal-90w"
      >
        <Modal.Header>
          <Modal.Title>
            {brandName} Campaigns
            <br />
            <button class="btn btn-info btn-sm btn-approve_disable" disabled>
              {catName}
            </button>
          </Modal.Title>
          <button
            type="button"
            class="close"
            onClick={() => {
              setBrandModal(false);
            }}
          >
            <span aria-hidden="true">??</span>
            <span class="sr-only">Close</span>
          </button>
        </Modal.Header>
        <Modal.Body className="bg-white">
          <BrandMarketPlace
            brandId={brandId}
            catId={catData.category_id}
            type="marketplace"
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}
function mapStateToProps({ getCatbrands, categoryById }) {
  return { getCatbrands, categoryById };
}
export default connect(mapStateToProps, {
  ...brandActions,
})(ModalCategories);
