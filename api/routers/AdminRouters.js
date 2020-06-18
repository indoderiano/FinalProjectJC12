const express=require('express')
const {AdminControllers}=require('../controllers')

const Router=express.Router()

Router.get('/allseller', AdminControllers.AllSeller)

module.exports=Router

