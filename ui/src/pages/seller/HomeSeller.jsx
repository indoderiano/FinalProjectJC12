import React, { Component } from 'react';
import SidebarSeller from './componentseller/sidebar';
import { Router, Switch, Route } from 'react-router-dom';
import MyProducts from './MyProduct';
import AddProduct from './AddProduct';



class HomeSeller extends Component {
    state = {  }
    render() { 
        return ( 
                <div style={{display:'flex', paddingTop:50}}>
                    <div>
                        <SidebarSeller/>
                    </div>
                    <div style={{padding:30}}>
                        HomeSeller
                    </div>
                </div>
              
        );
    }
}
 
export default HomeSeller;