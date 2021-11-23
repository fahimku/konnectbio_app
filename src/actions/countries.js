import axios from "axios";
import { CLEAR_POST, GET_COUNTRIES, GET_POST, UPDATE_POST } from "./type";
import config from "../config";




export const getCountries=()=>async(dispatch)=>{
    try{
        const res=await axios.post(`${config.hostApi}/v1/common/receive/countries`)
        dispatch({
            type:GET_COUNTRIES,
            payload:res.data.message
        })
    }catch (err) {
    console.log(err);
  }
};
