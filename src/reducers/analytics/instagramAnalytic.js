import {
  GET_INSTAGRAM_ANALYTIC,
  GET_INSTAGRAM_PAGINATION,
} from "../../actions/type";
const initialState = { loading: true, insta_data: [], pagination: {} };
export default function instagramAnalytic(state = initialState, action) {
  switch (action.type) {
    case GET_INSTAGRAM_ANALYTIC:
      return {
        insta_data: action.payload.message.data,
        pagination: action.payload.message.paging,
        loading: false,
      };
    case GET_INSTAGRAM_PAGINATION:
      return {
        // ...action.payload,
        insta_data: [...state.insta_data, ...action.payload.message.data],
        pagination: action.payload.message.paging,
        loading: false,
      };
    default:
      return state;
  }
}
