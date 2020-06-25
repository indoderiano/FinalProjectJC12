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
    Modal,
    Dropdown,
    Tab,
    Menu,
    Label
} from 'semantic-ui-react'
import Payment from './Payment'
import {Link} from 'react-router-dom'
import {titleConstruct,isJson,getDate} from '../supports/services'
import {ListByTransaction} from '../supports/ListAssembler'
import {LoadCart,UpdateCheckout,CountTotalCharge,CountTotalPayment} from '../redux/actions'
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux'



class TransactionList extends Component {
    state = { 
        historyList:[],
        ismodal:false,
        modaltransaction:{}
     }

    // DONT FORGET TO ADD RATING ITEMS

    componentDidMount=()=>{
        this.getList()
    }

    getList=()=>{
        Axios.get(`${APIURL}/transactions/user?iduser=${this.props.User.iduser}&idstatus=${[2,3,4,5,6]}`)
        .then((res)=>{
            // console.log('get list',res.data)

            // RECONSTRUCT LIST , BY TRANSACTION BY TRANSACTION SELLER
            var listByTransaction=ListByTransaction(res.data).reverse()
            // console.log('transaction history',listByTransaction)
            this.setState({historyList:listByTransaction})

        }).catch((err)=>{
            console.log(err)
        })
    }

    onRating=(idtransactiondetail,rating)=>{
        Axios.put(`${APIURL}/transactiondetails/${idtransactiondetail}`,{rating})
        .then((updated)=>{
            console.log('rating success')
            this.getList()
        }).catch((err)=>{
            console.log(err)
        })
    }

    // COUNT SOLD WHEN ORDERSTATUS IS COMPLETED
    countSold=(idproduct)=>{
        Axios.put(`${APIURL}/products/sold/${idproduct}`)
        .then((res)=>{
            console.log('sold number is counted')
            this.getList()
        }).catch((err)=>{
            console.log(err)
        })
    }


    renderByItem=(itemlist)=>{
        return itemlist.map((item,index)=>{
            const typeArr=isJson(item.type)
            return (
                <Grid.Column key={index} width={16}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <div
                                    style={{
                                        paddingTop:'80%',
                                        backgroundImage:`url(${APIURL+isJson(item.imagecover)[0]})`,
                                        backgroundSize:'cover',
                                        backgroundPosition:'center',
                                        position:'relative'
                                    }}
                                >
                                    <Link 
                                        to={`/product/${item.idproduct}`}
                                        style={{
                                            // border:'1px solid red',
                                            position:'absolute',
                                            top:'0',
                                            left:'0',
                                            width:'100%',
                                            height:'100%',
                                            // backgroundColor:item.isselected?'':'rgba(255,255,255,.2)'
                                        }}
                                    />
                                </div>
                            </Grid.Column>
                            <Grid.Column width={7} style={{display:'flex',flexDirection:'column'}}>
                                <Header as={'h4'} style={{marginBottom:'0em',flexBasis:'1em',opacity:item.isselected?'1':'.8'}}>{item.product_name}</Header>
                                <p style={{margin:'0 0 .5em',fontSize:'12px',flexBasis:'.8em',opacity:item.isselected?'1':'.8'}}>
                                    {
                                        typeArr.map((type,j)=>{
                                            return (
                                                <span key={j} style={{marginRight:'.5em'}}>
                                                    {titleConstruct(isJson(item.variant)[j].name)+' '+titleConstruct(type)}
                                                </span>
                                            )
                                        })
                                    }
                                    {/* <span style={{display:'inline-block'}}></span> */}
                                </p>
                                <Header 
                                    as={'h5'} 
                                    style={{
                                        margin:'0 0 0em',
                                        flexBasis:'1em',
                                        opacity:item.isselected?'1':'.8'
                                    }}
                                >
                                    Rp {item.checkout_price},00
                                </Header>
                                <p style={{margin:'0 0 .5em',flexBasis:'1em',fontSize:'13px',opacity:'.7'}}>{item.weight} gram</p>
                                <p style={{margin:'0 0 .5em',flexBasis:'1em'}}>qty: {item.qty}</p>

                                
                            </Grid.Column>
                            <Grid.Column width={5}>
                                {/* <Header as={'h4'} style={{marginBottom:'0em',flexBasis:'1em'}}>{item.weight} gram</Header> */}
                                <p style={{margin:'0 0 .5em',fontSize:'12px',flexBasis:'.8em'}}>{item.weight} gram</p>

                                <p style={{margin:'0 0 .5em',fontSize:'12px',flexBasis:'.8em'}}>qty {item.qty}</p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Grid.Column>


            )
        })
    }

    renderByTransactionSeller=(sellerlist)=>{
        return sellerlist.map((seller,index)=>{
            return (
                <Grid.Row key={index}>
                    <Grid.Column width={16} style={{marginBottom:'1em'}}>
                        <Header as={'h3'}>{titleConstruct(seller.namatoko)}</Header>
                    </Grid.Column>

                    <Grid.Column width={11}>
                        <Grid>
                            <Grid.Row>
                                {this.renderByItem(seller.itemlist)}
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>

                    <Grid.Column width={5} style={{}}>
                        <Header as={'h4'}>
                            Delivery
                        </Header>
                        <div style={{marginTop:'.5em'}}>
                            <span>
                                Delivery Method
                            </span>
                            <span style={{float:'right',fontWeight:'800'}}>
                                {seller.delivery_method}
                            </span>
                        </div>
                        <div style={{marginTop:'.5em'}}>
                            <span>
                                total weight
                            </span>
                            <span style={{float:'right'}}>
                                {seller.totalweight} g
                            </span>
                        </div>
                        {
                            seller.seller_delivery_cost?
                            <div style={{marginTop:'.5em'}}>
                                <span>
                                    delivery cost
                                </span>
                                <span style={{float:'right'}}>
                                    Rp {seller.seller_delivery_cost},00
                                </span>
                            </div>
                            : null

                        }
                    </Grid.Column>
                    <Grid.Column width={16}>
                        <Divider/>
                    </Grid.Column>
                </Grid.Row>
            )
        })
    }

    renderModal=(transaction)=>{
        return (
            <Modal trigger={<Button>More Details</Button>}>

                <Segment>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={5}>
                                {getDate(transaction.createat)}
                            </Grid.Column>
                            <Grid.Column width={5}>
                                Payment 
                                <Header as={'span'} style={{fontSize:'15px'}} color='blue'>
                                    <Icon name='bitcoin' size='mini' color='blue' style={{margin:'0 0 0 .5em'}}/>
                                    Popcoin
                                </Header>
                            </Grid.Column>
                            <Grid.Column width={6} style={{textAlign:'right'}}>
                                <div style={{display:'inline-block',textAlign:'left'}}>
                                    Status
                                    <Header as={'div'} color='blue'>
                                        {transaction.status_name}
                                    </Header>
                                </div>
                            </Grid.Column>
                            <Divider style={{width:'100%'}}/>
                        </Grid.Row>
                        {this.renderByTransactionSeller(transaction.sellerlist)}
                    </Grid>
                </Segment>
            </Modal>
        )
    }

    renderRating=(idtransactiondetail,rating,item)=>{
        // console.log('idtransactiondetail',idtransactiondetail)
        // console.log('rating ',rating)
        // console.log(item)
        if(rating){
            // return (
            //     <p>asdf</p>
            // )
            console.log(rating)
            var stars=[]
            for(var i=1;i<=rating;i++){
                stars[i]=(<Icon name='star'/>)
            }

            console.log(stars)
            return (
                <div style={{textAlign:'right'}}>
                    {stars}
                </div>
            )
        }else{
            return (
                <div style={{textAlign:'right'}}>
                    <span style={{marginRight:'.5em'}}>Rate Order </span>
                    <Icon name='star outline' style={{cursor:'pointer'}} onClick={()=>{
                        this.onRating(idtransactiondetail,1)
                    }}/>
                    <Icon name='star outline' style={{cursor:'pointer'}} onClick={()=>{
                        this.onRating(idtransactiondetail,2)
                    }}/>
                    <Icon name='star outline' style={{cursor:'pointer'}} onClick={()=>{
                        this.onRating(idtransactiondetail,3)
                    }}/>
                    <Icon name='star outline' style={{cursor:'pointer'}} onClick={()=>{
                        this.onRating(idtransactiondetail,4)
                    }}/>
                    <Icon name='star outline' style={{cursor:'pointer'}} onClick={()=>{
                        this.onRating(idtransactiondetail,5)
                    }}/>
                </div>
            )
        }
    }


    renderByOrder=(itemlist)=>{
        // console.log('itemlist',itemlist)
        return itemlist.map((item,index)=>{
            const typeArr=isJson(item.type)
            return (
                <Grid.Column key={index} width={16} style={{paddingBottom:'1em'}}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={3}>
                                <div
                                    style={{
                                        paddingTop:'80%',
                                        backgroundImage:`url(${APIURL+isJson(item.imagecover)[0]})`,
                                        backgroundSize:'cover',
                                        backgroundPosition:'center',
                                        position:'relative'
                                    }}
                                >
                                    <Link 
                                        to={`/product/${item.idproduct}`}
                                        style={{
                                            // border:'1px solid red',
                                            position:'absolute',
                                            top:'0',
                                            left:'0',
                                            width:'100%',
                                            height:'100%',
                                            // backgroundColor:item.isselected?'':'rgba(255,255,255,.2)'
                                        }}
                                    />
                                </div>
                            </Grid.Column>
                            <Grid.Column width={4} style={{display:'flex',flexDirection:'column'}}>
                                <Header as={'h4'} style={{marginBottom:'0em',flexBasis:'1em',opacity:item.isselected?'1':'.8'}}>{item.product_name}</Header>
                                <p style={{margin:'0 0 .5em',fontSize:'12px',flexBasis:'.8em',opacity:item.isselected?'1':'.8'}}>
                                    {
                                        typeArr.map((type,j)=>{
                                            return (
                                                <span key={j} style={{marginRight:'.5em'}}>
                                                    {titleConstruct(isJson(item.variant)[j].name)+' '+titleConstruct(type)}
                                                </span>
                                            )
                                        })
                                    }
                                    {/* <span style={{display:'inline-block'}}></span> */}
                                </p>
                                <Header 
                                    as={'h5'} 
                                    style={{
                                        margin:'0 0 0em',
                                        flexBasis:'1em',
                                        opacity:item.isselected?'1':'.8'
                                    }}
                                >
                                    Rp {item.checkout_price},00
                                </Header>
                                {/* <p style={{margin:'0 0 .5em',flexBasis:'1em',fontSize:'13px',opacity:'.7'}}>{item.weight} gram</p> */}
                                <p style={{margin:'0 0 .5em',flexBasis:'1em'}}>qty {item.qty}</p>

                                
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Header as={'h4'} color='blue'>
                                    {
                                        item.orderstatus_name
                                    }
                                </Header>
                            </Grid.Column>
                            <Grid.Column width={4} style={{alignItems:'flex-end'}}>
                                {
                                    item.idorderstatus>=3?
                                    this.renderRating(item.idtransactiondetail,item.rating,item)
                                    : null
                                }
                                {/* <div style={{textAlign:'right',marginTop:'auto'}}>
                                    <Header 
                                        as={'span'} 
                                        color='blue'
                                        style={{
                                            margin:'0',
                                            fontSize:'15px',
                                            fontWeight:'600',
                                            cursor:'pointer'
                                        }} 
                                    >
                                        return</Header>
                                </div> */}
                            </Grid.Column>
                            {/* <Grid.Column width={4} style={{textAlign:'right'}}>
                                {
                                    item.idorderstatus==3?
                                    <>
                                    <Button style={{width:'100%'}}>
                                        Return
                                    </Button>
                                    <Button style={{width:'100%'}}>
                                        Complete
                                    </Button>
                                    </>
                                    : null
                                }
                            </Grid.Column> */}
                        </Grid.Row>
                    </Grid>
                </Grid.Column>


            )
        })
    }
    

    renderBySeller=(sellerlist)=>{
        return sellerlist.map((seller,index)=>{
            return (
                <Grid.Row key={index} style={{padding:'0'}}>
                    <Grid.Column width={3} style={{marginBottom:'1em'}}>
                        <Header as={'h3'} style={{display:'inline-block'}}>{titleConstruct(seller.namatoko)}</Header>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        {
                            seller.idpackagestatus==4?
                            <div style={{display:'inline-block',fontSize:'12px'}}>
                                Time of Arrival: {getDate(seller.package_updateat)}
                            </div>
                            : null
                        }
                    </Grid.Column>
                    <Grid.Column width={4}>
                        {
                            seller.idpackagestatus==4?
                            <div style={{display:'inline-block',fontSize:'12px'}}>
                                Accepted By: {titleConstruct(seller.recipient)}
                            </div>
                            : null
                        }
                    </Grid.Column>

                    <Grid.Column width={16} style={{paddingTop:'1em'}}>
                        <Grid>
                            <Grid.Row>
                                {this.renderByOrder(seller.itemlist)}
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>

                    <Grid.Column width={16}>
                        <Divider/>
                    </Grid.Column>
                </Grid.Row>
            )
        })
    }


    renderByTransaction=()=>{

        return this.state.historyList.map((transaction,index)=>{
            return (
                <Segment key={index}>
                    <Grid>
                        <Grid.Row style={{paddingBottom:'0'}}>
                            <Grid.Column width={7}>
                                {getDate(transaction.createat)}
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <span style={{display:'block'}}>Status</span>
                                <Header as={'span'} style={{fontSize:'15px'}} color='blue'>
                                    {
                                        transaction.idstatus==2?
                                        'Waiting For Payment Verification'
                                        : titleConstruct(transaction.status_name)
                                    }
                                </Header>
                            </Grid.Column>
                            <Grid.Column width={4} style={{textAlign:'right'}}>
                                <div style={{display:'inline-block',textAlign:'left'}}>
                                    <span style={{display:'block'}}>Total Payment</span>
                                    <Header as={'span'} color='blue' style={{fontSize:'15px'}}>
                                        Rp {transaction.totalpayment},00
                                    </Header>
                                </div>
                            </Grid.Column>
                            <Divider style={{width:'100%'}}/>
                        </Grid.Row>
                        {this.renderBySeller(transaction.sellerlist)}
                        <Grid.Row style={{paddingTop:'0'}}>
                            <Grid.Column>
                                {this.renderModal(transaction)}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            )
        })
    }

    
    render() { 
        return ( 
            <Container style={{paddingTop:'2em',width:'900px',marginBottom:'4em'}}>

                {this.renderByTransaction()}

                <Modal open={this.state.ismodal}>
                    <Modal.Header>Select a Photo</Modal.Header>
                    <Modal.Content image>
                    <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
                    <Modal.Description>
                        <Header>Default Profile Image</Header>
                        <p>
                        We've found the following gravatar image associated with your e-mail
                        address.
                        </p>
                        <p>Is it okay to use this photo?</p>
                    </Modal.Description>
                    </Modal.Content>
                </Modal>
                
            </Container>
        );
    }
}

const MapstatetoProps=(state)=>{
    return {
        User: state.Auth,
        Cart: state.Cart,
        Payment: state.Payment
    }
}

 
export default connect(MapstatetoProps,{LoadCart}) (TransactionList);