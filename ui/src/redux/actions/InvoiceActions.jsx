import {
    INVOICE_LIST
} from '../type'
import Axios from 'axios';
import { APIURL } from '../../supports/ApiUrl';
import {ListByTransaction} from '../../supports/ListAssembler'


export const LoadInvoices=(iduser)=>{
    console.log('request invoices list')
    return(dispatch)=>{
        Axios.get(`${APIURL}/transactions/user?iduser=${iduser}&idstatus=2`)
        .then((res)=>{
            console.log(res.data)


            // RECONSTRUCT LIST , BY TRANSACTION BY TRANSACTION SELLER
            var listByTransaction=ListByTransaction(res.data)


            var data={
                list: listByTransaction,
                total: listByTransaction.length
            }
            dispatch({type:INVOICE_LIST,payload:data})
        }).catch((err)=>{
            console.log(err)
        })
    }
}