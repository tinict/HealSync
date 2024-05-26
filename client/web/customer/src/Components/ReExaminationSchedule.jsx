import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Container, Col, Form, Tab, Nav, Button, ListGroup, Table, Modal, Breadcrumb } from 'react-bootstrap';
import AppointmentList from './AppointmentList';

const ReExaminationSchedule = () => {
    const customerProfile = useSelector(state => state.customer);
    const [appointments, setAppointments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [activeTab, setActiveTab] = useState('Lịch tái khám');
    const [statusAppointment, setStatusAppointment] = useState([]);
    const [showModalForAppointment, setShowModalForAppointment] = useState({});

    useEffect(() => {
        APIAppointment();
        // APIStatusAppointment();
    }, [])

    function APIAppointment() {
        console.log(customerProfile);
        axios.get(`http://localhost:5002/api/v1/re-examination-schedules?customer_id=${customerProfile.customer_id}`)
            .then((res) => {
                console.log(res.data);
                const transformedAppointments = res.data.map(appointment => {
                    if (appointment.timeSlotEntity && appointment.timeSlotEntity && appointment.timeSlotEntity.scheduleEntity) {
                        return {
                            title: "Bác sĩ: " + appointment.timeSlotEntity.scheduleEntity.doctorEntity.firstname + " " + appointment.timeSlotEntity.scheduleEntity.doctorEntity.lastname + " - Vị trí khám: " + appointment.timeSlotEntity.localtion + " - Bệnh nhân: " + appointment.appointmentEntity.examinationRecordEntity.firstname + " " + appointment.appointmentEntity.examinationRecordEntity.lastname,
                            start: appointment.timeSlotEntity.scheduleEntity.datework + 'T' + appointment.timeSlotEntity.starttime,
                            end: appointment.timeSlotEntity.scheduleEntity.datework + 'T' + appointment.timeSlotEntity.endtime,
                            ...appointment
                        };
                    } else {
                        return null;
                    }
                }).filter(appointment => appointment !== null);
                setAppointments(transformedAppointments); 
            })
    }

    function APIStatusAppointment() {
        console.log(customerProfile);
        axios.get(`http://localhost:5002/api/v1/examination-records/${customerProfile.customer_id}`)
            .then((res) => {
                console.log(res.data);
                setStatusAppointment(res.data);
            })
    }

    function fetchUpdateStatus(appointment_id, status) {
        return axios.post("http://localhost:5002/api/v1/appointments/status", {
            appointment_id,
            status
        })
    }

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

    const statusMap = {
        1: { text: "Chưa tái khám", color: "primary" },
        2: { text: "Đã đến tái khám", color: "success" },
        3: { text: "Hủy tái khám", color: "danger" },
        4: { text: "Không đến tái khám", color: "danger" },
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
                    <Breadcrumb.Item active style={{ fontSize: '16px', color: '#6c757d' }}>Quản lý lịch tái khám</Breadcrumb.Item>
                </Breadcrumb>
            </nav>
            <Tab.Container activeKey={activeTab} onSelect={handleTabChange}>
                <Col fluid={true} md={14}>
                    <Nav variant="tabs" className="mb-3">
                        <Nav.Item>
                            <Nav.Link eventKey="Lịch tái khám">Lịch đăng ký tái khám</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="Chờ tái khám">Danh sách tái khám</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="Danh sách tái khám">Lịch sử tái khám</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content>
                        <Tab.Pane eventKey="Lịch tái khám">
                            <FullCalendar
                                plugins={[dayGridPlugin, timeGridPlugin]}
                                initialView="timeGridWeek"
                                events={appointments}
                                eventClick={handleEventClick}
                                eventContent={eventContent}
                            />
                            <Modal show={showModal} onHide={handleCloseModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Thông tin lịch tái khám</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    {selectedEvent && (
                                        <div>
                                            <p>{selectedEvent.title}</p>
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
                        <Tab.Pane eventKey="Chờ tái khám">
                            <Container className="mt-4">
                                <h4 className="mb-4">Danh sách giấy tái khám</h4>
                                <AppointmentList />
                            </Container>
                        </Tab.Pane>
                        <Tab.Pane eventKey="Danh sách tái khám">
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>Trạng thái</th>
                                        <th>Mã lịch khám</th>
                                        <th>Họ đệm</th>
                                        <th>Tên</th>
                                        <th>Số điện thoại</th>
                                        <th>Email</th>
                                        <th>Giới tính</th>
                                        <th>Ngày tới khám</th>
                                        <th>Bác sĩ</th>
                                        <th>Chuyên khoa</th>
                                        <th>Thời gian khám</th>
                                        <th>Ví trí khám</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.map((appointment, index) => (
                                        <tr key={index}>
                                            <td>
                                                <span className={`badge bg-${statusMap[appointment?.status]?.color}`}>
                                                    {statusMap[appointment?.status]?.text}
                                                </span>
                                            </td>
                                            <td>{appointment?.appointmentEntity?.appointment_id}</td>
                                            <td>{appointment?.appointmentEntity.examinationRecordEntity?.firstname}</td>
                                            <td>{appointment?.appointmentEntity.examinationRecordEntity?.lastname}</td>
                                            <td>{appointment?.appointmentEntity.examinationRecordEntity?.phone}</td>
                                            <td>{appointment?.appointmentEntity.examinationRecordEntity?.email}</td>
                                            <td>{appointment?.appointmentEntity.examinationRecordEntity?.gender}</td>
                                            <td>{appointment?.timeSlotEntity.scheduleEntity?.datework}</td>
                                            <td>{appointment?.timeSlotEntity.scheduleEntity.doctorEntity?.firstname} {appointment?.timeSlotEntity.scheduleEntity.doctorEntity?.lastname}</td>
                                            <td>{appointment?.timeSlotEntity.scheduleEntity.doctorEntity?.specialty}</td>
                                            <td>{appointment?.timeSlotEntity.starttime} - {appointment?.timeSlotEntity.endtime}</td>
                                            <td>{appointment?.timeSlotEntity?.localtion}</td>
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

export default ReExaminationSchedule;
