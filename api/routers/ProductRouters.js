const express=require('express')
const {ProductControllers}=require('../controllers')

const Router=express.Router()

Router.get('/getproducts',ProductControllers.get)
Router.post('/add',ProductControllers.add)
Router.put('/edit/:id',ProductControllers.edit)

module.exports=Router