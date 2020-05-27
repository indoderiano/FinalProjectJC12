const express=require('express')
const {ProductControllers}=require('../controllers')

const Router=express.Router()

// Router.get('/allusers',UserControllers.allusers)
Router.post('/add',ProductControllers.add)
Router.put('/edit/:id',ProductControllers.edit)

module.exports=Router