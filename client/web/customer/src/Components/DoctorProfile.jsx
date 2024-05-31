import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';

function DoctorProfile({ doctor_id }) {
    const [profileDoctor, setProfileDoctor] = useState({});
    const [reviews, setReviews] = useState([]);

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

    const fetchDoctorReviews = async () => {
        try {
            const response = await axios.get(`http://localhost:5002/api/v1/feedbacks/${doctor_id}`);
            console.log(response);
            setReviews(response.data);
        } catch (error) {
            alert('Lỗi khi lấy đánh giá của bác sĩ:', error);
        }
    };

    useEffect(() => {
        fetchDoctorReviews();
    }, [])

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
                                Giới tính: {profileDoctor.gender ? 'Nam' : 'Nữ'}
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
                    <Card>
                        <Card.Body>
                            <Card.Title>Những đánh giá của bác sĩ</Card.Title>
                            <Card.Text>
                                {reviews && reviews.map((review, index) => (
                                    <Row key={index}>
                                        <Col xs="auto">
                                            <Image src={review.customerEntity.url_picture} roundedCircle style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                        </Col>
                                        <Col>
                                            <Card.Text>
                                                <p className="font-weight-bold">{review.customerEntity.family_name} {review.customerEntity.name}</p>
                                                <p className="text-muted">{moment(review.create_at).locale('vi').format('mm dd yyyy, h:mm:ss a')}</p>
                                                <p>{review.content_feedback}</p>
                                            </Card.Text>
                                        </Col>
                                    </Row>
                                ))}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default DoctorProfile;
