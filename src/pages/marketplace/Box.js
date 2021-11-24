import React, { useState } from 'react'
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
export default function Box({ item, addCampaignToShop, userInfo }) {

    const [addCampaign, setAddCampaign] = useState(item.is_linked);

    const confirmAddToCampaign = (campaignId, categoryId, userId) => {
        Swal.fire({
            title: `Are you sure you want to add this campaign?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#010b40",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes`,
        }).then((result) => {
            if (result.isConfirmed) {
                addCampaignToShop(campaignId, categoryId, userId).then(() => {
                    toast.success('Campaign Added Successfully');
                    setAddCampaign(true);
                })
            }
        })
    }

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
                                        alt={'#'}
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
                                <h3 className="count">
                                    {item.category_name}
                                </h3>
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
                                <h3 className="count">{item.created_date}</h3>
                            </div>

                            <div className="col-12 count-box">
                                <h5 className="count-title">End Date</h5>
                                <h3 className="count">{item.end_date}</h3>
                            </div>

                            <div className="col-12 count-box">
                                {addCampaign ? <Button
                                    className="btn-connect"
                                >
                                    Campaign Added
                                </Button> : <Button
                                    onClick={() => {
                                        confirmAddToCampaign(item.campaign_id, item.category_id, userInfo.user_id);
                                    }}
                                    className="btn-connect"
                                >
                                    Select Campaign
                                </Button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}