import axios from "axios";
import { GET_MARKET_PLACE, ADD_CAMPAIGN_TO_SHOP } from "./type";
import config from "../config";

export const addCampaignToShop = (campaignId, advertiserId) => async (dispatch) => {
    try {
        const res = await axios.post(`${config.baseURLApi}/users/marketPlace/campaignPost`, {
            campaign_id: campaignId,
            advertiser_id: advertiserId,
        })
        dispatch({
            type: ADD_CAMPAIGN_TO_SHOP,
            payload: res.message
        })
    } catch (err) {
        console.log(err);
    }
};


export const getMarketPlace = (page, limit) => async (dispatch) => {
    try {
        const res = await axios.post(`${config.baseURLApi}/users/marketPlace/getCampaigns?limit=${limit}&page=${page}`)
        dispatch({
            type: GET_MARKET_PLACE,
            payload: res.data
        })

    } catch (err) {
        console.log(err);
    }


};
