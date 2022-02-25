import { GET_AFFILIATE_INFLUENCER } from "../../actions/type";
const initialState = { message: [], pagination: {} };
export default function affiliateInfluencers(state = initialState, action) {
    switch (action.type) {
        case GET_AFFILIATE_INFLUENCER:
            return [{ value: "", label: "ALL" }, ...action.payload.message.map(({ influencer_id, influencer_name }) => {
                return {
                    value: influencer_id, label: influencer_name
                };
            })]
        default:
            return state;
    }
}