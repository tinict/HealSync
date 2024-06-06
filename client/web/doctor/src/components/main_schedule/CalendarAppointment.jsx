import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Modal, Typography, Button, Box, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { medicalRecord } from '../../features/medicalRecordSlice';

export default function CalendarAppointment() {
    const [eventDetail, setEventDetail] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [appointmentCancelled, setAppointmentCancelled] = useState(false);
    const userInfo = useSelector(state => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get(`http://localhost:5002/api/v1/appointments/doctor/${userInfo.user.identity_id}`);
                const appointmentsData = response.data.filter(appointment => appointment.status_appointment === 1 || appointment.status_appointment === 5);
                console.log(appointmentsData);
                setAppointments(appointmentsData);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        fetchAppointments();

    }, []);

    const handleUpdateStatusAppointment = (appointment_id, status) => {
        axios.post('http://localhost:5002/api/v1/appointments/status', {
            "appointment_id": appointment_id,
            "status": status
        });
    };

    const handleEventClick = (clickInfo) => {
        setEventDetail(clickInfo.event);
    };

    const handleCloseModal = () => {
        setEventDetail(null);
    };

    const handleCreateMedicalRecord = () => {
        console.log(eventDetail.extendedProps);
        navigate(`/examination/${eventDetail.extendedProps.details.customer_id}`);
        dispatch(medicalRecord({ appointment_id: eventDetail.extendedProps.details.id }));
        handleCloseModal();
    };

    const handleJoinOnlineAppointment = (meetLink) => {
        console.log("Tham gia khám trực tuyến");
        if (meetLink === null) alert('Hệ thống đặt lịch tư vấn Online có thể đã xảy ra lỗi. Xin lỗi vì sự bất tiện này.');
        else window.open(meetLink, '_blank', 'rel=noopener noreferrer');
        handleCloseModal();
    };

    const handleCancelAppointment = () => {
        handleUpdateStatusAppointment(eventDetail.extendedProps.details.id, 4);
        setEventDetail(null);
    };

    const handleNoComeAppointment = () => {
        handleUpdateStatusAppointment(eventDetail.extendedProps.details.id, 6);
        setEventDetail(null);
    };

    const genderMapping = {
        1: 'Nam',
        2: 'Nữ',
        3: 'Giới tính khác'
    };

    const handleActionClick = () => {
        if (eventDetail && eventDetail.extendedProps && eventDetail.extendedProps.details) {
            const { eventType, meetLink, id } = eventDetail.extendedProps.details;
            if (eventType === 2) {
                handleJoinOnlineAppointment(meetLink);
            } else {
                handleCreateMedicalRecord();
                axios.post('http://localhost:5002/api/v1/appointments/status', {
                    "appointment_id": id,
                    "status": 5
                });
            }
        }
    };

    const handleExaminationAppointment = () => {
        handleUpdateStatusAppointment(eventDetail.extendedProps.details.id, 2);
        setEventDetail(null);
    };

    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                events={appointments.map(appointment => ({
                    title: "Bệnh nhân " + appointment.firstname + " " + appointment.lastname,
                    date: appointment.datework,
                    start: new Date(`${appointment.datework}T${appointment.starttime}`),
                    end: new Date(`${appointment.datework}T${appointment.starttime}`),
                    description: appointment.description,
                    details: {
                        id: appointment.appointment_id,
                        name: appointment.firstname + " " + appointment.lastname,
                        medicalHistory: appointment.medicalHistory,
                        symptoms: appointment.reasonForConsultation,
                        eventType: appointment.typeSchedule,
                        customer_id: appointment.customer_id,
                        meetLink: appointment.meetLink
                    },
                    extendedProps: {
                        cancelled: appointmentCancelled
                    }
                }))}
                eventClick={handleEventClick}
            />
            <Modal
                open={Boolean(eventDetail)}
                onClose={handleCloseModal}
                aria-labelledby="event-detail-modal-title"
                aria-describedby="event-detail-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    boxShadow: 24,
                    borderRadius: 4,
                    p: 4,
                }}>
                    <Typography variant="h6" id="event-detail-modal-title" gutterBottom>
                        {eventDetail && eventDetail.title}
                    </Typography>
                    <Typography variant="body1" id="event-detail-modal-description" gutterBottom>
                        <strong>Họ và tên:</strong> {eventDetail && eventDetail.extendedProps.details.name}<br />
                        <strong>Tiền sử bệnh:</strong> {eventDetail && eventDetail.extendedProps.details.medicalHistory}<br />
                        <strong>Dấu hiệu bệnh:</strong> {eventDetail && eventDetail.extendedProps.details.symptoms}
                    </Typography>
                    <Button
                        variant="contained"
                        color={eventDetail?.extendedProps?.details?.eventType === 2 ? "primary" : "secondary"}
                        onClick={handleActionClick}
                    >
                        {eventDetail?.extendedProps?.details?.eventType === 2 ? "Tham gia tư vấn trực tuyến" : "Tạo bệnh án"}
                    </Button>
                    <Button variant="contained" onClick={handleCancelAppointment}>
                        Yêu cầu đổi lịch
                    </Button>
                    <Button variant="contained" onClick={handleNoComeAppointment}>
                        Không đến khám
                    </Button>
                    {
                        eventDetail?.extendedProps?.details?.eventType === 2 && (
                            <Button variant="contained" onClick={handleExaminationAppointment}>
                                Đã tham gia khám
                            </Button>
                        )
                    }
                    <Button variant="contained" onClick={handleCloseModal}>
                        Đóng
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};
