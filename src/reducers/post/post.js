import {CLEAR_POST, GET_POST} from "../../actions/type";

const initialState={
    data:[],
    next:{}
};

export default function posts(state=initialState,action){
    switch(action.type){
        case GET_POST:
            return {...action.payload,data:[...state.data,...action.payload.data]};
        case CLEAR_POST:
            return action.payload;
        default:
            return state
    }
}