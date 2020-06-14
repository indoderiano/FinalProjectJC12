import React from 'react'
import {
  Grid,
  Header,
  Form,
  Segment,
  Button,
  Message
} from 'semantic-ui-react'
import { useState } from 'react'
import {connect} from 'react-redux'
import {APIURL} from '../supports/ApiUrl'
import Axios from 'axios'
const Sellerregis = (props) => {

  const [data,setdata]=useState({
    namatoko:'',
    alamattoko:'',
    iduser:props.iduser
  })

  const testmasuk=()=>{
    return(
      Axios.post(`${APIURL}/sellers/createseller`,data)
      .then((res)=>{
        if(res.data.status){
          console.log(res.data.message)
        }
      }).catch((err)=>{
        console.log(err)
        
      })
    )
  }

  return(
    <Grid textAlign='center' style={{ height: '70vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
    <Header as='h2' color='teal' textAlign='center'>
      Seller Registration
    </Header>
    <Form size='large'>
        <Segment stacked>
            <Form.Input 
                fluid icon='building outline' 
                iconPosition='left' 
                placeholder='Insert store name' 
                onChange={(e)=>{setdata({...data,namatoko:e.target.value})}}
            />
            <Form.Input 
                fluid icon='compass outline' 
                iconPosition='left' 
                placeholder='Insert store address' 
                onChange={(e)=>{setdata({...data,alamattoko:e.target.value})}}
            />
            <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Insert Store Profile'
            />
            <Button color='teal' fluid size='large' onClick={testmasuk}>
                Register
            </Button>
        </Segment>
    </Form>
    </Grid.Column>
</Grid>
  )
}
const MapstatetoProps=(state)=>{
  return state.Auth            
}
export default connect(MapstatetoProps)(Sellerregis)