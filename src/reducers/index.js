import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import PizzaReducer from './PizzaReducer';

export default combineReducers({
    user: UserReducer,
    pizza: PizzaReducer
});
