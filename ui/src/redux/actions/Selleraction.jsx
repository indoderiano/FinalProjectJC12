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
              if(res.data.status){
                console.log(res.data.message)
              }
            }).catch((err)=>{
              console.log(err)
              
            })
        }
    }
}