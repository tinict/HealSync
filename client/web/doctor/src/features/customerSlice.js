import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id_gg: null,
    name: null,
    familyname: null,
    url_picture: null,
    email: null
};

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        customer (state, action) {
            state.id_gg = action.payload.id_gg;
            state.name = action.payload.name;
            state.familyname = action.payload.familyname;
            state.url_picture = action.payload.url_picture;
            state.email = action.payload.email;
        }
    },
});

export const { customer } = customerSlice.actions;
export default customerSlice.reducer;