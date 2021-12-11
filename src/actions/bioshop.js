import axios from "axios";
import { GET_BIO_SHOP, GET_SINGLE_BIO_SHOP, DELETE_SINGLE_BIO_SHOP } from "./type";
import config from "../config";

export const getBioShop = (page) => async (dispatch) => {
  try {
    const res = await axios.get(`${config.hostApi}/v1/shop/posts`, {
      params: {
        limit: 15,
        page,
        post_type: 'image,campaign',
      }
    })
    dispatch({
      type: GET_BIO_SHOP,
      payload: res.data?.message?.result
    })
  } catch (err) {
    console.log(err);
  }
};

export const getSingleBioShop = (mediaId) => async (dispatch) => {
  try {
    const res = await axios.get(`${config.hostApi}/v1/posts/retrieve/${mediaId}`)
    dispatch({
      type: GET_SINGLE_BIO_SHOP,
      payload: res.data?.message
    })
  } catch (err) {
    console.log(err);
  }
};

export const deleteSingleBioShop = (post_id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${config.hostApi}/v1/posts/remove/${post_id}`)
    dispatch({
      type: DELETE_SINGLE_BIO_SHOP,
      payload: {post_id},
    })
  } catch (err) {
    console.log(err);
  }
};