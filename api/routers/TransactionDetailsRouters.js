const express=require('express')
const {TransactionDetailsControllers}=require('../controllers')

const Router=express.Router()


Router.post('/',TransactionDetailsControllers.add)
Router.get('/item/product/seller',TransactionDetailsControllers.onCartDetails)
Router.put('/:idtransactiondetail',TransactionDetailsControllers.edit)

module.exports=Router