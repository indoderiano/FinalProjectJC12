const {db}=require('../connections/mysql')
const encrypt=require('./../supports/crypto')
const {createJWTToken}=require('./../supports/jwt')


module.exports={
    allusers:(req,res)=>{
        console.log('all users data')
        var sql='select * from users'
        db.query(sql,(err,alluser)=>{
            if(err) return res.status(500).send(err)
            res.status(200).send(alluser)
        })
        // res.status(200).send({data:'test'})
        console.log('ini setelah db')
        // console.log(allusers)
    },
    empty:(req,res)=>{
        // nothing
        res.status(500).send({data:'empty2'})
        res.status(200).send({data:'empty'})

    },
    login:(req,res)=>{
        const {password,username}=req.query
        const hashpass=encrypt(password)
        var sql=`select * from users where username='${username}' and password='${password}'`
        db.query(sql,(err,result)=>{
            if(err){
                return res.status(500).send(err)
            }
            if(result.length){
                var obj={
                    lastlogin:new Date()
                }
                var sql=`update users set ? where iduser=${result[0].iduser}`
                db.query(sql,obj,(err,result2)=>{
                    console.log(result2)
                    if(err){
                        return res.status(500).send(err)
                    }
                    const token=createJWTToken({id:result[0].iduser,username:result[0].username})
                    console.log('result.length login lewat')
                    return res.status(200).send({...result[0],token:token, status:true})     //jika user ada, pertama objek result[0] dibuuka dengan ... untuk menambahkan objek token ke dalamnya
                })
            }else{
                return res.status(200).send({message:'user nggak ada', status:false})     //jika user nggak ada
            }
        })
    },
    keeplogin:(req,res)=>{
        console.log(req.user)
        var sql=`select * from users where iduser=${req.user.id}`
        db.query(sql,(err,result)=>{
            console.log('ini keeplogin')
            if(err){
                return res.status(500).send(err)
            }
            const token=createJWTToken({id:result[0].iduser,username:result[0].username})
            return res.status(200).send({...result[0],token})
        })
    },
}