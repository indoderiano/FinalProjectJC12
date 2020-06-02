import React, { Component } from 'react'
import {
    Button,
    Container,
    Header,
    Menu,
  } from 'semantic-ui-react'
import { connect } from "react-redux";
import {Link} from 'react-router-dom'


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
              style={{backgroundColor:'rgb(27, 28, 29)',margin:'0',paddingBottom:'14px'}}
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
                      Hi, {this.props.User.username}
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
                    : null
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
 
export default connect (MapstatetoProps) (MainHeader);