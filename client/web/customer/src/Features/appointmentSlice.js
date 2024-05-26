import { createSlice } from '@reduxjs/toolkit';

const appointmentSlice = createSlice({
    name: 'appointment',
    initialState: { 
        date: null, 
        time: null, 
        cost: null,
        doctor_id: null,
        doctor_name: null,
        location: null,
        schedule_type_id: null,
        url_picture: null
    },
    reducers: {
        setAppointment: (state, action) => {
            state.date = action.payload.date;
            state.time = action.payload.time;
            state.cost = action.payload.cost;
            state.doctor_id = action.payload.doctor_id;
            state.doctor_name = action.payload.doctor_name;
            state.location = action.payload.location;
            state.schedule_type_id = action.payload.schedule_type_id;
            state.url_picture = action.payload.url_picture;
        },
    },
});

export const { setAppointment } = appointmentSlice.actions;

export default appointmentSlice.reducer;