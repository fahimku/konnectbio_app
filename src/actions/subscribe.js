import axios from "axios";
import { CLEAR_POST, GET_POST, UPDATE_POST } from "./type";
import config from "../config";

export const configSubs = () => async (dispatch) => {
      const res = await axios.post(`${config.hostApi}/v1/subscribe/config`)
      console.log(res.data)
};


export const makePayment = (data) => async (dispatch) => {
    const res = await axios.post(`${config.hostApi}/v1/subscribe/checkout`,data)
    return res.data.message
};