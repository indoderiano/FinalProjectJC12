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
    Divider
} from 'semantic-ui-react'
import {Redirect} from 'react-router-dom'



class ProductItems extends Component {
    state = { 
        items:[],
        editid:0,
        price:0,
        stock:0,
        image:[],

        deleteimageiditem:-1,
        deleteimageindex:-1,

        errorimage:''
    }

    componentDidMount=()=>{
        this.getItems()
    }
    
    getItems=()=>{
        Axios.get(`${APIURL}/items?idproduct=${this.props.match.params.idproduct}`)
        .then((res)=>{
            console.log(res.data)
            this.setState({items:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    onAddPhoto=(iditem,oldimage)=>{

        if(this.state.image.length>5){
            // error message
            this.setState({errorimage:'Jumlah upload image tidak bisa lebih dari 5'})
        }else{
            console.log('add image')

            var formdata=new FormData()
    
            for(var image of this.state.image){
                formdata.append('photo',image)
            }
    
            formdata.append('data',oldimage)
    
            Axios.put(`${APIURL}/items/image/${iditem}`,formdata,{
                headers:{
                    'Content-Type': `undefined`
                }
            }).then((res)=>{
                console.log('berhasil update item')
                this.setState({image:[]})
                document.getElementById(iditem).value=''
                this.getItems()
            }).catch((err)=>{
                console.log(err)
            })
        }


    }

    onDeletePhoto=(iditem,index,oldimage)=>{

        Axios.put(`${APIURL}/items/image/${iditem}/${index}`,oldimage)
        .then((res)=>{
            console.log('berhasil delete image')
            this.getItems()
        }).catch((err)=>{
            console.log(err)
        })
    }

    onSubmit=()=>{

        var edit={
            price:this.state.price,
            stock:this.state.stock
        }

        Axios.put(`${APIURL}/items/${this.state.editid}`,edit)
        .then((res)=>{
            console.log('berhasil update item')
            this.setState({editid:0,stock:0,price:0})
            this.getItems()
        }).catch((err)=>{
            console.log(err)
        })

        // Axios.put(`${APIURL}/items/${this.state.editid}`,edit)
        // .then((res)=>{
        //     console.log('berhasil update item')
        //     this.setState({editid:0,stock:0,price:0})
        //     this.getItems()
        // }).catch((err)=>{
        //     console.log(err)
        // })
    }

    renderItems=()=>{
        const isJson=(data)=>{
            try{
                if(data==null||data==''){
                    return []
                }
                return JSON.parse(data)
            }catch{
                return data
            }
        }
        return this.state.items.map((item,index)=>{

            const type=isJson(item.type)
            const image=isJson(item.image)
            // console.log(type)
            return (
                <Segment key={index} style={{width:'100%'}}>
                    <Grid>
                    <Grid.Row>
                            <Grid.Column width={16}>
                                <Header as={'h4'} style={{width:'100%'}}>Type</Header>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                {
                                    type.length?
                                    type.map((itemtype,index)=>{
                                        return (
                                            <span key={index} style={{margin:'0 .5em 0 0',padding:'0'}}>{itemtype?itemtype:'no type'}</span>
                                        )
                                    })
                                    :
                                    <span key={index} style={{margin:'0 .5em 0 0',padding:'0'}}>no type</span>
                                }
                            </Grid.Column>
                        </Grid.Row>
                        
                        <Grid.Row style={{paddingBottom:'0'}}>
                            <Grid.Column width={16}>
                                <Header as={'h4'} style={{width:'100%',marginBottom:'.5em'}}>Images</Header>
                            </Grid.Column>
                        </Grid.Row>
                          
                        <Grid.Row style={{padding:'0 1rem'}}>
                            {/* <Grid.Column 
                                width={16} 
                                style={{
                                    marginBottom:'1em',
                                    display:'flex',
                                    flexDirection:'row',
                                    alignItems:'flex-end',
                                    flexWrap:'wrap'
                                }}
                            > */}
                                {
                                    Array.isArray(image)&&image.length?
                                    image.map((path,index)=>{
                                        return (
                                                
                                            // <div
                                            //     key={index}
                                            //     style={{
                                            //         // width:'25%',
                                            //         display:'inline-block',
                                            //         textAlign:'center',
                                            //         padding:'.5em 1em .5em 0',
                                            //         display:'flex',
                                            //         flexBasis:'25%',
                                            //         // flexDirection:'row'
                                            //     }}
                                            // >   
                                            <Grid.Column key={index} width={4} style={{padding:'.5em 1em .5em 0'}}>
                                                <Segment style={{padding:'.5em',width:'100%',textAlign:'center'}}>
                                                    <div 
                                                        style={{
                                                            paddingTop:'80%',
                                                            backgroundImage:`url('${APIURL+path}')`,
                                                            backgroundSize:'cover',
                                                            backgroundPosition:'center',
                                                            marginBottom:'1em'
                                                        }}
                                                    />
                                                    {
                                                        item.iditem===this.state.deleteimageiditem&&index===this.state.deleteimageindex?
                                                        <Button 
                                                            basic
                                                            onClick={()=>{this.onDeletePhoto(item.iditem,index,image)}}
                                                        >
                                                            Confirm
                                                        </Button>
                                                        :
                                                        <Button 
                                                            basic
                                                            onClick={()=>{this.setState({deleteimageiditem:item.iditem,deleteimageindex:index})}}
                                                        >
                                                            Remove
                                                        </Button>

                                                    }
                                                </Segment>
                                            </Grid.Column>
                                            // </div>
                                        )
                                    })
                                    :
                                    <>
                                    <Grid.Column key={index} width={4} style={{padding:'.5em 1em .5em 0'}}>
                                        <Segment style={{padding:'.5em',width:'100%',textAlign:'center'}}>
                                            <div 
                                                style={{
                                                    paddingTop:'80%',
                                                    backgroundImage:`url(https://react.semantic-ui.com/images/wireframe/image.png)`,
                                                    backgroundSize:'cover',
                                                    backgroundPosition:'center',
                                                    marginBottom:'1em'
                                                }}
                                            />
                                            <Button basic disabled>No Images</Button>
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column width={4} style={{padding:'.5em 1em .5em 0'}}>
                                        <Message style={{height:'100%'}}>
                                            if no image uploaded, cover image(s) will be shown 
                                        </Message>
                                    </Grid.Column>
                                    </>
                                }


                                {/* ADD PHOTO */}
                                {/* <div
                                    style={{
                                        width:'25%',
                                        display:'inline-block',
                                        textAlign:'center',
                                        padding:'.5em 1em .5em 0',
                                        display:'flex',
                                        flexDirection:'row'
                                    }}
                                >   
                                    <Segment style={{padding:'.5em',width:'100%'}}>
                                        <div 
                                            style={{
                                                paddingTop:'80%',
                                                backgroundImage:`url(https://react.semantic-ui.com/images/wireframe/image.png)`,
                                                backgroundSize:'cover',
                                                backgroundPosition:'center',
                                                marginBottom:'1em'
                                            }}
                                        />
                                        <Button basic primary>Add</Button>
                                    </Segment>
                                </div> */}
                            {/* </Grid.Column> */}

                            <Grid.Column width={16} style={{margin:'1em 0',padding:'0'}}>
                                <Input 
                                    type='file'
                                    id={item.iditem}
                                    multiple
                                    style={{marginRight:'1em'}}
                                    onChange={(e)=>{
                                        if(e.target.files){
                                            console.log(e.target.files)
                                            this.setState({image:e.target.files})
                                        }
                                    }}
                                />
                                <Button
                                    basic
                                    primary
                                    style={{height:'100%'}}
                                    onClick={()=>{this.onAddPhoto(item.iditem,item.image)}}
                                >
                                    Add
                                </Button>
                            </Grid.Column>
                            {
                                this.state.errorimage?
                                <Grid.Column width={16}>
                                    <span style={{color:'red'}}>{this.state.errorimage}</span>
                                </Grid.Column>
                                : null
                            }
                        </Grid.Row>

                        <Divider />
                            
                            {
                                item.iditem===this.state.editid?
                                <Grid.Row>
                                    <Grid.Column width={16} style={{marginBottom:'1em'}}>
                                        <Header as={'h4'} style={{width:'100%'}}>Details</Header>
                                    </Grid.Column>
                                    <Grid.Column width={16} style={{marginBottom:'1em'}}>
                                        <Input
                                            placeholder='Price'
                                            value={this.state.price}
                                            onChange={(e)=>{this.setState({price:e.target.value})}}
                                        />
                                    </Grid.Column>
                                    <Grid.Column width={16} style={{marginBottom:'1em'}}>
                                        <Input
                                            placeholder='Stock'
                                            value={this.state.stock}
                                            onChange={(e)=>{this.setState({stock:e.target.value})}}
                                        />
                                    </Grid.Column>
                                    
                                    <Grid.Column width={16} style={{textAlign:'right'}}>
                                        <Button
                                            primary
                                            // style={{marginLeft:'auto'}}
                                            onClick={this.onSubmit}
                                        >
                                            Save  
                                        </Button>
                                        <Button
                                            color='red'
                                            // style={{marginLeft:'auto'}}
                                            onClick={()=>{this.setState({
                                                editid:0,
                                                price:0,
                                                stock:0
                                            })}}
                                        >
                                            No
                                        </Button>
                                    </Grid.Column>
                                </Grid.Row>
                                :
                                <Grid.Row>
                                    <Grid.Column width={16} style={{marginBottom:'1em'}}>
                                        <Header as={'h4'} style={{width:'100%'}}>Details</Header>
                                    </Grid.Column>
                                    <Grid.Column width={16} style={{marginBottom:'1em'}}>
                                        <span >Harga:</span>
                                        <span style={{fontWeight:600,marginLeft:'.5em'}}>{item.price?item.price:'Not Yet'}</span>
                                    </Grid.Column>
                                    <Grid.Column width={16} style={{marginBottom:'1em'}}>
                                        <span >Stock:</span>
                                        <span style={{fontWeight:600,marginLeft:'.5em'}}>{item.stock?item.stock:'Not Yet'}</span>
                                    </Grid.Column>
                                    
                                    <Grid.Column width={16} style={{textAlign:'right'}}>
                                        <Button
                                            primary
                                            // style={{marginLeft:'auto'}}
                                            onClick={()=>{this.setState({
                                                editid:item.iditem,
                                                price:item.price?item.price:'',
                                                stock:item.stock?item.stock:''
                                            })}}
                                        >
                                            Edit    
                                        </Button>
                                    </Grid.Column>
                                </Grid.Row>
                            }

                    </Grid>
                </Segment>
            )
                
        })
    }

    render() { 
        return ( 
            <Container style={{paddingTop:'2em',width:'650px'}}>

            <Header 
                as={'h1'}
                style={{marginBottom:'1em'}}
            >
                {this.state.items[0]?this.state.items[0].product_name:'Product Name'}
            </Header>

            {/* <Segment>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            asdfsdaf
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment> */}

            {this.renderItems()}
            
                
            <Grid style={{marginBottom:'3em'}}>


            </Grid>
            </Container>
         );
    }
}
 
export default ProductItems;