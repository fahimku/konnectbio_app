import axios from "axios";
import { GET_AFFILIATE_TRANSACTIONS, GET_AFFILIATE_CAMPAIGNS,GET_AFFILIATE_INFLUENCER } from "./type";
import config from "../config";

export const getAffiliateTransactions = (campaignId = '', influencerId = '', page = 1, limit = 25) => async (dispatch) => {
  axios
    .get(`${config.hostApi}/v1/affiliate/getlogs?campaign_id=${campaignId}&influencer_id=${influencerId}&page=${page}&limit=${limit}`)
    .then((res) => {
      dispatch({
        type: GET_AFFILIATE_TRANSACTIONS,
        payload: res.data,
      });
    })
    .catch(() => {
      dispatch({
        type: GET_AFFILIATE_TRANSACTIONS,
        payload: [],
      });
    });
};


export const getAffiliateActiveCampaign = () => async (dispatch) => {
  axios
    .get(`${config.hostApi}/v1/affiliate/getactivecampaigns`)
    .then((res) => {
      dispatch({
        type: GET_AFFILIATE_CAMPAIGNS,
        payload: res.data,
      });
    })
    .catch(() => {
      dispatch({
        type: GET_AFFILIATE_CAMPAIGNS,
        payload: [],
      });
    });
};


export const getActiveInfluencer = (campaignId) => async (dispatch) => {
  axios
    .get(`${config.hostApi}/v1/affiliate/getinfluencers?campaign_id=${campaignId}`)
    .then((res) => {
      dispatch({
        type: GET_AFFILIATE_INFLUENCER,
        payload: res.data,
      });
    })
    .catch(() => {
      dispatch({
        type: GET_AFFILIATE_INFLUENCER,
        payload: [],
      });
    });
};