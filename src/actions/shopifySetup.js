import axios from "axios";
import { GET_SHOPIFY_DETAIL } from "./type";
import config from "../config";

export const getShopifyDetail = () => async (dispatch) => {
  axios.get(`${config.hostApi}/v1/users/receive/shopify`).then((res) => {
    dispatch({
      type: GET_SHOPIFY_DETAIL,
      payload: res.data,
    });
  });
};
