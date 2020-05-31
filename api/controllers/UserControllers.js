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
    },
    empty:(req,res)=>{
        // nothing
        res.status(500).send({data:'empty2'})
        res.status(200).send({data:'empty'})

    }
}