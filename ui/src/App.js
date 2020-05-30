import React from 'react';
import logo from './logo.svg';
import './App.css';

import {Switch,Route} from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Verification from './pages/Verification'

function App() {
  return (
    <div>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/register' exact component={Register}/>
        <Route path='/verification' exact component={Verification}/>
        <Route path='/verification/:token' exact component={Verification}/>
      </Switch>

    </div>
  );
}

export default App;
