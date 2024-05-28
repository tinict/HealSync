import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Container, Col, Tab, Nav, Button, Table, Modal, Breadcrumb } from 'react-bootstrap';
import { CalendarX } from 'react-bootstrap-icons';

const AppointmentPage = () => {
    const customerProfile = useSelector(state => state.customer);
    const [appointments, setAppointments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [activeTab, setActiveTab] = useState('Lịch đăng ký khám');
    const [statusAppointment, setStatusAppointment] = useState([]);
    const [showModalForAppointment, setShowModalForAppointment] = useState({});

    useEffect(() => {
        APIAppointment();
        APIStatusAppointment();
    }, []);

    function APIAppointment() {
        axios.get(`http://localhost:5002/api/v1/appointments/customer/${customerProfile.customer_id}`)
            .then((res) => {
                const transformedAppointments = res.data.map(appointment => ({
                    title: appointment.firstname + ' ' + appointment.name,
                    start: appointment.datework + 'T' + appointment.starttime,
                    end: appointment.datework + 'T' + appointment.endtime,
                    ...appointment
                }));
                setAppointments(transformedAppointments);
            })
    };

    function APIStatusAppointment() {
        axios.get(`http://localhost:5002/api/v1/examination-records/${customerProfile.customer_id}`)
            .then((res) => {
                setStatusAppointment(res.data);
            })
    };

    function fetchUpdateStatus(appointment_id, status) {
        return axios.post("http://localhost:5002/api/v1/appointments/status", {
            appointment_id,
            status
        })
    };

    const handleEventClick = (info) => {
        setSelectedEvent(info.event);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedEvent(null);
    };

    const eventContent = (arg) => {
        if (arg.event.extendedProps.status_appointment === 2) {
            return (
                <div className="appointment-status-2">{arg.timeText}</div>
            );
        } else if (arg.event.extendedProps.status_appointment === 3) {
            return (
                <div className="appointment-status-3">{arg.timeText}</div>
            );
        } else {
            return (
                <div>{arg.timeText}</div>
            );
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const APIPushNotification = (account_id, content) => {
        axios.post('http://localhost:5011/api/v1/notification', {
            identity_id: account_id,
            message: content
        })
    };

    const confirmStatusRefund = (appointment_id) => {
        axios.get(`http://localhost:5002/api/v1/invoice/${appointment_id}`)
            .then((res) => {
                axios.post('http://localhost:5002/api/v1/refunds', {
                    invoice_id: res.data.invoice_id
                });
            })
    };

    const cancelAppointment = (appointment) => {
        fetchUpdateStatus(appointment.appointmentEntity?.appointment_id, 3)
            .then(() => {
                APIPushNotification(appointment.appointmentEntity.timeSlotEntity.scheduleEntity.doctorEntity.doctor_id, "Bệnh nhân đã hủy lịch khám");
                setShowModalForAppointment(prevState => ({ ...prevState, [appointment.appointmentEntity?.appointment_id]: false }));
                APIStatusAppointment();
                confirmStatusRefund(appointment.appointmentEntity?.appointment_id);
            })
            .catch(error => {
                console.error('Error cancelling appointment:', error);
            });
    };

    const statusMap = {
        1: { text: "Chưa khám", color: "primary" },
        2: { text: "Đã khám", color: "success" },
        3: { text: "Đã hủy lịch", color: "danger" },
        4: { text: "Yêu cầu đổi lịch khám", color: "danger" },
        5: { text: "Bác sĩ đang khám", color: "primary" },
    };

    const handleClose = (appointmentId) => {
        setShowModalForAppointment(prevState => ({ ...prevState, [appointmentId]: false }));
    };

    const handleShow = (appointmentId) => {
        setShowModalForAppointment(prevState => ({ ...prevState, [appointmentId]: true }));
    };

    return (
        <Container>
            <nav aria-label="breadcrumb" style={{ backgroundColor: '#fff', padding: '20px 0', borderRadius: '5px' }}>
                <Breadcrumb>
                    <Breadcrumb.Item href="/" style={{ fontSize: '16px', color: '#007bff' }}>Trang chủ</Breadcrumb.Item>
                    <Breadcrumb.Item active style={{ fontSize: '16px', color: '#6c757d' }}>Quản lý lịch hẹn khám</Breadcrumb.Item>
                </Breadcrumb>
            </nav>
            <Tab.Container activeKey={activeTab} onSelect={handleTabChange}>
                <Col fluid={true} md={14}>
                    <Nav variant="tabs" className="mb-3">
                        <Nav.Item>
                            <Nav.Link eventKey="Lịch đăng ký khám">Lịch đăng ký khám</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="Trạng thái lịch khám">Lịch sử đăng ký khám</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content>
                        <Tab.Pane eventKey="Lịch đăng ký khám">
                            <FullCalendar
                                plugins={[dayGridPlugin, timeGridPlugin]}
                                initialView="timeGridWeek"
                                events={appointments.filter(appointment => appointment.status_appointment === 1)}
                                eventClick={handleEventClick}
                                eventContent={eventContent}
                            />
                            <Modal show={showModal} onHide={handleCloseModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Thông tin khám chi tiết</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    {selectedEvent && (
                                        <div>
                                            <p>Bệnh nhân: {selectedEvent.title}</p>
                                            <p>Thời gian khám: {selectedEvent.start && selectedEvent.start.toLocaleString()}</p>
                                        </div>
                                    )}
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseModal}>
                                        Đóng
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </Tab.Pane>
                        <Tab.Pane eventKey="Trạng thái lịch khám">
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th style={{ width: "auto", whiteSpace: "nowrap" }}>Trạng thái</th>
                                        <th style={{ width: "auto", whiteSpace: "nowrap" }}>Số thứ tự khám</th>
                                        <th style={{ width: "auto", whiteSpace: "nowrap" }}>Mã đăng ký khám</th>
                                        <th style={{ width: "auto", whiteSpace: "nowrap" }}>Thời gian khám</th>
                                        <th style={{ width: "auto", whiteSpace: "nowrap" }}>Bác sĩ</th>
                                        <th style={{ width: "auto", whiteSpace: "nowrap" }}>Chuyên khoa</th>
                                        <th style={{ width: "auto", whiteSpace: "nowrap" }}>Vị trí khám</th>
                                        <th style={{ width: "auto", whiteSpace: "nowrap" }}>Họ đệm</th>
                                        <th style={{ width: "auto", whiteSpace: "nowrap" }}>Tên</th>
                                        <th style={{ width: "auto", whiteSpace: "nowrap" }}>Ngày sinh</th>
                                        <th style={{ width: "auto", whiteSpace: "nowrap" }}>Số điện thoại</th>
                                        <th style={{ width: "auto", whiteSpace: "nowrap" }}>Email</th>
                                        <th style={{ width: "auto", whiteSpace: "nowrap" }}>CCCD</th>
                                        <th style={{ width: "auto", whiteSpace: "nowrap" }}>Giới tính</th>
                                        <th style={{ width: "auto", whiteSpace: "nowrap" }}>Thời gian đặt lịch</th>
                                        <th style={{ width: "auto", whiteSpace: "nowrap" }}>Tiền sử mắc bệnh</th>
                                        <th style={{ width: "auto", whiteSpace: "nowrap" }}>Lý do khám</th>
                                        <th style={{ width: "auto", whiteSpace: "nowrap" }}>Tên người giám hộ</th>
                                        <th style={{ width: "auto", whiteSpace: "nowrap" }}>Số điện thoại người giám hộ</th>
                                        <th style={{ width: "auto", whiteSpace: "nowrap" }}>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {statusAppointment.map((appointment, index) => (
                                        <tr key={index}>
                                            <td>
                                                <span className={`badge bg-${statusMap[appointment.appointmentEntity?.status_appointment]?.color}`}>
                                                    {statusMap[appointment.appointmentEntity?.status_appointment]?.text}
                                                </span>
                                            </td>
                                            <td>{appointment.appointmentEntity?.ordinalNumber}</td>
                                            <td>{appointment.appointmentEntity?.appointment_id}</td>
                                            <td>{appointment.appointmentEntity?.timeSlotEntity?.starttime} - {appointment.appointmentEntity?.timeSlotEntity?.endtime}</td>
                                            <td>
                                                {appointment.appointmentEntity?.timeSlotEntity?.scheduleEntity?.doctorEntity?.firstname} 
                                                {appointment.appointmentEntity?.timeSlotEntity?.scheduleEntity?.doctorEntity?.lastname}
                                            </td>
                                            <td>
                                                {appointment.appointmentEntity?.timeSlotEntity?.scheduleEntity?.doctorEntity?.qualification}
                                            </td>
                                            <td>
                                                {appointment.appointmentEntity?.timeSlotEntity?.localtion}
                                            </td>
                                            <td>{appointment.firstname}</td>
                                            <td>{appointment.lastname}</td>
                                            <td>{appointment.dob}</td>
                                            <td>{appointment.phone}</td>
                                            <td>{appointment.email}</td>
                                            <td>{appointment.idCardNumber}</td>
                                            <td>{appointment.gender === 2 ? "Nữ" : "Nam"}</td>
                                            <td>{appointment.createdAt}</td>
                                            <td>{appointment.medicalHistory}</td>
                                            <td>{appointment.reasonForConsultation}</td>
                                            <td>{appointment.guardianName}</td>
                                            <td>{appointment.guardian_phone_number}</td>
                                            <td>
                                                <Button
                                                    variant="danger"
                                                    onClick={() => handleShow(appointment.appointmentEntity?.appointment_id)}
                                                    disabled={appointment.appointmentEntity?.status_appointment === 2 || appointment.appointmentEntity?.status_appointment === 3}
                                                    style={{ padding: '8px 8px' }}
                                                >
                                                    <CalendarX style={{ color: 'white', fontSize: '22px' }} />
                                                </Button>

                                                <Modal show={showModalForAppointment[appointment.appointmentEntity?.appointment_id]} onHide={() => handleClose(appointment.appointmentEntity?.appointment_id)} keyboard={false} dialogClassName="modal-shadow" className="bg-white">
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Xác nhận hủy lịch khám</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>Bạn có chắc chắn muốn hủy lịch khám này không?</Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" onClick={() => handleClose(appointment.appointmentEntity?.appointment_id)}>
                                                            Đóng
                                                        </Button>
                                                        <Button variant="danger" onClick={() => cancelAppointment(appointment)}>
                                                            Hủy lịch khám
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Tab.Container>
        </Container>
    );
};

export default AppointmentPage;
