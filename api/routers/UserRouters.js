const express=require('express')
const {UserControllers}=require('../controllers')
const {Auth}=require('./../supports/Auth')

const Router=express.Router()

Router.get('/allusers',UserControllers.allusers)
// Router.get('/nothing',UserControllers.empty)
Router.get('/login',UserControllers.login)
Router.get('/keeplogin', Auth, UserControllers.keeplogin)

module.exports=Router