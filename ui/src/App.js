import React, {useState,useEffect,Fragment} from 'react';
import './App.css';
import Home from './pages/Home'
import { Switch, Route, Redirect } from 'react-router-dom';
import MainHeader from './pages/Header'
import Login from './pages/Login';
import Register from './pages/Register'
import Verification from './pages/Verification'
import ManageProduct from './pages/ManageProduct'
import AddProduct from './pages/seller/AddProduct'
import ProductItems from './pages/seller/ProductItems'
import ChangePass from './pages/Changepass'
import Forgotpass from './pages/Forgotpass'
import Profile from './pages/Profile'
import { KeepLogin } from './redux/actions'
import { API_URL } from './support/ApiUrl';
import { connect } from 'react-redux';
import Axios from'axios'


function App({KeepLogin,User}) {

  const [Loading,setLoading]=useState(true)

  const [fixed,setfixed]=useState(false)

  useEffect(()=>{
    const token=localStorage.getItem('token')
    if(token){
      Axios.get (`${API_URL}/users/keeplogin`,{
        headers:
        {
          'Authorization':`Bearer ${token}`
        }
      })
      .then (res=>{
        KeepLogin(res.data)
      }).catch((err)=>{
        console.log(err)
      }).finally(()=>{
        setLoading(false)
      })
    }else{
      setLoading(false)
    }
  },[])
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
        <Route path='/seller/product' exact component={ManageProduct}/>
        <Route path='/seller/product/add' exact component={AddProduct}/>
        <Route path='/seller/product/:idproduct' exact component={ProductItems}/>

      </Switch>

    </div>
  );
}

const MapstatetoProps=(state)=>{
  return {
    User: state.Auth
  }
}

export default connect(MapstatetoProps, {KeepLogin}) (App);
