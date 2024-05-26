import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    firstname: null,
    lastname: null,
    email: null,
    phone: null,
    dob: null,
    gender: null,
    datetime: null,
    timeslot: null,
    doctor: null,
    cost: null,
    location: null,
    appointment_id: null
};

const examinationSlice = createSlice({
    name: 'examination',
    initialState,
    reducers: {
        setExamination (state, action) {
            state.firstname = action.payload.firstname;
            state.lastname = action.payload.lastname;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.dob = action.payload.dob;
            state.gender = action.payload.gender;
            state.datetime = action.payload.datetime;
            state.timeslot = action.payload.timeslot;
            state.doctor = action.payload.doctor;
            state.cost = action.payload.cost;
            state.location = action.payload.location;
            state.appointment_id = action.payload.appointment_id
        }
    },
});

export const { setExamination } = examinationSlice.actions;
export default examinationSlice.reducer;