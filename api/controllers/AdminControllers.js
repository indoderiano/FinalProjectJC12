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
    },

    getSalesCount:(req,res)=>{
        console.log('get list count data sales')
        // console.log('get sales',req.query)
        const {method}=req.query

        var merk=`
        select m.merk_name as title,
        count(m.merk_name) as totalcount,
        sum(td.checkout_price) as totalprice
        from transactiondetails td
        join items i on i.iditem=td.iditem
        join products p on p.idproduct=i.idproduct
        join merk m on m.idmerk=p.idmerk
        join categories c on c.idcategory=p.idcategory
        join transactionsellers ts on ts.idtransactionseller=td.idtransactionseller
        join transactions t on t.idtransaction=ts.idtransaction
        -- where td.idorderstatus=4
        group by m.merk_name
        -- order by p.idproduct
        `

        var category=`
        select c.category_name as title,
        count(c.category_name) as totalcount,
        sum(td.checkout_price) as totalprice
        from transactiondetails td
        join items i on i.iditem=td.iditem
        join products p on p.idproduct=i.idproduct
        join merk m on m.idmerk=p.idmerk
        join categories c on c.idcategory=p.idcategory
        join transactionsellers ts on ts.idtransactionseller=td.idtransactionseller
        join transactions t on t.idtransaction=ts.idtransaction
        -- where td.idorderstatus=4
        group by c.category_name
        -- order by p.idproduct
        `

        if(method=='merk'){
            console.log('by merk')
            var sql=merk
        }else if(method=='category'){
            console.log('by category')
            var sql=category
        }
        db.query(sql,(err,result)=>{
            if(err) return res.status(500).send(err)

            res.status(200).send(result)
        })
    }
}