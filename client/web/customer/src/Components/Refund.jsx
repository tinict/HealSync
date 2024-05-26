import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Container, Col, Form, Tab, Nav, Button, ListGroup, Table, Modal, Breadcrumb } from 'react-bootstrap';
import { CalendarX } from 'react-bootstrap-icons';

const Refund = () => {
    const customerProfile = useSelector(state => state.customer);
    const [refunds, setRefunds] = useState([]);

    const statusMap = {
        1: { text: "Yêu cầu hoàn tiền", color: "primary" },
        2: { text: "Đã hoàn tiền", color: "success" },
        3: { text: "Chờ xử lý hoàn tiền", color: "danger" },
        4: { text: "Yêu cầu thất bại", color: "danger" },
    };

    const APIGetRefunds = () => {
        axios.get(`http://localhost:5002/api/v1/refunds/${customerProfile.customer_id}`)
            .then((res) => {
                setRefunds(res.data);
            })
    };

    useEffect(() => {
        APIGetRefunds();
    }, []);

    return (
        <Container>
            <nav aria-label="breadcrumb" style={{ backgroundColor: '#fff', padding: '20px 0', borderRadius: '5px' }}>
                <Breadcrumb>
                    <Breadcrumb.Item href="/" style={{ fontSize: '16px', color: '#007bff' }}>Trang chủ</Breadcrumb.Item>
                    <Breadcrumb.Item active style={{ fontSize: '16px', color: '#6c757d' }}>Danh sách hoàn tiền</Breadcrumb.Item>
                </Breadcrumb>
            </nav>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th style={{ width: "auto", whiteSpace: "nowrap" }}>Trạng thái</th>
                        <th style={{ width: "auto", whiteSpace: "nowrap" }}>Ngày yêu cầu hoàn</th>
                        <th style={{ width: "auto", whiteSpace: "nowrap" }}>Số tiền hoàn</th>
                        <th style={{ width: "auto", whiteSpace: "nowrap" }}>Mã hóa đơn</th>
                        <th style={{ width: "auto", whiteSpace: "nowrap" }}>Ngày tạo hóa đơn</th>
                        <th style={{ width: "auto", whiteSpace: "nowrap" }}>Ngày thanh toán</th>
                        <th style={{ width: "auto", whiteSpace: "nowrap" }}>Mã đặt khám</th>
                        <th style={{ width: "auto", whiteSpace: "nowrap" }}>Mã hồ sơ khám</th>
                        <th style={{ width: "auto", whiteSpace: "nowrap" }}>Họ đệm</th>
                        <th style={{ width: "auto", whiteSpace: "nowrap" }}>Tên</th>
                        <th style={{ width: "auto", whiteSpace: "nowrap" }}>Lý do khám</th>
                        <th style={{ width: "auto", whiteSpace: "nowrap" }}>Thời gian bắt đầu khám</th>
                        <th style={{ width: "auto", whiteSpace: "nowrap" }}>Thời gian kết thúc khám</th>
                        <th style={{ width: "auto", whiteSpace: "nowrap" }}>Vị trí khám</th>
                        <th style={{ width: "auto", whiteSpace: "nowrap" }}>Họ đệm bác sĩ</th>
                        <th style={{ width: "auto", whiteSpace: "nowrap" }}>Tên bác sĩ</th>
                        <th style={{ width: "auto", whiteSpace: "nowrap" }}>Chuyên khoa</th>
                        <th style={{ width: "auto", whiteSpace: "nowrap" }}>Nơi làm việc</th>
                    </tr>
                </thead>
                <tbody>
                    {refunds.map((refund, index) => (
                        <tr key={index}>
                            <td>
                                <span className={`badge bg-${statusMap[refund.status]?.color}`}>
                                    {statusMap[refund.status]?.text}
                                </span>
                            </td>
                            <td>
                                {refund.created_at}
                            </td>
                            <td>
                                {refund.refund_amount}
                            </td>
                            <td>
                                {refund.invoiceEntity.invoice_id}
                            </td>
                            <td>
                                {refund.invoiceEntity.create_at}
                            </td>
                            <td>
                                {refund.invoiceEntity.due_at}
                            </td>
                            <td>
                                {refund.invoiceEntity.appointmentEntity.appointment_id}
                            </td>
                            <td>
                                {refund.invoiceEntity.appointmentEntity.examinationRecordEntity.examination_record_id}
                            </td>
                            <td>
                                {refund.invoiceEntity.appointmentEntity.examinationRecordEntity.firstname}
                            </td>
                            <td>
                                {refund.invoiceEntity.appointmentEntity.examinationRecordEntity.lastname}
                            </td>
                            <td>
                                {refund.invoiceEntity.appointmentEntity.examinationRecordEntity.reasonForConsultation}
                            </td>
                            <td>
                                {refund.invoiceEntity.appointmentEntity.timeSlotEntity.starttime}
                            </td>
                            <td>
                                {refund.invoiceEntity.appointmentEntity.timeSlotEntity.endtime}
                            </td>
                            <td>
                                {refund.invoiceEntity.appointmentEntity.timeSlotEntity.localtion}
                            </td>
                            <td>
                                {refund.invoiceEntity.appointmentEntity.timeSlotEntity.scheduleEntity.doctorEntity.firstname}
                            </td>
                            <td>
                                {refund.invoiceEntity.appointmentEntity.timeSlotEntity.scheduleEntity.doctorEntity.lastname}
                            </td>
                            <td>
                                {refund.invoiceEntity.appointmentEntity.timeSlotEntity.scheduleEntity.doctorEntity.specialty}
                            </td>
                            <td>
                                {refund.invoiceEntity.appointmentEntity.timeSlotEntity.scheduleEntity.doctorEntity.workspace}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default Refund;
