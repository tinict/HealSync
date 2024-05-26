import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    datework: null,
    scheduleTypeId: 1,
};

const filterDoctorSlice = createSlice({
    name: 'filterDoctors',
    initialState,
    reducers: {
        filterDoctor (state, action) { 
            state.datework = action.payload.datework;
            state.scheduleTypeId = action.payload.scheduleTypeId;
        },
    },
});

export const { filterDoctor } = filterDoctorSlice.actions; 
export default filterDoctorSlice.reducer;