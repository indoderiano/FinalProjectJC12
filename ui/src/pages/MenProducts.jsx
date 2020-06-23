import React, { Component } from 'react';
import { Card, Icon, Image,  Input } from 'semantic-ui-react';
import Axios from 'axios';
import {APIURL} from './../supports/ApiUrl';
import _, { orderBy } from 'lodash'
import { Link, NavLink } from 'react-router-dom';
import Search from '../component/Search';

class MenProducts extends Component {
    state = { 
        isloading:false,
        products:[],
        page:0,
        totalProduct:0,
        cardperPage:1,                   //jumlah card per page
        currentPage:0,
        searchKeyword:''
    }

    componentDidMount(){
        console.log('masuk componentDidMount')
        this.getData()
    }
    
    getData=(search,filter)=>{
        Axios.get(  
            search?`${APIURL}/products/totalproduct?search=${search}`:
            `${APIURL}/products/totalproduct`,{}
        ).then((res)=>{
            this.setState({totalProduct:res.data.total})
            Axios.get(search?`${APIURL}/products/allproducts?search=${search}&page=${this.state.page}`:
                    `${APIURL}/products/allproducts?page=${this.state.page}`
                ).then((res1)=>{
                    this.setState({products:res1.data, isLoading:false})
                    console.log(this.state.products, 'ALLPRODUCT')
                }).catch((err)=>{
                    console.log(err)
                })
        }).catch((err)=>{
            console.log(err)
        })
    }

    getpaginationdata=(val)=>{
        this.setState({
            page:val*this.state.cardperPage,        //dikali jumlah card per page
            currentPage:val===0?1:val,
            isLoading:true}, function(){
            this.getData(this.state.searchKeyword)
        })
        console.log(val,this.state.page, 'LINE50')
    }

    renderpagination=()=>{
        console.log('masuk pagination')
        var {cardperPage,totalProduct,currentPage}=this.state
        var totalpage = Math.ceil(totalProduct/cardperPage)
        var arr=[]
        for ( var i = 0; i < totalpage; i++){
            arr.push(i)
        }
        return arr.map((val,index)=>{
            return(
                <div className="pagination p8" style={{backgroundColor:val===(currentPage)?'#f8e211':null}} key={index} onClick={()=>this.getpaginationdata(val)}>                    
                    <p>{val+1}</p>
                </div>
            )
        })
    }   

    onChangeSearch=(e)=>{    
        var search=e.target.value
        this.setState(
            {page:0, searchKeyword:search}
        )
        this.getData(search)
    }
    
    handleSort = (e) => {
        const {products } = this.state
            console.log('sorting sorting euy')
            if (e.target.value === 'priceasc') {
                return(
                    this.setState({
                    products: _.sortBy(products, 'price')
                    })
                )
            } else if (e.target.value === 'pricedesc'){
                return(
                    this.setState({
                        products: _.sortBy(products, 'price').reverse()
                    })
                )
            }
    }

    renderCardProduct=()=>{      
        if(this.state.products.length){
            return this.state.products.map((val,index)=>{
                return (                  
                    <div key={index} style={{width:'22%', marginLeft:12, marginRight:12, marginBottom:20}}>
                        <Link to={`/product/${val.idproduct}`}>
                            <Card raised style={{ paddingTop:5, height:'100%'}}>
                                <a style={{alignSelf:'center'}}>
                                    <Image src={APIURL+ JSON.parse(val.imagecover)[0]} style={{height:'150px' }}/>

                                </a>
                                <Card.Content style={{borderColor: 'transparent',}} >
                                <Card.Header style={{display:'block', overflow: 'hidden',}}>{val.product_name}</Card.Header>
                                <Card.Meta>PRIA/WANITA</Card.Meta>
                                <Card.Description >
                                    Rp.{val.price}.-
                                </Card.Description>
                                </Card.Content>
                                <Card.Content style={{textAlign:'center',alignSelf:'center'}} extra>
                                <a style={{fontSize:'20px', width:'100%'}} >
                                    <Icon name='cart' />
                                    Detail
                                </a>
                                </Card.Content>
                            </Card>
                        </Link>
                    </div>
                )
            })
        }else{
            return (
                <div>
                    <h2 style={{color:'red'}}>Sorry! Empty Result!</h2>
                </div>
            )
        }
    }


    render() { 
        const {totalProduct, page, cardperPage}=this.state

        return ( 
            <div style={{ padding:20}} >
                <div style={{
                    backgroundImage:'linear-gradient(45deg, rgba(250,248,237,1) 0%, rgba(139,223,226,1) 46%)',
                    display:'flex', 
                    justifyContent:'space-between', 
                    height:400
                    }}>
                    <p style={{
                        fontSize:'100px', textAlign:"center", 
                        letterSpacing:'8px', textTransform:'uppercase',fontWeight:'100',
                        fontFamily:'Leckerli One', paddingLeft:100}}>
                         Men <br/> Collection </p>
                    <Image src='/images/men-header3.png' style={{marginRight: 100, height:'400px'}} />
                </div>
                <div style={{display:'flex', flexDirection:'column', alignItems:'center', padding:50 }}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'80%' }}>
                        <div >
                            {/* <Search /> */}
                            <Input label="Search" labelPosition='right' placeholder='Search Product' onChange={this.onChangeSearch} />
                            <br/>
                            <p style={{color:'blue'}}>Hasil pencarian: &ensp;
                            <span style={{fontSize:16, fontWeight:'bolder'}}>{this.state.totalProduct}</span> 
                            &ensp; product</p>
                        </div>
                        <div style={{fontSize:20, fontWeight:'3px'}}>
                            {this.state.searchKeyword?
                            `Search for: ${this.state.searchKeyword}`
                            :
                            null}
                        </div>
                    </div>
                    <div style={{display:'flex', flexWrap:'wrap',  padding:20, width:'80%'}}>
                        {this.renderCardProduct()}
                    </div>
                    <div style={{padding:0, textAlign:'center',display:'flex'}}>
                        Total Product={totalProduct}
                        <div className="pagination p8">
                            <Icon name='angle left' disabled={this.state.page===0} onClick={()=>this.getpaginationdata((page/cardperPage)-1)} />                                
                        </div>
                        {this.renderpagination()}
                        <div className="pagination p8">
                            <Icon name='angle right' disabled={Math.ceil(totalProduct/cardperPage)===(page/cardperPage)+1} onClick={()=>this.getpaginationdata((page/cardperPage)+1)} />                             
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default MenProducts;


