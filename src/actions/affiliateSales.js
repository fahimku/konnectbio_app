import axios from "axios";
import {
  GET_AFFILIATE_SALES,
  GET_AFFILIATE_SALES_INF
} from "./type";
import config from "../config";

export const getAffiliateSalesBrand = (salesId) => async (dispatch) => {

    let promise = new Promise((resolve, reject) => {
        axios
            .post(`${config.pixelApi}/pixelTracker/getPixelSalebyBrandId`, {
               id:salesId
            })
            .then((res) => {
                
                dispatch({
                    type: GET_AFFILIATE_SALES,
                    payload: res.data,
                });
                console.log(res)
                resolve("success");
            })
            .catch((error) => {
                reject(error);
            });
    });
    return promise;
};

