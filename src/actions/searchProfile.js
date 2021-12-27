import axios from "axios";
import { FILTER_PROFILE_MEDIA, SEARCH_PROFILE} from "./type";
import config from "../config";




export const searchProfileAc=(userName)=>async(dispatch)=>{
    const {fb_token,instagram_id}=JSON.parse(localStorage.getItem('userInfo'))
    const res=await axios.get(`https://graph.facebook.com/${instagram_id}?fields=business_discovery.username(${userName}){followers_count,media_count,profile_picture_url,biography,name,username,website,follows_count,media{comments_count,caption,like_count,media_url,permalink,media_type,timestamp,children{id,media_url,media_type}}}&access_token=${fb_token}`)
    dispatch({
        type:SEARCH_PROFILE,
        payload:res.data.business_discovery
    })
};

export const filterProfileMedia=(data)=>async(dispatch)=>{
    dispatch({
        type:FILTER_PROFILE_MEDIA,
        payload:data
    })
};

