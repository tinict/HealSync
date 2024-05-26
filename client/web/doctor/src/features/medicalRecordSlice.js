import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    patient_id: null,
    pathname: null,
    appointment_id: null
};

const medicalRecordSlice = createSlice({
    name: 'medicalRecord',
    initialState,
    reducers: {
        medicalRecord (state, action) {
            state.patient_id = action.payload.patient_id;
            state.pathname = action.payload.pathname;
            state.appointment_id = action.payload.appointment_id;
        }
    },
});

export const { medicalRecord } = medicalRecordSlice.actions;
export default medicalRecordSlice.reducer;