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


const Sellerregis = (props) => {

  const [data,setdata]=useState({
    namatoko:'',
    alamattoko:'',
    iduser:props.iduser
  })

  const testmasuk=()=>{
    return(console.log(data))
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