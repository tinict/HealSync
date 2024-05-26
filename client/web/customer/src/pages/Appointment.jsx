import React from "react";
import AppointmentForm from "../Components/AppointmentForm";
import Header from "../Components/Header";
import BreadCrumb from "../Components/BreadCrumb";

function Appointment() {
  return (
    <>
      <Header />
      <BreadCrumb />
      <AppointmentForm/>
    </>
  )
}

export default Appointment;
