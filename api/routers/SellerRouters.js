const express=require('express')
const {SellerControllers}=require('../controllers')

const Router=express.Router()

Router.get('/createseller',SellerControllers.createSeller)
