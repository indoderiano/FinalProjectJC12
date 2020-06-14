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
    TransactionDetailsRouters
}=require('./routers')

app.use('/users',UserRouters)
app.use('/products',ProductRouters)
app.use('/items',ItemRouters)
app.use('/transactions',TransactionRouters)
app.use('/transactiondetails',TransactionDetailsRouters)

app.use(express.static('public')) // access to public folder


app.listen(PORT,()=>console.log('API is online at port '+PORT))


