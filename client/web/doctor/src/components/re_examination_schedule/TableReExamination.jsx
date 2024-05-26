import * as React from "react";
import { Modal, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Button, Select, TextField, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

export default function TableReExamination() {
    const [appointments, setAppointments] = React.useState([]);
    const userInfo = useSelector(state => state.auth.user);
    const [editModalOpen, setEditModalOpen] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = React.useState('');
    const [timeSlots, setTimeSlots] = React.useState([]);
    const [selectedAppointment, setSelectedAppointment] = React.useState([]);

    const fetchApiPatients = () => {
        axios.get(`http://localhost:5002/api/v1/re-examinations?doctor_id=${userInfo.user.identity_id}`)
            .then((res) => {
                setAppointments(res.data);
            })
    };

    React.useEffect(() => {
        fetchApiPatients();
    }, []);

    const statusMap = {
        1: { text: "Chưa tái khám", color: "blue" },
        2: { text: "Đã đến tái khám", color: "green" },
        3: { text: "Hủy tái khám", color: "red" },
        4: { text: "Không đến tái khám", color: "red" },
        5: { text: "Chưa có lịch khám", color: "red" },
    };

    const handleChangeAppointment = (appointment) => {
        setSelectedAppointment(appointment);
        setEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
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
        axios.put("http://localhost:5002/api/v1/re-examination-schedules", {
            appointment_id: selectedAppointment.appointmentEntity.appointment_id,
            timeslot_id: selectedTimeSlot.timeslot_id,
            status: 1   
        });
    };

    React.useEffect(() => {
        getTimeSlots();
    }, [selectedDate]);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleTimeSlotChange = (event) => {
        setSelectedTimeSlot(event.target.value);
    };

    const handleCancelEditModal = () => {
        axios.put("http://localhost:5002/api/v1/re-examination-schedules", {
            appointment_id: selectedAppointment.appointmentEntity.appointment_id,
            status: 3   
        });

        setEditModalOpen(false);
        fetchApiPatients();
    };

    const handleChange = () => {
        confirmAPIReExaminationSchedule();
        setEditModalOpen(false);
        fetchApiPatients();
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Trạng thái</TableCell>
                        <TableCell>Họ đệm người bệnh</TableCell>
                        <TableCell>Tên người bệnh</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Số điện thoại người bệnh</TableCell>
                        <TableCell>Giới tính</TableCell>
                        <TableCell>Ngày sinh</TableCell>
                        <TableCell>Nghề nghiệp</TableCell>
                        <TableCell>Địa chỉ</TableCell>
                        <TableCell>Tiền sử</TableCell>
                        <TableCell>Lý do khám bệnh</TableCell>
                        <TableCell>Người giám hộ</TableCell>
                        <TableCell>Số điện thoại giám hộ</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {appointments.map((appointment) => (
                        <TableRow key={appointment.increment_id}>
                            <TableCell>
                                <span className={`inline-block px-2 py-1 text-xs font-semibold text-${statusMap[appointment.status]?.color}-600 bg-${statusMap[appointment.status]?.color}-200 rounded-full`}>
                                    {statusMap[appointment.status]?.text}
                                </span>
                            </TableCell>
                            <TableCell>{appointment.appointmentEntity.examinationRecordEntity.firstname}</TableCell>
                            <TableCell>{appointment.appointmentEntity.examinationRecordEntity.lastname}</TableCell>
                            <TableCell>{appointment.appointmentEntity.examinationRecordEntity.email}</TableCell>
                            <TableCell>{appointment.appointmentEntity.examinationRecordEntity.phone}</TableCell>
                            <TableCell>{appointment.appointmentEntity.examinationRecordEntity.gender === 2 ? 'Nam' : 'Nữ'}</TableCell>
                            <TableCell>{appointment.appointmentEntity.examinationRecordEntity.dob}</TableCell>
                            <TableCell>{appointment.appointmentEntity.examinationRecordEntity.career}</TableCell>
                            <TableCell>{appointment.appointmentEntity.examinationRecordEntity.address}</TableCell>
                            <TableCell>{appointment.appointmentEntity.examinationRecordEntity.medicalHistory}</TableCell>
                            <TableCell>{appointment.appointmentEntity.examinationRecordEntity.reasonForConsultation}</TableCell>
                            <TableCell>{appointment.appointmentEntity.examinationRecordEntity.guardianName}</TableCell>
                            <TableCell>{appointment.appointmentEntity.examinationRecordEntity.guardian_phone_number}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
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
        </TableContainer>
    );
};
