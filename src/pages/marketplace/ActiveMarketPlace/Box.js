import React, { useState } from "react";
export default function Box({ item, toggleCampaigns, index }) {
  const [toggleCampaign, setToggleCampaign] = useState(item.is_linked);
  return (
    <React.Fragment>
      <div className="card any_bx analytic-box campaign-box">
        <div className="camp-row row">
          <div className="campaign-header col-12">
            <h6>{item.campaign_name}</h6>
            <div className="cmp-h-right">
              {/* {toggleLoading && <Loader />} */}
              <div className="form-check custom-switch custom-switch-md">
                <input
                  type="checkbox"
                  checked={toggleCampaign}
                  onClick={() => {
                    toggleCampaigns(item.is_linked, item.campaign_id).then(function () {
                      setToggleCampaign(!item.is_linked);
                      setTimeout(() => {
                        setToggleCampaign(item.is_linked);
                      },300)
                    },
                      function () {
                        setToggleCampaign(item.is_Linked);
                      });
                  }}
                  className="custom-control-input"
                  id={`customSwitch` + index}
                  readOnly
                />
                <label
                  className="custom-control-label"
                  htmlFor={`customSwitch` + index}
                ></label>
              </div>
            </div>
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
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}