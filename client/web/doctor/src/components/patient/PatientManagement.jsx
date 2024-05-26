import * as React from "react";
import { Box, Typography, Button, Divider, Modal } from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

export default function PatientManagement() {
    const [appointments, setAppointments] = React.useState([]);
    const userInfo = useSelector(state => state.auth.user);

    const fetchApiPatients = () => {
        axios.get(`http://localhost:5002/api/v1/patients/${userInfo.user.identity_id}`)
            .then((res) => {
                console.log(res.data);
                setAppointments(res.data.filter(appointment => appointment.status_appointment === 2));
            })
    };

    React.useEffect(() => {
        fetchApiPatients();
    }, []);

    return (
        <div>
            {appointments.map((appointment) => (
                <AppointmentBox key={appointment.id} appointment={appointment} />
            ))}
        </div>
    );
}

function AppointmentBox({ appointment }) {
    const [showDetails, setShowDetails] = React.useState(false);
    const [medicalRecords, setMedicalRecords] = React.useState([]);
    const [showModalForm, setShowModalForm] = React.useState(false);
    const [seletedMedicalRecord, setSeletedMedicalRecord] = React.useState([]);

    const fetchAPIMedicalRecords = async (appointmentPatient) => {
        const MEDICAL_RECORDS_API = `http://localhost:5002/api/v1/medical-records/${appointmentPatient.customer_id}`;
    
        try {
            const response = await axios.get(MEDICAL_RECORDS_API);
            console.log(response.data);
            setMedicalRecords(response.data.filter(appointment => 
                appointment.appointmentEntity.status_appointment === 2 &&
                appointment.appointmentEntity.appointment_id === appointmentPatient.appointment_id
            ));
        } catch (error) {
            if (error.response) {
                console.error('Error fetching medical records:', error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error', error.message);
            }
        }
    };

    const handleToggleDetails = (appointment) => {
        setShowDetails(!showDetails);
        fetchAPIMedicalRecords(appointment);
    };

    const closeModalForm = () => {
        setShowModalForm(false);
    };

    const viewMedicalRecod = async (pathname) => {
        const response = await axios.get(`http://localhost:5003/api/v1/media/readfile-pdf?rf=${pathname}`);
        setShowModalForm(true);
        setSeletedMedicalRecord(pathname);
    };

    return (
        <Box sx={{ p: 2, mb: 2, border: '1px solid #ccc', borderRadius: 5 }}>
            <Typography variant="h5">{appointment.firstname} {appointment.lastname}</Typography>
            <Typography>Mã bệnh nhân: {appointment.appointment_id}</Typography>
            <Typography>Ngày sinh: {appointment.dob}</Typography>
            <Typography>Ngày khám: {appointment.datework}</Typography>
            <Typography>Hình thuc kham: {appointment.typeSchedule}</Typography>
            <Typography>Tiền sử bệnh: {appointment.medicalHistory}</Typography>
            <Typography>Lý do khám: {appointment.reasonForConsultation}</Typography>
            <Button onClick={() => handleToggleDetails(appointment)} variant="outlined" size="small" sx={{ mt: 2 }}>
                {showDetails ? "Thu gọn" : "Xem chi tiết"}
            </Button>
            {showDetails && (
                medicalRecords.map((record) => (
                    <>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ p: 2, mb: 2, border: '1px solid #ccc', borderRadius: 5 }}>
                            <Typography variant="h6">Mã giấy khám: {record.medical_record_id}</Typography>
                            <Typography>Ngày tạo: {record.createdAt}</Typography>
                            <Button onClick={() => viewMedicalRecod(record.diagnostic_records)} variant="outlined" size="small" sx={{ mt: 2 }}>Xem ngay</Button>
                        </Box>
                        <Modal open={showModalForm} onClose={closeModalForm}>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
                                <Typography variant="h6" gutterBottom>Chi tiết chẩn đoán</Typography>
                                <iframe
                                    src={`https://docs.google.com/viewer?url=${encodeURIComponent(`https://mediahealsyc.s3.ap-southeast-1.amazonaws.com/${seletedMedicalRecord}`)}&embedded=true`}
                                    style={{ width: '100%', height: '500px' }}
                                >
                                </iframe>
                                <Button variant="contained" onClick={closeModalForm}>Close</Button>
                            </div>
                        </Modal>
                    </>
                ))
            )}
        </Box>
    );
}
