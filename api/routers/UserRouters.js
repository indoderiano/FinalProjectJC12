const express=require('express')
const {UserControllers}=require('../controllers')
const {Auth}=require('./../supports/Auth')

const Router=express.Router()

Router.get('/allusers',UserControllers.allusers)
Router.get('/login',UserControllers.login)
Router.get('/keeplogin', Auth, UserControllers.keeplogin)
Router.post('/',UserControllers.create)
Router.put('/verify',UserControllers.verify)
Router.post('/resendmail',UserControllers.resendmail)

module.exports=Router