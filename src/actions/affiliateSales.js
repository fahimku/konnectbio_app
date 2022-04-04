import axios from "axios";
import { GET_AFFILIATE_SALES, GET_AFFILIATE_SALES_INF } from "./type";
import config from "../config";

export const getAffiliateSalesByBrand =
  (group_by, page, limit) => async (dispatch) => {
    let promise = new Promise((resolve, reject) => {
      axios
        .get(
          `${config.hostApi}/v1/affiliate/getsales?group_by=${group_by}&page=${page}&limit=${limit}`
        )
        .then((res) => {
          console.log(res, "res");
          dispatch({
            type: GET_AFFILIATE_SALES,
            payload: res.data,
          });

          resolve("success");
        })
        .catch((error) => {
          reject(error);
        });
    });
    return promise;
  };

// export const getAffiliateSalesByBrand = (salesId) => async (dispatch) => {
//   let promise = new Promise((resolve, reject) => {
//     axios
//       .post(`${config.pixelApi}/pixelTracker/getPixelSalebyBrandId`, {
//         id: salesId,
//       })
//       .then((res) => {
//         dispatch({
//           type: GET_AFFILIATE_SALES,
//           payload: res.data,
//         });

//         resolve("success");
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
//   return promise;
// };

// export const getAffiliateSalesByInfluencer = (salesId) => async (dispatch) => {
//   let promise = new Promise((resolve, reject) => {
//     axios
//       .post(`${config.pixelApi}/pixelTracker/getPixelSalebyInfId`, {
//         id: salesId,
//       })
//       .then((res) => {
//         dispatch({
//           type: GET_AFFILIATE_SALES_INF,
//           payload: res.data,
//         });
//         resolve("success");
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
//   return promise;
// };
