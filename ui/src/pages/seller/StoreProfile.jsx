import React, { Component } from 'react';
import SidebarSeller from './componentseller/sidebar';
import { Button, Menu, Icon, Card, Table, Pagination, Input, Grid, Image, Header, Form, TextArea, Segment, RevealContent } from 'semantic-ui-react'
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
    const [product,setproduct]=useState({})
    const [imagedata,setimagedata]=useState({
        imageprofile:undefined
    })
    const [editpicture,setpicture]=useState(true)
    useEffect(()=>{
        Axios.get(`${APIURL}/sellers/getseller?iduser=${props.auth.iduser}`)
        .then((res)=>{
            setdata(res.data[0])
            console.log(res.data[0].idseller);
            
            Axios.get(`${APIURL}/sellers/productseller?idseller=${res.data[0].idseller}`)
            .then((res)=>{
                setproduct(res.data)
            }).catch((err)=>{
                console.log(err);
            })
        }).catch((err)=>{
            console.log(err)
        })
    },[])


    console.log(product);
    
    
    const uploadImage=()=>{
        var formData=new FormData()
        var options={
            headers:{
             'Content-Type':'multipart/form-data',
             'Authorization':`Bearer ${props.token}`  
            }
        }
        var idseller=data.idseller
        var obj={
            idseller
        }
        formData.append('imageprofile',imagedata.imageprofile)
        formData.append('data', JSON.stringify(obj))
        Axios.post(`${APIURL}/sellers/uploadimage?idseller=${data.idseller}`,formData,options)
        .then((res)=>{
            setdata({...data,imageprofile:res.data[0]})
        }).catch((err)=>{
            console.log(err);
        })
    }


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
                          <div>
                                {
                                    data.imageprofile?  <Image src={APIURL+data.imageprofile}/> :  <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='large' disabled />
                                }
                                {
                                    editpicture?<Button onClick={()=>{setpicture(!editpicture)}}>Change Profile Picture</Button>: 
                                    <div>
                                        <Form.Input
                                    fluid
                                    type='file'
                                    multiple
                                    icon='file image outline'
                                    iconPosition='left'
                                    placeholder='Insert Store Profile'
                                    onChange={(e)=>{setimagedata({imageprofile:e.target.files[0]})}}/>
                                    </div>
                                }
                                 <Button onClick={uploadImage}>Upload Picture</Button>
                          </div>
              
                
                          
                        </Grid.Column>
                        <Grid.Column>
                            <div style={{height:'20%'}}>
                                <h3  style={{letterSpacing:'8px', textTransform:'uppercase',fontWeight:'lighter',fontSize:40}}>{data.namatoko}</h3>
                                <h4>Store Location: <i>{data.alamattoko}</i> </h4>
                            </div>
                            <br/>
                            <br/>
                            <div style={{width:'100%', marginTop:'5%'}}>
                            <h2 style={{letterSpacing:'8px', textTransform:'uppercase',fontWeight:'lighter',fontSize:20}}>Top 3 Picks</h2>

                            </div>
                            <div style={{height:'50%'}}>
                            <Card style={{height:'50%'}}>
                                <Card.Content>
                                    <Card.Header>
                                        HELLO
                                    </Card.Header>
                                    <Card.Meta>
                                        World
                                    </Card.Meta>
                                </Card.Content>
                            </Card>
                            </div>
                            
                        </Grid.Column>
                        <Grid.Column>
                          
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