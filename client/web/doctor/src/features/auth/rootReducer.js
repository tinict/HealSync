import { combineReducers } from 'redux';
import authReducer from './authSlice';
import templateFormReducer from '../templateFormSlice';
import medicalRecordReducer from '../medicalRecordSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  templateform: templateFormReducer,
  medicalRecord: medicalRecordReducer
});

export default rootReducer; 
