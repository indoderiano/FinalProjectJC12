const express=require('express')
const {TransactionDetailsControllers}=require('../controllers')

const Router=express.Router()


Router.post('/',TransactionDetailsControllers.add)
Router.get('/item/product/seller',TransactionDetailsControllers.onCartDetails)
Router.post('/:idtransactiondetail',TransactionDetailsControllers.edit)
Router.put('/:idtransactiondetail',TransactionDetailsControllers.update)

module.exports=Router