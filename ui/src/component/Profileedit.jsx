import React, { useState,useEffect } from 'react'
import Axios from 'axios'
// import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux'
import { APIURL } from './../supports/ApiUrl'
import { Button,Input } from 'semantic-ui-react'
import {Redirect} from 'react-router-dom'
const ProfileEdit=(props)=>{

    const [edit,setedit]=useState(false)
    const [editprofile,setprofile]=useState({username:'',address:'',iduser:`${props.iduser}`})

   const editSubmit=()=>{
    Axios.put(`${APIURL}/users/editprofile`,editprofile)
    .then((res)=>{
        console.log(res.data)
        console.log('berhasil')
        setedit(true)
    }).catch((err)=>{
        console.log(err) 
    })
   }

   const editChange=(e)=>{
    setprofile({...editprofile,[e.target.name]:e.target.value})  
}
  if(edit){
    return <Redirect to='/'/>
  }


    return(
        <div style={{width:'70%',
            marginLeft:'22%', 
            marginRight:'15%',
            marginTop:'5%'}}
           >
        <table className="table table-borderless" >
  
  <tbody>
    <tr>
      <th scope="row">Username:</th>
        <td class="ui transparent input">
        <input type="text" 
               placeholder='Username...' 
               name='username'
               value={editprofile.username}
               onChange={editChange}/>
        </td>
    </tr>
    <br/>
    <tr>
      <th scope="row">Email:</th>
         <td>
         {props.email}
         </td>
    </tr>
    <br/>
    <tr>
      <th scope="row">Address:</th>
        <td class="ui transparent input">
        <input type="text" 
               placeholder='Address...' 
               name='address'
               value={editprofile.address} 
               onChange={editChange}/>
        </td>
    </tr>
    <br/>
    <tr>
      <th scope="row">Account Status:</th>
        <td>{props.isseller===true?'seller':'users'}</td>
    </tr>
  </tbody>
        <Button style={{marginLeft:'50%', marginTop:'10%'}} onClick={editSubmit} >
            safe profile
        </Button>
</table>
        </div>
    )
    }
const MapstatetoProps=(state)=>{
    return state.Auth            
}
export default connect(MapstatetoProps)(ProfileEdit)