const {db}=require('../connections/mysql')
const {uploader}=require('../supports/uploader')
const fs=require('fs')


module.exports={

    update:(req,res)=>{
        console.log('updating transaction seller...')
        const{idtransactionseller}=req.params
        var update={
            ...req.body,
            updateat: new Date()
        }
        var sql=`update transactionsellers set ? where idtransactionseller=${idtransactionseller}`
        db.query(sql,update,(err,updated)=>{
            if(err) return res.status(500).send(err)

            console.log('transaction seller updated')
            res.status(200).send(updated)
        })
    },

    

    
}