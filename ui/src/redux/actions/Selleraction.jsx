import{
    SELLER_REGISTER_CHECK,
    SELLER_REGISTER_SUCCESS,
    SELLER_REGISTER_FAILED
} from './../type'
import Axios from 'axios'
import {APIURL} from './../../supports/ApiUrl'

export const SellerRegister=(dataseller)=>{
    var namatoko=dataseller.namatoko
    var alamattoko=dataseller.alamattoko
    return(dispatch)=>{
        dispatch({type:SELLER_REGISTER_CHECK})
        if( namatoko==='' || alamattoko===''){
            dispatch({type:SELLER_REGISTER_FAILED,payload:'Please Fill in All Information'})
        }else{
            Axios.post(`${APIURL}/sellers/createseller`,dataseller)
            .then((res)=>{
                console.log(res.data.message)
                dispatch({type: SELLER_REGISTER_SUCCESS, payload:res.data})
            }).catch((err)=>{
              console.log(err)
            })
        }
    }
}
export const KeepSeller=(iduser)=>{
  console.log('line 29 seller action')
  return(dispatch)=>{
    console.log('line 30 seller action')
    Axios.get(`${APIURL}/sellers/getseller?iduser=${iduser}`)
    .then((res)=>{
      console.log(res.data[0])
      dispatch({type: SELLER_REGISTER_SUCCESS,payload:res.data[0]})
      console.log('line 35 seller action')
    }).catch((err)=>{
      console.log('error in line 33')
    })
  }
}