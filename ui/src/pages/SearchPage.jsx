import React, { Component } from 'react';
import { Card, Icon, Image, Select, Dropdown, Input, Button } from 'semantic-ui-react';
import Axios from 'axios';
import {APIURL} from './../supports/ApiUrl'
import _ from 'lodash'

class SearchProducts extends Component {
    state = { 
        products:[],
        searchproducts:[],
        filterKeyword:'',
        page:0,
        cat=0
    }

    componentDidMount(){
        var query=querystring.parse(this.props.location.search)
        console.log(querystring.parse(this.props.location.search))
        Axios.get(`${APIURL}/products/searchproduct?prod=${query.prod}&cat=${query.cat}&page=${query.page}`)
        .then((res)=>{
            this.setState({
                products:res.data.product,
                searchproducts:res.data.product,
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
        { key: 'all', text: 'All', value: 'all' },
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
                product.product_name.toLowerCase().includes(inputName.toLowerCase())                
            )
        })        
        this.setState({searchproducts:dataFilter})
    }
    
    handleSort = (e) => {
        const {prodpriceasc,prodpricedesc, searchproducts } = this.state
            console.log('sorting sorting euy')
            if (e.target.value === 'priceasc') {
                return(
                    // this.setState({
                    // searchproducts: prodpriceasc
                    // })
                    this.setState({
                    searchproducts: _.sortBy(searchproducts, 'price')
                    })
                )
            } else if (e.target.value === 'pricedesc'){
                return(
                    // this.setState({
                    // searchproducts: prodpricedesc
                    // })
                    this.setState({
                        searchproducts: _.sortBy(searchproducts, 'price').reverse()
                        })
                )
            }
    }

    render() { 
        return ( 
            <div style={{display:'flex', flexDirection:'column', alignItems:'center', padding:50 }}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'80%' }}>
                    <div >
                        <Input type='text' placeholder='Filter...' action>
                            <input onChange={this.onChangeSearch} /> &ensp;
                            <Dropdown options={this.filterOptions} style={{width:60}} />
                            {/* <Button type='submit'>Search</Button> */}
                        </Input>
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

            </div>
        );
    }
}
 
export default SearchProducts;