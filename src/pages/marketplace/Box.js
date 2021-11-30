import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loader from "../../components/Loader/Loader";

export default function Box({ item, addCampaignToShop, index }) {

  const [addCampaign, setAddCampaign] = useState(item.is_linked);
  const [loading, setLoading] = useState(false);
  const confirmAddToCampaign = (campaignId, categoryId, userId) => {

    Swal.fire({
      title: `Are you sure you want to add this campaign?`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "#010b40",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes`,
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        addCampaignToShop(campaignId, categoryId, userId).then(function () {
          setAddCampaign(true);
          toast.success('Campaign Added Successfully');
          setLoading(false);
        }, function (error) {
          toast.error(error?.response?.data?.message)
          setLoading(false);
        })
      }
    });
  };

  return (
    <React.Fragment>
      <div className="card analytic-box campaign-box">
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
                <h3 className="count">{item.instagram_username}</h3>
              </div>
              <div className="col-12 count-box">
                <h5 className="count-title">Category</h5>
                <h3 className="count">{item.category_name}</h3>
              </div>
              <div className="col-12 count-box">
                <h5 className="count-title">Campaign Type</h5>
                <h3 className="count">{item.campaign_type}</h3>
              </div>

              <div className="col-12 count-box">
                <h5 className="count-title">Commission</h5>
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

              <div className="col-12 count-box">
                <div className="count-title">
                  {addCampaign ? (
                    <Button
                      disabled style={{ pointerEvents: 'none' }}
                      key={index}
                      className="btn-connect">Campaign Added</Button>
                  ) : (
                    loading ?
                      <Button
                        key={index}
                        className="btn-connect"><Loader /> </Button> :
                      <Button
                        key={index}
                        onClick={() => {
                          confirmAddToCampaign(
                            item.campaign_id,
                            item.category_id,
                            item.user_id
                          );
                        }}
                        className="btn-connect"
                      >
                        Select Campaign
                      </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}