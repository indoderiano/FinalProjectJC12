import React, { Component } from 'react';
import { Card, Icon, Image, Select, Dropdown, Input, Button, Pagination, PaginationProps, Pag, FormInput } from 'semantic-ui-react';
import Axios from 'axios';
import querystring from 'query-string'
import {APIURL} from './../supports/ApiUrl';
import _, { orderBy } from 'lodash'
import { Link, NavLink } from 'react-router-dom';
import Search from '../component/Search';

class AllProducts extends Component {
    state = { 
        isloading:false,
        products:[],
        page:1,
        totalProduct:0
    }

    componentDidMount(){
    console.log('masuk componentDidMount')
        this.getData()
        console.log(this.state.totalProduct)
    }
    
    getData=(search,filter)=>{
        Axios.get(  
            search?`${APIURL}/products/totalproduct?search=${search}`:
            `${APIURL}/products/totalproduct`
        ).then((res)=>{
            this.setState({totalProduct:res.data.total})
            Axios.get(/*this.state.page? */
                    search?`${APIURL}/products/allproducts?search=${search}&page=${this.state.page}`:
                    `${APIURL}/products/allproducts?page=${this.state.page}`
                    // :search?`${APIURL}/products/allproducts?search=${search}&page=${this.state.page}`:
                    // `${APIURL}/products/allproducts?page=${1}`

                ).then((res1)=>{
                    // window.scrollTo(0,0)
                    this.setState({products:res1.data, isLoading:false})
                    console.log(this.state.page, 'HALAMAN')
                }).catch((err)=>{
                    console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    getpaginationdata=(val)=>{
        this.setState(
            {page:val*4, 
            isLoading:true}, 
            this.getData()
        )
        console.log(val,this.state.page, 'LINE50')
    }

    onLoad=()=>{
        if(this.state.page===0){
            this.setState(
                {page:this.state.page+3,
                isloading:true },
                this.getData()
            )
        }else{
            this.setState(
                {page:this.state.page+1,
                isloading:true },
                this.getData()
            )
        }
    }

    onMinLoad=()=>{
        console.log(this.state.page, 'mimi')
        this.setState(
            {page:this.state.page-1,
            isloading:true },
            this.getData()
        )
    }

    handlePaginationChange = (e, { activePage }) => {
        // e.preventDefault()
        this.setState(
            {
                page:activePage, 
                isloading:true 
            },
            this.getData()
        )
    }

    renderCardProduct=()=>{      
        if(this.state.products.length){
            return this.state.products.map((val,index)=>{
                return (                  
                    <div key={index} style={{width:'22%', marginLeft:12, marginRight:12, marginBottom:20}}>
                        <Card raised style={{ paddingTop:5, height:'100%'}}>
                            <a style={{alignSelf:'center'}}>
                                <Image src={val.imagecover} style={{height:'150px' }}/>
                            </a>
                            <Card.Content style={{borderColor: 'transparent',}} >
                            <Card.Header style={{display:'block', overflow: 'hidden',}}>{val.product_name}</Card.Header>
                            <Card.Meta>{val.namecategory}</Card.Meta>
                            <Card.Description >
                                {val.price}
                            </Card.Description>
                            </Card.Content>
                            <Card.Content style={{textAlign:'center',alignSelf:'center'}} extra>
                            <a style={{fontSize:'20px', width:'100%'}} >
                                <Icon name='cart' />
                                Detail
                            </a>
                            </Card.Content>
                        </Card>
                    </div>
                )
            })
        }else{
            return (
                <div>
                    <h2 style={{color:'red'}}>Maaf! Produk yang kamu cari tidak ada dalam list kami.</h2>
                </div>
            )
        }
    }


    onChangeSearch=(e)=>{    
        var search=e.target.value
        this.setState(
            // {page:1},
            this.getData(search)
        )
    }
    
    handleSort = (e) => {
        const {prodpriceasc,prodpricedesc, searchproducts } = this.state
            console.log('sorting sorting euy')
            if (e.target.value === 'priceasc') {
                return(
                    this.setState({
                    searchproducts: prodpriceasc
                    // directionBy:'asc',
                    // orderBy:'p.price'
                    })
                    // this.setState({
                    // searchproducts: _.sortBy(prodpriceasc, 'price')
                    // })
                )
            } else if (e.target.value === 'pricedesc'){
                return(
                    this.setState({
                    searchproducts: prodpricedesc
                    })
                    // this.setState({
                    //     searchproducts: _.sortBy(prodpriceasc, 'price').reverse(),
                    //     // directionBy:'desc',
                    //     // orderBy:'p.price'
                    // })
                )
            }
    }

    render() { 
        const {totalProduct, page}=this.state
        return ( 
            <div style={{display:'flex', flexDirection:'column', alignItems:'center', padding:50 }}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'80%' }}>
                    <div >
                        {/* <Search /> */}
                        <Input label="Search" labelPosition='right' placeholder='Search Product' onChange={this.onChangeSearch} />
                    </div>
                    <div style={{textAlign:'right', width:'80%', float:'right', marginBottom: '20px',}}>
                        Sorted By &ensp;
                        <select button placeholder='Sort By' onChange={this.handleSort} >
                            <option value='priceasc'>Harga Terendah</option>
                            <option value='pricedesc'>Harga Tertinggi</option>
                        </select>
                    </div>
                </div>
                <div style={{display:'flex', flexWrap:'wrap',  padding:20, width:'80%'}}>
                    {this.renderCardProduct()}
                </div>
                <div>
                    <center> 
                       
                        {/* <NavLink to={`/allproducts?page=${currentPage}`}> */}
                            <Pagination
                                activePage={page}
                                ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                                firstItem={null}
                                lastItem={null}
                                prevItem={{ content: <Icon name='angle left' />, icon: true, onClick:this.onMinLoad, disabled:page===0 }}
                                nextItem={{ content: <Icon name='angle right' />,icon: true, onClick:this.onLoad , disabled:((page/4)+1)===Math.ceil(totalProduct/4) }}
                                // prevItem={{ content: <Icon name='angle left' />, icon: true, onClick:()=>{this.getpaginationdata((page/4)-1)}, disabled:page===0 }}
                                // nextItem={{ content: <Icon name='angle right' />,icon: true, onClick:()=>{this.getpaginationdata((page/4)+1)} , disabled:((page/4)+1)===Math.ceil(totalProduct/4) }}
                                // pageItem={{ content: <Link to={`http://localhost:3000/allproducts?page=${currentPage}`} /> }}
                                totalPages={Math.ceil(totalProduct/4)}
                                // onPageChange={(activePage)=>this.getpaginationdata(activePage)}   
                                onPageChange={this.handlePaginationChange}   
                            />

                        {/* </NavLink> */}

                    </center>
                </div>
            </div>
        );
    }
}
 
export default AllProducts;