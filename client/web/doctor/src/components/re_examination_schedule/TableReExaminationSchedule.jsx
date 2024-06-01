import * as React from "react";
import { Modal, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Button, Select, TextField, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

export default function TableReExaminationSchedule() {
    const [appointments, setAppointments] = React.useState([]);
    const userInfo = useSelector(state => state.auth.user);

    const fetchApiPatients = () => {
        axios.get(`http://localhost:5002/api/v1/re-examination-schedules?doctor_id=${userInfo.user.identity_id}`)
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
        5: { text: "Yêu cầu đổi lịch", color: "red" },
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Trạng thái</TableCell>
                        <TableCell>Họ đệm</TableCell>
                        <TableCell>Tên</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Số điện thoại</TableCell>
                        <TableCell>Giới tính</TableCell>
                        <TableCell>Địa chỉ</TableCell>
                        <TableCell>Tiền sử bệnh</TableCell>
                        <TableCell>Lý do khám bệnh</TableCell>
                        <TableCell>Ngày khám</TableCell>
                        <TableCell>Thời gian bắt khám</TableCell>
                        <TableCell>Thời gian kết thúc</TableCell>
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
                            <TableCell>{appointment.appointmentEntity.examinationRecordEntity.address}</TableCell>
                            <TableCell>{appointment.appointmentEntity.examinationRecordEntity.medicalHistory}</TableCell>
                            <TableCell>{appointment.appointmentEntity.examinationRecordEntity.reasonForConsultation}</TableCell>
                            <TableCell>{appointment.timeSlotEntity.scheduleEntity?.datework}</TableCell>
                            <TableCell>{appointment.timeSlotEntity.starttime}</TableCell>
                            <TableCell>{appointment.timeSlotEntity.endtime}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
