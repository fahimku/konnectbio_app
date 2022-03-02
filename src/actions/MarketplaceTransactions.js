import axios from "axios";
import {
  GET_MARKETPLACE_TRANSACTIONS,
  GET_MARKETPLACE_CAMPAIGNS,
  GET_MARKETPLACE_BRAND,
} from "./type";
import config from "../config";

export const getMarketplaceTransactions =
  (
    brand_status = "active",
    influencer_status = "active",
    campaignId = "",
    influencerId = "",
    transactionType = "",
    groupBy = "",
    page = 1,
    limit = 25
  ) =>
  async (dispatch) => {
    let promise = new Promise((resolve, reject) => {
      axios
        .post(
          `${config.hostApi}/v1/users/marketPlace/getlogs?brand_status=${brand_status}&influencer_status=${influencer_status}&campaign_id=${campaignId}&brand_id=${influencerId}&transaction_type=${transactionType}&group_by=${groupBy}&page=${page}&limit=${limit}`
        )
        .then((res) => {
          resolve("success");
          dispatch({
            type: GET_MARKETPLACE_TRANSACTIONS,
            payload: res.data,
          });
        })
        .catch(() => {
          dispatch({
            type: GET_MARKETPLACE_TRANSACTIONS,
            payload: [],
          });
          reject("error");
        });
    });
    return promise;
  };

export const getMarketplaceActiveCampaign =
  (brand_status, influencer_status, brand_id) => async (dispatch) => {
    axios
      .post(
        `${config.hostApi}/v1/users/marketPlace/getallcampaigns?brand_status=${brand_status}&influencer_status=${influencer_status}&brand_id=${brand_id}`
      )
      .then((res) => {
        dispatch({
          type: GET_MARKETPLACE_CAMPAIGNS,
          payload: res.data,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_MARKETPLACE_CAMPAIGNS,
          payload: [],
        });
      });
  };

export const getMarketplaceBrand = (campaignId) => async (dispatch) => {
  axios
    .post(`${config.hostApi}/v1/users/marketPlace/getuserownbrands`)
    .then((res) => {
      dispatch({
        type: GET_MARKETPLACE_BRAND,
        payload: res.data,
      });
    })
    .catch(() => {
      dispatch({
        type: GET_MARKETPLACE_BRAND,
        payload: [],
      });
    });
};
