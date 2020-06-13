const {db}=require('../connections/mysql')
const {uploader}=require('../supports/uploader')
const fs=require('fs')


module.exports={
    add:(req,res)=>{
        console.log('creating transaction details...')

        console.log(req.body)
        
        const {idtransaction,iditem}=req.body

        // CHECK IF TRANSACTION DETAILS WITH IDTRANSACTION ALREADY EXIST
        var sql=`select * from transactiondetails where idtransaction=${idtransaction} and iditem=${iditem}`
        db.query(sql,(err,check)=>{
            if(err) return res.status(500).send(err)

            if(check.length){
                // ALREADY EXIST
                // JUST ADD QTY and MESSAGE
                var newqty=check[0].qty+req.body.qty

                // CHECK IF STOCK IS GOOD
                sql=`select * from items where iditem=${iditem}`
                db.query(sql,(err,item)=>{
                    if(err) return res.status(500).send(err)

                    console.log(item)
                    if(newqty>item[0].stock){
                        // STOCK IS NOT ENOUGH
                        console.log('stock is not enough')
                        return res.status(200).send({status:false,message:'Stock is not enough'})
                    }else{
                        // STOCK IS GOOD
                        var edit={
                            qty: newqty,
                            message: req.body.message
                        }
                        sql=`update transactiondetails set ? where idtransactiondetails=${check[0].idtransactiondetails}`
                        db.query(sql,edit,(err,updated)=>{
                            if(err) return res.status(500).send(err)

                            console.log('qty added')
                            res.status(200).send({status:true,message:'qty added'})
                        })
                        
                    }
                })

            }else{
                // TRANSACTION DETAILS DONT EXIST
                // CREATE...
                var td={
                    ...req.body
                }
                // CHECK IF STOCK IS GOOD
                sql=`select * from items where iditem=${iditem}`
                db.query(sql,(err,item)=>{
                    if(err) return res.status(500).send(err)

                    if(req.body.qty>item[0].stock){
                        // STOCK IS NOT ENOUGH
                        console.log('stock is not enough')
                        res.status(200).send({status:false,message:'Stock is not enough'})
                    }else{
                        // STOCK IS GOOD
                        sql=`insert into transactiondetails set ?`
                        db.query(sql,td,(err,created)=>{
                            if(err) return res.status(500).send(err)
        
                            console.log('transaction details created')
                            res.status(200).send({status:true,message:'transaction details created'})
                        })

                    }
                })

            }
        })
    },
}