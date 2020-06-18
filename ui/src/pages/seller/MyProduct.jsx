import React, { Component } from 'react';
import SidebarSeller from './componentseller/sidebar';
import { Button, Menu, Icon, Label, Table, Pagination, Input, Grid, Image, Header, Form, TextArea } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';
import SubNavigation from './componentseller/subnavigation';
import _ from 'lodash'
import Axios from 'axios'
import { APIURL } from '../../supports/ApiUrl';


class MyProducts extends Component {
    state = { 
        products:[],
        category:[],
        searchproducts:[],
        activeItem:'',
        column:'',
        direction:''
    }
    
    componentDidMount=()=>{
        Axios.get(`${APIURL}/products/productseller`)
        .then((res)=>{
            this.setState({
                products:res.data.product,
                searchproducts:res.data.product,
                category:res.data.category,
            })
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    onchangesearch=(e)=>{       
        var inputName=e.target.value
        console.log(inputName)
        var dataFilter=this.state.products.filter((product)=>{
            return (
                product.product_name.toLowerCase().includes(inputName.toLowerCase())                
            )
        })        
        this.setState({searchproducts:dataFilter})
    }

    handleSort = (clickedColumn) => () => {
        const { column, searchproducts, direction } = this.state
    
        if (column !== clickedColumn) {
          this.setState({
            column: clickedColumn,
            searchproducts: _.sortBy(searchproducts, [clickedColumn]),
            direction: 'ascending',
          })
    
          return
        }
        this.setState({
          searchproducts: searchproducts.reverse(),
          direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
    }
    
    // onClickCategory= (e) =>{
    //     var kategori=e.target.value
    //     var hasilFilter=this.state.products.filter((val)=>{
    //         if(kategori==='all'){
    //             return this.state.products
    //         }else{
    //             return (
    //                 val.namecategory.toLowerCase().includes(kategori.toLowerCase())                
    //             )
    //         }
    //     })
    //     this.setState({searchproducts:hasilFilter}) 
    // }
  

    // === Handle Table ===
    renderProducts=()=>{
        const {searchproducts}=this.state
        console.log(searchproducts)
        if(this.state.searchproducts.length){
            return searchproducts.map((val, index)=>{
                return (
                    // <Table.Row >
                    //     <Table.Cell style={{flexDirection: 'column',}}>
                    //         <img src={val.imagecover} alt={val.product_name}  height='100px' />
                    //         <div>
                    //             <strong>{val.product_name}</strong><br/>
                    //             {val.namecategory}
                    //         </div>
                    //     </Table.Cell>
                    //     <Table.Cell><center><img src={val.imagecover} alt={val.product_name}  height='100px' /></center> </Table.Cell> 
                    //     <Table.Cell>{val.namecategory}</Table.Cell>
                    //     <Table.Cell>{val.price}</Table.Cell>
                    //     <Table.Cell>{val.stock}</Table.Cell>
                    //     <Table.Cell>jumlah terjual</Table.Cell>
                    //     <Table.Cell>
                    //         {val.isarchived==0?'LIVE':'ARCHIVED'}
                    //     </Table.Cell>
                    // </Table.Row>
                    // <Grid inverted>
                        <Grid.Row style={{backgroundColor:index%2===0?'white':'#f5deb3'}} >
                            <Grid.Column width={1}>
                                {index+1} 
                            </Grid.Column>
                            <Grid.Column width={2}>
                                <Image src={val.imagecover}/>
                            </Grid.Column>
                            <Grid.Column width={2}>
                                <Header as={'h4'}>
                                    {val.product_name}
                                </Header>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <p>
                                {val.description}
                                </p>
                            </Grid.Column>
                            <Grid.Column width={2}>
                                {val.price}
                            </Grid.Column>
                            <Grid.Column width={2}>
                                {val.stock}
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Button 
                                    primary 
                                    style={{margin:'0 .5em .5em 0'}}
                                    onClick={()=>{this.setState({idproductedit:1})}}
                                >Edit</Button>
                                <Button color='red'>Delete</Button>
                            </Grid.Column>
                        </Grid.Row>
                    // </Grid>
                )
            })
        }else{
            return(
                   <center> <h3 style={{color:'red'}}>Empty Product!!! You have not input any product. </h3></center> 
                
            )
        }
    }

    
    render() { 
        const { activeItem, column, direction } = this.state
        return ( 
            
            <div  style={{display:'flex', paddingTop:50}}>
                <div>
                    <SidebarSeller/>
                </div>
                <div style={{backgroundColor:'#f6f6f6',padding: 10, width:'80%', display:'flex', flexDirection:'column'}}>
                    <div style={{backgroundColor:'#fff', marginBottom:20}}>
                        <Menu pointing secondary>
                            <Menu.Item
                                name='all'
                                active={activeItem === 'all'}
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name='live'
                                active={activeItem === 'live'}
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name='soldout'
                                active={activeItem === 'soldout'}
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name='blocked'
                                active={activeItem === 'blocked'}
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name='archived'
                                active={activeItem === 'archived'}
                                onClick={this.handleItemClick}
                            />
                        </Menu>
                    </div>
                    <div style={{marginBottom: 20,}} >
                        <Input
                            action='Search'
                            placeholder='Search Products...'
                            onChange={this.onchangesearch}
                        />
                        <Input
                            action='Search'
                            placeholder='Search Products...'
                            onChange={this.onchangesearch}
                        />
                    </div>
                    <div>
                        {/* <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell 
                                        sorted={column === 'product_name' ? direction : null}
                                        onClick={this.handleSort('product_name')}
                                    >
                                        Name
                                    </Table.HeaderCell>
                                    <Table.HeaderCell >
                                        Image
                                    </Table.HeaderCell>
                                    <Table.HeaderCell
                                        sorted={column === 'namecategory' ? direction : null}
                                        onClick={this.handleSort('namecategory')}
                                    >
                                        Category
                                    </Table.HeaderCell>
                                    <Table.HeaderCell
                                         sorted={column === 'price' ? direction : null}
                                        onClick={this.handleSort('price')}
                                    >
                                        Price
                                    </Table.HeaderCell>
                                    <Table.HeaderCell
                                         sorted={column === 'stock' ? direction : null}
                                        onClick={this.handleSort('stock')}
                                    >
                                        Stock
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Sold
                                    </Table.HeaderCell>
                                    <Table.HeaderCell >
                                        Status
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                            
                                {this.renderProducts()}
                            </Table.Body>

                            <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan='7'>
                                <Menu floated='right' pagination>
                                    <Pagination
                                        boundaryRange={0}
                                        defaultActivePage={1}
                                        ellipsisItem={null}
                                        firstItem={null}
                                        lastItem={null}
                                        siblingRange={1}
                                        totalPages={10}
                                    />
                                </Menu>
                                </Table.HeaderCell>
                            </Table.Row>
                            </Table.Footer>
                        </Table> */}
                    </div>
                    <div style={{paddingTop:'50px'}}>
                        <Grid style={{paddingLeft: 10, paddingRight: 10,}}>
                            <Grid.Row style={{border:'1px solid gray',borderRadius:'5px', backgroundColor:'white',}}>
                                <Grid.Column width={1}>
                                    No
                                </Grid.Column>
                                <Grid.Column width={2}>
                                    Image
                                </Grid.Column>
                                <Grid.Column width={2}
                                sorted={column === 'product_name' ? direction : null}
                                onClick={this.handleSort('product_name')}>
                                    Name<Icon name={direction==='ascending'&&column=='product_name'?'angle double down':'angle double up'} />
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    Description
                                </Grid.Column>
                                <Grid.Column width={2}
                                sorted={column === 'price]' ? direction : null}
                                onClick={this.handleSort('price')}>
                                    Price <Icon name={direction==='ascending'&&column=='price'?'angle double down':'angle double up'} />
                                </Grid.Column>
                                <Grid.Column width={2}>
                                    Stock
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    Action
                                </Grid.Column>
                            </Grid.Row>

                            {
                                this.state.idproductedit?
                                <Grid.Row style={{border:'1px solid gray',borderRadius:'5px'}}>
                                    <Grid.Column width={1}>
                                        1
                                    </Grid.Column>
                                    <Grid.Column width={3}>
                                        <Image src={this.state.imageEdit}/>
                                        <Input 
                                            placeholder='image...' 
                                            style={{width:'100%'}}
                                            onChange={(e)=>{this.setState({imageEdit:e.target.value})}}
                                        />
                                    </Grid.Column>
                                    <Grid.Column width={2}>
                                        <Header as={'h4'}>
                                            <Input
                                                placeholder='Product Name'
                                                style={{width:'100%'}}
                                                value=''
                                                onChange={(e)=>{this.setState({productNameEdit:e.target.value})}}
                                            />
                                        </Header>
                                    </Grid.Column>
                                    <Grid.Column width={3}>
                                        <Form>
                                            <TextArea 
                                                placeholder='Tell us more' 
                                                style={{width:'100%'}}
                                                value=''
                                                onChange={(e)=>{this.setState({descriptionEdit:e.target.value})}}
                                            />
                                        </Form>
                                    </Grid.Column>
                                    <Grid.Column width={2}>
                                        Rp70000,00
                                    </Grid.Column>
                                    <Grid.Column width={2}>
                                        30
                                    </Grid.Column>
                                    <Grid.Column width={3}>
                                        <Button 
                                            primary 
                                            style={{margin:'0 .5em .5em 0'}}
                                            onClick={()=>{this.setState({idproductedit:1})}}
                                        >Edit</Button>
                                        <Button color='red'>Delete</Button>
                                    </Grid.Column>
                                </Grid.Row>
                                :
                                // <Grid.Row style={{border:'1px solid gray',borderRadius:'5px'}}>
                                //     <Grid.Column width={1}>
                                //         1
                                //     </Grid.Column>
                                //     <Grid.Column width={2}>
                                //         <Image src='https://s.blanja.com/picspace/392/241032/1250.1346_2dd6e3ef13f14da9b8e8f400c464ff5a.jpg'/>
                                //     </Grid.Column>
                                //     <Grid.Column width={2}>
                                //         <Header as={'h4'}>
                                //             Product Name
                                //         </Header>
                                //     </Grid.Column>
                                //     <Grid.Column width={3}>
                                //         <p>
                                //         Quisque venenatis in arcu sit amet aliquam. Donec volutpat, ipsum pretium luctus accumsan, dolor mi pulvinar lorem, a pulvinar arcu ipsum
                                //         </p>
                                //     </Grid.Column>
                                //     <Grid.Column width={2}>
                                //         Rp70000,00
                                //     </Grid.Column>
                                //     <Grid.Column width={2}>
                                //         30
                                //     </Grid.Column>
                                //     <Grid.Column width={3}>
                                //         <Button 
                                //             primary 
                                //             style={{margin:'0 .5em .5em 0'}}
                                //             onClick={()=>{this.setState({idproductedit:1})}}
                                //         >Edit</Button>
                                //         <Button color='red'>Delete</Button>
                                //     </Grid.Column>
                                // </Grid.Row>
                                this.renderProducts()
                            }
                        </Grid>
                    </div>
                </div>

            </div>
         );
    }
}
 
export default MyProducts;