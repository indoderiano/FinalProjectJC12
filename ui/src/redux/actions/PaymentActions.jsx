import {
    PAYMENT_LIST
} from '../type'
import Axios from 'axios';
import { APIURL } from '../../supports/ApiUrl';


export const LoadPayment=(iduser)=>{
    console.log('request payment list')
    return(dispatch)=>{
        Axios.get(`${APIURL}/transactions/payment?iduser=${iduser}`)
        .then((res)=>{
            console.log(res.data)


            // RECONSTRUCT LIST , BY TRANSACTION BY TRANSACTION SELLER
            // FIRST, BY TRANSACTION SELLER
            var listByTransactionSeller=[]
            res.data.forEach((item)=>{
                var isexist=false
                for(var i=0;i<listByTransactionSeller.length;i++){
                    if(listByTransactionSeller[i].idtransactionseller==item.idtransactionseller){
                        isexist=true
                        listByTransactionSeller[i].itemlist.push(item)
                    }
                }
                if(!isexist){
                    const{
                        idtransactionseller,
                        idtransaction,
                        idseller,
                        namatoko,
                        iddelivery,
                        delivery_method,
                        totalqty,
                        seller_delivery_cost,
                        seller_items_price,
                        total_price
                    }=item
                    var transactionsellerdata={
                        idtransactionseller,
                        idtransaction,
                        idseller,
                        namatoko,
                        iddelivery,
                        delivery_method,
                        totalqty,
                        seller_delivery_cost,
                        seller_items_price,
                        total_price,
                        itemlist:[item]
                    }
                    listByTransactionSeller.push(transactionsellerdata)
                }
            })
            console.log('list by transaction seller',listByTransactionSeller)

            // RECONSTRUCT LIST BY TRANSACTION
            var listByTransaction=[]
            listByTransactionSeller.forEach((ts)=>{
                var isexist=false
                for(var i=0;i<listByTransaction.length;i++){
                    if(listByTransaction[i].idtransaction==ts.idtransaction){
                        isexist=true
                        listByTransaction[i].sellerlist.push(ts)
                    }
                }
                if(!isexist){
                    const{
                        idtransaction,
                        iduser,
                        idstatus,
                        status_name,
                        totalprice,
                        totaldeliverycost,
                        totalworth,
                        commerce_promo,
                        totalcharge,
                        payment_promo,
                        totalpayment,
                        idpayment,
                        payment_method,
                        payat,
                    }=ts.itemlist[0]
                    var transactiondata={
                        idtransaction,
                        iduser,
                        status_name,
                        idstatus,
                        totalprice,
                        totaldeliverycost,
                        totalworth,
                        commerce_promo,
                        totalcharge,
                        payment_promo,
                        totalpayment,
                        idpayment,
                        payment_method,
                        payat,
                        sellerlist:[ts]
                    }
                    listByTransaction.push(transactiondata)
                }

            })

            console.log('list by transaction',listByTransaction)


            var data={
                list: listByTransaction,
                total: listByTransaction.length
            }
            dispatch({type:PAYMENT_LIST,payload:data})
        }).catch((err)=>{
            console.log(err)
        })
    }
}