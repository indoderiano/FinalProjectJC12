const {db}=require('../connections/mysql')
const encrypt=require('../supports/crypto')


module.exports={

    create:(req,res)=>{
        console.log('creating new user')
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
        var sql=`select * from users where email='${email}' or username='${username}'`
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

                    // SEND EMAIL VERIFICATION



                    res.status(200).send({status:true})
                })
            }
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