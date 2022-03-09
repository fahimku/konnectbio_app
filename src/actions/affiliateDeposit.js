import axios from "axios";
import { GET_AFFILIATE_CARDS } from "./type";
import config from "../config";

export const getAffiliateCards = () => async (dispatch) => {
  let promise = new Promise((resolve, reject) => {
    axios
      .post(`${config.hostApi}/v1/deposit/paymentmethods`)
      .then((res) => {
        resolve("success");
        dispatch({
          type: GET_AFFILIATE_CARDS,
          payload: res.data,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_AFFILIATE_CARDS,
          payload: [],
        });
        reject("error");
      });
  });
  return promise;
};
