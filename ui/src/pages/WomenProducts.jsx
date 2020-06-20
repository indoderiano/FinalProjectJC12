import React, { Component } from 'react';
import { Grid, Image } from 'semantic-ui-react';
class WomenProducts extends Component {
    state = { 

    }
    render() { 
        return ( 
            <div style={{backgroundColor:'#feda09', padding:20}} >
                <div style={{display:'flex', justifyContent:'space-between'}}>
                   <Image src='/images/woman-header1.png' style={{marginLeft: 20,}} />
                   <p style={{fontSize:'100px', textAlign:"center", fontFamily:'Leckerli One', paddingRight:80}}> Women <br/> Collection </p>
                </div>
            </div>
         );
    }
}
 
export default WomenProducts;