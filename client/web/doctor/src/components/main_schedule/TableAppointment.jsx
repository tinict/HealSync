import * as React from "react";
import { Modal, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Button, Select, TextField, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

export default function TableApointment() {
    const [appointments, setAppointments] = React.useState([]);
    const userInfo = useSelector(state => state.auth.user);
    const [editModalOpen, setEditModalOpen] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = React.useState('');
    const [timeSlots, setTimeSlots] = React.useState([]);
    const [selectedAppointment, setSelectedAppointment] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState('');

    const fetchApiPatients = () => {
        axios.get(`http://localhost:5002/api/v1/patients/${userInfo.user.identity_id}`)
            .then((res) => {
                console.log(res.data);
                setAppointments(res.data);
            })
    };

    React.useEffect(() => {
        fetchApiPatients();
    }, []);

    const statusMap = {
        1: { text: "Chưa khám", color: "blue" },
        2: { text: "Đã đến khám", color: "green" },
        3: { text: "Hủy khám", color: "red" },
        4: { text: "Đang chờ xử lý lịch", color: "red" },
    };

    const confirmAPIReExaminationSchedule = () => {
        axios.put("http://localhost:5002/api/v1/appointments", {
            appointment_id: selectedAppointment.appointment_id,
            timeslot_id: selectedTimeSlot.timeslot_id,
            status_appointment: 1
        });
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleTimeSlotChange = (event) => {
        setSelectedTimeSlot(event.target.value);
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


    React.useEffect(() => {
        getTimeSlots();
    }, [selectedDate]);

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
    };

    const handleCancelEditModal = () => {
        axios.put("http://localhost:5002/api/v1/appointments", {
            appointment_id: selectedAppointment.appointment_id,
            status_appointment: 3
        });

        setEditModalOpen(false);
        fetchApiPatients();
    };

    const handleChange = () => {
        confirmAPIReExaminationSchedule();
        setEditModalOpen(false);
        fetchApiPatients();
    };

    const handleChangeAppointment = (appointment) => {
        setSelectedAppointment(appointment);
        setEditModalOpen(true);
    };

    const handleChangeSearch = (event) => {
        fetchApiPatients();
        setSearchTerm(event.target.value);
        const filteredAppointments = appointments.filter(appointment =>
            appointment.firstname && appointment.firstname.toLowerCase() === searchTerm.toLowerCase() ||
            appointment.lastname && appointment.lastname.toLowerCase() === searchTerm.toLowerCase()
        );
        setAppointments(filteredAppointments);
    };

    return (
        <>
            <TextField
                label="Tìm kiếm"
                value={searchTerm}
                onChange={handleChangeSearch}
                sx={{ marginBottom: '20px' }}
            />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>Họ đệm</TableCell>
                            <TableCell style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>Tên</TableCell>
                            <TableCell style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>Email</TableCell>
                            <TableCell style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>Số điện thoại</TableCell>
                            <TableCell style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>Giới tính</TableCell>
                            <TableCell style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>Địa chỉ</TableCell>
                            <TableCell style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>Tiền sử</TableCell>
                            <TableCell style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>Lý do khám bệnh</TableCell>
                            <TableCell style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>Ngày khám</TableCell>
                            <TableCell style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>Thời gian bắt khám</TableCell>
                            <TableCell style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>Trạng thái</TableCell>
                            <TableCell style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {appointments.map((appointment) => (
                            <TableRow key={appointment.appointment_id}>
                                <TableCell>{appointment.firstname}</TableCell>
                                <TableCell>{appointment.lastname}</TableCell>
                                <TableCell>{appointment.email}</TableCell>
                                <TableCell>{appointment.phone}</TableCell>
                                <TableCell>{appointment.gender === 2 ? 'Name' : 'Nữ'}</TableCell>
                                <TableCell>{appointment.address}</TableCell>
                                <TableCell>{appointment.medicalHistory}</TableCell>
                                <TableCell>{appointment.reasonForConsultation}</TableCell>
                                <TableCell>{appointment.datework}</TableCell>
                                <TableCell>{appointment.starttime}</TableCell>
                                <TableCell style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                    <span className={`inline-block px-2 py-1 text-xs font-semibold text-${statusMap[appointment.status_appointment]?.color}-600 bg-${statusMap[appointment.status]?.color}-200 rounded-full`}>
                                        {statusMap[appointment.status_appointment]?.text}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <button
                                        disabled={appointment.status_appointment !== 4}
                                        onClick={() => handleChangeAppointment(appointment)}
                                        className={`px-2 py-1 text-xs font-semibold rounded-full ${appointment.status_appointment === 4 ? 'bg-blue-500 text-white' : 'bg-gray-500 text-gray-200'}`}
                                    >
                                        Thay đổi lịch
                                    </button>
                                </TableCell>
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
        </>
    );
};
