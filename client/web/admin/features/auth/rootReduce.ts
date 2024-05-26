import { combineReducers } from 'redux';
import authReducer from './authSlice';

const rootReducer = combineReducers({
    auth: authReducer,
});

export default rootReducer; 
