import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    doctors: [],
};

const doctorsSlice = createSlice({
    name: 'doctors',
    initialState,
    reducers: {
        doctors(state, action) {
            state.doctors = action.payload;
        },
    },
});

export const { doctors } = doctorsSlice.actions; 
export default doctorsSlice.reducer;
