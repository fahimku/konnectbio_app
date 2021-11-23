import axios from "axios";
import {GET_MARKET_PLACE } from "./type";
import config from "../config";




export const getMarketPlace=(page)=>async(dispatch)=>{
    const token=localStorage.getItem('token')
    console.log(token)
    try{
        const res=await axios.get(`${config.hostApi}/v1/users/marketPlace/getCampaigns`,{
            params:{
                limit:15,
                page
            },
            headers:{
                Authorization:"Bearer "+token
            }
        })
        dispatch({
            type:GET_MARKET_PLACE,
            payload:res.data
        })

    }catch (err) {
    console.log(err);
  }
};