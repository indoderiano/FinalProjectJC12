const express=require('express')
const {SellerControllers}=require('../controllers')

const Router=express.Router()

Router.post('/createseller',SellerControllers.createSeller)

module.exports=Router
