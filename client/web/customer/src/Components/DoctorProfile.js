import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';

function DoctorProfile({ doctor_id }) {

    const [profileDoctor, setProfileDoctor] = useState({});

    const fetchDoctorProfile = (doctor_id) => {
        axios.get(`http://localhost:5002/api/v1/doctors/profile/${doctor_id}`)
            .then((response) => {
                console.log(response.data);
                setProfileDoctor(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        fetchDoctorProfile(doctor_id);
    }, []);

    return (
        <Container className="mt-5">
            <Row>
                <Col md={3}>
                    <Card>
                        <Card.Img variant="top" src={profileDoctor.url_picture} />
                        <Card.Body>
                            <Card.Title>Dr. {profileDoctor.firstname} {profileDoctor.lastname}</Card.Title>
                            <Card.Text>
                                Chuyên ngành {profileDoctor.specialty}
                                <br />
                                Chuyên môn: {profileDoctor.qualification}
                                <br />
                                Giới tính: {profileDoctor.gender}
                                <br />
                                Email: {profileDoctor.email}
                                <br />
                                Chức vụ: {profileDoctor.position}
                                <br />
                                Tên nơi khám: {profileDoctor.workspace}
                                <br />
                                Địa chỉ khám: {profileDoctor.location}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Đã tham gia: {profileDoctor.create_at}</small>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col md={9}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Kinh nghiệm làm việc</Card.Title>
                            <Card.Text>
                                {profileDoctor.experience}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default DoctorProfile;
