const express=require('express')
const {ProductControllers}=require('../controllers')

const Router=express.Router()


Router.post('/',ProductControllers.add)

// not being used
// Router.post('/add',ProductControllers.create)

// not being used
// Router.put('/edit/:id',ProductControllers.edit)

module.exports=Router