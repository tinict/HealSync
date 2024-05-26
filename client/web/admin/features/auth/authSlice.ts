import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    isAuthenticated: false,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action) {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            sessionStorage.setItem('auth', JSON.stringify(state));
        },
        loginFailure(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            sessionStorage.setItem('auth', JSON.stringify(state));
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            sessionStorage.setItem('auth', JSON.stringify(state));
        },
    },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;