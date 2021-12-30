import { GET_PROFILES } from "../../actions/type";

const initialState = { message: [] }

export default function profile(state = initialState, action) {
    switch (action.type) {
        case GET_PROFILES:
            return action.payload


        default:
            return state;
    }
}
