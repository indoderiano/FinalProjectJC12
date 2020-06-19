const {db}=require('../connections/mysql')
const transporter=require('../supports/mailer')

module.exports={
    ////////// GET SELLER ////////
    AllSeller:(req,res)=>{
        var sql=`select s.*, u.username,u.email,u.lastlogin from seller s join users u on s.iduser = u.iduser;`
        db.query(sql,(err,result)=>{
            if (err) res.status(500).send(err,{message:'error in line 9'})
            res.status(200).send(result)
        })
    },
    //////// BLOCK SELLER /////
    BlockSeller:(req,res)=>{
        const {idseller}=req.params
        console.log(idseller)
        var blocked={
            isblocked:true
        }
        var sql=`update seller set ? where idseller=${idseller}`
            db.query(sql, blocked , (err,result)=>{
                if(err) res.status(500).send('error line 23')
                console.log(idseller)
                if(blocked){
                    res.status(200).send({message:'your email has been unblocked'})
                }
                var maildata={
                    from: 'Admin <mde50526@gmail.com>',
                    to: 'jamestjahjadi@gmail.com',
                    subject: 'Account Blocked',
                    html: `Hello, We're sorry to say this but your account has been blocked due to some report about your store`
                }
                transporter.sendMail(maildata,(err,sent)=>{
                    if(err) return res.status(500).send(err)
                    res.status(200).send({message:`blocked`})
                })
            })
    },
    
    //////// UNBLOCK SELLER ///////////////
    UnblockSeller:(req,res)=>{
        const {idseller}=req.params
        console.log(idseller)
        var blocked={
            isblocked:false
        }
        var sql=`update seller set ? where idseller=${idseller}`
            db.query(sql, blocked , (err,result)=>{
                if(err) res.status(500).send('error line 23')
                if(blocked){
                    res.status(200).send({message:'your email has been unblocked'})
                }
                var maildata={
                    from: 'Admin <mde50526@gmail.com>',
                    to: 'jamestjahjadi@gmail.com',
                    subject: 'Account Unblocked',
                    html: `Hello, we're gladly to inform you that your store has been Unblocked, Happy Selling :)`
                }
                transporter.sendMail(maildata,(err,sent)=>{
                    if(err) return res.status(500).send(err)
                    res.status(200).send({message:`unblocked`})
                })
            })
    },
}