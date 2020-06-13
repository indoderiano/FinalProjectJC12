const express=require('express')
const {TransactionDetailsControllers}=require('../controllers')

const Router=express.Router()


Router.post('/',TransactionDetailsControllers.add)

module.exports=Router