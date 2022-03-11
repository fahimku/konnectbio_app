import React, { useState } from "react";
import { Col } from "react-bootstrap";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loader from "../../components/Loader/Loader";

export default function Box({ item, addCampaignToShop, index }) {
  const [addCampaign, setAddCampaign] = useState(false);
  const [loading, setLoading] = useState(false);

  const styleObj = {
    textTransform: 'capitalize',
    fontsize: '14px'
  }


  const confirmAddToCampaign = (campaignId, categoryId, userId) => {
    Swal.fire({
      title: `Are You Sure You Want To Add This Campaign?`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "#010b40",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes`,
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        addCampaignToShop(campaignId, categoryId, userId).then(
          function () {
            setAddCampaign(true);
            toast.success("Campaign Added Successfully");
            setLoading(false);
          },
          function (error) {
            toast.error(error?.response?.data?.message, {
              autoClose: false,
            });
            setLoading(false);
          }
        );
      }
    });
  };

  return (
    <React.Fragment>
      {/* {!addCampaign && ( */}
        <Col key={index} xs={12} xl={3} md={6}>
          <div className="card any_bx analytic-box campaign-box">
            <div className="camp-row row">
              <div className="campaign-header col-12">
                <h6>{item.campaign_name}</h6>
              </div>
              <div className="any-post-img-col col-12">
                <div className="any-post-image">
                  <div className="any-image-box">
                    <div className="any-image-box-iner">
                      <img
                        src={item.media_url}
                        className="img-fluid media-image"
                        alt={"#"}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 analytic-caption">
                <div className="row count-main-box">
                  <div className="col-12 count-box">
                    <h5 className="count-title">Brand</h5>
                    <h3 className="count">{item.brand_name}</h3>
                  </div>
                  <div className="col-12 count-box">
                    <h5 className="count-title">Category</h5>
                    <h3 className="count">{item.category_name}</h3>
                  </div>
                  <div className="col-12 count-box">
                    <h5 className="count-title">Campaign Type</h5>
                    <h3
                    style={styleObj}
                    >
                      {item.campaign_type}
                    </h3>
                  </div>

                  <div className="col-12 count-box">
                    <h5 className="count-title">Commission / 100 Clicks</h5>
                    <h3 className="count">${item.commission}</h3>
                  </div>

                  <div className="col-12 count-box">
                    <h5 className="count-title">Start Date</h5>
                    <h3 className="count">{item.start_date}</h3>
                  </div>

                  <div className="col-12 count-box">
                    <h5 className="count-title">End Date</h5>
                    <h3 className="count">{item.end_date}</h3>
                  </div>
                </div>
              </div>
              <div className="cam-buttons col-12">
                {item.is_linked || addCampaign ? (
                  <button
                    disabled
                    style={{ pointerEvents: "none" }}
                    key={index}
                    className="btn"
                  >
                    Campaign Added
                  </button>
                ) : loading ? (
                  <button key={index} className="btn">
                    <Loader />{" "}
                  </button>
                ) : (
                  <button
                    key={index}
                    onClick={() => {
                      confirmAddToCampaign(
                        item.campaign_id,
                        item.category_id,
                        item.user_id
                      );
                    }}
                    className="btn"
                    id="select-campaign"
                  >
                    Select Campaign
                  </button>
                )}
              </div>
            </div>
          </div>
        </Col>
      {/* )} */}
    </React.Fragment>
  );
}
