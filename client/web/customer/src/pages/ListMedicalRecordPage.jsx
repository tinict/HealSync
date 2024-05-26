import React from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import ListMedicalRecord from '../Components/ListMedicalRecord';
import { useParams } from 'react-router-dom';

function ListMedicalRecordPage() {
    let { appointment_id } = useParams();

    return (
        <div className="home-section">
            <Header />
            <ListMedicalRecord appointment_id={appointment_id} />
        </div>
    );
}

export default ListMedicalRecordPage;