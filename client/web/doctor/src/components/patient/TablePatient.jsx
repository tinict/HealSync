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

    const statusMap = {
        1: { text: "Chưa khám", color: "blue" },
        2: { text: "Đã đến khám", color: "green" },
        3: { text: "Hủy khám", color: "red" },
        4: { text: "Đang chờ xử lý lịch", color: "red" },
        5: { text: "Đang khám", color: "red" },
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Trạng thái</TableCell>
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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {appointments.map((appointment) => (
                        <TableRow key={appointment.id}>
                            <TableCell style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                <span className={`inline-block px-2 py-1 text-xs font-semibold text-${statusMap[appointment.status_appointment]?.color}-600 bg-${statusMap[appointment.status]?.color}-200 rounded-full`}>
                                    {statusMap[appointment.status_appointment]?.text}
                                </span>
                            </TableCell>
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
                            <TableCell>{appointment.typeSchedule === 1 ? 'Tại phòng khám' : 'Tư vấn trực tuyến'}</TableCell>
                            <TableCell>{appointment.starttime}</TableCell>
                            <TableCell>{appointment.endtime}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
