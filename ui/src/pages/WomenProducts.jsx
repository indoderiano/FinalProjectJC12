import React, { Component } from 'react';
import { Grid, Image } from 'semantic-ui-react';
class WomenProducts extends Component {
    state = { 

    }
    render() { 
        return ( 
            <div style={{ padding:20}} >
                <div style={{
                    backgroundImage: 'radial-gradient(circle, rgba(202,170,243,1) 0%, rgba(255,255,255,0.7707457983193278) 100%)' , 
                    display:'flex', justifyContent:'space-between',height:400}}>
                   <Image src='/images/woman-header2.png' style={{marginLeft: 100, height:400}} />
                   <p style={{
                       fontSize:'100px', color:'#e11584', 
                       textAlign:"center", 
                       letterSpacing:'8px', textTransform:'uppercase',fontWeight:'100',
                       fontFamily:'Leckerli One', paddingRight:80, paddingTop:20}}>
                            Women <br/> Collection 
                   </p>
                </div>
          
            </div>
         );
    }
}
 
export default WomenProducts;