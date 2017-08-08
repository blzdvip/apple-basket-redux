import { combineReducers } from 'redux';
import appleBasketReducer from './appleBasketReducer';

const rootReducer = combineReducers({
    appleBasket: appleBasketReducer
});

export default rootReducer;