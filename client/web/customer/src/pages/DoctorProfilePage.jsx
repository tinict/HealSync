import React from "react";
import Header from "../Components/Header";
import DoctorProfile from "../Components/DoctorProfile";
import { useParams } from 'react-router-dom';

function DoctorProfilePage() {
    let { doctor_id } = useParams();

    return (
        <div className="home-section">
            <Header />
            <DoctorProfile doctor_id={doctor_id}/>
        </div>
    );
}

export default DoctorProfilePage;
