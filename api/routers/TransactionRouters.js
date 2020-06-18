const express=require('express')
const {TransactionControllers}=require('../controllers')

const Router=express.Router()


// Router.post('/',TransactionControllers.add)
// Router.get('/get',TransactionControllers.get)
Router.post('/',TransactionControllers.create)
Router.post('/seller',TransactionControllers.createtransactionseller)
Router.get('/payment/',TransactionControllers.getOnPayment)
Router.post('/paymentproof/:idtransaction',TransactionControllers.uploadPaymentProof)
Router.put('/:idtransaction',TransactionControllers.update)


module.exports=Router