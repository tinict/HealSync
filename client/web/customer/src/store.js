import { configureStore } from '@reduxjs/toolkit';
import appointmentReducer from './Features/appointmentSlice.js';
import authReducer from './Features/auth/authSlice';
import customerReducer from './Features/customerSlice'
import doctorsReducer from './Features/doctorsSlice.js';
import dateScheduleDoctorReducer from './Features/dateScheduleDoctorSlice.js';
import filterDoctorReducer from './Features/filterDoctorSlice.js';
import examinationReducer from './Features/examinationSlice.js';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};


const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch { }
};

const preloadedState = loadState();

const store = configureStore({
    reducer: {
        appointment: appointmentReducer,
        auth: authReducer,
        customer: customerReducer,
        doctors: doctorsReducer,
        dateScheduleDoctor: dateScheduleDoctorReducer,
        filterDoctor: filterDoctorReducer,
        examination: examinationReducer
    },
    preloadedState,
});

store.subscribe(() => {
    saveState(store.getState());
});

export default store;