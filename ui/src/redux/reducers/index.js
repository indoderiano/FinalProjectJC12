import {combineReducers} from 'redux';
import Authreducer from './Authreducer'
import Sellerreducer from './Sellerreducer'

export default combineReducers({
    Auth:Authreducer,
    Seller:Sellerreducer
})