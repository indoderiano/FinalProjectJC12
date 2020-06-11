import React, { Component } from 'react';
import SidebarSeller from './componentseller/sidebar';
import { Button, Menu, Icon, Label, Table, Pagination } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';
import SubNavigation from './componentseller/subnavigation';
import Axios from 'axios'
import { API_URL } from '../../support/ApiUrl';


class MyProducts extends Component {
    state = { 
        products:[],
        category:[]
    }
    
    componentDidMount=()=>{
        Axios.get(`${API_URL}/products/getproducts`)
        .then((res)=>{
            this.setState({
                products:res.data.product,
                category:res.data.category})
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }
  

    // === Handle Table ===
    renderProducts=()=>{
        const {products}=this.state
        console.log(products)
        return products.map((val)=>{
            return (
                <Table.Row >
                    <Table.Cell style={{flexDirection: 'column',}}>
                        <img src={val.image} alt={val.name}  height='100px' />
                        <div>
                            <strong>{val.name}</strong><br/>
                            {val.namecategory}
                        </div>
                    </Table.Cell>
                    <Table.Cell><center><img src={val.image} alt={val.name}  height='100px' /></center> </Table.Cell> 
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
    }


    render() { 

        return ( 
            <div  style={{display:'flex', paddingTop:50}}>
                <div>
                    <SidebarSeller/>
                </div>
                <div style={{backgroundColor:'#f6f6f6',padding: 10, width:'80%'}}>
                    <div style={{backgroundColor:'#fff', marginBottom:20}}>
                        <SubNavigation/>
                    </div>
                    <div style={{overflowX:"auto"}} >
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.HeaderCell>Image</Table.HeaderCell>
                                    <Table.HeaderCell>Category</Table.HeaderCell>
                                    <Table.HeaderCell>Price</Table.HeaderCell>
                                    <Table.HeaderCell>Stock</Table.HeaderCell>
                                    <Table.HeaderCell>Sold</Table.HeaderCell>
                                    <Table.HeaderCell>Status</Table.HeaderCell>
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