import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
// import "./App.css";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Appointment from "./pages/Appointment";
import ListDoctor from "./pages/ListDoctor";
import Payment from "./pages/Payment";
import { Provider } from 'react-redux';
import store from './store';
import InvoiceManager from "./pages/InvoiceManager";
import Record from "./pages/Record";
import AppointmentManager from "./pages/AppointmentManager";
import { Community } from "./pages/Community";
import { ChatPage } from "./pages/ChatPage";
import ProfilePage from "./pages/ProfilePage";
import ListMedicalRecordPage from "./pages/ListMedicalRecordPage";
import DoctorProfilePage from "./pages/DoctorProfilePage";
import ReExaminationSchedulePage from "./pages/ReExaminationSchedulePage";
import RefundPage from "./pages/RefundPage";
import PatientLookupPage from "./pages/PatientLookupPage";
import DoctorListPage from "./pages/DoctorListPage";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router basename="/">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/appointment"
              element={
                <PrivateRoute>
                  <Appointment />
                </PrivateRoute>
              }
            />
            <Route
              path="/appointment/payment"
              element={
                <PrivateRoute>
                  <Payment />
                </PrivateRoute>
              }
            />
            <Route
              path="/account/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/invoices"
              element={
                <PrivateRoute>
                  <InvoiceManager />
                </PrivateRoute>
              }
            />
            <Route path="/doctors" element={<ListDoctor />} />
            <Route
              path="/list-doctor"
              element={
                <DoctorListPage />
              }
            />
            <Route
              path="/patient-lookup"
              element={
                <PrivateRoute>
                  <PatientLookupPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/doctors/profile/:doctor_id"
              element={
                <DoctorProfilePage />
              }
            />
            <Route
              path="/medical-records"
              element={
                <PrivateRoute>
                  <Record />
                </PrivateRoute>
              }
            />
            <Route
              path="/refunds"
              element={
                <PrivateRoute>
                  <RefundPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/medical-records/detail/:appointment_id"
              element={
                <PrivateRoute>
                  <ListMedicalRecordPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/manager-appointment"
              element={
                <PrivateRoute>
                  <AppointmentManager />
                </PrivateRoute>
              }
            />
            <Route
              path="/re-examination-schedules"
              element={
                <PrivateRoute>
                  <ReExaminationSchedulePage />
                </PrivateRoute>
              }
            />
            <Route path="/community" element={<Community />} />
            <Route
              path="/community/chat/:thread"
              element={
                <PrivateRoute>
                  <ChatPage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
