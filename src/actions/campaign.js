import axios from "axios";
import {GET_CAMPAIGN } from "./type";
import config from "../config";




export const getCampaign=(id)=>async(dispatch)=>{
    try{
        const res=await axios.get(`${config.hostApi}/v1/campaigns/retrieve/${id}`)
        dispatch({
            type:GET_CAMPAIGN,
            payload:res.data.message
        })
    }catch (err) {
    console.log(err);
  }
};
