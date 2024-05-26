import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Row, Col, Alert, Form, InputGroup, Button, Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:5002/api/v1/doctors');
                setDoctors(response.data);
                setError('');
            } catch (err) {
                setError('Không thể tải danh sách bác sĩ.');
            }
        };

        fetchDoctors();
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredDoctors = doctors.filter(doctor =>
        `${doctor.firstname} ${doctor.lastname}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container>
            <nav aria-label="breadcrumb" style={{ backgroundColor: '#fff', padding: '20px 0', borderRadius: '5px' }}>
                <Breadcrumb>
                    <Breadcrumb.Item href="/" style={{ fontSize: '16px', color: '#007bff' }}>Trang chủ</Breadcrumb.Item>
                    <Breadcrumb.Item active style={{ fontSize: '16px', color: '#6c757d' }}>Bác sĩ</Breadcrumb.Item>
                </Breadcrumb>
            </nav>
            <h2 className="text-center">Danh sách các bác sĩ</h2>
            <InputGroup className="mb-4">
                <Form.Control
                    type="text"
                    placeholder="Tìm kiếm bác sĩ"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </InputGroup>
            {error && (
                <Alert variant="danger" className="mt-3">
                    {error}
                </Alert>
            )}
            <Row>
                {filteredDoctors.map(doctor => (
                    <Col key={doctor.id} md={4} className="mb-4">
                        <Card>
                            <Card.Img
                                variant="top"
                                src={doctor.url_picture || `https://via.placeholder.com/150?text=${doctor.firstname.charAt(0)}`}
                                alt={`${doctor.firstname} ${doctor.lastname}`}
                                className="doctor-avatar"
                            />
                            <Card.Body>
                                <Card.Title>{doctor.firstname} {doctor.lastname}</Card.Title>
                                <Card.Text>
                                    <strong>Chuyên khoa:</strong> {doctor.specialty}<br />
                                    <strong>Chuyên môn:</strong> {doctor.qualification}<br />
                                    <strong>Vị trí làm việc:</strong> {doctor.position}
                                </Card.Text>
                                <Button variant="primary" as={Link} to={`/doctors/profile/${doctor.doctor_id}`}>
                                    Xem thông tin chi tiết
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default DoctorList;
