import React, { useEffect, useState } from 'react';
import AppointmentCard from './AppointmentCard';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const AppointmentList = () => {
    const customerProfile = useSelector(state => state.customer);
    const [appointments, setAppointments] = useState([]);

    function APIAppointment() {
        console.log(customerProfile);
        axios.get(`http://localhost:5002/api/v1/re-examinations?customer_id=${customerProfile.customer_id}`)
            .then((res) => {
                console.log(res.data);
                setAppointments(res.data);
            })
    };

    useEffect(() => {
        APIAppointment();
    }, []);

    return (
        <Container>
            <Row>
                {appointments.map((appointment) => (
                    <Col md={4} key={appointment.id}>
                        <AppointmentCard appointment={appointment} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default AppointmentList;
