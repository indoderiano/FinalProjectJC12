const {db}=require('../connections/mysql')
const {uploader}=require('../supports/uploader')
const fs=require('fs')
const { json } = require('body-parser')

module.exports={
    postimage:(req,res)=>{
            
        
        const path = '/products'
    const upload = uploader(path, 'JAMES').fields([{ name: 'image'}]);
    upload(req, res, (err)=>{
        if(err){
            return res.status(500).json({ message: 'Upload files failed !',error: err.message })
        }
        const { image } = req.files
        const imagePath= image ? path + '/' + image[0].filename : null
        const data = JSON.parse(req.body.data);
        console.log(data);
        console.log(image);
        
        data.image=imagePath
        console.log(data.image)
        console.log(data)
        
        var sql='insert into image set ?'
        db.query(sql,data,(err,result)=>{
            
            if(err){
               fs.unlinkSync('./public' + imagePath)
                return res.status(500).json({message:'error in line 22'})
            }
            var sql1='select * from image'
            db.query(sql1,(err,result1)=>{
                if(err) res.status(500).send(err)
                return res.status(200).send(result1)
            })
        })
    })
    }
}
