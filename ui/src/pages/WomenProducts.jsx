import React, { Component } from 'react';
import { Grid, Image } from 'semantic-ui-react';
class WomenProducts extends Component {
    state = { 

    }
    render() { 
        return ( 
            <div style={{ padding:20}} >
                <div style={{
                    backgroundImage: 'linear-gradient(45deg, rgba(250,248,237,1) 0%, rgba(202,170,243,1) 59%)' , 
                    display:'flex', justifyContent:'space-between',height:400,}}>
                   <a><Image src='/images/woman-header2.png' style={{marginLeft: 100, height:400}} /></a>
                   <p style={{
                       fontSize:'100px', color:'#e11584', 
                       textAlign:"center", fontFamily:'Leckerli One', paddingRight:80}}>
                            Women <br/> Collection 
                   </p>
                </div>
          
            </div>
         );
    }
}
 
export default WomenProducts;