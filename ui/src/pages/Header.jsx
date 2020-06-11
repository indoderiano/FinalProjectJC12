import React, { Component } from 'react'
import {
    Button,
    Container,
    Header,
    Menu,
  } from 'semantic-ui-react'
import { connect } from "react-redux";
import {Link} from 'react-router-dom'
import {isLogout} from './../redux/actions'

class MainHeader extends Component {
    state = {  }
    render() { 
        return ( 
            <Menu
              fixed={this.props.fixed ? 'top' : null}
              inverted={!this.props.fixed}
              pointing={!this.props.fixed}
              secondary={!this.props.fixed}
              size={this.props.size}
              style={{backgroundColor:'rgb(27, 28, 29)',margin:'0',padding:'14px 0 14px'}}
            >
              <Container>
                <Menu.Item as='a' active>
                  Home                 
                </Menu.Item>
                <Menu.Item as='a'>Work</Menu.Item>
                <Menu.Item as='a'>Company</Menu.Item>
                <Menu.Item as='a'>Careers</Menu.Item>
                <Menu.Item position='right'>
                  {
                    this.props.User.islogin?
                    <span style={{padding:'0 1em'}}>
                      <Button as={Link} style={{backgroundColor:'#1b1c1d', 
                    color:'#cfcfcf'}} to='/' onClick={()=>{console.log('hello');
                    }}>
                      Hi,{this.props.User.username}
                    </Button>
                    </span>
                    : null
                  }
              
                  {
                    !this.props.User.islogin?
                    <>
                      <Button as={Link} to='/login' inverted={!this.props.fixed}>
                        Log in
                      </Button>
                      <Button as={Link} to='/register' inverted={!this.props.fixed} primary={this.props.fixed} style={{ marginLeft: '0.5em' }}>
                        Sign Up
                      </Button>
                    </>
                    :  <Button as={Link} style={{backgroundColor:'#1b1c1d', 
                    color:'#cfcfcf'}} to='/' onClick={()=>{this.props.isLogout()}}>
                    Log out
                  </Button>
                  }
                </Menu.Item>
              </Container>
            </Menu>
         );
    }
}

const MapstatetoProps=(state)=>{
    return {
        User: state.Auth
    }
}
 
export default connect (MapstatetoProps,{isLogout}) (MainHeader);