const {db}=require('../connections/mysql')
const {uploader}=require('../supports/uploader')
const fs=require('fs')


module.exports={
    get:(req,res)=>{
        var sql=`select p.*,c.isdeleted, c.name as namecategory
        from products p join categories c on p.idcategory=c.idcategory
        where c.isdeleted=0`
        db.query(sql,(err,product)=>{
            console.log(product)
            if (err) res.status(500).send(err)
            sql=`Select idcategory,name from categories`
            db.query(sql,(err,category)=>{
                if (err) res.status(500).send(err)
                return res.send({product,category})
            })
        })
    },

    add:(req,res)=>{
        console.log('add product')
        // upload image
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
            
            var sql=`insert into product set ?`
            db.query(sql,data,(err,result)=>{
                if(err){
                    console.log(err)
                    if(imagePath){
                        fs.unlinkSync('./public'+imagePath)
                    }
                    return res.status(500).json({message:'Cannot upload to mysql, please check again',error:err.message})
                }
                sql='select * from product'
                db.query(sql,(err,productlist)=>{
                    if(err) return res.status(500).send(err)
                    return res.status(200).send(productlist)
                })
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