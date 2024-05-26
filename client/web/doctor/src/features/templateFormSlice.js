import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    formname: null,
    pathname: null,
};

const templateFormSlice = createSlice({
    name: 'templateform',
    initialState,
    reducers: {
        templateform (state, action) {
            state.formname = action.payload.formname;
            state.pathname = action.payload.pathname;
        }
    },
});

export const { templateform } = templateFormSlice.actions;
export default templateFormSlice.reducer;