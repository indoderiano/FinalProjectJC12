import React, { useState } from 'react'
import { Form, Segment } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {LoginUser} from './../redux/actions'
import {Redirect} from 'react-router-dom'

const Login = (props) => {
    
    const [data, setdata]=useState({
        username:'',
        password:''
    })

    const handleChange = (e, { name, value }) => setdata({...data, [name]: value })

    const handleSubmit = (e) => {
        // const { username, password } = this.state
        e.preventDefault()
        console.log(data)
        props.LoginUser(data)

    }

    if(props.islogin){
        return <Redirect to='/'/>
    }

    return (
        <div
        style={{height:'80vh', width:'100%', justifyContent:'center', alignItems:'center', textAlign:'center', display:'flex'}}>
            <Segment inverted>

                <Form inverted style={{width:'300px'}} onSubmit={handleSubmit}>
                    <h1>Login User</h1>
                    <Form.Group style={{flexDirection: 'column', justifyContent: 'center'}} >
                        <Form.Input
                        placeholder='Username'
                        name='username'
                        value={data.username}
                        onChange={handleChange}
                        /> <br/>
                        <Form.Input
                        placeholder='Password'
                        name='password'
                        value={data.password}
                        onChange={handleChange}
                        /> <br/>
                        <Form.Button content='Submit' /> <br/>
                        <p>Forget Password?</p>
                    </Form.Group>
                </Form>
            </Segment>
        </div>
    )
    
}

const MapstatetoProps=(state)=>{
    return state.Auth            
}

export default connect(MapstatetoProps,{LoginUser}) (Login)