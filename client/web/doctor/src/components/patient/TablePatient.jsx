import * as React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container } from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

export default function TablePatient() {
    const [appointments, setAppointments] = React.useState([]);
    const userInfo = useSelector(state => state.auth.user);

    const fetchApiPatients = () => {
        axios.get(`http://localhost:5002/api/v1/patients/${userInfo.user.identity_id}`)
            .then((res) => {
                setAppointments(res.data);
            })
    };

    React.useEffect(() => {
        fetchApiPatients();
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Ngày Tạo </TableCell>
                        <TableCell>Họ đệm</TableCell>
                        <TableCell>Tên</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Số điện thoại</TableCell>
                        <TableCell>Giới tính</TableCell>
                        <TableCell>Địa chỉ</TableCell>
                        <TableCell>Người giám hộ</TableCell>
                        <TableCell>Tiền sử bệnh</TableCell>
                        <TableCell>Lý do khám</TableCell>
                        <TableCell>CCCD/CMND</TableCell>
                        <TableCell>Ngày khám</TableCell>
                        <TableCell>Loại lịch</TableCell>
                        <TableCell>Bắt đầu khám</TableCell>
                        <TableCell>Kết thúc khám</TableCell>
                        <TableCell>Trạng thái khám</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {appointments.map((appointment) => (
                        <TableRow key={appointment.id}>
                            <TableCell>{appointment.createdAt}</TableCell>
                            <TableCell>{appointment.firstname}</TableCell>
                            <TableCell>{appointment.lastname}</TableCell>
                            <TableCell>{appointment.email}</TableCell>
                            <TableCell>{appointment.phone}</TableCell>
                            <TableCell>{appointment.gender === 2 ? 'Nữ' : 'Nam'}</TableCell>
                            <TableCell>{appointment.address}</TableCell>
                            <TableCell>{appointment.guardianName}</TableCell>
                            <TableCell>{appointment.medicalHistory}</TableCell>
                            <TableCell>{appointment.reasonForConsultation}</TableCell>
                            <TableCell>{appointment.idCardNumber}</TableCell>
                            <TableCell>{appointment.datework}</TableCell>
                            <TableCell>{appointment.typeSchedule}</TableCell>
                            <TableCell>{appointment.starttime}</TableCell>
                            <TableCell>{appointment.endtime}</TableCell>
                            <TableCell>{appointment.status_appointment}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
