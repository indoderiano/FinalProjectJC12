import React, { Component } from 'react';
import { Grid, Image, Button, Segment, Header } from 'semantic-ui-react';
import { NavLink, Link } from 'react-router-dom';

class Home extends Component {
  state = {

  }

  

  render() { 
    return ( 
          <Grid style={{padding:50, }}>
                  <Grid.Row columns={2} >
                      <Grid.Column style={{marginRight:0, paddingRight: 0,}}>
                          <Image src='/images/men.jpg'/>
                      </Grid.Column>
                      <Grid.Column style={{marginLeft:0, paddingLeft: 0}}>
                        <Image src='/images/women.jpg' />
                      </Grid.Column>
                      <div style={{position:"absolute",width:'100%',alignSelf:'center', }}>
                        <center>
                          <Segment circular style={{width: 175, height: 175, backgroundColor: '#898989'}}>
                            <Header as='h2'>
                              Men
                              <Link to='/allproducts/men'>
                                  <Button inverted onClick={()=><NavLink to='/allproducts/men'/>} >Shop Now</Button>
                              </Link>
                            </Header>
                          </Segment>
                          <Segment circular inverted style={{width: 175, height: 175}}>
                            <Header as='h2' inverted>
                              Women
                              <Link to='/allproducts/women'>
                                  <Button inverted>Shop Now</Button>
                              </Link>
                            </Header>
                          </Segment>
                        </center>
                      </div>
                  </Grid.Row>
                  <div style={{width:'100%', padding:20, justifyContent: 'center', alignItems:'center', display: 'flex', flexDirection:'column' ,}}>
                    <div style={{width:'100%', textAlign:'center'}}><h2>Category</h2></div> <br/>
                    <div style={{width:'70%', textAlign:'center',display:'flex',justifyContent:'space-between'}}>
                        <Button color='red'>Baju Pria</Button>
                        <Button style={{backgroundColor:'#feda09'}}>Baju Wanita</Button>
                        <Button color='red'>Sepatu Pria</Button>
                        <Button style={{backgroundColor:'#feda09'}}>Sepatu Wanita</Button>
                        <Button color='red'>Tas Pria</Button>
                        <Button style={{backgroundColor:'#feda09'}}>Tas Wanita</Button>
                    </div>
                  </div>
                  <div style={{width:'100%', padding:20, justifyContent: 'center', alignItems:'center', display: 'flex', flexDirection:'column' ,}}>
                    <div style={{width:'100%', textAlign:'center'}}><h2>Most Popular</h2></div> <br/>
                    <div style={{width:'70%', textAlign:'center',display:'flex',justifyContent:'space-between'}}>
                        <Button color='red'>Baju Pria</Button>
                        <Button style={{backgroundColor:'#feda09'}}>Baju Wanita</Button>
                        <Button color='red'>Sepatu Pria</Button>
                        <Button style={{backgroundColor:'#feda09'}}>Sepatu Wanita</Button>
                        <Button color='red'>Tas Pria</Button>
                        <Button style={{backgroundColor:'#feda09'}}>Tas Wanita</Button>
                    </div>
                  </div>
          </Grid>
    );
  }
}
 
export default Home;