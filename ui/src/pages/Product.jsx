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
} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {titleConstruct} from '../supports/services'
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux'


// how many number of images in slider
const slidercount=4


class Product extends Component {
    state = { 
        product:{},
        items:[],

        imageshow:'',
        imageList:[],
        // image slider
        order:0,
        maxorder:0,
        imageselectorder:0,
        ///////////////
        itemimageorder:[],

        typeselect:[],
        itemselect:{},
        qty:0,
        message:'',

        // MESSAGES
        err:'',
        buy:false,

     }

     componentDidMount=()=>{
        this.getProduct()
        this.getItems()
    }

    getProduct=()=>{

        Axios.get(`${APIURL}/products/get/${this.props.match.params.idproduct}`)
        .then((res)=>{
            console.log(res.data)
            this.setState({
                product:res.data,
                // imageshow:this.isJson(res.data.imagecover)[0],
                // imageselectorder:0,
            })
            this.constructImageList()
            this.selectImage(0)
        }).catch((err)=>{
            console.log(err)
        })

    }
    
    getItems=()=>{

        Axios.get(`${APIURL}/items?idproduct=${this.props.match.params.idproduct}`)
        .then((res)=>{
            console.log(res.data)
            this.setState({items:res.data})
            this.constructImageList()
            // IF ONLY SINGLE TYPE PRODUCT
            if(res.data.length==1){
                this.setState({itemselect:res.data[0]})
            }
        }).catch((err)=>{
            console.log(err)
        })
    }

    onAddToCart=()=>{
        // CLEAR MESSAGE
        this.setState({err:''})

        // if item is selected
        console.log(this.state.itemselect)

        if(!this.state.itemselect.iditem){

            this.setState({err:'Item is not selected'})

        }else if( this.state.qty=='' || this.state.qty==0 || !this.state.qty>0 ){

            this.setState({err:'Quantity is empty'})

        }else if( this.state.message.length>200 ){

            this.setState({err:'Message cannot be more than 200 characters'})

        }else{

            var tr={
                iduser: this.props.User.iduser
            }
            Axios.post(`${APIURL}/transactions`,tr)
            .then((res)=>{
                console.log('create transaction successful')
                console.log(res.data)
                // CREATE TRANSACTION DETAILS
                var td={
                    idtransaction: res.data.idtransaction,
                    iditem: this.state.itemselect.iditem,
                    qty: this.state.qty,
                    message: this.state.message,
                }

                Axios.post(`${APIURL}/transactiondetails`,td)
                .then((res)=>{
                    if(res.data.status){
                        console.log('transaction details updated')
                        this.setState({buy:true})
                        setTimeout(()=>{
                            this.setState({buy:false})
                        },3000)
                        
                    }else{
                        console.log(res.data.message)
                        this.setState({err:res.data.message})
                    }
                }).catch((err)=>{
                    console.log(err)
                })

            }).catch((err)=>{
                console.log(err)
            })

        }



    }

    constructImageList=()=>{
        // GET COVER IMAGES AND ITEM IMAGES INTO ONE ARRAY

        var imagecover=this.isJson(this.state.product.imagecover)

        var itemimages=[]
        var itemimageorder=[]
        // for(const item of this.state.items){
        //     var image=this.isJson(item.image)
        //     itemimages=itemimages.concat(image)

        //     // get image item order
        //     var order={
        //         iditem: item.iditem,
        //         order: 
        //     }
        // }

        for(var i=0;i<this.state.items.length;i++){

            // get image item order
            var order={
                iditem: this.state.items[i].iditem,
                index: imagecover.length+itemimages.length
            }
            itemimageorder.push(order)

            // merge image
            var image=this.isJson(this.state.items[i].image)
            itemimages=itemimages.concat(image)

        }

        // console.log('order',itemimageorder)

        // console.log(imagecover)
        // console.log(itemimages)

        var imageList=imagecover.concat(itemimages)

        // console.log(imageList)

        //counting maxorder
        var maxorder=imageList.length-slidercount

        this.setState({
            imageList:imageList,
            maxorder:maxorder<0?0:maxorder,
            itemimageorder:itemimageorder
        })
    }

    selectImage=(index)=>{
        var imageshow=this.state.imageList[index]
        var imageselectorder=index
        var order=index>=this.state.maxorder?this.state.maxorder:index

        console.log(index)
        this.setState({
            imageshow:this.state.imageList[index],
            imageselectorder:index,
            order:order
        })
    }

    selectItem=()=>{
        // var selected=this.state.items[0]

        for(var item of this.state.items){
            
            if(item.type==JSON.stringify(this.state.typeselect)){
                console.log('item selected')
                // SELECT ITEM IMAGE TO SHOW
                for(var order of this.state.itemimageorder){
                    if(order.iditem==item.iditem){
                        var neworder=order.index>=this.state.maxorder?this.state.maxorder:order.index // for image slider
                        console.log('neworder',neworder)
                        // console.log('imagelist',this.state.imageList)
                        this.selectImage(order.index)
                    }
                }

                // SET DETAILS SHOW
                this.setState({
                    itemselect:item
                })
            }
        }
    }

    isJson=(data)=>{
        try{
            if(data==null||data==''){
                return []
            }
            return JSON.parse(data)
        }catch{
            return []
        }
    }


    renderImageList=()=>{

        return this.state.imageList.map((image,index)=>{
            return (
                <div
                    key={index}
                    
                    style={{
                        flex:`0 0 calc(100%/${slidercount})`,
                        // marginRight:'10px',
                        padding:'1em .25rem 1em .25rem',
                        // paddingRight:'10px',
                        // padding:'2px',
                        // margin:'0',
                        // borderRadius:'4px',
                        // overflow:'hidden',
                        
                }}>
                    <div
                        className={index==this.state.imageselectorder?'product-image selected':'product-image'}
                        
                        style={{
                            width:'100%',
                            paddingTop:'80%',
                            backgroundImage:`url(${APIURL+image})`,
                            backgroundSize:'cover',
                            backgroundPosition:'center',
                            borderRadius:'4px',
                            // border:
                            // index==this.state.imageselectorder?
                            // '1px solid red'
                            // : '0 px'
                        }}
                        onClick={()=>{
                            // console.log(index)
                            // console.log(this.state.imageselectorder)
                            this.setState({
                                imageshow:image,
                                imageselectorder:index,
                            })
                        }}
                    />
                </div>
            )
        })
        
    }
    
    renderTypes=()=>{
        var variant=this.isJson(this.state.product.variant)
        

        return variant.map((val,index)=>{
            if(!val.name){
                return null
            }
            return (
                <Grid.Row key={index} style={{margin:'0em 0 0em'}}>
                    <Grid.Column width={3} style={{display:'flex',alignItems:'center'}}>
                        <Header as={'span'} style={styles.detail}>{titleConstruct(val.name)}</Header>
                    </Grid.Column>
                    <Grid.Column width={13}>
                        {
                            val.types.map((type,j)=>{
                                var focus=this.state.typeselect[index]==type
                                return (
                                    <Button
                                        key={j}
                                        basic
                                        primary={focus}
                                        onClick={()=>{
                                            var select=this.state.typeselect
                                            select[index]=type
                                            // console.log(select)
                                            this.setState({typeselect:select})
                                            this.selectItem()
                                        }}
                                    >
                                        {type}
                                    </Button>
                                )
                            })
                        }
                    </Grid.Column>

                </Grid.Row>
            )
        })
    }

    renderDetails=()=>{
        // if(!this.state.items.length){
        //     return null
        // }
        var priceList=this.state.items.map((item)=>{
            return item.price
        })
        // console.log('price list'+priceList)
        // console.log(Math.max(...priceList))
        
        return (
            <Grid.Row>
                <Grid.Column width={3} style={{display:'flex',alignItems:'center'}}>
                    <Header as={'span'} style={styles.detail}>Harga</Header>
                </Grid.Column>
                <Grid.Column width={13}>
                    <Header as={'span'} style={{fontSize:'18px',opacity:this.state.itemselect.price?'1':'.7'}}>
                        Rp{this.state.itemselect.price?this.state.itemselect.price:Math.max(...priceList)},00
                    </Header>
                </Grid.Column>
            </Grid.Row>
        )
    }

    render() { 
        this.renderImageList()
        const imagecover=this.isJson(this.state.product.imagecover)
        return ( 
            <Container style={{paddingTop:'2em',width:'600px',marginBottom:'4em'}}>

                <Segment style={{width:'100%',paddingBottom:'2em'}}>
                    <Grid>
                        <Grid.Row style={{position:'relative'}}>
                            <Grid.Column width={16} style={{marginBottom:'1em'}}>
                                <Header as={'h2'} style={{letterSpacing:'1px'}}>{titleConstruct(this.state.product.product_name)}</Header>
                            </Grid.Column>
                            <Grid.Column width={16}>
                                <div
                                    style={{
                                        width:'100%',
                                        paddingTop:'75%',
                                        backgroundImage:`url(${APIURL+this.state.imageshow})`,
                                        backgroundSize:'cover',
                                        backgroundPosition:'center',
                                    }}
                                />
                            </Grid.Column>
                            <Grid.Column 
                                width={16} 
                                style={{
                                    // margin:'.5em 0',
                                    // overflow:'hidden',
                                    padding:'0 .75rem'

                                }}
                            >   
                                <div style={{overflowX:'hidden'}}>
                                    
                                    <div style={{
                                        display:'flex',
                                        flexDirection:'row',
                                        // overflow:'hidden',
                                        transform:`translate(${-this.state.order*100/slidercount}%,0)`,
                                        transition:'all .3s ease 0s'
                                    }}>
                                        {this.renderImageList()}

                                    </div>

                                    <Button 
                                        icon='chevron left' 
                                        size='big'
                                        style={{
                                            position:'absolute',
                                            bottom:'70px',
                                            left:'0',
                                            transform:'translate(-0%,50%)',
                                            marginLeft:'.25em',
                                            visibility:this.state.order==0?'hidden':'visible'
                                        }}
                                        onClick={()=>{
                                            this.setState({
                                                order: this.state.order==0?0:this.state.order-1
                                            })
                                        }}
                                    />
                                    <Button 
                                        icon='chevron right' 
                                        size='big'
                                        style={{
                                            position:'absolute',
                                            bottom:'70px',
                                            right:'0',
                                            transform:'translate(0%,50%)',
                                            visibility:this.state.order==this.state.maxorder?'hidden':'visible'
                                        }}
                                        onClick={()=>{
                                            this.setState({
                                                order: this.state.order==this.state.maxorder?this.state.order:this.state.order+1
                                            })
                                        }}
                                    />
                                </div>
                            </Grid.Column>
                        </Grid.Row>

                        {this.renderTypes()}

                        {this.renderDetails()}

                        <Grid.Row>
                            <Grid.Column width={16} style={{display:'flex',alignItems:'center',marginBottom:'.5em'}}>
                                <Header as={'span'} style={styles.detail}>Description</Header>
                            </Grid.Column>
                            {
                                this.state.product.description?
                                <Grid.Column width={16}>
                                    {this.state.product.description}
                                </Grid.Column>
                                : null
                            }
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={3} style={{display:'flex',alignItems:'center'}}>
                                <Header as={'span'} style={styles.detail}>Jumlah</Header>
                            </Grid.Column>
                            <Grid.Column width={13}>
                                
                                <Button
                                    basic
                                    style={{height:'100%',margin:'0 .5em'}}
                                    onClick={()=>{
                                        if(this.state.qty==0||this.state.qty==''||this.state.qty==null||this.state.qty==undefined){
                                            this.setState({qty:0})
                                        }else{
                                            this.setState({qty:this.state.qty-1})
                                        }
                                    }}
                                >
                                    -
                                </Button>
                                <Input
                                    // type='number'
                                    style={{
                                        width:'45px',
                                        // display:'inline-block',
                                        textAlign:'center'
                                    }}
                                    value={this.state.qty}
                                    onChange={(e)=>{
                                        // protection
                                        // integer
                                        var value=Number.isInteger(parseInt(e.target.value))?parseInt(e.target.value):''
                                        // console.log(Number.isInteger(e.target.value))
                                        this.setState({qty:value})
                                    }}
                                />
                                <Button
                                    basic
                                    style={{height:'100%',margin:'0 .5em'}}
                                    onClick={()=>{
                                        if(this.state.qty==''||this.state.qty==null||this.state.qty==undefined){
                                            this.setState({qty:1})
                                        }else{
                                            this.setState({qty:this.state.qty+1})
                                        }
                                    }}
                                >
                                    +
                                </Button>

                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={3} style={{display:'flex',alignItems:'center'}}>
                                <Header as={'span'} style={styles.detail}>Message to Seller</Header>
                            </Grid.Column>
                            <Grid.Column width={13}>
                            <Form>
                                <TextArea 
                                    placeholder='Message (max 200 characters)' 
                                    value={this.state.message}
                                    onChange={(e)=>{
                                        this.setState({message:e.target.value})
                                    }}
                                />
                            </Form>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column style={{height:'50px',display:'flex',justifyContent:'flex-end',alignItems:'center'}}>
                                {
                                    this.state.err?
                                    <Message style={{color:'red',display:'inline-block',margin:'0'}}>
                                        {this.state.err}
                                    </Message>
                                    : null
                                }
                                {
                                    this.props.User.islogin?
                                    <Button
                                        primary
                                        style={{marginLeft:'2em'}}
                                        onClick={this.onAddToCart}
                                    >
                                        Add to Cart
                                    </Button>
                                    :
                                    <Button
                                        primary
                                        style={{marginLeft:'2em'}}
                                        as={Link}
                                        to='/register'
                                    >
                                        Register to purchase
                                    </Button>
                                }

                            </Grid.Column>
                        </Grid.Row>


                    </Grid>
                </Segment>
                
                {
                    this.state.buy?
                    <Message 
                        style={{
                            position:'fixed',
                            top:'50%',
                            left:'50%',
                            transform: 'translate(-50%,-50%)',
                            // color:'green'
                        }}
                        color='blue'
                    >
                        Product is added to the cart <Icon name='check'/>
                    </Message>
                    : null
                }

            </Container>
         );
    }
}

const styles={
    detail:{
        fontSize:'15px',
        color:'rgba(0,0,0,.6)'
    }
}

const MapstatetoProps=(state)=>{
    return {
        User: state.Auth
    }
}

 
export default connect(MapstatetoProps) (Product);