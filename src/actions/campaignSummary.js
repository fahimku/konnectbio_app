import axios from "axios";
import { GET_CAMPAIGN_SUMMARY } from "./type";
import config from "../config";

export const getCampaignSummary =
  (username, fromDate, toDate, limit, page) => async (dispatch) => {
    let promise = new Promise((resolve, reject) => {
      axios
        .post(`${config.baseURLApi}/analytics/receive/analyseSummary`, {
          username: username,
          from_date: fromDate,
          to_date: toDate,
          page: 1,
          limit: 20,
          post_type: "campaign",
        })
        .then((res) => {
          dispatch({
            type: GET_CAMPAIGN_SUMMARY,
            payload: res.data.message,
          });
          resolve("success");
        })
        .catch((error) => {
          reject(error);
        });
    });
    return promise;
  };
