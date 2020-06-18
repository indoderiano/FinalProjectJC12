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
    }
}