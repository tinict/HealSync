import React from "react";
import Header from "../Components/Header";
import PatientLookup from "../Components/PatientLookup";

function PatientLookupPage() {
    return (
        <div className="home-section">
            <Header />
            <PatientLookup />
        </div>
    );
}

export default PatientLookupPage;
