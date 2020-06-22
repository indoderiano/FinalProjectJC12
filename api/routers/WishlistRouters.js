const express=require('express')
const {WishlistControllers}=require('../controllers')


const Router=express.Router()


Router.get('/getwishlist',WishlistControllers.showWishlist)
Router.post('/getproduct',WishlistControllers.getidProduct)
Router.post('/postwishlist',WishlistControllers.postimage)
module.exports=Router