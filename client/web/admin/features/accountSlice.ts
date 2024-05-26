import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    account_id: null,
    name: null,
    family_name: null,
    url_picture: null,
    email: null
};

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        account (state, action) {
            state.account_id = action.payload.account_id;
            state.name = action.payload.name;
            state.family_name = action.payload.family_name;
            state.url_picture = action.payload.url_picture;
            state.email = action.payload.email;
        }
    },
});

export const { account } = accountSlice.actions;
export default accountSlice.reducer;