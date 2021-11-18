import {GET_CATEGORIES} from "../../actions/type";

const initialState=[];

export default function categories(state=initialState,action){
    switch(action.type){
        case GET_CATEGORIES:
            return action.payload;
        default:
            return state
    }
}