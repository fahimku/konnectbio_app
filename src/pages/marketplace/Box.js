import React from 'react'
export default function Box({ item }) {
    return (
        <React.Fragment>
            <div className="card analytic-box campaign-box">
                <div className="camp-row row">
                    <div className="campaign-header col-12">
                        <h6>{item.campaign_name}</h6>
                        <div className="cmp-h-right col-md-6">
                            <div class="form-check custom-switch custom-switch-md">
                                <input
                                    type="checkbox"
                                    checked={false}

                                    class="custom-control-input"
                                    id={`customSwitch`}
                                    readOnly
                                />
                                <label
                                    class="custom-control-label"
                                    htmlFor={`customSwitch`}
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
                                        alt={'#'}
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
                                    {item.category_name}
                                </h3>
                            </div>
                            <div className="col-12 count-box">
                                <h5 className="count-title">Campaign Type</h5>
                                <h3 className="count">{item.campaign_type}</h3>
                            </div>
                            <div className="col-12 count-box">
                                <h5 className="count-title">Budget</h5>
                                <h3 className="count">${item.budget}</h3>
                            </div>
                            <div className="col-12 count-box">
                                <h5 className="count-title">
                                    Pay per 100 {item.campaign_type}
                                </h5>
                                <h3 className="count">${item.pay_per_hundred}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}