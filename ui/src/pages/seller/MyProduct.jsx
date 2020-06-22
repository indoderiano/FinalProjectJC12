import React, { Component } from 'react';
import SidebarSeller from './componentseller/sidebar';
import { Button, Menu, Icon, Label, Table, Pagination, Input, Grid, Image, Header, Form, TextArea } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';
import SubNavigation from './componentseller/subnavigation';
import _ from 'lodash'
import Axios from 'axios'
import { APIURL } from '../../supports/ApiUrl';


class MyProducts extends Component {
    state = { 
        products:[],
        category:[],
        searchproducts:[],
        activeItem:'',
        column:'',
        direction:''
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

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    onchangesearch=(e)=>{       
        var inputName=e.target.value
        console.log(inputName)
        var dataFilter=this.state.products.filter((product)=>{
            return (
                product.product_name.toLowerCase().includes(inputName.toLowerCase())                
            )
        })        
        this.setState({searchproducts:dataFilter})
    }

    handleSort = (clickedColumn) => () => {
        const { column, searchproducts, direction } = this.state
    
        if (column !== clickedColumn) {
          this.setState({
            column: clickedColumn,
            searchproducts: _.sortBy(searchproducts, [clickedColumn]),
            direction: 'ascending',
          })
    
          return
        }
        this.setState({
          searchproducts: searchproducts.reverse(),
          direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
    }
    
    // onClickCategory= (e) =>{
    //     var kategori=e.target.value
    //     var hasilFilter=this.state.products.filter((val)=>{
    //         if(kategori==='all'){
    //             return this.state.products
    //         }else{
    //             return (
    //                 val.namecategory.toLowerCase().includes(kategori.toLowerCase())                
    //             )
    //         }
    //     })
    //     this.setState({searchproducts:hasilFilter}) 
    // }
  

    // === Handle Table ===
    renderProducts=()=>{
        const {searchproducts}=this.state
        console.log(searchproducts)
        if(this.state.searchproducts.length){
            return searchproducts.map((val, index)=>{
                return (
                        <Grid.Row style={{backgroundColor:index%2===0?'white':'#f5deb3'}} >
                            <Grid.Column width={1}>
                                {index+1} 
                            </Grid.Column>
                            <Grid.Column width={2}>
                                <Image src={APIURL+ JSON.parse(val.imagecover)[0]} style={{height:'150px' }}/>
                            </Grid.Column>
                            <Grid.Column width={2}>
                                <Header as={'h4'}>
                                    {val.product_name}
                                </Header>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <p>
                                {val.description}
                                </p>
                            </Grid.Column>
                            <Grid.Column width={2}>
                                {val.price}
                            </Grid.Column>
                            <Grid.Column width={2}>
                                {val.stock}
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Button 
                                    primary 
                                    style={{margin:'0 .5em .5em 0'}}
                                    onClick={()=>{this.setState({idproductedit:1})}}
                                >Edit</Button>
                                <Button color='red'>Delete</Button>
                            </Grid.Column>
                        </Grid.Row>
                    // </Grid>
                )
            })
        }else{
            return(
                   <center> <h3 style={{color:'red'}}>Empty Product!!! You have not input any product. </h3></center> 
                
            )
        }
    }

    
    render() { 
        const { activeItem, column, direction } = this.state
        return ( 
            
            <div  style={{display:'flex', paddingTop:50}}>
                <div>
                    <SidebarSeller/>
                </div>
                <div style={{backgroundColor:'#f6f6f6',padding: 10, width:'80%', display:'flex', flexDirection:'column'}}>
                    <div style={{backgroundColor:'#fff', marginBottom:20}}>
                        <Menu pointing secondary>
                            <Menu.Item
                                name='all'
                                active={activeItem === 'all'}
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name='live'
                                active={activeItem === 'live'}
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name='soldout'
                                active={activeItem === 'soldout'}
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name='blocked'
                                active={activeItem === 'blocked'}
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name='archived'
                                active={activeItem === 'archived'}
                                onClick={this.handleItemClick}
                            />
                        </Menu>
                    </div>
                    <div style={{marginBottom: 20,}} >
                        <Input
                            action='Search'
                            placeholder='Search Products...'
                            onChange={this.onchangesearch}
                        />
                        <Input
                            action='Search'
                            placeholder='Search Products...'
                            onChange={this.onchangesearch}
                        />
                    </div>
                    <div style={{paddingTop:'50px'}}>
                        <Grid style={{paddingLeft: 10, paddingRight: 10,}}>
                            <Grid.Row style={{border:'1px solid gray',borderRadius:'5px', backgroundColor:'white',}}>
                                <Grid.Column width={1}>
                                    No
                                </Grid.Column>
                                <Grid.Column width={2}>
                                    Image
                                </Grid.Column>
                                <Grid.Column width={2}
                                sorted={column === 'product_name' ? direction : null}
                                onClick={this.handleSort('product_name')}>
                                    Name<Icon name={direction==='ascending'&&column=='product_name'?'angle double down':'angle double up'} />
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    Description
                                </Grid.Column>
                                <Grid.Column width={2}
                                sorted={column === 'price]' ? direction : null}
                                onClick={this.handleSort('price')}>
                                    Price <Icon name={direction==='ascending'&&column=='price'?'angle double down':'angle double up'} />
                                </Grid.Column>
                                <Grid.Column width={2}>
                                    Stock
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    Action
                                </Grid.Column>
                            </Grid.Row>

                            {
                                this.state.idproductedit?
                                <Grid.Row style={{border:'1px solid gray',borderRadius:'5px'}}>
                                    <Grid.Column width={1}>
                                        1
                                    </Grid.Column>
                                    <Grid.Column width={3}>
                                        <Image src={this.state.imageEdit}/>
                                        <Input 
                                            placeholder='image...' 
                                            style={{width:'100%'}}
                                            onChange={(e)=>{this.setState({imageEdit:e.target.value})}}
                                        />
                                    </Grid.Column>
                                    <Grid.Column width={2}>
                                        <Header as={'h4'}>
                                            <Input
                                                placeholder='Product Name'
                                                style={{width:'100%'}}
                                                value=''
                                                onChange={(e)=>{this.setState({productNameEdit:e.target.value})}}
                                            />
                                        </Header>
                                    </Grid.Column>
                                    <Grid.Column width={3}>
                                        <Form>
                                            <TextArea 
                                                placeholder='Tell us more' 
                                                style={{width:'100%'}}
                                                value=''
                                                onChange={(e)=>{this.setState({descriptionEdit:e.target.value})}}
                                            />
                                        </Form>
                                    </Grid.Column>
                                    <Grid.Column width={2}>
                                        Rp70000,00
                                    </Grid.Column>
                                    <Grid.Column width={2}>
                                        30
                                    </Grid.Column>
                                    <Grid.Column width={3}>
                                        <Button 
                                            primary 
                                            style={{margin:'0 .5em .5em 0'}}
                                            onClick={()=>{this.setState({idproductedit:1})}}
                                        >Edit</Button>
                                        <Button color='red'>Delete</Button>
                                    </Grid.Column>
                                </Grid.Row>
                                :
                               
                                this.renderProducts()
                            }
                        </Grid>
                    </div>
                </div>

            </div>
         );
    }
}
 
export default MyProducts;