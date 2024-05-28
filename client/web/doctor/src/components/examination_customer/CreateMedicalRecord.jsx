import React, { useRef, useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import axios from 'axios';
import jsPDF from 'jspdf';
import { useDispatch, useSelector } from 'react-redux';
import { Toolbar, Button, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CreateMedicalRecord({ patient_id }) {
    const userInfo = useSelector(state => state.auth.user);
    const medicalRecord = useSelector(state => state.medicalRecord);
    const [formHTML, setFormHtml] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const generateContentForm = async (pathname) => {
        console.log(pathname);
        try {
            const response = await axios.get(`http://localhost:5003/api/v1/media/file?rf=${pathname}`);
            console.log(response.data);
            setFormHtml(response.data.content);
        } catch (error) {
            console.error('Failed to read file:', error);
        }
    };

    useEffect(() => {
        generateContentForm(medicalRecord.pathname);
    }, []);

    const componentRef = useRef();

    const generatePDF = () => {
        html2canvas(componentRef.current)
            .then(
                (canvas) => {
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF();
                    const imgWidth = 210;
                    const imgHeight = (canvas.height * imgWidth) / canvas.width;
                    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                    pdf.save('generated.pdf');
                }
            );
    };

    const getPatientIdFromUrl = (urlString) => {
        console.log(window.location.href);
        const url = new URL(window.location.href);
        const pathSegments = url.pathname.split("/");

        if (pathSegments.pop() === "create") {
            console.log(pathSegments[pathSegments.length - 1]);
            return pathSegments[pathSegments.length - 1];
        } else {
            console.error("URL format not recognized: /doctor/examination/<id>/created expected");
            return null;
        }
    };

    console.log(medicalRecord.appointment_id);

    const handleUploadPDF = () => {
        html2canvas(componentRef.current)
            .then(
                (canvas) => {
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF();
                    const imgWidth = 210;
                    const imgHeight = (canvas.height * imgWidth) / canvas.width;
                    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

                    const blob = pdf.output('blob');
                    console.log(blob);
                    const formData = new FormData();

                    formData.append('patient_id', medicalRecord.patient_id);
                    formData.append('user_id', userInfo.user.identity_id);
                    formData.append('event_message', "medicalRecordMessage");
                    formData.append('appointment_id', medicalRecord.appointment_id);
                    formData.append('filename', `${medicalRecord.patient_id}`);
                    formData.append('file', blob, `${medicalRecord.patient_id}.pdf`);

                    axios.post(
                        'http://localhost:5003/api/v1/media/upload/singlefile',
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }
                    )
                        .then(response => {
                            console.log('File uploaded successfully:', response.data);
                            navigate(`/examination/${getPatientIdFromUrl()}`);
                        })
                        .catch(error => {
                            console.error('Error uploading file:', error);
                        });
                }
            );
    };

    return (
        <Container>
            <Box sx={{ backgroundColor: 'white' }}>
                <Toolbar sx={{ backgroundColor: 'white', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button onClick={() => { navigate(`/examination/${getPatientIdFromUrl()}`) }} variant="contained" color="primary" size="small">Quay lại</Button>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button onClick={generatePDF} variant="contained" color="primary" sx={{ ml: 1 }} size="small">Tải bệnh án</Button>
                        <Button onClick={handleUploadPDF} variant="contained" color="primary" sx={{ ml: 1 }} size="small">Lưu bệnh án</Button>
                    </Box>
                </Toolbar>
                <Box sx={{ p: 3 }}>
                    <div ref={componentRef} dangerouslySetInnerHTML={{ __html: formHTML }} />
                </Box>
            </Box>
        </Container>
    );
};

export default CreateMedicalRecord;
