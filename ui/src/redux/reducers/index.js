import {combineReducers} from 'redux';
import Authreducer from './Authreducer'
import Sellerreducer from './Sellerreducer'
import CartReducer from './CartReducer'
import PaymentReducer from './PaymentReducer'


export default combineReducers({
    Auth:Authreducer,
    Seller:Sellerreducer,
    Cart:CartReducer,
    Payment:PaymentReducer,
})