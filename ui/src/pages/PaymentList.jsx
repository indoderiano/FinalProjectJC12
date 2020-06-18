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
import {LoadPayment} from '../redux/actions'
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux'



class PaymentList extends Component {
    state = { 
        now:new Date(),
        clock:undefined,
        uploadid:0,
        filepaymentproof:undefined,
        errormessage:''
     }

    componentDidMount=()=>{
        
        var clock=setInterval(() => {
            this.setState({now:new Date()})
        }, 1000);
        this.setState({clock})
    }

    componentWillUnmount=()=>{
        clearTimeout(this.state.clock)
    }

    onUpload=()=>{
        console.log(this.state.filepaymentproof)
        if(!this.state.filepaymentproof){
            this.setState({errormessage:'Please select an image file'})
        }else{
            var formdata= new FormData()

            var Headers={
                header:{
                    'Content-Type': 'multipart/form-data',
                }
            }

            formdata.append('image',this.state.filepaymentproof)

            // DONT FORGET TO CREATE PROTECTION
            // SO THAT AFTER EXPIRES, UNABLE TO UPLOAD/UPDATE STATUS


            Axios.post(`${APIURL}/transactions/paymentproof/${this.state.uploadid}`,formdata,Headers)
            .then((uploaded)=>{
                console.log('payment proof uploaded')
                this.props.LoadPayment(this.props.User.iduser)

            }).catch((err)=>{
                console.log(err)
            })

        }
    }

    CancelTransaction=(idtransaction)=>{
        Axios.put(`${APIURL}/transactions/${idtransaction}`,{idstatus:4})
        .then((cancelled)=>{
            console.log('transaction '+idtransaction+' cancelled')
            this.props.LoadPayment(this.props.User.iduser)
            // DONT FORGET TO ADD ITEM BACK TO CART, AND RESTOCK ITEM
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
                                    Rp {item.price},00
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

                    <Grid.Column width={9}>
                        <Grid>
                            <Grid.Row>
                                {this.renderByItem(seller.itemlist)}
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>

                    <Grid.Column width={7} style={{}}>
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

    inter=()=>{
        setInterval(()=>{
            this.setState({payat:1})
        },1000)
    }
    

    renderByTransaction=()=>{

        if(!this.props.Payment.list.length){
            return (
                <div style={{textAlign:'center'}}>There is no payment due</div>
            )
        }

        return this.props.Payment.list.map((transaction,index)=>{

            var seconds=(Date.parse(transaction.payat)-Date.parse(this.state.now))/1000
            var expiredinmins=Math.floor(seconds/60)
            var expiredinsecs=seconds%60
            var isexpired=seconds<=0

            if(isexpired){
                this.CancelTransaction(transaction.idtransaction)
            }


            return (
                <Segment key={index}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={5}>
                                Transaction ID {transaction.idtransaction}
                            </Grid.Column>
                            <Grid.Column width={5}>
                                Payment 
                                <Header as={'span'} style={{fontSize:'15px',marginLeft:'.5em'}} color={transaction.payment_method=='Popcoin'?'blue':null}>
                                    {
                                        transaction.payment_method=='Popcoin'?
                                        <>
                                            <Icon name='bitcoin' size='tiny' color='blue' style={{margin:'0 0 0 .5em',fontSize:'18px'}}/>
                                            {transaction.payment_method}
                                        </>
                                        : 
                                        transaction.payment_method
                                    }
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
                            <Grid.Column width={16} style={{textAlign:'center'}}>
                                {
                                    isexpired?
                                    <div><span style={{fontWeight:'800'}}>Transaction Is Expired</span></div>
                                    :
                                    <div>Expire in <span style={{fontWeight:'800'}}>{expiredinmins} : {expiredinsecs<10&expiredinsecs>=0?'0'+expiredinsecs:expiredinsecs}</span></div>
                                }
                            </Grid.Column>
                                {
                                    transaction.idtransaction==this.state.uploadid?
                                    <Grid.Column width={16} style={{marginTop:'1em',textAlign:'center'}}>
                                        <Input 
                                            type='file'
                                            // multiple
                                            style={{marginRight:'1em'}}
                                            onChange={(e)=>{
                                                if(e.target.files){
                                                    // console.log(e.target.files)
                                                    this.setState({filepaymentproof:e.target.files[0]})
                                                }
                                            }}
                                        />
                                        <Button primary style={{height:'100%'}} onClick={this.onUpload}>Upload</Button>
                                        {
                                            this.state.errormessage?
                                            <Label 
                                                basic 
                                                color='red' 
                                                pointing 
                                                style={{
                                                    position:'absolute',
                                                    top:'100%',
                                                    left:'35%'
                                                }}>
                                                {this.state.errormessage}
                                            </Label>
                                            : null
                                        }
                                    </Grid.Column>
                                    :
                                    <Grid.Column width={16} style={{marginTop:'1em',textAlign:'center'}}>
                                        <Button 
                                            primary 
                                            disabled={isexpired}
                                            style={{width:'100%'}}
                                            onClick={()=>{this.setState({uploadid:transaction.idtransaction})}}
                                        >
                                            Upload Transfer Proof
                                        </Button>
                                    </Grid.Column>
                                }
                            <Divider style={{width:'100%'}}/>
                        </Grid.Row>
                        {this.renderByTransactionSeller(transaction.sellerlist)}
                    </Grid>
                </Segment>
            )
        })
    }

    
    render() { 
        return ( 
            <Container style={{paddingTop:'2em',width:'900px',marginBottom:'4em'}}>
                <Message style={{textAlign:'center'}}>Upload The Proof of Payment Before It Expires</Message>
                {this.renderByTransaction()}
                
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

 
export default connect(MapstatetoProps,{LoadPayment}) (PaymentList);