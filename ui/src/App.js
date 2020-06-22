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
import ProductItems from './pages/seller/ProductItems'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Transactions from './pages/Transactions'
import ManageTransactions from './pages/admin/ManageTransactions'
import ManageOrders from './pages/seller/ManageOrders'
import ChangePass from './pages/Changepass'
import Forgotpass from './pages/Forgotpass'
import { KeepLogin , LoadCart, LoadPayment, LoadInvoices, LoadOrders } from './redux/actions'
import { APIURL } from './supports/ApiUrl';
import { connect } from 'react-redux';
import Axios from'axios'


function App({KeepLogin,LoadCart,LoadPayment,LoadInvoices,LoadOrders,User,KeepSeller}) {

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
        console.log('token data',res.data)
        KeepLogin(res.data)
        LoadCart(res.data.iduser)
        LoadPayment(res.data.iduser)
        LoadInvoices(res.data.iduser)
        if(res.data.isseller){
          LoadOrders(res.data.iduser)
        }
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
  const memberAccess=!Loading&&User.islogin&&User.isverified // only true if not loading,islogin,and isverified
  const sellerAccess=!Loading&&User.islogin&&User.isseller&&User.isverified
  const adminAccess=!Loading&&User.islogin&&User.isseller&&User.isadmin&&User.isverified
  

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
        <Route path='/forgotpassword' exact component={memberAccess?Forgotpass:Loading?Home:()=><Redirect to='/'/>}/>
        <Route path='/forgotpassword/:token' exact component={memberAccess?ChangePass:Loading?Home:()=><Redirect to='/'/>}/>
        <Route path='/verification' exact component={User.islogin?Verification:Loading?Verification:()=><Redirect to='/'/>}/>
        <Route path='/verification/:token' exact component={User.islogin?Verification:Loading?Verification:()=><Redirect to='/'/>}/>
        
        {/* IF LOADING, HOME, THEN IF SELLER, MANAGEPRODUCT, IF NOT VERIFIED, REDIRECT TO VERIFICATION, IF OTHERS, REDIRECT TO HOME */}
        <Route path='/seller/product' exact component={sellerAccess?ManageProduct:Loading?Home:!User.isverified?()=><Redirect to='/verification'/>:()=><Redirect to='/'/>}/>
        <Route path='/seller/product/add' exact component={sellerAccess?AddProduct:Loading?Home:!User.isverified?()=><Redirect to='/verification'/>:()=><Redirect to='/'/>}/>
        <Route path='/seller/product/:idproduct' exact component={sellerAccess?ProductItems:Loading?Home:!User.isverified?()=><Redirect to='/verification'/>:()=><Redirect to='/'/>}/>
        
        <Route path='/product/:idproduct' exact component={Product}/>
        <Route path='/cart' exact component={memberAccess?Cart:Loading?Home:!User.isverified?()=><Redirect to='/verification'/>:()=><Redirect to='/login'/>}/>
        <Route path='/checkout' exact component={memberAccess?Checkout:Loading?Home:!User.isverified?()=><Redirect to='/verification'/>:()=><Redirect to='/login'/>}/>

        <Route path='/transactions' exact component={memberAccess?Transactions:Loading?Home:!User.isverified?()=><Redirect to='/verification'/>:()=><Redirect to='/login'/>}/>
        <Route path='/managetransactions' exact component={adminAccess?ManageTransactions:Loading?Home:!User.isverified?()=><Redirect to='/verification'/>:()=><Redirect to='/login'/>}/>
        <Route path='/manageorders' exact component={sellerAccess?ManageOrders:Loading?Home:!User.isverified?()=><Redirect to='/verification'/>:()=><Redirect to='/'/>}/>
        


      </Switch>

    </div>
  );
}

const MapstatetoProps=(state)=>{
  return {
    User: state.Auth
  }
}

export default connect(MapstatetoProps, {KeepLogin,LoadCart,LoadPayment,LoadInvoices,LoadOrders}) (App);
