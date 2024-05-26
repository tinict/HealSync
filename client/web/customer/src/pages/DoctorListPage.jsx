import React from "react";
import Header from "../Components/Header";
import DoctorList from "../Components/DoctorList";

function DoctorListPage() {
    return (
        <div className="home-section">
            <Header />
            <DoctorList />
        </div>
    );
};

export default DoctorListPage;
