import React, { Component } from 'react';
import SidebarSeller from './componentseller/sidebar';
import { Button, Menu, Icon, Label, Table, Pagination, Input } from 'semantic-ui-react'
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
    
    componentDidMount=()=>{
        Axios.get(`${APIURL}/products/productseller`)
        .then((res)=>{
            this.setState({
                products:res.data.product,
                searchproducts:res.data.product,
                category:res.data.category,
            })
            console.log(res.data)
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
            return searchproducts.map((val)=>{
                return (
                    <Table.Row >
                        <Table.Cell style={{flexDirection: 'column',}}>
                            <img src={val.imagecover} alt={val.product_name}  height='100px' />
                            <div>
                                <strong>{val.product_name}</strong><br/>
                                {val.namecategory}
                            </div>
                        </Table.Cell>
                        <Table.Cell><center><img src={val.imagecover} alt={val.product_name}  height='100px' /></center> </Table.Cell> 
                        <Table.Cell>{val.namecategory}</Table.Cell>
                        <Table.Cell>{val.price}</Table.Cell>
                        <Table.Cell>{val.stock}</Table.Cell>
                        <Table.Cell>jumlah terjual</Table.Cell>
                        <Table.Cell>
                            {val.isarchived==0?'LIVE':'ARCHIVED'}
                        </Table.Cell>
                    </Table.Row>
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
                <div style={{backgroundColor:'#f6f6f6',padding: 10, width:'80%'}}>
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
                    <div style={{overflowX:"auto"}} >
                        <Input
                            action='Search'
                            placeholder='Search Products...'
                            onChange={this.onchangesearch}
                        />
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell 
                                        sorted={column === 'product_name' ? direction : null}
                                        onClick={this.handleSort('product_name')}
                                    >
                                        Name
                                    </Table.HeaderCell>
                                    <Table.HeaderCell >
                                        Image
                                    </Table.HeaderCell>
                                    <Table.HeaderCell
                                        sorted={column === 'namecategory' ? direction : null}
                                        onClick={this.handleSort('namecategory')}
                                    >
                                        Category
                                    </Table.HeaderCell>
                                    <Table.HeaderCell
                                         sorted={column === 'price' ? direction : null}
                                        onClick={this.handleSort('price')}
                                    >
                                        Price
                                    </Table.HeaderCell>
                                    <Table.HeaderCell
                                         sorted={column === 'stock' ? direction : null}
                                        onClick={this.handleSort('stock')}
                                    >
                                        Stock
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Sold
                                    </Table.HeaderCell>
                                    <Table.HeaderCell >
                                        Status
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                            
                                {this.renderProducts()}
                            </Table.Body>

                            <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan='7'>
                                <Menu floated='right' pagination>
                                    <Pagination
                                        boundaryRange={0}
                                        defaultActivePage={1}
                                        ellipsisItem={null}
                                        firstItem={null}
                                        lastItem={null}
                                        siblingRange={1}
                                        totalPages={10}
                                    />
                                </Menu>
                                </Table.HeaderCell>
                            </Table.Row>
                            </Table.Footer>
                        </Table>
                    </div>
                </div>

            </div>
         );
    }
}
 
export default MyProducts;