import React, {useState,useEffect,Fragment} from 'react';
import './App.css';
import Home from './pages/Home'
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register'
import Verification from './pages/Verification'
import { KeepLogin } from './redux/actions'
import Axios from'axios'
import { API_URL } from './support/ApiUrl';
import { connect } from 'react-redux';


function App({KeepLogin,User}) {

  const [Loading,setLoading]=useState(true)

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
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/login' exact component={Login} />
        <Route path='/register' exact component={Register}/>
        {
          User.islogin?
          <Fragment>
            <Route path='/verification' exact component={Verification}/>
            <Route path='/verification/:token' exact component={Verification}/>
          </Fragment>
          : null

        }

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
