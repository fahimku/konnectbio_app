import { GET_AFFILIATE_SALES, AFFILIATE_PAGINATION, GET_AFFILIATE_SALES_INF } from "../../actions/type";
//const initialState = { message: [], pagination: {} };

export default function affiliateSales(state = [], action) {
  console.log(action)
    switch (action.type) {
    case GET_AFFILIATE_SALES:
      return action.payload;
      case GET_AFFILIATE_SALES_INF:
      return action.payload;
    // case AFFILIATE_PAGINATION:
    //   return {
    //     ...action.payload,
    //     message: [...state.message, ...action.payload.message],
    //   };
    // case "clearAffiliateTransactions":
    //   return { message: [], pagination: {} };
    default:
      return state;
  }
}