import React, { Component } from 'react';
import SidebarSeller from './componentseller/sidebar';
import { Button, Menu, Icon, Label, Table, Pagination, Input, Grid, Image, Header, Form, TextArea, Segment } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';
import SubNavigation from './componentseller/subnavigation';
import _ from 'lodash'
import Axios from 'axios'
import { APIURL } from '../../supports/ApiUrl';


class StoreProfile extends Component {
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

   

    
    render() { 
        const { activeItem, column, direction } = this.state
        return ( 
            
            <div  style={{display:'flex', paddingTop:50}}>
                <div>
                    <SidebarSeller/>
                </div>
                <div style={{backgroundColor:'#f6f6f6',padding: 10, width:'80%', display:'flex', flexDirection:'column'}}>                                               
                    <div style={{paddingTop:'50px'}}>
                        <Grid columns={3} style={{paddingLeft: 10, paddingRight: 10,}}>
                            <Grid.Row stretched>
                                <Grid.Column>
                                    <Segment>
                                        <Image src='https://image.flaticon.com/icons/png/512/1892/1892627.png' />
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment>
                                        <h3>NAMA TOKO</h3>
                                        <p>Join at <i>created at</i> </p>
                                    </Segment>
                                    <Segment>2</Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment>1</Segment>
                                    <Segment>2</Segment>
                                    <Segment>3</Segment>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                </div>

            </div>
         );
    }
}
 
export default StoreProfile;