import React, { Component } from 'react';
import { Grid, Image, Button, Segment, Header, Card, Icon, Rating } from 'semantic-ui-react';
import { NavLink, Link } from 'react-router-dom';
import Axios from 'axios';
import { APIURL } from '../supports/ApiUrl';

class Home extends Component {
  state = {
      mostViewedProducts:[]
  }

  componentDidMount(){
      Axios.get(`${APIURL}/products/mostviewed`)
      .then((res)=>{
        this.setState({
          mostViewedProducts:res.data
        })
      }).catch((err)=>{
        console.log(err)
      })
  }

  renderMostViewed=()=>{
    console.log(this.state.mostViewedProducts)
    console.log(this.state.mostViewedProducts[0])
    console.log( this.state.mostViewedProducts[0])
    if(this.state.mostViewedProducts.length){
      return this.state.mostViewedProducts.map((val,index)=>{
          return (                  
              <div key={index} style={{width:'22%', marginLeft:12, marginRight:12, marginBottom:20}}>
                  <Link to={`/product/${val.idproduct}`}>
                      <Card raised style={{ paddingTop:5, height:'100%'}}>
                          <a style={{alignSelf:'center'}}>
                              <Image src={APIURL+ JSON.parse(val.imagecover)[0]} style={{height:'150px' }}/>
                          </a>
                          <Card.Content style={{borderColor: 'transparent',}} >
                          <Card.Header style={{display:'block', overflow: 'hidden',}}>{val.product_name}</Card.Header>
                          <Card.Meta>{val.maincategory}</Card.Meta>
                          <Card.Description >
                              Rp.{val.price} <br/>
                              <Rating icon='star' defaultRating={0} rating={val.rating} maxRating={5} />
                          </Card.Description>
                          </Card.Content>
                          <Card.Content style={{textAlign:'center',alignSelf:'center'}} extra>
                          <a style={{fontSize:'20px', width:'100%'}} >
                              <Icon name='cart' />
                              Detail
                          </a>
                          </Card.Content>
                      </Card>
                  </Link>
              </div>
          )
      })
  }
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
                          <Segment circular style={{width: 150, height: 150, backgroundColor: '#898989'}}>
                            <Header as='h2'>
                              Men
                              <Link to='/allproducts/men'>
                                  <Button inverted style={{padding:10}}>Shop Now</Button>
                              </Link>
                            </Header>
                          </Segment>
                          <Segment circular inverted style={{width: 150, height: 150}}>
                            <Header as='h2' inverted>
                              Women
                              <Link to='/allproducts/women'>
                                  <Button inverted style={{padding:10}}>Shop Now</Button>
                              </Link>
                            </Header>
                          </Segment>
                        </center>
                      </div>
                  </Grid.Row>
                  <div style={{width:'100%', padding:20, justifyContent: 'center', alignItems:'center', display: 'flex', flexDirection:'column' ,}}>
                    <div style={{width:'100%', textAlign:'center'}}><h2>Category</h2></div> <br/>
                    <div style={{width:'70%', textAlign:'center',display:'flex',justifyContent:'space-between'}}>
                        <Button color='red'>Men Clothes</Button>
                        <Button style={{backgroundColor:'#feda09'}}>Women Clothes</Button>
                        <Button color='red'>Men Shoes</Button>
                        <Button style={{backgroundColor:'#feda09'}}>Women Shoes</Button>
                        <Button color='red'>Men Bag</Button>
                        <Button style={{backgroundColor:'#feda09'}}>Women Bag</Button>
                    </div>  
                  </div>
                  <div style={{width:'100%', borderWidth:'2px', borderColor:'black', padding:20, justifyContent: 'center', alignItems:'center', display: 'flex', flexDirection:'column' ,}}>
                    <div style={{width:'100%', textAlign:'center'}}><h2>Most Viewed Products</h2></div> <br/>
                    <div style={{width:'70%', textAlign:'center',display:'flex',justifyContent:'space-between'}}>
                        {this.renderMostViewed()}
                    </div>
                  </div>
          </Grid>
    );
  }
}
 
export default Home;