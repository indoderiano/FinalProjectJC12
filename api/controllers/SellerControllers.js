const {db}=require('../connections/mysql')

module.exports={
/////////////////// CREATE NEW SELLER //////////////
    createSeller:(req,res)=>{
        const {namatoko,alamattoko,iduser}=req.body
        var newseller={
            namatoko,
            alamattoko,
            iduser,
            isverified:true
        }
        var sql=`select s.*, u.username,u.email from seller s 
                 join users u on s.iduser = u.iduser
                 where s.iduser=${iduser};`
        db.query(sql,(err,result)=>{
            if(err) res.status(500).send(err,{message:'error in line 16'})
            if(result.length) {
                res.status(200).send({message:'You have been registered as a seller'})
                }else{
                    // INPUT USER AS A SELLER
                    var sql1=`insert into seller set ?`
                    db.query(sql,newseller,(err,result1)=>{
                        if(err) res.status(500).send(err,{message:'error in line 23'})
                        res.status(200).send({message:'Registered as a Seller',status:true})
                    })
                }

        })
        
    }
}