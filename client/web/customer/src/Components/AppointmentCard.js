import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Modal, Button, Form, Card, ListGroup } from 'react-bootstrap';
import { FaFilePdf, FaEye } from 'react-icons/fa';

const AppointmentCard = ({ appointment }) => {
    const customerProfile = useSelector(state => state.customer);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [showFilesModal, setShowFilesModal] = useState(false);
    const [files, setFiles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    const handleChange = () => {
        handleUpdateStatusAppointment(selectedAppointment, 1);
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleTimeSlotChange = (event) => {
        setSelectedTimeSlot(event.target.value);
    };

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
    };

    const handleOpenEditModal = (appointmentId, doctorId) => {
        setSelectedDoctor(doctorId);
        setSelectedAppointment(appointmentId);
        setEditModalOpen(true);
    };


    const getTimeSlots = () => {
        axios.get("http://localhost:5002/api/v1/timeslots", {
            params: {
                doctor_id: selectedDoctor,
                datework: selectedDate,
                typeSchedule: 1
            }
        })
            .then((res) => {
                setTimeSlots(res.data);
            })
    };

    const handleUpdateStatusAppointment = (appointment_id, status) => {
        axios.get(`http://localhost:5002/api/v1/appointment/examination/ordinal-number/${selectedTimeSlot}`)
            .then((res) => {
                axios.put('http://localhost:5002/api/v1/re-examination-schedules', {
                    "appointment_id": appointment_id,
                    "timeslot_id": selectedTimeSlot,
                    "ordinalNumber": res.data.ordinalNumber,
                    "status": status
                })
                    .then(() => {
                        setEditModalOpen(false);
                    })
            });
    };

    const handleUpdateStatusReAppointment = (appointment_id, status) => {
        axios.put('http://localhost:5002/api/v1/re-examination-schedules', {
            "appointment_id": appointment_id,
            "status": status
        });
    };

    useEffect(() => {
        getTimeSlots();
    }, [selectedDate]);

    const handleOpenFilesModal = (listMedicalRecord) => {
        setShowFilesModal(true)
        setFiles(listMedicalRecord);
    };
    const handleCloseFilesModal = () => setShowFilesModal(false);

    const handleViewFile = (path) => {
        setSelectedRecord(path);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <Card className="mb-3">
                <Card.Body>
                    <Card.Title>Giấy hẹn tái khám</Card.Title>
                    <Card.Text>
                        <strong>Mã bệnh nhân:</strong> {appointment.appointmentEntity.appointment_id}<br />
                        <strong>Số thứ tự khám:</strong> {appointment.ordinalNumber}<br />
                        <strong>Họ tên người bệnh:</strong> {appointment.appointmentEntity.examinationRecordEntity.firstname} {appointment.appointmentEntity.examinationRecordEntity.lastname}<br />
                        <strong>Giới tính:</strong> {appointment.appointmentEntity.examinationRecordEntity.gender === 1 ? "Nam" : "Nữ"}<br />
                        <strong>Ngày sinh:</strong> {appointment.appointmentEntity.examinationRecordEntity.dob}<br />
                        <strong>Ngày khám:</strong> {appointment.appointmentEntity.timeSlotEntity.scheduleEntity.datework}<br />
                        <strong>Ngày khám:</strong> {appointment.endDay}<br />
                        <strong>Bác sĩ khám bệnh:</strong> {appointment.appointmentEntity.timeSlotEntity.scheduleEntity.doctorEntity.firstname} {appointment.appointmentEntity.timeSlotEntity.scheduleEntity.doctorEntity.lastname}<br />
                        <strong>Chuyên khoa:</strong> {appointment.appointmentEntity.timeSlotEntity.scheduleEntity.doctorEntity.specialty}<br />
                        <strong>Chuyên ngành:</strong> {appointment.appointmentEntity.timeSlotEntity.scheduleEntity.doctorEntity.qualification}<br />
                        <strong>Đơn vị công tác:</strong> {appointment.appointmentEntity.timeSlotEntity.scheduleEntity.doctorEntity.workspace}<br />
                    </Card.Text>
                    <Button variant="primary" onClick={() => handleOpenFilesModal(appointment.appointmentEntity.medicalRecordEntity)}>Xem hồ sơ chẩn đoán</Button>
                    {
                        appointment.status === 5 && (
                            <Button variant="primary" onClick={() => handleOpenEditModal(appointment.appointmentEntity.appointment_id, appointment.appointmentEntity.timeSlotEntity.scheduleEntity.doctorEntity.doctor_id)}>Đăng ký tái khám</Button>
                        )
                    }
                    {
                        appointment.status === 1 && (
                            <Button variant="primary" onClick={() => handleUpdateStatusReAppointment(appointment.appointmentEntity.appointment_id, 5)}>Đổi lịch tái khám</Button>
                        )
                    }
                </Card.Body>
            </Card>
            <Modal
                show={editModalOpen}
                onHide={handleCloseEditModal}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Đặt lịch hẹn tái khám</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formDate">
                            <Form.Label>Chọn ngày tái khám</Form.Label>
                            <Form.Control
                                type="date"
                                value={selectedDate}
                                onChange={handleDateChange}
                            />
                        </Form.Group>
                        {selectedDate && (
                            <Form.Group controlId="formTimeSlot" className="mt-3">
                                <Form.Label>Chọn khung giờ khám</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={selectedTimeSlot}
                                    onChange={handleTimeSlotChange}
                                >
                                    <option key={-1} value="">
                                        Chọn thời gian khám
                                    </option>
                                    {timeSlots.map((timeSlot, index) => (
                                        <option key={index} value={timeSlot.timeslot_id}>
                                            {timeSlot.starttime} - {timeSlot.endtime}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleChange}>
                        Xác nhận đặt lịch
                    </Button>
                    <Button variant="secondary" onClick={handleCloseEditModal}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showFilesModal} onHide={handleCloseFilesModal} centered >
                <Modal.Header closeButton>
                    <Modal.Title>Hồ sơ chẩn đoán bệnh</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        {files.map((file, index) => (
                            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                <div>
                                    <FaFilePdf color="red" /> <span className="ms-2">{file.diagnostic_records}</span>
                                </div>
                                <Button variant="link" onClick={() => handleViewFile(file.diagnostic_records)}>
                                    <FaEye size={20} />
                                </Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseFilesModal}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal >
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Nội dung giấy khám</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <iframe
                        src={`https://docs.google.com/viewer?url=${encodeURIComponent(`https://mediahealsyc.s3.ap-southeast-1.amazonaws.com/${selectedRecord}`)}&embedded=true`}
                        style={{ width: '100%', height: '500px' }}
                    >
                    </iframe>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AppointmentCard;
