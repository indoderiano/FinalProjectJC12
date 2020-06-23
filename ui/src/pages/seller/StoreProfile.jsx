import React, { Component } from 'react';
import SidebarSeller from './componentseller/sidebar';
import { Button, Menu, Icon, Reveal, Table, Pagination, Input, Grid, Image, Header, Form, TextArea, Segment, RevealContent } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';
import SubNavigation from './componentseller/subnavigation';
import _ from 'lodash'
import Axios from 'axios'
import { APIURL } from '../../supports/ApiUrl';
import { useState } from 'react';
import {connect} from 'react-redux'
import { useEffect } from 'react';


const StoreProfile=(props)=>{
    const [data,setdata]=useState({})

    useEffect(()=>{
        Axios.get(`${APIURL}/sellers/getseller?iduser=${props.auth.iduser}`)
        .then((res)=>{
            setdata(res.data[0])
            
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    
    
    return (
        <div  style={{display:'flex', paddingTop:50}}>
        <div>
            <SidebarSeller/>
        </div>
        <div style={{backgroundColor:'#faf8ec',padding: 10, width:'80%', display:'flex', flexDirection:'column'}}>                                               
            <div style={{paddingTop:'50px'}}>
                <Grid columns={3} style={{paddingLeft: 10, paddingRight: 10,}}>
                    <Grid.Row stretched>
                        <Grid.Column>
                            <Segment>
                            <Image src={APIURL+data.imageprofile}/>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment>
                                <h3  style={{letterSpacing:'8px', textTransform:'uppercase',fontWeight:'lighter'}}>{data.namatoko}</h3>
                                <h4>Store Location: <i>{data.alamattoko}</i> </h4>
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
    )
}
const MapstatetoProps=(state)=>{
    return  {
      auth:state.Auth,
      seller:state.Seller
    }           
  }
export default connect(MapstatetoProps)(StoreProfile);