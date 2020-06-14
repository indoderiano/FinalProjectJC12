const express=require('express')
const {TransactionControllers}=require('../controllers')

const Router=express.Router()


Router.post('/',TransactionControllers.add)

module.exports=Router