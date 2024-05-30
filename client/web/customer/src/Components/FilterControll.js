import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

function FilterControll({ onFilter }) {
    const [location, setLocation] = useState('');
    const [specialty, setSpecialty] = useState('');

    const handleFilter = () => {
        onFilter({ location, specialty });
    };

    return (
        <Form className='container'>
            <Row className="mb-3 align-items-end">
                <Col>
                    <Form.Group controlId="formLocation">
                        <Form.Label>Vị trí</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập vị trí"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="formSpecialty">
                        <Form.Label>Chuyên khoa</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập chuyên khoa"
                            value={specialty}
                            onChange={(e) => setSpecialty(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col xs="auto" className="ml-auto">
                    <Button variant="primary" onClick={handleFilter}>
                        Lọc bác sĩ
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default FilterControll;
