const {db}=require('../connections/mysql')
const encrypt=require('../supports/crypto')
const transporter=require('../supports/mailer')
const {createJWTToken}=require('../supports/jwt')
const jwt=require('jsonwebtoken')


module.exports={

    create:(req,res)=>{
        console.log('creating new user...')
        console.log(req.body)
        const {username,email,password,address} = req.body
        var userdata={
            username,
            email,
            password: encrypt(password),
            address
        }
        // var sql=''
        // CHECK AVAILABILITY
        // for developing, duplicate email is let through
        // var sql=`select * from users where email='${email}' or username='${username}'`
        var sql=`select * from users where username='${username}'`
        db.query(sql,(err,checkuser)=>{
            if(err) return res.status(500).send(err)
            if(checkuser.length){
                console.log('username/email sudah terpakai')
                res.status(200).send({status:false,message:'username atau email sudah terpakai'})
            }else{
                // CREATE NEW USER
                sql=`insert into users set ?`
                db.query(sql,userdata,(err,created)=>{
                    if(err) return res.status(500).send(err)
                    console.log(`account ${username} berhasil dibuat`)
                    console.log('sending email verification...')
                    // SEND EMAIL VERIFICATION
                    var token=createJWTToken({userid:created.insertId})
                    var VerificationLink=`http://localhost:3000/verification/${token}`
                    var maildata={
                        from: 'Admin <mde50526@gmail.com>',
                        to: email,
                        subject: 'E-Commerce Verification Account',
                        html: `Hai ${username}, klik link berikut untuk verifikasi account kamu,link ini kadaluarsa dalam 24 jam
                        <a href=${VerificationLink}>verify</a>`
                    }
                    transporter.sendMail(maildata,(err,sent)=>{
                        if(err) return res.status(500).send(err)

                        console.log('email sent')
                        console.log('')
                        res.status(200).send({status:true})
                    })
                })
            }
        })
    },

    verify:(req,res)=>{
        console.log('verifying account...')
        console.log(req.body)
        const {token}=req.body
        jwt.verify(token,"puripuriprisoner",(err,decoded)=>{
            if(err) return res.status(200).send({status:false,message:'Token kadaluarsa'})
            // console.log(decoded)
            var sql=`update users set ? where iduser=${decoded.userid}`
            db.query(sql,{isverified:true},(err,updated)=>{
                if(err) res.status(500).send(err)
                console.log('email is verified')
                console.log('')
                sql=`select iduser,username from users where iduser=${decoded.userid}`
                db.query(sql,(err,userdata)=>{
                    if(err) return res.status(500).send(err)
                    var user=userdata[0]
                    
                    res.status(200).send({status:true,user})
                })
            })
        })
    },

    resendmail:(req,res)=>{
        console.log('resend email verification...')
        const {userid}=req.body
        var token=createJWTToken({userid:userid})
        var VerificationLink=`http://localhost:3000/verification/${token}`
        var maildata={
            from: 'Admin <mde50526@gmail.com>',
            to: email,
            subject: 'E-Commerce Verification Account',
            html: `Hai ${username}, klik link berikut untuk verifikasi account kamu,link ini kadaluarsa dalam 24 jam
            <a href=${VerificationLink}>verify</a>`
        }
        transporter.sendMail(maildata,(err,sent)=>{
            if(err) return res.status(500).send(err)

            console.log('email sent')
            console.log('')
            res.status(200).send({status:true})
        })
    },




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