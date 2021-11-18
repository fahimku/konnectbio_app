import axios from "axios"
import { GET_POST} from "./type"
import config from "../config"




export const getPosts=(page)=>async(dispatch)=>{
    try{
        const res=await axios.get(`${config.hostApi}/v1/affiliate/posts`,{
            params:{
                limit:15,
                page,
                post_type:'image'
            }
        })
    dispatch({
        type:GET_POST,
        payload:res.data?.message?.result
    })
    }catch(err){
        console.log(err)
    }
}