import {GET_MARKET_PLACE,ADD_CAMPAIGN_TO_SHOP} from "../../actions/type";

const initialState={};

export default function marketPlace(state=initialState,action){
    switch(action.type){
        case GET_MARKET_PLACE:
            return action.payload;
            case ADD_CAMPAIGN_TO_SHOP:
                return action.payload;
        default:
            return state
    }
}