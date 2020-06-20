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
    Tab,
    Menu,
    Label
} from 'semantic-ui-react'
import Payment from './Payment'
import {Link} from 'react-router-dom'
import {titleConstruct,isJson} from '../supports/services'
import {ListByTransaction} from '../supports/ListAssembler'
import {LoadCart,UpdateCheckout,CountTotalCharge,CountTotalPayment} from '../redux/actions'
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux'



class DeliveryList extends Component {
    state = { 
        deliveryList:[],
        ismodal:false,
        modaltransaction:{}
     }

     componentDidMount=()=>{
        Axios.get(`${APIURL}/transactions/user?iduser=${this.props.User.iduser}&idstatus=${[1,2,5]}`)
        .then((res)=>{
            console.log(res.data)

            // RECONSTRUCT LIST , BY TRANSACTION BY TRANSACTION SELLER
            var listByTransaction=ListByTransaction(res.data,'store').reverse()
            console.log('transaction history',listByTransaction)
            this.setState({deliveryList:listByTransaction})

        }).catch((err)=>{
            console.log(err)
        })
    }

    renderByItem=(itemlist)=>{
        return itemlist.map((item,index)=>{
            const typeArr=isJson(item.type)
            return (
                <Grid.Row key={index}>
                <Grid.Column width={16}>
                    {/* <Segment> */}
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={6}>
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
                            <Grid.Column width={8} style={{display:'flex',flexDirection:'column'}}>
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
                                {/* <Header 
                                    as={'h5'} 
                                    style={{
                                        margin:'0 0 0em',
                                        flexBasis:'1em',
                                        opacity:item.isselected?'1':'.8'
                                    }}
                                >
                                    Rp {item.price},00
                                </Header> */}
                                <p style={{margin:'0 0 .5em',flexBasis:'1em',fontSize:'13px',opacity:'.7'}}>{item.weight} gram</p>
                                <p style={{margin:'0 0 .5em',flexBasis:'1em'}}>qty: {item.qty}</p>

                                
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    {/* </Segment> */}
                </Grid.Column>
                </Grid.Row>


            )
        })
    }

    renderByTransactionSeller=(sellerlist)=>{
        return sellerlist.map((seller,index)=>{
            return (
                <Segment key={index}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={12} style={{marginBottom:'1em'}}>
                                <Header as={'h3'}>{titleConstruct(seller.namatoko)}</Header>
                                
                            </Grid.Column>
                            {/* <Grid.Column width={4}>
                                Delivery Method 
                                <Header as={'h3'} style={{display:'inline-block',float:'right'}} color='blue'>{seller.delivery_method}</Header>
                            </Grid.Column> */}

                            <Grid.Column width={7}>
                                <Grid>
                                    {this.renderByItem(seller.itemlist)}
                                </Grid>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                
                            </Grid.Column>

                            <Grid.Column width={5} style={{}}>
                                <Header as={'h4'}>
                                    Delivery
                                </Header>
                                <div style={{marginTop:'.5em'}}>
                                    <span>
                                        Delivery Method
                                    </span>
                                    <Header as={'h3'} color='blue' style={{display:'inline-block',float:'right',fontWeight:'800',margin:'0'}}>
                                        {seller.delivery_method}
                                    </Header>
                                </div>
                                <div style={{marginTop:'.5em',fontSize:'12px',color:'gray'}}>
                                    <span>
                                        total weight
                                    </span>
                                    <span style={{float:'right',display:'inline-block'}}>
                                        {seller.totalweight} g
                                    </span>
                                </div>
                                {
                                    seller.seller_delivery_cost?
                                    <div style={{marginTop:'.0em',fontSize:'12px',color:'gray'}}>
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
                        </Grid.Row>

                    </Grid>
                </Segment>
            )
        })
    }

    renderByTransaction=()=>{

        return this.state.deliveryList.map((transaction,index)=>{
            return (
                <Segment key={index}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={5}>
                                Transaction ID {transaction.idtransaction}
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
            )
        })
    }


    renderByStore=()=>{
        return this.state.deliveryList.map((store,index)=>{
            return (
                <Segment key={index}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={5}>
                                Transaction ID 
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <span style={{display:'block'}}>Status</span>
                                <Header as={'span'} style={{fontSize:'15px'}} color='blue'>
                                    {'status'}
                                </Header>
                            </Grid.Column>
                            <Grid.Column width={6} style={{textAlign:'right'}}>
                                <div style={{display:'inline-block',textAlign:'left'}}>
                                    Status
                                    <Header as={'div'} color='blue'>
                                        Status
                                    </Header>
                                </div>
                            </Grid.Column>
                            <Divider style={{width:'100%'}}/>
                        </Grid.Row>
                        {/* {this.renderByTransactionSeller(transaction.sellerlist)} */}
                    </Grid>
                </Segment>
            )

        })
    }

    
    render() { 
        return ( 
            <Container style={{paddingTop:'2em',width:'900px',marginBottom:'4em'}}>

                {this.renderByTransactionSeller(this.state.deliveryList)}
                
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

 
export default connect(MapstatetoProps,{LoadCart}) (DeliveryList);