const {db}=require('../connections/mysql')
const {uploader}=require('../supports/uploader')
const fs=require('fs')


module.exports={
    add:(req,res)=>{
        console.log('creating transaction...')

        console.log(req.body)

        // CHECK IF TRANSACTION ON CART ALREADY EXIST
        // STATUS ONCART = IDSTATUS 1
        const {iduser} =req.body 

        var sql=`select * from transactions where iduser=${iduser} and idstatus=1`
        db.query(sql,(err,check)=>{
            if(err) return res.status(500).send(err)

            if(check.length){
                console.log('transaction oncart exist')
                res.status(200).send({idtransaction:check[0].idtransaction})
            }else{

                // TRANSACTION NOT EXIST
                // CREATING...
                var tr={
                    ...req.body,
                    idstatus:1
                }
                
                sql=`insert into transactions set ?`
                db.query(sql,tr,(err,created)=>{
                    if(err) return res.status(500).send(err)

                    console.log('created')
                    res.status(200).send({idtransaction:created.insertId})
                })
            }
        })
    },
}