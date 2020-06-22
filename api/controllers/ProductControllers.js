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
        console.log('editing product details...')

        const {idproduct}=req.params
        
        var sql=`update products set ? where idproduct=${idproduct}`

        var edit=req.body
        edit.updateat=new Date()

        db.query(sql,edit,(err,edited)=>{
            if(err) return res.status(500).send(err)

            console.log('product details updated')
            res.status(200).send(edited)
        })
    },

    addcover:(req,res)=>{
        console.log('adding cover...')
        // console.log(req.params)
        const{idproduct}=req.params

        const path='/products'
        const upload=uploader(path,'CVR').array('photo',5)

        upload(req,res,(err)=>{
            if(err) return res.status(500).send(err)

            console.log('reqbodydata')
            console.log(req.body)


            const newImagePath=JSON.parse(req.body.data)==null?[]:JSON.parse(req.body.data)

            console.log(newImagePath)

            const imagePath=req.files.map((file)=>{
                newImagePath.push(path+'/'+file.filename)
                return path+'/'+file.filename
            })

            console.log(newImagePath)

            
            const data={
                imagecover:JSON.stringify(newImagePath),
                updateat: new Date()
            }

            var sql=`update products set ? where idproduct=${idproduct}`
            db.query(sql,data,(err,updated)=>{
                if(err) return res.status(500).send(err)
                console.log('update cover berhasil')
                res.status(200).send(updated)
            })


        })

    },

    deletecover:(req,res)=>{
        console.log('deleting cover...')
        console.log(req.params)
        console.log(req.body)

        const {idproduct,index}=req.params
        const imagePath=req.body

        // imagePath[index]

        // delete image from folder
        if(fs.existsSync('./public' + imagePath[index])){ // check if file exist, to prevent error
            fs.unlinkSync('./public' + imagePath[index]);
        }

        // delete path
        imagePath.splice(index,1)

        var edit={
            imagecover: JSON.stringify(imagePath)
        }

        var sql=`update products set ? where idproduct=${idproduct}`
        db.query(sql,edit,(err,update)=>{
            if(err) return res.status(500).send(err)
            
            res.status(200).send(update)
        })

    },

    countSold:(req,res)=>{
        console.log('counting rating and sold data...')

        const {idproduct}=req.params

        var sql=`select * from transactiondetails td
        join items i on i.iditem=td.iditem
        join products p on p.idproduct=i.idproduct
        where p.idproduct=${idproduct} and idorderstatus in (3,4)`

        db.query(sql,(err,count)=>{
            if(err) return res.status(500).send(err)

            sql=`update products set ? where idproduct=${idproduct}`
            db.query(sql,{sold:count.length},(err,updated)=>{
                if(err) return res.status(500).send(err)
                console.log('sold number counter')
                res.status(200).send(updated)
            })
        })
    }

}