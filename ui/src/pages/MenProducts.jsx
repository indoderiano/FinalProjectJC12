import React, { Component } from 'react';
import { Grid, Image } from 'semantic-ui-react';

class MenProducts extends Component {
    state = {  }
    render() { 
        return ( 
            <div style={{backgroundColor:'#feda09', padding:20}} >
                <div style={{display:'flex', justifyContent:'space-between'}}>
                   <p style={{fontSize:'100px', textAlign:"center", fontFamily:'Leckerli One', paddingLeft:80}}> Men <br/> Collection </p>
                   <Image src='/images/men-header.png' style={{marginRight: 20,}} />
                </div>
            </div>
         );
    }
}
 
export default MenProducts;