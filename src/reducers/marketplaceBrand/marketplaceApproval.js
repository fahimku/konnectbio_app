import { GET_MARKETPLACE_APPROVAL } from "../../actions/type";
const initialState = { message: [] };

export default function marketplaceApproval(state = initialState, action) {
  switch (action.type) {
    case GET_MARKETPLACE_APPROVAL:
      return action.payload;

    default:
      return state;
  }
}
