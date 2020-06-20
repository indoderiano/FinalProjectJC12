const express=require('express')
const {TransactionSellerControllers}=require('../controllers')

const Router=express.Router()

Router.put('/:idtransactionseller',TransactionSellerControllers.update)

module.exports=Router