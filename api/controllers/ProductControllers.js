const {db}=require('../connections/mysql')
const {uploader}=require('../supports/uploader')
const fs=require('fs')


module.exports={
    get:(req,res)=>{
        console.log('getting product...')
        console.log(req.params)
        const {idproduct}=req.params

        var sql=`select * from products where idproduct=${idproduct}`
        db.query(sql,(err,product)=>{
            if(err) return res.status(500).send(err)

            console.log('succeed')
            console.log('')
            res.status(200).send(product[0])
        })
    },

    // CURRENTLY NOT BEING USED
    create:(req,res)=>{
        console.log('create product')
        console.log(req.body)

        var sql=`insert into products set ?`
        db.query(sql,req.body,(err,created)=>{
            if(err) return res.status(500).send(err)

            res.status(200).send(created)
        })
    },

    add:(req,res)=>{
        console.log('add product')
        // console.log(req.body)
        // upload image
        const path='/products'
        const upload=uploader(path,'CVR').array('photo',5)

        upload(req,res,(err)=>{
            if(err) return res.status(500).json({message:'Upload image failed',error:err.message})
            console.log('req files')
            console.log(req.files)
            // const {image}=req.files
            // const imagePath=image?path+'/'+image[0].filename:null
            
            // const imagePath=path+'/'+req.files[0].filename

            const imagePath=req.files.map((file)=>{
                return path+'/'+file.filename
            })

            console.log(imagePath)

            // in case the ref object does not exist
            // need to delete image, then terminate
            // if(!req.body.data){
            //     console.log('delete image')
            //     fs.unlinkSync('./public'+imagePath)
            //     return res.status(500).json({message:'data undefined, please check again'})
            // }

            // if(!imagePath){
            //     return res.status(500).json({message:'image cannot be empty'})
            // }

            const data=JSON.parse(req.body.data)
            data.imagecover=JSON.stringify(imagePath)

            console.log(data)
            
            var sql=`insert into products set ?`
            db.query(sql,data,(err,added)=>{
                if(err){
                    console.log(err)
                    if(imagePath){
                        for(const imgpath of imagePath){
                            fs.unlinkSync('./public'+imgpath)
                        }
                    }
                    return res.status(500).json({message:'Cannot upload to mysql, please check again',error:err.message})
                }

                res.status(200).send(added)

            })
        })
    },


    edit:(req,res)=>{
        console.log('edit')
        const {id}=req.params
        var sql=`select * from product where product_id=${id}`
        console.log(sql)
        db.query(sql,(err,result)=>{
            if(err) return res.status(500).send(err)
            console.log(result)
            if(result.length){
                const path='/photo'
                const upload=uploader(path,'PRD').fields([{name:'image'}])

                upload(req,res,(err)=>{
                    if(err) return res.status(500).json({message:'Upload image failed',error:err.message})
                    const {image}=req.files
                    const imagePath=image?path+'/'+image[0].filename:null
                    console.log(imagePath)
                    console.log(req.body)
                    
                    // in case the ref object does not exist
                    // need to delete image, then terminate
                    if(!req.body.data){
                        console.log('delete image')
                        fs.unlinkSync('./public'+imagePath)
                        return res.status(500).json({message:'data undefined, please check again'})
                    }
                    if(!imagePath){
                        return res.status(500).json({message:'image cannot be empty'})
                    }

                    const data=JSON.parse(req.body.data)
                    data.imagePath=imagePath

                    console.log(data)
                    
                    var sql=`update product set ? where product_id=${id}`
                    db.query(sql,data,(err,updateproduct)=>{
                        if(err){
                            console.log(err)
                            if(imagePath){
                                fs.unlinkSync('./public'+imagePath)
                            }
                            return res.status(500).json({message:'Cannot upload to mysql, please check again',error:err.message})
                        }

                        // hapus image yg lama
                        fs.unlinkSync('./public'+result[0].imagePath)
                        
                        sql='select * from product'
                        db.query(sql,(err,productlist)=>{
                            if(err) return res.status(500).send(err)
                            return res.status(200).send(productlist)
                        })
                    })
                })
            }
        })
    }
}