import React from 'react'
import { Button } from "react-bootstrap";
export default function Box({ item, addCampaignToShop, userInfo }) {
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
                                <h5 className="count-title">Start Date</h5>
                                <h3 className="count">{item.created_date}</h3>
                            </div>

                            <div className="col-12 count-box">
                                <h5 className="count-title">End Date</h5>
                                <h3 className="count">{item.end_date}</h3>
                            </div>

                            <div className="col-12 count-box">
                                <Button
                                    onClick={() => {
                                        addCampaignToShop(item._id, userInfo.user_id);
                                    }}
                                    className="btn-connect"
                                >
                                    Select Campaign
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}