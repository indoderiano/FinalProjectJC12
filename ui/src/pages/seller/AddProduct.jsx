import React, { Component } from 'react';
import SidebarSeller from './componentseller/sidebar';


class AddProduct extends Component {
    state = {  }
    render() { 
        return ( 
            <div  style={{display:'flex', paddingTop:50}}>
                <div>
                    <SidebarSeller/>
                </div>
                <div class='main'>
                    <h1>Ini halaman Add New Product dimana seller bisa menambahkan produk-produk yang ingin dia jual</h1>
                </div>

            </div>
         );
    }
}
 
export default AddProduct;