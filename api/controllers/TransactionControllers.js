const {db}=require('../connections/mysql')
const {uploader}=require('../supports/uploader')
const fs=require('fs')


module.exports={

    // // CHANGE OF STRUCTURE
    // // CURRENTLY NOT BEING USED
    // add:(req,res)=>{
    //     console.log('creating transaction...')

    //     console.log(req.body)

    //     // CHECK IF TRANSACTION ON CART ALREADY EXIST
    //     // STATUS ONCART = IDSTATUS 1
    //     const {iduser} =req.body 

    //     var sql=`select * from transactions where iduser=${iduser} and idstatus=1`
    //     db.query(sql,(err,check)=>{
    //         if(err) return res.status(500).send(err)

    //         if(check.length){
    //             console.log('transaction oncart exist')
    //             res.status(200).send({idtransaction:check[0].idtransaction})
    //         }else{

    //             // TRANSACTION NOT EXIST
    //             // CREATING...
    //             var tr={
    //                 ...req.body,
    //                 idstatus:1
    //             }
                
    //             sql=`insert into transactions set ?`
    //             db.query(sql,tr,(err,created)=>{
    //                 if(err) return res.status(500).send(err)

    //                 console.log('created')
    //                 res.status(200).send({idtransaction:created.insertId})
    //             })
    //         }
    //     })
    // },

    // // CHANGE OF STRUCTURE
    // // CURRENTLY NOT BEING USED
    // get:(req,res)=>{
    //     console.log('finding transaction on cart...')

    //     console.log(req.query)

    //     const{iduser,idstatus}=req.query

    //     var sql=`select * from transactions where iduser=${iduser} and idstatus=${idstatus}`
    //     db.query(sql,(err,result)=>{
    //         if(err) return res.status(500).send(err)

    //         console.log('sending data back')
    //         res.status(200).send(result)
    //     })
    // },

    create:(req,res)=>{
        console.log('creating transaction...')


        // iduser,idpayment

        // console.log(req.body)
        const {
            iduser,
            totalprice,
            totaldeliverycost,
            totalworth,
            commerce_promo,
            totalcharge,
            payment_promo,
            totalpayment,
            idpayment
        }=req.body

        // CREATE DATETIME OF ONE HOUR LATER
        Date.prototype.addHours = function(h) {
            this.setTime(this.getTime() + (h*60*60*1000));
            return this;
        }
        var payat=new Date().addHours(1)
        // ////////////////////////////////

        var datatransaction={
            iduser,
            idstatus:1,
            totalprice,
            totaldeliverycost,
            totalworth,
            commerce_promo,
            totalcharge,
            payment_promo,
            totalpayment,
            idpayment,
            payat
        }
        console.log(datatransaction)
        var sql=`insert into transactions set ?`
        db.query(sql,datatransaction,(err,created)=>{
            if(err) return res.status(500).send(err)

            console.log('transaction created')
            res.status(200).send(created)

        })

    },

    createtransactionseller:(req,res)=>{
        console.log('creating transaction seller...')

        console.log(req.body)

        const {
            idtransaction,
            idseller,
            iddelivery,
            totalqty,
            seller_delivery_cost,
            seller_items_price
        } = req.body

        var datasellertransaction={
            idtransaction,
            idseller,
            iddelivery,
            totalqty,
            seller_delivery_cost,
            seller_items_price,
            total_price:seller_delivery_cost+seller_items_price
        }
        var sql=`insert into transactionsellers set ?`
        db.query(sql,datasellertransaction,(err,created)=>{
            if(err) res.status(500).send(err)

            console.log(`transaction seller id ${created.insertId} created`)
            res.status(200).send(created)
        })
    },


    getOnPayment:(req,res)=>{
        console.log('get transaction on payment')

        const {iduser}=req.query

        // var sql=`select * from transactions t
        // join transactionsellers ts on ts.idtransaction=t.idtransaction
        // join transactiondetails td on td.idtransactionseller=ts.idtransactionseller
        // where t.iduser=${iduser} and t.idstatus=1`
        var sql=`select * from transactiondetails td
        join items i on i.iditem=td.iditem
        join products prod on prod.idproduct=i.idproduct
        join transactionsellers ts on ts.idtransactionseller=td.idtransactionseller
        join sellers sel on sel.idseller=ts.idseller
        join delivery d on d.iddelivery=ts.iddelivery
        join transactions t on t.idtransaction=ts.idtransaction
        join payment p on p.idpayment=t.idpayment
        join status s on s.idstatus=t.idstatus
        where t.iduser=${iduser} and t.idstatus=1`
        db.query(sql,(err,payment)=>{
            if(err) return res.status(500).send(err)

            
            res.status(200).send(payment)
        })
    },


    uploadPaymentProof:(req,res)=>{
        console.log('upload payment proof')
        const{idtransaction}=req.params
        
        // upload image
        const path='/payment'
        const upload=uploader(path,`PROOF${idtransaction}`).fields([{name:'image'}])

        upload(req,res,(err)=>{
            if(err) return res.status(500).send({message:'Upload image failed',error:err.message})
            console.log('req files')
            console.log(req.files)
            const {image}=req.files
            const imagePath=image?path+'/'+image[0].filename:null
            
            // const imagePath=path+'/'+req.files[0].filename

            console.log(imagePath)


            if(!imagePath){
                return res.status(500).send({message:'image cannot be empty'})
            }

            // const data=JSON.parse(req.body.data)
            // data.imagecover=JSON.stringify(imagePath)
            var paymentproof=JSON.stringify(imagePath)

            var update={
                paymentproof,
                idstatus:2,
                updateat: new Date()
            }
            
            var sql=`update transactions set ? where idtransaction=${idtransaction}`
            db.query(sql,update,(err,added)=>{
                if(err){
                    console.log(err)
                    if(imagePath){
                        fs.unlinkSync('./public'+imagePath)
                    }
                    return res.status(500).send({message:'Cannot upload to mysql, please check again',error:err.message})
                }

                res.status(200).send(added)

            })
        })
    },

    update:(req,res)=>{
        console.log('updating transaction...')
        console.log(req.body)
        const{idtransaction}=req.params

        var update={
            ...req.body,
            updateat:new Date()
        }
        var sql=`update transactions set ? where idtransaction=${idtransaction}`
        db.query(sql,update,(err,updated)=>{
            if(err) return res.status(500).send(err)

            console.log('transaction updated')
            res.status(200).send(updated)
        })
    }
}