import axios from "axios";
import { GET_USER_BRANDS, GET_BRANDS_CATEGORY } from "./type";
import config from "../config";

export const getBrands = () => async (dispatch) => {
  let promise = new Promise((resolve, reject) => {
    axios
      .post(`${config.baseURLApi}/users/marketPlace/userSelectedBrands`)
      .then((res) => {
        dispatch({
          type: GET_USER_BRANDS,
          payload: res.data?.message,
        });
        resolve(res.data?.message);
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promise;
};

export const getBrandsCategory = (brandId) => async (dispatch) => {
  let promise = new Promise((resolve, reject) => {
    axios
      .post(`${config.baseURLApi}/users/marketPlace/brandcategories`, {
        brand_id: brandId,
      })
      .then((res) => {
        dispatch({
          type: GET_BRANDS_CATEGORY,
          payload: res.data?.message,
        });
        resolve(res.data?.message);
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promise;
};
