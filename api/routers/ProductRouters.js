const express=require('express')
const {ProductControllers}=require('../controllers')

const Router=express.Router()


Router.post('/',ProductControllers.add)
Router.get('/:idproduct',ProductControllers.get)

// not being used
// Router.post('/add',ProductControllers.create)

// not being used
// Router.put('/edit/:id',ProductControllers.edit)

module.exports=Router