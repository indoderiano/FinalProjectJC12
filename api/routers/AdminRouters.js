const express=require('express')
const {AdminControllers}=require('../controllers')

const Router=express.Router()

Router.get('/allseller', AdminControllers.AllSeller)
Router.get('/unverified', AdminControllers.GetUnverified)
Router.put('/blocked/:idseller',AdminControllers.BlockSeller)
Router.put('/unblocked/:idseller',AdminControllers.UnblockSeller)
Router.put('/verifyseller/:idseller',AdminControllers.VerifySeller)
module.exports=Router

