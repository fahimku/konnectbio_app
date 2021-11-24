import axios from "axios";
import { GET_COUNTRIES } from "./type";
import config from "../config";

export const getCountries = () => async (dispatch) => {
  try {
    const res = await axios.post(
      `${config.baseURLApi}/common/receive/countries`
    );
    dispatch({
      type: GET_COUNTRIES,
      payload: res.data.message,
    });
  } catch (err) {
    console.log(err);
  }
};
