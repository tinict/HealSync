import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import customerReducer from './features/customerSlice'
import templateFormReducer from './features/templateFormSlice';
import medicalRecordReducer from './features/medicalRecordSlice';

export default configureStore({
    reducer: {
        auth: authReducer,
        customer: customerReducer,
        templateform: templateFormReducer,
        medicalRecord: medicalRecordReducer
    },
});