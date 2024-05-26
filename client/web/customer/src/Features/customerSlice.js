import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    customer_id: null,
    name: null,
    family_name: null,
    url_picture: null,
    email: null
};

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        customer (state, action) {
            state.customer_id = action.payload.customer_id;
            state.name = action.payload.name;
            state.family_name = action.payload.family_name;
            state.url_picture = action.payload.url_picture;
            state.email = action.payload.email;
        }
    },
});

export const { customer } = customerSlice.actions;
export default customerSlice.reducer;