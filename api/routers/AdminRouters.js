const express=require('express')
const {AdminControllers}=require('../controllers')

const Router=express.Router()

Router.get('/allseller', AdminControllers.AllSeller)
Router.put('/blocked/:idseller',AdminControllers.BlockSeller)
Router.put('/unblocked/:idseller',AdminControllers.UnblockSeller)

module.exports=Router

