

export const ListByTransaction=(list,method)=>{
    // RECONSTRUCT LIST , BY TRANSACTION BY TRANSACTION SELLER
    // FIRST, BY TRANSACTION SELLER
    var listByTransactionSeller=[]
    list.forEach((item)=>{
        var isexist=false
        for(var i=0;i<listByTransactionSeller.length;i++){
            if(listByTransactionSeller[i].idtransactionseller==item.idtransactionseller){
                isexist=true
                listByTransactionSeller[i].itemlist.push(item)
            }
        }
        if(!isexist){
            const{
                idtransactionseller,
                idtransaction,
                idseller,
                iddelivery,
                idpackagestatus,
                namatoko,
                delivery_method,
                recipient,
                totalqty,
                totalweight,
                seller_delivery_cost,
                seller_items_price,
                total_price,
                package_createat,
                package_updateat
            }=item
            var transactionsellerdata={
                idtransactionseller,
                idtransaction,
                idseller,
                iddelivery,
                idpackagestatus,
                namatoko,
                delivery_method,
                recipient,
                totalqty,
                totalweight,
                seller_delivery_cost,
                seller_items_price,
                total_price,
                package_createat,
                package_updateat,
                itemlist:[item]
            }
            listByTransactionSeller.push(transactionsellerdata)
        }
    })
    // console.log('list by transaction seller',listByTransactionSeller)

    if(method=='store'){
        return listByTransactionSeller
    }


    // RECONSTRUCT LIST BY TRANSACTION
    var listByTransaction=[]
    listByTransactionSeller.forEach((ts)=>{
        var isexist=false
        for(var i=0;i<listByTransaction.length;i++){
            if(listByTransaction[i].idtransaction==ts.idtransaction){
                isexist=true
                listByTransaction[i].sellerlist.push(ts)
            }
        }
        if(!isexist){
            const{
                idtransaction,
                iduser,
                username,
                idstatus,
                status_name,
                totalprice,
                totaldeliverycost,
                totalworth,
                commerce_promo,
                totalcharge,
                payment_promo,
                totalpayment,
                idpayment,
                payment_method,
                paymentproof,
                payat,
                createat,
                updateat
            }=ts.itemlist[0]
            var transactiondata={
                idtransaction,
                iduser,
                username,
                status_name,
                idstatus,
                totalprice,
                totaldeliverycost,
                totalworth,
                commerce_promo,
                totalcharge,
                payment_promo,
                totalpayment,
                idpayment,
                payment_method,
                paymentproof,
                payat,
                createat,
                updateat,
                sellerlist:[ts]
            }
            listByTransaction.push(transactiondata)
        }

    })

    // console.log('list by transaction',listByTransaction)

    return listByTransaction
}


// REASON USING THIS ASSEMBLER
// NEED VALUE FROM TRANSACTION SUCH AS IDUSER,USERNAME,UPDATEAT,...
export const ListByStoreTransaction=(list)=>{
    // RECONSTRUCT LIST , BY TRANSACTION
    var listByTransaction=[]
    list.forEach((item)=>{
        var isexist=false
        for(var i=0;i<listByTransaction.length;i++){
            if(listByTransaction[i].idtransaction==item.idtransaction){
                isexist=true
                listByTransaction[i].itemlist.push(item)
            }
        }
        if(!isexist){
            const{
                idtransaction,
                iduser,
                username,
                status_name,
                idstatus,
                createat,
                updateat,

                idtransactionseller,
                idseller,
                namatoko,
                iddelivery,
                delivery_method,
                totalqty,
                totalweight,
                seller_delivery_cost,
                seller_items_price,
                total_price,
                package_createat,
                package_updateat
            }=item
            var transactiondata={
                idtransaction,
                iduser,
                username,
                status_name,
                idstatus,
                createat,
                updateat,

                idtransactionseller,
                idseller,
                namatoko,
                iddelivery,
                delivery_method,
                totalqty,
                totalweight,
                seller_delivery_cost,
                seller_items_price,
                total_price,
                package_createat,
                package_updateat,
                itemlist:[item]
            }
            listByTransaction.push(transactiondata)
        }
    })
    // console.log('list by transaction seller',listByTransaction)

    return listByTransaction
}


export const listItemsByProduct=(list)=>{

    var listByProduct=[]
    list.forEach((item)=>{
        var isexist=false
        for(var i=0;i<listByProduct.length;i++){
            if(listByProduct[i].idproduct==item.idproduct){
                isexist=true
                listByProduct[i].itemlist.push(item)

                // TO KEEP PRODUCT PRICE LABEL IS THE HIGHEST PRICE OF ITS ITEMS
                // IF ITEM PRICE IS BIGGER THAN PRODUCT PRICE
                if(listByProduct[i].productprice<item.price){
                    listByProduct[i].productprice=item.price
                }
            }
        }

        if(!isexist){
            const{
                idproduct,
                product_name,
                imagecover,
                description,
                product_rating,
                product_rating_count,
                sold,
                seen,
                
                price,
            }=item
            var productdata={
                idproduct,
                product_name,
                imagecover,
                description,
                product_rating,
                product_rating_count,
                sold,
                seen,

                productprice:price,
                itemlist:[item]
            }
            listByProduct.push(productdata)
        }
    })
    return listByProduct
}


export const listFlashsaleItemsByProduct=(list)=>{

    var listByProduct=[]
    list.forEach((item)=>{
        var isexist=false
        for(var i=0;i<listByProduct.length;i++){
            if(listByProduct[i].idproduct==item.idproduct){
                isexist=true
                listByProduct[i].itemlist.push(item)

                // TO KEEP PRODUCT PRICE LABEL IS THE HIGHEST PRICE OF ITS ITEMS
                // IF ITEM PRICE IS BIGGER THAN PRODUCT PRICE
                if(listByProduct[i].productprice<item.price){
                    listByProduct[i].productprice=item.price
                }
            }
        }

        if(!isexist){
            const{
                idproduct,
                product_name,
                imagecover,
                description,
                product_rating,
                product_rating_count,
                sold,
                seen,
                idflashsaleproduct,
                flashsale_price,
                isapproved,
                
                price,
            }=item
            var productdata={
                idproduct,
                product_name,
                imagecover,
                description,
                product_rating,
                product_rating_count,
                sold,
                seen,
                idflashsaleproduct,
                flashsale_price,
                isapproved,

                productprice:price,
                itemlist:[item]
            }
            listByProduct.push(productdata)
        }
    })
    return listByProduct
}