import React, { Component } from 'react'
import {Container,Message,Header,Button} from 'semantic-ui-react'
import Axios from 'axios'
import { APIURL } from '../supports/ApiUrl'
import {connect} from 'react-redux'
import {KeepLogin} from '../redux/actions'
import { Redirect } from 'react-router-dom'



class Verification extends Component {
    state = { 
        message: 'wait...',
        redirect: false
     }

    componentDidMount=()=>{
        var token=this.props.match.params.token

        if(!token){
            this.setState({message:'An Email verification has been sent to your email, click the verification link to verify your account'})
        }else{
            Axios.put(`${APIURL}/users/verify`,{token})
            .then((res)=>{
                if(res.data.status){
                    this.setState({message:'Email is verified, you will be redirected to home page...'})
                    // ACTION KEEPLOGIN
                    this.props.KeepLogin(res.data.update)
                    // WILL AUTOMATICALLY REDIRECT TO HOMEPAGE
                    setTimeout(()=>{
                        this.setState({redirect:true})
                    },2000)
                }else{
                    this.setState({message:res.data.message})
                }
            }).catch((err)=>{
                console.log(err)
            })
        }
    }

    onResend=()=>{
        Axios.post(`${APIURL}/users/resendmail`,{userid:this.props.User.userid})
        .then((res)=>{
            this.setState({message:'Resend Email berhasil'})
        }).catch((err)=>{
            console.log(err)
        })
    }

    render() { 
        return ( 

            <Container style={{paddingTop:'100px'}}>
                <Header as={'h1'}>Verify your account</Header>
                <Message style={{marginBottom:'50px'}}>
                    {this.state.message}
                </Message>
                <Button primary onClick={this.onResend}>
                    Resend Email
                </Button>

                {
                    this.state.redirect?
                    <Redirect to='/'/>
                    : null
                }
            </Container>

         );
    }
}

const MapstatetoProps=(state)=>{
    return {
        User: state.Auth
    }
}
 
export default connect(MapstatetoProps,{KeepLogin}) (Verification);