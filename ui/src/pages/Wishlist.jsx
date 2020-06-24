import React, { useState } from 'react'
import { Card, Icon, Image, Button, Segment,Container } from 'semantic-ui-react'
import { useEffect } from 'react'
import {APIURL} from './../supports/ApiUrl'
import Axios from 'axios'
import {connect} from 'react-redux'
import { isJson } from '../supports/services'
const WishlistPage = (props) => {
    const [wishlist,setwishlist]=useState([])
    const [wishlistdb,setdbwish]=useState({})
    useEffect(()=>{
        // Axios.get(`${APIURL}/wishlist/getallwishlist?iduser=${props.iduser}`)
        // .then((res)=>{
        //    console.log(res.data);
         
        // }).catch((err)=>{
        //     console.log(err)
        // })
        Axios.get(`${APIURL}/wishlist/getwishlist?iduser=${props.iduser}`)
        .then((res)=>{
            setwishlist(res.data)
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])

  
    


   
    
    const ShowCardWishlist=()=>{
        return wishlist.map((val,index)=>{
            return(
            <Card key={index}>
            <Image src={APIURL+isJson(val.imagecover)[0]} style={{height:'100%'}} wrapped ui={false} />
            <Card.Content>
              <Card.Header style={{ fontFamily:'muli,sans-serif', fontWeight: 100}}>{val.product_name}</Card.Header>
              <Card.Meta>{val.variant}</Card.Meta>
              <Card.Description>
                {val.description}
              </Card.Description>
              <Card.Header>{ val.price } </Card.Header>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Button>add to cart</Button>
              </a>
            </Card.Content>
          </Card>
            )
        })
    }
    
    return(
       <Container style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
           hello
           {
               ShowCardWishlist()
           }
       </Container>
      
    )
}

const MapstatetoProps=(state)=>{
    return state.Auth            
}
export default connect(MapstatetoProps)(WishlistPage)