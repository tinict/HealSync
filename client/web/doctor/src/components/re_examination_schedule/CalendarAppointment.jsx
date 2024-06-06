import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { medicalRecord } from '../../features/medicalRecordSlice';
import { Modal, Typography, Button, Box, TextField, MenuItem, FormControl, InputLabel, Select } from '@mui/material';

export default function CalendarAppointment() {
    const [eventDetail, setEventDetail] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [appointmentCancelled, setAppointmentCancelled] = useState(false);
    const userInfo = useSelector(state => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const [timeSlots, setTimeSlots] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get(`http://localhost:5002/api/v1/re-examination-schedules?doctor_id=${userInfo.user.identity_id}`);
                const appointmentsData = response.data.filter(appointment => appointment.status === 1 || appointment.status === 6);
                console.log(appointmentsData);
                setAppointments(appointmentsData);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        fetchAppointments();

    }, []);

    const handleUpdateStatusAppointment = (appointment_id, status) => {
        axios.put('http://localhost:5002/api/v1/re-examination-schedules', {
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

    function getPatientIdFromUrl(urlString) {
        const url = new URL(urlString);
        const pathSegments = url.pathname.split("/");

        if (pathSegments.pop() === "created") {
            return pathSegments[pathSegments.length - 1];
        } else {
            console.error("URL format not recognized: /doctor/examination/<id>/created expected");
            return null;
        }
    };

    const handleCreateMedicalRecord = () => {
        navigate(`/examination/${eventDetail.extendedProps.details.customer_id}?type=re-examination&&appointment_id=${eventDetail.extendedProps.details.appointment_id}`);
        dispatch(medicalRecord({ appointment_id: eventDetail.extendedProps.details.id }));
        handleUpdateStatusAppointment(eventDetail.extendedProps.details.id, 6);
        handleCloseModal();
    };

    const handleJoinOnlineAppointment = () => {
        handleCloseModal();
    };

    const genderMapping = {
        1: 'Nam',
        2: 'Nữ',
        3: 'Giới tính khác'
    };

    const handleActionClick = () => {
        if (eventDetail && eventDetail.extendedProps && eventDetail.extendedProps.details) {
            const { eventType } = eventDetail.extendedProps.details;
            if (eventType === 'online') {
                handleJoinOnlineAppointment();
            } else {
                handleCreateMedicalRecord();
            }
        }
    };

    const getTimeSlots = () => {
        axios.get("http://localhost:5002/api/v1/timeslots", {
            params: {
                doctor_id: userInfo.user.identity_id,
                datework: selectedDate,
                typeSchedule: 1
            }
        })
            .then((res) => {
                setTimeSlots(res.data);
            })
    };

    const confirmAPIReExaminationSchedule = () => {
        axios.post("http://localhost:5002/api/v1/re-examination-schedules", {
            appointment_id: medicalRecord.appointment_id,
            timeslot_id: selectedTimeSlot.timeslot_id
        });
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleTimeSlotChange = (event) => {
        setSelectedTimeSlot(event.target.value);
    };

    useEffect(() => {
        getTimeSlots();
    }, [selectedDate]);

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
    };

    const handleCancelAppointment = () => {
        handleUpdateStatusAppointment(eventDetail.extendedProps.details.id, 5);
        setEventDetail(null);
    };

    const handleCancelEditModal = () => {
        handleUpdateStatusAppointment(eventDetail.extendedProps.details.id, 3);
        setEditModalOpen(false);
    };

    const handleChange = () => {
        confirmAPIReExaminationSchedule();
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
                    title: appointment.appointmentEntity.examinationRecordEntity?.firstname + ' ' + appointment.appointmentEntity.examinationRecordEntity?.lastname,
                    start: appointment.timeSlotEntity.scheduleEntity.datework + 'T' + appointment.timeSlotEntity.starttime,
                    end: appointment.timeSlotEntity.scheduleEntity.datework + 'T' + appointment.timeSlotEntity.endtime,
                    description: appointment.description,
                    details: {
                        id: appointment.appointmentEntity.appointment_id,
                        name: appointment.appointmentEntity.examinationRecordEntity?.firstname + ' ' + appointment.appointmentEntity.examinationRecordEntity?.lastname,
                        dob: appointment.appointmentEntity.examinationRecordEntity?.dob,
                        gender: appointment.appointmentEntity.examinationRecordEntity?.gender,
                        medicalHistory: appointment.appointmentEntity.examinationRecordEntity?.medicalHistory,
                        symptoms: appointment.appointmentEntity.examinationRecordEntity?.reasonForConsultation,
                        customer_id: appointment.appointmentEntity.customerEntity.customer_id,
                        appointment_id: appointment.appointmentEntity.appointment_id
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
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <Typography variant="h6" id="event-detail-modal-title" gutterBottom>
                        {eventDetail && eventDetail.title}
                    </Typography>
                    <Typography variant="body1" id="event-detail-modal-description" gutterBottom>
                        <strong>Họ và tên:</strong> {eventDetail && eventDetail.extendedProps.details.name}<br />
                        <strong>Ngày sinh:</strong> {eventDetail && eventDetail.extendedProps.details.dob}<br />
                        <strong>Giới tính:</strong> {eventDetail && genderMapping[eventDetail.extendedProps.details.gender]}<br />
                        <strong>Tiền sử bệnh:</strong> {eventDetail && eventDetail.extendedProps.details.medicalHistory}<br />
                        <strong>Dấu hiệu bệnh:</strong> {eventDetail && eventDetail.extendedProps.details.symptoms}
                    </Typography>
                    <Button
                        variant="contained"
                        color={eventDetail?.extendedProps?.details?.eventType === 'online' ? "primary" : "secondary"}
                        onClick={handleActionClick}
                    >
                        {eventDetail?.extendedProps?.details?.eventType === 'online' ? "Tham gia khám trực tuyến" : "Tạo bệnh án"}
                    </Button>
                    <Button variant="contained" onClick={handleCancelAppointment}>
                        Yêu cầu đổi lịch
                    </Button>
                    <Button variant="contained" onClick={handleCloseModal}>
                        Đóng
                    </Button>
                </Box>
            </Modal>
            <Modal
                open={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                aria-labelledby="edit-modal-title"
                aria-describedby="edit-modal-description"
            >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Đổi lịch tái khám
                    </Typography>
                    <TextField
                        id="date"
                        label="Chọn ngày tái khám"
                        type="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        fullWidth
                        sx={{ mt: 2 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    {selectedDate && (
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel id="time-slot-label">Chọn khung giờ khám</InputLabel>
                            <Select
                                labelId="time-slot-label"
                                id="time-slot-select"
                                value={selectedTimeSlot}
                                onChange={handleTimeSlotChange}
                                label="Chọn khung giờ khám"
                            >
                                {timeSlots.map((timeSlot, index) => (
                                    <MenuItem key={index} value={timeSlot}>
                                        {timeSlot.starttime} - {timeSlot.endtime}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                    <div>
                        <Button variant="contained" onClick={handleChange}>
                            Xác nhận đổi lịch
                        </Button>
                        <Button variant="contained" onClick={handleCancelEditModal}>
                            Hủy lịch
                        </Button>
                        <Button variant="contained" onClick={handleCloseEditModal}>
                            Đóng
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};
