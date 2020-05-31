import {USER_LOGIN_START,USER_LOGIN_SUCCESS,USER_LOGIN_FAILED} from './../type'
import Axios from 'axios';
import {API_URL} from './../../support/ApiUrl'


export const LoginUser=({username,password})=>{
    return (dispatch)=>{
        dispatch({type:USER_LOGIN_START})
        if(username===''||password===''){
            console.log('test')
            dispatch({type:USER_LOGIN_FAILED,payload: 'Datanya lengkapin dulu Babe!!'})
        }else{
            Axios.get(`${API_URL}/users/login`,{
                params:{
                    username:username,
                    password
                }
            }).then((res)=>{
                if(res.data.status){
                    console.log(res.data)
                    localStorage.setItem('token', res.data.token)
                    dispatch({type:USER_LOGIN_SUCCESS,payload:res.data})
                }else{
                    dispatch({type:USER_LOGIN_FAILED,payload:'username atau password tidak terdaftar'})
                }
            }).catch((err)=>{
                console.log(err)
                dispatch({type:USER_LOGIN_FAILED,payload:err.message})
            })
        }
    }
}

export const KeepLogin=(data)=>{
    return{
        type:USER_LOGIN_SUCCESS,
        payload:data
    }
}