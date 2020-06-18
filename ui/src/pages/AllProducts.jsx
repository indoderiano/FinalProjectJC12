import React, { Component } from 'react';
import { Card, Icon, Image, Select, Dropdown, Input, Button, Pagination, PaginationProps, Pag } from 'semantic-ui-react';
import Axios from 'axios';
import querystring from 'query-string'
import {APIURL} from './../supports/ApiUrl';
import _ from 'lodash'
import { Link, NavLink } from 'react-router-dom';

class AllProducts extends Component {
    state = { 
        products:[],
        searchproducts:[],
        filterKeyword:'all',
        currentPage:1,
        allproduct:[],
        activePage:0,
        prodpriceasc:[],
        prodpricedesc:[]


    }

    componentDidMount(){
    //     var query=querystring.parse(this.props.location.search)
    //     console.log(querystring.parse(this.props.location))
    console.log(this.state.currentPage,'dididi')
        Axios.get(`${APIURL}/products/allproducts`, {
            params:{
                page:this.state.currentPage
        }})
        .then((res)=>{ 
            console.log(this.state.currentPage,'welehweleh')
            this.setState({
                products:res.data.product,
                searchproducts:res.data.product,
                allproduct:res.data.allproduct,
                prodpriceasc:res.data.priceasc,
                prodpricedesc:res.data.pricedesc
            })    
        }).catch((err)=>{
            console.log(err)
        })
    }
    
  

    onLoad=()=>{
        this.setState({
            currentPage:this.state.currentPage+1
        })
        console.log(this.state.currentPage, 'mimi')
        Axios.get(`${APIURL}/products/allproducts`, {
            params:{
                page:this.state.currentPage+1
        }})
        .then((res)=>{ 
            console.log(this.state.currentPage,'welehweleh')
            this.setState({
                products:res.data.product,
                searchproducts:res.data.product,
                allproduct:res.data.allproduct
            })    
        }).catch((err)=>{
            console.log(err)
        })
    }

    onMinLoad=()=>{
        this.setState({
            currentPage:this.state.currentPage-1
        })
        console.log(this.state.currentPage, 'mimi')
        Axios.get(`${APIURL}/products/allproducts`, {
            params:{
                page:this.state.currentPage-1
        }})
        .then((res)=>{ 
            console.log(this.state.currentPage,'welehweleh')
            this.setState({
                products:res.data.product,
                searchproducts:res.data.product,
                allproduct:res.data.allproduct
            })    
        }).catch((err)=>{
            console.log(err)
        })
    }

    handlePaginationChange = (e, { activePage }) => {
        // e.preventDefault()
        this.setState({currentPage: activePage })
        console.log(this.state.activePage,'YATUHAN INI NGAPA DAH')
        Axios.get(`${APIURL}/products/allproducts`, {
            params:{
                page:activePage
        }})
        .then((res)=>{ 
            console.log(this.state.currentPage,'welehweleh')
            this.setState({
                // currentPage: activePage, 
                products:res.data.product,
                searchproducts:res.data.product,
                allproduct:res.data.allproduct,
        // activePage:(res.data.priceasc.length/3)
            }) 
               
        }).catch((err)=>{
            console.log(err)
        })
       
    }

    renderCardProduct=()=>{
        console.log(this.state.searchproducts)        
        if(this.state.searchproducts.length){
            return this.state.searchproducts.map((val,index)=>{
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

    filterOptions = [
        { key: 'all', text: 'All', value: 'all'},
        { key: 'namecategory', text: 'Category', value: 'namecategory' },
        { key: 'product_name', text: 'Product Name', value: 'product_name' },
      ]

    onChangeSearch=(e)=>{    
        // if(){
            
        // }   
        var inputName=e.target.value
        console.log(inputName)
        var dataFilter=this.state.products.filter((product)=>{
            return (
                product.product_name.toLowerCase().includes(inputName.toLowerCase()) ||
                product.namecategory.toLowerCase().includes(inputName.toLowerCase())              
            )
        })        
        this.setState({searchproducts:dataFilter})
    }
    
    handleSort = (e) => {
        const {prodpriceasc,prodpricedesc, searchproducts } = this.state
            console.log('sorting sorting euy')
            if (e.target.value === 'priceasc') {
                return(
                    this.setState({
                    searchproducts: prodpriceasc
                    })
                    // this.setState({
                    // searchproducts: _.sortBy(searchproducts, 'price')
                    // })
                )
            } else if (e.target.value === 'pricedesc'){
                return(
                    // this.setState({
                    // searchproducts: prodpricedesc
                    // })
                    this.setState({
                        searchproducts: _.sortBy(prodpriceasc, 'price').reverse()
                    })
                )
            }
    }

    // onPageChange=()=>{
    //     this.setState({page=})
    // }

    render() { 
        const {allproduct, currentPage,activePage}=this.state
        const url='http://localhost:3000/allproducts'
        return ( 
            <div style={{display:'flex', flexDirection:'column', alignItems:'center', padding:50 }}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'80%' }}>
                    <div >
                        <Input icon='search' placeholder='Search...' onChange={this.onChangeSearch} />
                        {/* <Input type='text' placeholder='Filter...' action>
                            <input onChange={this.onChangeSearch} /> &ensp;
                            <Dropdown options={this.filterOptions} style={{width:120}}  />
                            <Button type='submit'>Search</Button>
                        </Input> */}
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
                        {/* <a href={`${url}?page=${currentPage}`} > */}
                        <NavLink to={`/allproducts?page=${activePage}`}>
                            <Pagination
                                activePage={currentPage}
                                ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                                firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                                lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                                prevItem={{ content: <Icon name='angle left' />, icon: true, onClick:this.onMinLoad, disabled:currentPage===1 }}
                                nextItem={{ content: <Icon name='angle right' />,icon: true, onClick:this.onLoad, disabled:currentPage===Math.ceil(allproduct.length/5) }}
                                // pageItem={{ content: <Link to={`http://localhost:3000/allproducts?page=${currentPage}`} /> }}
                                totalPages={Math.ceil(allproduct.length/5)}
                                onPageChange={this.handlePaginationChange}   
                            />

                        </NavLink>
                        {/* </a>                */}

                    </center>
                </div>
            </div>
        );
    }
}
 
export default AllProducts;