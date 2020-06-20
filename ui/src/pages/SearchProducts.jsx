import React, { Component } from 'react';
import Axios from 'axios';
import Search from '../component/Search';

class SearchProducts extends Component {
    state = { 
        searchproducts:[]
    }


    componentDidMount(){
        console.log('Ini componentDidMount searchproduct')
            this.getData()
            console.log(this.state.totalProduct)
        }
   
    render() { 
        return ( 
            <div style={{padding:50}}>
                <Search/>
                <h1>SEARCH PRODUCTS {this.props.match.params.keyword}</h1>
            </div>
        );
    }
}
 
export default SearchProducts;