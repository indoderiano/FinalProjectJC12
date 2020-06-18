import React, {useState,useEffect,Fragment} from 'react';
import './App.css';
import Home from './pages/Home'
import { Switch, Route, Redirect } from 'react-router-dom';
import MainHeader from './pages/Header'
import Login from './pages/Login';
import Register from './pages/Register'
import Verification from './pages/Verification'
import ManageProduct from './pages/ManageProduct'
import AddProduct from './pages/seller/AddProduct' // NOT FINISH: category, protection, sellerid
import AllProducts from './pages/AllProducts'
import ProductItems from './pages/seller/ProductItems'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Transactions from './pages/Transactions'
import ChangePass from './pages/Changepass'
import Forgotpass from './pages/Forgotpass'
import Profile from './pages/Profile'
import Sellerregis from './pages/Sellerregis'
import Admintable from './pages/Admin'
import { KeepLogin,KeepSeller, LoadCart, LoadPayment } from './redux/actions'
import { APIURL } from './supports/ApiUrl';
import { connect } from 'react-redux';
import HomeSeller from './pages/seller/HomeSeller';
import MyProducts from './pages/seller/MyProduct';
import MyOrders from './pages/seller/MyOrder';
import Axios from'axios'
import StoreProfile from './pages/seller/StoreProfile';


function App({KeepLogin,LoadCart,LoadPayment,User,KeepSeller}) {

  const [Loading,setLoading]=useState(true)

  const [fixed,setfixed]=useState(false)

  useEffect(()=>{
    const token=localStorage.getItem('token')
    if(token){
      Axios.get (`${APIURL}/users/keeplogin`,{
        headers:
        {
          'Authorization':`Bearer ${token}`
        }
      })
      .then(res=>{
        KeepLogin(res.data)
        if(res.data.isseller){
          console.log('line 40')
          KeepSeller(res.data.iduser)
        }
        LoadCart(res.data.iduser)
        LoadPayment(res.data.iduser)
      }).catch((err)=>{
        console.log(err)
      }).finally(()=>{
        setLoading(false)
      })
    }else{
      setLoading(false)
    }
  },[])


  const visitorAccess=!Loading&&!User.islogin
  const memberAccess=!Loading&&User.islogin
  const sellerAccess=!Loading&&User.isseller
  


  if(Loading){
    return <div><center><h3>Loading...</h3><img width="400px" src="https://static.boredpanda.com/blog/wp-content/uploads/2016/07/totoro-exercising-100-days-of-gifs-cl-terryart-2-578f80ec7f328__605.gif"/></center></div>
  }

  
  return (
    <div>
      <MainHeader 
        fixed={fixed ? 'top' : null}
        inverted={!fixed}
        pointing={!fixed}
        secondary={!fixed}
        size='large'
      />
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/login' exact component={Login}/>
        <Route path='/register' exact component={Register}/>
        <Route path='/forgotpassword' exact component={Forgotpass}/>
        <Route path='/forgotpassword/:token' exact component={ChangePass}/>
        <Route path='/profile' exact component={Profile}/>
        <Route path='/verification' exact component={User.islogin?Verification:()=><Redirect to='/'/>}/>
        <Route path='/verification/:token' exact component={User.islogin?Verification:()=><Redirect to='/'/>}/>
        
        {/* SELY */}
        <Route path='/allproducts' exact component={AllProducts}/>
        <Route path='/seller/product' exact component={ManageProduct}/>
        <Route path='/seller' exact component={HomeSeller}/>
        <Route path='/seller/product/myproduct' exact component={MyProducts}/>
        <Route path='/seller/myorder' exact component={MyOrders}/>
        <Route path='/seller/profile' exact component={StoreProfile}/>
        {/*  */}
        
        {/* JAMES */}
        <Route path='/Sellerregister' exact component={Sellerregis }/>
        <Route path='/admin' exact component={Admintable}/>
        {/*  */}
        
        
        


        <Route path='/seller/product' exact component={sellerAccess?ManageProduct:Loading?Home:()=><Redirect to='/'/>}/>
        <Route path='/seller/product/add' exact component={sellerAccess?AddProduct:Loading?Home:()=><Redirect to='/'/>}/>
        <Route path='/seller/product/:idproduct' exact component={sellerAccess?ProductItems:Loading?Home:()=><Redirect to='/'/>}/>
        <Route path='/product/:idproduct' exact component={Product}/>
        <Route path='/cart' exact component={visitorAccess?()=><Redirect to='/'/>:Cart}/>
        <Route path='/checkout' exact component={visitorAccess?()=><Redirect to='/'/>:Checkout}/>
        <Route path='/transactions' exact component={visitorAccess?()=><Redirect to='/'/>:Transactions}/>

      </Switch>

    </div>
  );
}

const MapstatetoProps=(state)=>{
  return {
    User: state.Auth
  }
}

export default connect(MapstatetoProps, {KeepLogin,KeepSeller,LoadCart,LoadPayment}) (App);
