const express=require('express')
const {WishlistControllers}=require('../controllers')


const Router=express.Router()

Router.post('/postwishlist', WishlistControllers.postimage)

module.exports=Router