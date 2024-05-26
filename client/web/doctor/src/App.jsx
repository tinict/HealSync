import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TimeTable from './pages/TimeTable';
import DynamicForm from './pages/DynamicForm';
import ManagerForm from './pages/MangerForm';
import LoginPage from './pages/LoginPage';
import IdentifyPage from './pages/IdentifyPage';
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './PrivateRoute';
import AppointmentSchedulPage from './pages/AppointmentSchedulePage';
import ThreadChatPage from './pages/ThreadChatPage';
import ChatPage from './pages/ChatPage';
import ExaminationPage from './pages/ExaminationPage';
import CreateMedicalPage from './pages/CreateMedicalPage';
import DoctorProfilePage from './pages/DoctorProfilePage';
import PatientPage from './pages/PatientPage';
import ReExaminationSchedulePage from './pages/ReExaminationSchedulePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

function App() {
  return (
    <Provider store={store}>
      <Router basename="/doctor">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/identify" element={<IdentifyPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/community" element={<ThreadChatPage />} />
          <Route path="/patients" element={<PatientPage />} />
          <Route path="/account/profile" element={<DoctorProfilePage />} />
          <Route path="/examination/:patient_id" element={<ExaminationPage />} />
          <Route path="/examination/:patient_id/create" element={<CreateMedicalPage />} />
          <Route path="/community/chat/:thread" element={<PrivateRoute><ChatPage /></PrivateRoute>} />
          <Route path="/timetable" element={<PrivateRoute><TimeTable /></PrivateRoute>} />
          <Route path="/dynamicform" element={<PrivateRoute><DynamicForm /></PrivateRoute>} />
          <Route path="/managerform" element={<PrivateRoute><ManagerForm /></PrivateRoute>} />
          <Route path="/appointment-schedule" element={<PrivateRoute><AppointmentSchedulPage /></PrivateRoute>} />
          <Route path="/re-examination-schedules" element={<PrivateRoute><ReExaminationSchedulePage /></PrivateRoute>} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
