import axios from "axios";
import {
  GET_AFFILIATE_REQUEST,
  ADD_AFFILIATE_REQUEST,

} from "./type";
import config from "../config";

export const getAffiliateRequest = (salesId) => async (dispatch) => {

    let promise = new Promise((resolve, reject) => {
        axios
            .post(`${config.hostApi}/v1/affiliate/allrequests`, {
               id:salesId
            })
            .then((res) => {
               console.log(res);
                dispatch({
                    type: GET_AFFILIATE_REQUEST,
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

export const AddAffiliateRequest = (data) => async (dispatch) => {


    let promise = new Promise((resolve, reject) => {
        axios
            .post(`${config.hostApi}/v1/affiliate/changestatus`, {
               data
            })
            .then((res) => {
               
                dispatch({
                    type: ADD_AFFILIATE_REQUEST,
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

