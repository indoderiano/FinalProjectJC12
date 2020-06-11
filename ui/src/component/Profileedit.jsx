import React, { useState,useEffect } from 'react'
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux'
import { APIURL } from './../supports/ApiUrl'
import { Button,Input } from 'semantic-ui-react'

const ProfileEdit=(props)=>{
    const [data,setdata]=useState({})
    const [edit,setedit]=useState(false)
    const [editprofile,setprofile]=useState({username:'',address:'',iduser:`${props.iduser}`})

   const isEdit=()=>{
    Axios.put(`${APIURL}/users/editprofile`,editprofile)
    .then((res)=>{
        console.log(res.data)
        setdata(res.data)
    }).catch((err)=>{
        console.log(err) 
    })
   }
    
    const isProfileChange=(e)=>{
        setprofile({[e.target.name]:e.target.value})
       
        
    }

    return(
        <div style={{width:'70%',
            marginLeft:'22%', 
            marginRight:'15%',
            marginTop:'5%'}}
           >
        <table className="table table-borderless" >
  
  <tbody >
    <tr>
      <th scope="row">Username:</th>
        <td class="ui transparent input">
        <input type="text" placeholder='Username...' name='username'  onChange={isProfileChange} defaultValue={data.username}/>
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
        <input type="text" placeholder='Address...' name='address'  onChange={isProfileChange} defaultValue={data.address}/>
        </td>
    </tr>
    <br/>
    <tr>
      <th scope="row">Account Status:</th>
        <td>{data.isseller===true?'seller':'users'}</td>
    </tr>
  </tbody>
        <Button style={{marginLeft:'50%', marginTop:'10%'}} onClick={isEdit()}>
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