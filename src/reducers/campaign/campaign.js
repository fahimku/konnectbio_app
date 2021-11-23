import { GET_CAMPAIGN } from "../../actions/type";

const initialState = {}

export default function campaign(state = initialState, action) {
  switch (action.type) {
    case GET_CAMPAIGN:
      return action.payload
    default:
      return state;
  }
}
