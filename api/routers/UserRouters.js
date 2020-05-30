const express=require('express')
const {UserControllers}=require('../controllers')

const Router=express.Router()

Router.get('/allusers',UserControllers.allusers)
Router.get('/nothing',UserControllers.empty)
Router.post('/',UserControllers.create)

module.exports=Router