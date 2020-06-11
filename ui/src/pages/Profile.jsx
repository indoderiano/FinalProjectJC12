import React, { useState,useEffect } from 'react'
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux'
import { APIURL } from '../supports/ApiUrl'
import { Button } from 'semantic-ui-react'
import ProfileEdit from './../component/Profileedit'
const Profile=(props)=>{
    const [data,setdata]=useState({})
    const [edit,setedit]=useState(false)

    useEffect(()=>{
        Axios.get(`${APIURL}/users/profile?iduser=${props.iduser}`)
        .then((res)=>{
            console.log(res.data)
            setdata(res.data)
        }).catch((err)=>{
            console.log(err) 
        })
    },[])
    
    return(
        edit===false?
        <div style={{width:'70%',
            marginLeft:'22%', 
            marginRight:'15%',
            marginTop:'5%'}}>
        <table className="table table-borderless" >
  <tbody >
    <tr>
      <th scope="row">Username:</th>
        <td>{props.username}</td>
    </tr>
    <br/>
    <tr>
      <th scope="row">Email:</th>
         <td>{data.email}</td>
    </tr>
    <br/>
    <tr>
      <th scope="row">Address:</th>
        <td colSpan="2">{data.address}</td>
    </tr>
    <br/>
    <tr>
      <th scope="row">Account Status:</th>
        <td>{data.isseller===true?'seller':'users'}</td>
    </tr>
  </tbody>
        <Button style={{marginLeft:'50%', marginTop:'10%'}} onClick={()=>{setedit(true)}}>
            Update Profile
        </Button>
</table>
        </div>
        :
        <ProfileEdit/>
    )
}
const MapstatetoProps=(state)=>{
    return state.Auth            
}
export default connect(MapstatetoProps) (Profile)