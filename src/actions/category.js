import axios from "axios"
import config from "../config"
import { GET_CATEGORIES} from "./type"



export const getCategories=()=>async(dispatch)=>{
    try{
        const res=await axios.get(`${config.hostApi}/v1/usercategory/receive`)
    dispatch({
        type:GET_CATEGORIES,
        payload:res.data?.message
    })
    }catch(err){
        console.log(err)
    }
}