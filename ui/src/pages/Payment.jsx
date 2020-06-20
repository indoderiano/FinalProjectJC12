import React ,{Component} from 'react'
import Axios from 'axios'
import {APIURL} from '../supports/ApiUrl'
import {
    Grid,
    Header,
    Image,
    Form,
    Segment,
    Button,
    Message,
    Container,
    Input,
    TextArea,
    Checkbox,
    Icon,
    Divider,
    Dropdown,
    Modal
} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {titleConstruct,isJson} from '../supports/services'
import {LoadCart,UpdateCheckout,CountTotalPayment,LoadPayment} from '../redux/actions'
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux'


class Payment extends Component {
    state = { 
        idpayment:0,

        isfinish:false
     }


    submitPayment=()=>{
        console.log(this.props.Cart)
        // NEED TO CREATE PROTECTION
        /////////////////////////////////
        // CHECK ITEM STOCK FOR AVAILIBILTY
        this.checkStock()

        // CHECK ITEM ISSELECTED
        // CHECK PROMO AVAILIBILITY
        // CHECK POPCOIN CREDIT?
        // CHECK SAME TRANSACTION ALREADY DONE IN ANOTHER TAB

        /////////////////////////////////

        // DONT FORGET TO SUB ITEM STOCK AFTER CHECKOUT
    }
    

    undoStock=()=>{
        this.props.Cart.checkout.forEach((seller,checkoutindex)=>{
            seller.itemlist.forEach((order,sellerindex)=>{
                // iditem
                // qty

                Axios.put(`${APIURL}/items/undostock/${order.iditem}`,{qty:order.qty})
                .then((newstock)=>{
                    console.log(`item id ${order.iditem} new stock is ${newstock.data.stock}`)

                    // LAST CYCLE
                    // AFTER ALL STOCK IS CHECKED
                    if(this.props.Cart.checkout.length-1==checkoutindex&&seller.itemlist.length-1==sellerindex){

                        console.log('all stock is undo')
                    }

                }).catch((err)=>{

                })
            })
        })
    }

    checkStock=()=>{

        // CHECK ITEM STOCK
        // STEP 1
        // SUBTRACT ITEM STOCK BY QTY
        // STEP 2
        // IF NEW STOCK VALUE LESS THAN ZERO, THEN UNDO ALL SUBTRACTION

        var stock=true
        var id=0

        this.props.Cart.checkout.forEach((seller,checkoutindex)=>{
            seller.itemlist.forEach((order,sellerindex)=>{
                // iditem
                // qty

                Axios.put(`${APIURL}/items/stock/${order.iditem}`,{qty:order.qty})
                .then((newstock)=>{
                    console.log(`item id ${order.iditem} newstock is ${newstock.data.stock}`)
                    if(newstock.data.stock<0){
                        stock=false
                        id=order.iditem
                    }

                    // LAST CYCLE
                    // AFTER ALL STOCK IS CHECKED
                    if(this.props.Cart.checkout.length-1==checkoutindex&&seller.itemlist.length-1==sellerindex){

                        if(stock){
                            // STOCK IS GOOD
                            console.log('item stock are available')
                            this.createTransactions()
                        }else{
                            // UNDO SUBTRACTION
                            console.log('stock is not enough')
                            console.log(`item id ${id}`)
                            this.undoStock()

                        }
                    }

                }).catch((err)=>{

                })
            })
        })
    }


    createTransactions=()=>{
        // console.log(this.props.Cart)
        var transactiondata={
            ...this.props.Cart,
            iduser: this.props.User.iduser,
            idpayment: this.state.idpayment
        }
        
        console.log('request create transaction')
        Axios.post(`${APIURL}/transactions/secured`,transactiondata)
        .then((paymentcreated)=>{
            this.props.LoadCart(this.props.User.iduser)
            this.props.LoadPayment(this.props.User.iduser)
            this.setState({isfinish:true})
        }).catch((err)=>{
            console.log(err)
        })
    }

    createTransactionByFrontEnd=()=>{



        return 1




        // SAME FUNCTION, BUT WITH TRY CATCH
        console.log(this.props.Cart)
        var transactiondata={
            ...this.props.Cart,
            iduser: this.props.User.iduser,
            idpayment: this.state.idpayment
        }
        
        console.log('request create transaction')
        Axios.post(`${APIURL}/transactions`,transactiondata)
        .then(async(created)=>{
            // create seller transaction

            // NOTE, THIS FOR LOOP, DOES NOT WORK PROPERLY HERE, 
            // -----> for(var seller of this.props.Cart.checkout){  <------
            // VALUE OF THE FIRST CYCLE GETS REPLACE BY THE VALUE FROM THE LAST CYCLE

            this.props.Cart.checkout.forEach(async(seller)=>{
                // console.log('seller loop'+seller.namatoko)
                const{
                    idseller,
                    iddelivery,
                    totalqty,
                    totalweight,
                    seller_delivery_cost,
                    seller_items_price
                }=seller
                var transactionsellerdata = {
                    idtransaction:created.data.insertId,
                    idseller,
                    iddelivery,
                    totalqty,
                    totalweight,
                    seller_delivery_cost,
                    seller_items_price
                }
                
                console.log('request create transaction seller '+seller.idseller)
                try{
                    var transactionseller=await Axios.post(`${APIURL}/transactions/seller`,transactionsellerdata)
                    // update transaction detail
                    seller.itemlist.forEach(async(item)=>{

                        // DONT FORGET TO SUBTRACT ITEM STOCK

                        // CASE STUDY
                        // IF SAME PAGE IS OPEN IN ANOTHER TAB
                        // 

                        // for(var item of seller.itemlist){
                        var update={
                            idtransaction:created.data.insertId,
                            idtransactionseller:transactionseller.data.insertId,
                            idorderstatus:2,
                            checkout_price:item.price
                        }
                        console.log(`update order id ${item.idtransactiondetail}`)
                        
                        try{
                            var updated=await Axios.put(`${APIURL}/transactiondetails/${item.idtransactiondetail}`,update)
                            console.log(`order id ${item.idtransactiondetail} proccessed`)

                            this.props.LoadCart(this.props.User.iduser)
                            this.props.LoadPayment(this.props.User.iduser)
                            this.setState({isfinish:true})
                        }catch(err){
                            console.log(err)
                        }
                        
                    })

                }catch(err){
                    console.log(err)
                }

            })
        }).catch((err)=>{
            console.log(err)
        })











        // SAME FUNCTION
        // console.log(this.props.Cart)
        // var transactiondata={
        //     ...this.props.Cart,
        //     iduser: this.props.User.iduser,
        //     idpayment: this.state.idpayment
        // }
        
        // console.log('request create transaction')
        // Axios.post(`${APIURL}/transactions`,transactiondata)
        // .then((created)=>{
        //     // create seller transaction
        //     // NOTE, THIS FOR LOOP, DOES NOT WORK PROPERLY HERE, 
        //     // VALUE OF THE FIRST CYCLE GETS REPLACE BY THE VALUE FROM THE LAST CYCLE
        //     // for(var seller of this.props.Cart.checkout){ 
        //     this.props.Cart.checkout.forEach((seller)=>{
        //         // console.log('seller loop'+seller.namatoko)
        //         const{
        //             idseller,
        //             iddelivery,
        //             totalqty,
        //             seller_delivery_cost,
        //             seller_items_price
        //         }=seller
        //         var transactionsellerdata = {
        //             idtransaction:created.data.insertId,
        //             idseller,
        //             iddelivery,
        //             totalqty,
        //             seller_delivery_cost,
        //             seller_items_price
        //         }
                
        //         console.log('request create transaction seller '+seller.idseller)
        //         Axios.post(`${APIURL}/transactions/seller`,transactionsellerdata)
        //         .then((transactionseller)=>{
        //             // update transaction details
        //             // for(var item of seller.itemlist){
        //             seller.itemlist.forEach((item)=>{
        //                 var update={
        //                     idtransaction:created.data.insertId,
        //                     idtransactionseller:transactionseller.data.insertId,
        //                     idorderstatus:2
        //                 }
        //                 console.log(`update order id ${item.idtransactiondetail}`)
        //                 Axios.put(`${APIURL}/transactiondetails/${item.idtransactiondetail}`,update)
        //                 .then((updated)=>{
        //                     console.log(`order id ${item.idtransactiondetail} proccessed`)
        //                 }).catch((err)=>{
        //                     console.log(err)
        //                 })
        //             })

        //         }).catch((err)=>{
        //             console.log(err)
        //         })
        //     })
        // }).catch((err)=>{
        //     console.log(err)
        // })
        // .finally(()=>{
        //     console.log('finally')
        // })

    }

    
    render() { 
        // console.log(this.state.deliveryselect)
        return ( 

            <Modal trigger={this.props.trigger} style={{width:'500px'}}>
                <Modal.Header>Payment</Modal.Header>
                <Modal.Content>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <Icon name='bitcoin' size='large' color='blue'/>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Header as={'span'} color='blue'>Popcoin</Header>
                                            <div style={{fontSize:'13px',whiteSpace:'nowrap'}}>
                                                Rp 100000,00
                                            </div>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Grid.Column>
                            <Grid.Column width={8} style={{display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
                                <Checkbox 
                                    toggle 
                                    checked={this.state.idpayment==4}
                                    onClick={()=>{
                                        this.setState({idpayment:4})
                                        this.props.CountTotalPayment()
                                    }}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    
                </Modal.Content>
                <Divider/>

                <Modal.Content>
                    <Modal.Description>
                        <div>
                            <Header style={{display:'inline-block'}}>Transfer</Header>
                            <Checkbox 
                                toggle 
                                style={{float:'right'}}
                                checked={this.state.idpayment==1}
                                onClick={()=>{
                                    this.setState({idpayment:1})
                                    this.props.CountTotalPayment()
                                }}
                            />
                        </div>
                        <p style={{fontSize:'16px'}}>Guide</p>
                        <p>
                            Pellentesque finibus nulla dui, ac aliquam neque efficitur consequat. Phasellus mauris dui, consequat sit amet finibus ut, convallis ac augue
                        </p>
                    </Modal.Description>
                </Modal.Content>

                <Divider/>

                <Modal.Content>
                    <Modal.Description>
                        <div>
                            <Header style={{display:'inline-block'}}>Credit Card</Header>
                            <Checkbox 
                                toggle 
                                style={{float:'right'}}
                                checked={this.state.idpayment==2}
                                onClick={()=>{
                                    this.setState({idpayment:2})
                                    this.props.CountTotalPayment()
                                }}
                            />
                        </div>
                        <p style={{fontSize:'16px'}}>Guide</p>
                        <p>
                            Pellentesque finibus nulla dui, ac aliquam neque efficitur consequat. Phasellus mauris dui, consequat sit amet finibus ut, convallis ac augue
                        </p>
                    </Modal.Description>
                </Modal.Content>

                <Divider/>

                <Container style={{padding:'1em'}}>
                    <Button
                        primary
                        style={{width:'100%'}}
                        disabled={this.props.Cart.totalpayment&&this.state.idpayment?false:true}
                        onClick={this.submitPayment}
                    >
                        Pay
                    </Button>
                </Container>

                {
                    this.state.isfinish?
                    <Redirect to='/transactions'/>
                    : null
                }
                
            </Modal>

                            
        );
    }
}


const MapstatetoProps=(state)=>{
    return {
        User: state.Auth,
        Cart: state.Cart
    }
}

 
export default connect(MapstatetoProps,{CountTotalPayment,LoadCart,LoadPayment}) (Payment);