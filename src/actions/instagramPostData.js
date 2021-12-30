import axios from "axios";
import {
  GET_INSTAGRAM_POST,
  GET_INSTAGRAM_POST_PAGINATION,
  FILTER_INSTAGRAM_POST_DATA,
} from "./type";
import config from "../config";

export const getInstagramPostData =
  (url, next_media) => async (dispatch, getState) => {
    // if (getState().instagramAnalytic.success || url) {
    const res = await axios.post(
      `${config.baseURLApi}/graph/ig/analytics/media`,
      {
        url: url,
        next_media: next_media,
      }
    );
    if (url) {
      dispatch({
        type: GET_INSTAGRAM_POST_PAGINATION,
        payload: res.data,
      });
    } else {
      dispatch({
        type: GET_INSTAGRAM_POST,
        payload: res.data,
      });
    }
    // }
  };
export const filterInstagramPost = (data) => async (dispatch) => {
  dispatch({
    type: FILTER_INSTAGRAM_POST_DATA,
    payload: data,
  });
};
