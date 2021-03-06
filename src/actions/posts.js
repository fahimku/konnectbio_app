import axios from "axios";
import { CLEAR_POST, GET_POST, UPDATE_POST } from "./type";
import config from "../config";

export const getPosts = (page, id, clr) => async (dispatch) => {
  try {
    if (id) {
      const res = await axios.get(`${config.hostApi}/v1/affiliate/filter`, {
        params: {
          limit: 15,
          page,
          post_type: "image",
          id,
        },
      });
      if (clr) clr();
      dispatch({
        type: GET_POST,
        payload: res.data?.message?.result,
      });
    } else {
      const res = await axios.get(`${config.hostApi}/v1/affiliate/posts`, {
        params: {
          limit: 15,
          page,
          post_type: "image",
        },
      });
      if (clr) clr();
      dispatch({
        type: GET_POST,
        payload: res.data?.message?.result,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const clearPost = () => async (dispatch) => {
  dispatch({
    type: CLEAR_POST,
    payload: {
      data: [],
      next: {},
    },
  });
};

export const updatePost = (post_id) => async (dispatch) => {
  dispatch({
    type: UPDATE_POST,
    payload: { post_id },
  });
};
