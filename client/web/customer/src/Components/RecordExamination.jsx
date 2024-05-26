import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Breadcrumb } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const mockData = [
    {
        id: 1,
        date: '2024-03-28',
        prescriptions: ['Paracetamol', 'Ibuprofen'],
        diagnosis: 'Fever',
    },
    {
        id: 2,
        date: '2024-03-25',
        prescriptions: ['Amoxicillin', 'Cough syrup'],
        diagnosis: 'Cold',
    },
];

const RecordExamination = () => {
    const [records, setRecords] = useState(mockData);
    const [filter, setFilter] = useState('');
    const customerProfile = useSelector(state => state.customer);
    const [medicalRecords, setMedicalRecords] = useState([]);
    const navigate = useNavigate();

    const fetchAPIMedicalRecord = () => {
        axios.get(`http://localhost:5002/api/v1/appointments/customer/${customerProfile.customer_id}`)
            .then((res) => {
                console.log(res.data);
                setMedicalRecords(res.data);
            })
    };

    useEffect(() => {
        fetchAPIMedicalRecord();
    }, []);

    const filterRecords = () => {
        if (!filter) {
            return mockData;
        }
        return mockData.filter(record =>
            record.diagnosis.toLowerCase().includes(filter.toLowerCase())
        );
    };

    const renderRecords = () => {
        return (
            <Row>
                {medicalRecords.filter(medicalRecord => medicalRecord.status_appointment === 2).map(record => (
                    <Col key={record.id} md={4} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{record.reasonForConsultation}</Card.Title>
                                <Card.Text>
                                    <strong>Mã đặt lịch:</strong> {record.appointment_id}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Ngày khám:</strong> {record.datework}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Bênh nhân:</strong> {record.firstname + " " + record.lastname}
                                </Card.Text>
                                <Button variant="primary" onClick={() => viewDetails(record.appointment_id)}>
                                    Xem hồ sơ bệnh án
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        );
    };

    const viewDetails = (appointment_id) => {
        navigate(`/medical-records/detail/${appointment_id}`);
    };

    return (
        <Container className="py-5">
            <nav aria-label="breadcrumb" style={{ backgroundColor: '#fff', padding: '20px 0', borderRadius: '5px' }}>
                <Breadcrumb>
                    <Breadcrumb.Item href="/" style={{ fontSize: '16px', color: '#007bff' }}>Trang chủ</Breadcrumb.Item>
                    <Breadcrumb.Item active style={{ fontSize: '16px', color: '#6c757d' }}>Quản lý bệnh án</Breadcrumb.Item>
                </Breadcrumb>
            </nav>
            <Row className="mb-4">
                <Col>
                    <h1 className="text-center">Danh sách bệnh án</h1>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col md={{ span: 6, offset: 3 }}>
                    <Form.Control
                        type="text"
                        placeholder="Tìm kiếm theo mã bệnh án ..."
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                    />
                </Col>
            </Row>
            {renderRecords()}
        </Container>
    );
};

export default RecordExamination;
