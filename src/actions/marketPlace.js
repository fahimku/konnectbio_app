import axios from "axios";
import { GET_MARKET_PLACE } from "./type";
import config from "../config";

export const getMarketPlace = (page, limit) => async (dispatch) => {
    try {
        const res = await axios.post(`${config.hostApi}/v1/users/marketPlace/getCampaigns?limit=${limit}&page=${page}`)
        dispatch({
            type: GET_MARKET_PLACE,
            payload: res.data
        })

    } catch (err) {
        console.log(err);
    }
};
