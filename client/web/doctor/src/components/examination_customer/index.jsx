import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, List, ListItem, ListItemText, Typography, Box, Container, Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { medicalRecord } from '../../features/medicalRecordSlice';
import { useNavigate } from 'react-router-dom';
import { Document, Page } from 'react-pdf';
import ModalReExamination from './ModalReExamination';
import { format } from 'date-fns';
import Collapse from '@mui/material/Collapse';
import { useLocation } from "react-router-dom";
import PatientReExaminationInfoModal from '../re_examination_schedule/PatientReExaminationInfoModal';

function ExaminationCustomer({ patient_id }) {
    const userInfo = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [formList, setFormList] = useState([{}]);
    const navigate = useNavigate();
    const medicalRecs = useSelector(state => state.medicalRecord);
    const [showModalForm, setShowModalForm] = useState(false);
    const [fileContent, setFileContent] = useState("");
    const [seletedMedicalRecord, setSeletedMedicalRecord] = useState([]);
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const typeExamination = queryParams.get('type');
    const appointment_id = queryParams.get('appointment_id');
    const [patientInfo, setPatientInfo] = useState([]);

    dispatch(medicalRecord({ ...medicalRecs, patient_id }));

    const MEDICAL_RECORDS_API = `http://localhost:5002/api/v1/medical-records/${patient_id}`;

    const fetchAPIMedicalRecords = async () => {
        try {
            const response = await axios.get(MEDICAL_RECORDS_API);
            setMedicalRecords(response.data);
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

    useEffect(() => {
        fetchAPIMedicalRecords();
        fetchFiles();
        if (typeExamination === "re-examination") {
            axios.get(`http://localhost:5002/api/v1/medical/records?customer_id=${patient_id}&&appointment_id=${appointment_id}`)
                .then(response => {
                    setPatientInfo({
                        name: `${response.data[0].appointmentEntity.examinationRecordEntity.firstname} ${response.data[0].appointmentEntity.examinationRecordEntity.lastname}`,
                        gender: response.data[0].appointmentEntity.examinationRecordEntity.gender === 1 ? 'Nam' : 'Nữ',
                        dob: format(new Date(response.data[0].appointmentEntity.examinationRecordEntity.dob), 'dd/MM/yyyy'),
                        address: response.data[0].appointmentEntity.examinationRecordEntity.address,
                        medicalHistory: response.data[0].appointmentEntity.examinationRecordEntity.medicalHistory,
                        patientId: response.data[0].appointmentEntity.examinationRecordEntity.examination_record_id,
                        visitDate: format(new Date(response.data[0].appointmentEntity.update_at), 'dd/MM/yyyy'),
                        visitDate: '15/05/2024',
                        followUpDate: '25/05/2024',
                    });
                });
        }
    }, []);

    const handleUseForm = (formPathName) => {
        navigate(`/examination/${patient_id}/create`);
        dispatch(medicalRecord({ ...medicalRecs, patient_id, pathname: formPathName }));
    };

    const closeModalForm = () => {
        setShowModalForm(false);
    };

    const fetchFiles = async () => {
        try {
            const response = await axios.get(`http://localhost:5002/api/v1/forms/${userInfo.user.identity_id}`);
            const fileNames = response.data.map(file => ({
                id: file.form_id,
                pathname: file.filepath,
                name: file.formname,
                createdAt: file.createdAt
            }));
            console.log(fileNames);
            setFormList(fileNames);
        } catch (error) {
            console.error('Failed to fetch files:', error);
        }
    };

    const viewMedicalRecod = async (pathname) => {
        const response = await axios.get(`http://localhost:5003/api/v1/media/readfile-pdf?rf=${pathname}`);

        setFileContent(response.data.content);
        setShowModalForm(true);
        setSeletedMedicalRecord(pathname);
    };

    const handlEndExamination = () => {
        axios.post('http://localhost:5002/api/v1/appointments/status', {
            "appointment_id": medicalRecs.appointment_id,
            "status": 2
        });
        navigate("/appointment-schedule");
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [openForm, setOpenForm] = useState(true);

    const handleToggleForm = () => {
        setOpenForm(!openForm);
    };

    const [openExaminationRecord, setOpenExaminationRecord] = useState(false);

    const handleToggleExaminationRecord = () => {
        setOpenExaminationRecord(!openExaminationRecord);
    };

    // const patientInfo = {
    //     name: 'Nguyễn Văn A',
    //     gender: 'Nam',
    //     dob: '01/01/1990',
    //     address: '123 Đường ABC, Phường XYZ, Quận 1, TP.HCM',
    //     medicalHistory: 'Tiểu đường, Cao huyết áp',
    //     patientId: '123456',
    //     visitDate: '15/05/2024',
    //     followUpDate: '25/05/2024',
    //     diagnosis: 'Viêm phổi',
    // };

    return (
        <div>
            <Typography variant="h5" gutterBottom component="div">
                Tạo hồ sơ bệnh án
            </Typography>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                gap={2}
                mt={3}
                sx={{
                    backgroundColor: '#f0f0f0',
                    p: 2,
                    borderRadius: 1,
                }}
            >
                {
                    typeExamination !== "re-examination" && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleOpen}
                            sx={{
                                textTransform: 'none',
                                backgroundColor: '#1976d2',
                                '&:hover': { backgroundColor: '#115293' },
                                boxShadow: '0 3px 5px 2px rgba(25, 118, 210, .3)',
                            }}
                        >
                            Tạo lịch hẹn tái khám
                        </Button>
                    )
                }
                {
                    typeExamination === "re-examination" && (
                        <PatientReExaminationInfoModal patientInfo={patientInfo} />
                    )
                }
                <Button
                    variant="contained"
                    color="success"
                    onClick={handlEndExamination}
                    sx={{
                        textTransform: 'none',
                        backgroundColor: '#1976d2',
                        '&:hover': { backgroundColor: '#115293' },
                        boxShadow: '0 3px 5px 2px rgba(76, 175, 80, .3)',
                    }}
                >
                    Hoàn thành
                </Button>
            </Box>
            <ModalReExamination open={open} handleClose={handleClose} />

            <Typography
                variant="h6"
                gutterBottom
                component="div"
                onClick={handleToggleForm}
                sx={{ cursor: 'pointer' }}
            >
                Danh sách biểu mẫu
            </Typography>
            <Collapse in={openForm}>
                <List
                    style={{
                        display: 'flex',
                        gap: '5px',
                        padding: '10px',
                        width: "100%"
                    }}
                >
                    {formList.map(form => (
                        <ListItem
                            key={form.id}
                            sx={{
                                width: 300,
                                flex: '0 0 auto',
                                m: 1
                            }}
                        >
                            <Box sx={{
                                padding: 2,
                                borderRadius: 2,
                                border: '1px solid #ccc',
                                backgroundColor: '#f9f9f9',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                textAlign: 'left'
                            }}>
                                <Box sx={{ marginBottom: 1 }}>
                                    <ListItemText primary={`Tên mẫu: ${form.name}`} />
                                </Box>
                                <Box sx={{ marginBottom: 1 }}>
                                    <ListItemText primary={`Mã mẫu: ${form.id}`} />
                                </Box>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleUseForm(form.pathname)}
                                    sx={{ textTransform: 'none' }}
                                >
                                    Sử dụng
                                </Button>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </Collapse>
            <Typography
                variant="h6"
                gutterBottom
                component="div"
                style={{ marginTop: '20px' }}
                onClick={handleToggleExaminationRecord}
                sx={{ cursor: 'pointer' }}
            >
                Bệnh án của bệnh nhân
            </Typography>
            <Collapse in={openExaminationRecord}>
                <List style={{ display: 'flex', gap: '5px', padding: '10px', width: "100%" }}>
                    {medicalRecords.map(form => (
                        <ListItem key={form.id} style={{ width: '350px', flex: '0 0 auto' }}>
                            <Box style={{ padding: '20px', borderRadius: '12px', border: '1px solid #ccc', background: '#f9f9f9', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                <ListItemText primary={form.createAt} />
                                <Box sx={{ marginBottom: 1 }}>
                                    <ListItemText primary={`Mã bệnh nhân: ${form.appointmentEntity.examinationRecordEntity.examination_record_id}`} />
                                </Box>
                                <Box sx={{ marginBottom: 1 }}>
                                    <ListItemText primary={`Họ tên bệnh nhân: ${form.appointmentEntity.examinationRecordEntity.firstname} ${form.appointmentEntity.examinationRecordEntity.lastname}`} />
                                </Box>
                                <Box sx={{ marginBottom: 1 }}>
                                    <ListItemText primary={`Giới tính: ${form.appointmentEntity.examinationRecordEntity.gender}`} />
                                </Box>
                                <Box sx={{ marginBottom: 1 }}>
                                    <ListItemText primary={`Ngày sinh: ${form.appointmentEntity.examinationRecordEntity.dob}`} />
                                </Box>
                                <Box sx={{ marginBottom: 1 }}>
                                    <ListItemText primary={`Mã hồ sơ: ${form.medical_record_id}`} />
                                </Box>
                                <Box sx={{ marginBottom: 1 }}>
                                    <ListItemText primary={`Bác sĩ khám: ${form.doctorEntity.firstname} ${form.doctorEntity.lastname}`} />
                                </Box>
                                <Button variant="contained" color="primary" onClick={() => viewMedicalRecod(form.diagnostic_records)}>Xem hồ sơ</Button>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </Collapse>
            <Modal open={showModalForm} onClose={closeModalForm}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
                    <Typography variant="h6" gutterBottom>Xem nội dung giấy khám</Typography>
                    <iframe
                        src={`https://docs.google.com/viewer?url=${encodeURIComponent(`https://mediahealsyc.s3.ap-southeast-1.amazonaws.com/${seletedMedicalRecord}`)}&embedded=true`}
                        style={{ width: '100%', height: '500px' }}
                    >
                    </iframe>
                    <Button variant="contained" onClick={closeModalForm}>Đóng</Button>
                </div>
            </Modal>
        </div>
    );
}

export default ExaminationCustomer;
