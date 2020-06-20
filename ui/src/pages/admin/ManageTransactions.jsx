import React ,{Component} from 'react'
import Axios from 'axios'
import {APIURL} from '../../supports/ApiUrl'
import {
    Grid,
    Header,
    Image,
    Form,
    Segment,
    Button,
    Message,
    Container,
    Input,
    TextArea,
    Checkbox,
    Icon,
    Divider,
    Dropdown,
    Tab,
    Menu,
    Label
} from 'semantic-ui-react'
import PaymentVerify from './PaymentVerify'
import Orders from '../seller/Orders'
import PaymentList from '../PaymentList'
import TransactionHistory from '../TransactionHistory'
import OnTheWay from '../TransactionOnDelivery'
import {Link} from 'react-router-dom'
import {titleConstruct,isJson} from '../../supports/services'
import {LoadCart,UpdateCheckout,CountTotalCharge,CountTotalPayment} from '../../redux/actions'
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux'



class Transactions extends Component {
    state = { 
        
     }

    componentDidMount=()=>{
        
    }

    
    render() { 
        // console.log(this.props.Payment)
        const panes = [
            {
                menuItem: (
                  <Menu.Item key='payment'>
                    Admin Payment Verification
                    {
                        this.props.Payment.total?
                        <Label color='blue'>{this.props.Payment.total}</Label>
                        : null
                    }
                  </Menu.Item>
                ),
                render: () => <Tab.Pane><PaymentVerify/></Tab.Pane>,
            },
            {
                menuItem: (
                    <Menu.Item key='second'>
                        Store Orders
                        {
                            this.props.Store.total?
                            <Label color='blue'>
                                {this.props.Store.total}
                            </Label>
                            : null
                        }
                    </Menu.Item>
                ),
                render: () => <Tab.Pane><Orders/></Tab.Pane>,
            },
            {
                menuItem: { key: 'delivery', icon: 'shipping fast', content: 'Items On Delivery' },
                render: () => <Tab.Pane><OnTheWay/></Tab.Pane>,
            },
          ]

        return ( 
            <Container style={{paddingTop:'2em',width:'900px',marginBottom:'4em'}}>

                <Tab panes={panes} />
                
            </Container>
        );
    }
}

const MapstatetoProps=(state)=>{
    return {
        User: state.Auth,
        Cart: state.Cart,
        Payment: state.Payment,
        Store: state.Store
    }
}

 
export default connect(MapstatetoProps,{LoadCart}) (Transactions);