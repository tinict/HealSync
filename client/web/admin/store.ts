import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import accountReducer from './features/accountSlice';

let preloadedState = { user: null, isAuthenticated: false, token: null };

if (typeof sessionStorage !== 'undefined') {
    preloadedState = JSON.parse(sessionStorage.getItem('auth') as string) || preloadedState;
}

export default configureStore({
    reducer: {
        auth: authReducer,
        account: accountReducer,
    },
    preloadedState: { auth: preloadedState },
});