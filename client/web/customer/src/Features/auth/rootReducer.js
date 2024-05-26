import { combineReducers } from 'redux';
import authReducer from './authSlice';
import customerReducer from './customerSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  customer: customerReducer,
});

export default rootReducer;
