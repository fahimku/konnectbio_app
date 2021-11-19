import axios from "axios"
import {  CLEAR_POST, GET_POST} from "./type"
import config from "../config"




export const getPosts=(page,id,clr)=>async(dispatch)=>{
    if(clr) clr()
    try{
        if(id){
            const res=await axios.get(`${config.hostApi}/v1/shop/filter`,{
                params:{
                    limit:15,
                    page,
                    post_type:'image',
                    id
                }
            })
            dispatch({
                type:GET_POST,
                payload:res.data?.message?.result
            })
        }else{
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
        }
    }catch(err){
        console.log(err)
    }
}

export const clearPost=()=>async(dispatch)=>{
    dispatch({
        type:CLEAR_POST,
        payload:{
            data:[],
            next:{}
        }
    })
}

