import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dateScheduleDoctor: null,
};

const dateScheduleDoctorSlice = createSlice({
    name: 'dateScheduleDoctorSlice',
    initialState,
    reducers: {
        dateScheduleDoctor(state, action) {
            state.date = action.payload;
        },
    },
});

export const { dateScheduleDoctor } = dateScheduleDoctorSlice.actions; 
export default dateScheduleDoctorSlice.reducer;
