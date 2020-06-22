const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const bearertoken=require('express-bearer-token')

const app=express()

const PORT=5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bearertoken())
app.use(cors())


app.get('/',(req,res)=>{
    return res.send("<h1 style='text-align:center; margin-top:100px;'>Final Project JC 12</h1>")
})


const {
    UserRouters,
    ProductRouters,
    ItemRouters,
    TransactionRouters,
    TransactionDetailsRouters,
    SellerRouters, 
    AdminRouters,
    WishlistRouters,
    TransactionSellerRouters,
}=require('./routers')
const { db } = require('./connections/mysql')

app.use('/users',UserRouters)
app.use('/products',ProductRouters)
app.use('/items',ItemRouters)
app.use('/transactions',TransactionRouters)
app.use('/transactiondetails',TransactionDetailsRouters)
app.use('/sellers', SellerRouters)
app.use('/admin',AdminRouters)
app.use('/wishlist',WishlistRouters)


app.use('/transactionstores',TransactionSellerRouters)

app.use(express.static('public')) // access to public folder


// GET DELIVERY OPTIONS
app.get('/delivery',(req,res)=>{
    console.log('get delivery options')
    var sql=`select * from delivery`
    db.query(sql,(err,delivery)=>{
        if(err) return res.status(500).send(err)

        res.status(200).send(delivery)
    })
})

// GET PAYMENT OPTIONS
app.get('/payment',(req,res)=>{
    console.log('get payment options')
    var sql=`select * from payment`
    db.query(sql,(err,payment)=>{
        if(err) return res.status(500).send(err)

        res.status(200).send(payment)
    })
})


app.listen(PORT,()=>console.log('API is online at port '+PORT))


