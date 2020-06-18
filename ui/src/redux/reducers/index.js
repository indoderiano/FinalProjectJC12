import {combineReducers} from 'redux';
import Authreducer from './Authreducer'
import CartReducer from './CartReducer'
import PaymentReducer from './PaymentReducer'


export default combineReducers({
    Auth:Authreducer,
    Cart:CartReducer,
    Payment:PaymentReducer

})