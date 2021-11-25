import axios from "axios";
import { GET_MARKET_PLACE, ADD_CAMPAIGN_TO_SHOP, MARKETPLACE_ERROR } from "./type";
import config from "../config";

export function marketPlaceError(payload) {
    return {
        type: MARKETPLACE_ERROR,
        payload,
    };
}

export const addCampaignToShop = (campaignId, categoryId, advertiserId) => async (dispatch) => {
    let promise = new Promise((resolve, reject) => {
        axios.post(`${config.baseURLApi}/users/marketPlace/campaignPost`, {
            campaign_id: campaignId,
            category_id: categoryId,
            advertiser_id: advertiserId,
        }).then((response) => {
            console.log(response.data.messsage)
            dispatch({
                type: ADD_CAMPAIGN_TO_SHOP,
                payload: response.message
            })
            resolve('success');
        }).catch((error) => {
            reject(error)
        });
    });
    return promise;
   
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