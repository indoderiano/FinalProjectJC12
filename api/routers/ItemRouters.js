const express=require('express')
const {ItemControllers}=require('../controllers')

const Router=express.Router()

Router.post('/',ItemControllers.add)
Router.get('/',ItemControllers.get)
Router.put('/:iditem',ItemControllers.edit)
Router.put('/image/:iditem',ItemControllers.addphoto)
Router.put('/image/:iditem/:index',ItemControllers.deletephoto)

module.exports=Router