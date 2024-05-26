import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card, Breadcrumb } from 'react-bootstrap';
import axios from 'axios';

const PatientLookup = () => {
    const [patientCode, setPatientCode] = useState('');
    const [detailOrdinalNumber, setDetailOrdinalNumber] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        if (patientCode === '') {
            setError('Vui lòng nhập mã bệnh nhân.');
            setDetailOrdinalNumber(null);
            return;
        }

        try {
            const response = await axios.get(`http://localhost:5002/api/v1/appointment/realtime-ordinal-number/${patientCode}`);
            setDetailOrdinalNumber(response.data.detailOrdinalNumber);
            setError(``);
        } catch (err) {
            setError('Mã bệnh nhân không tồn tại. Vui lòng thử lại.');
            setDetailOrdinalNumber(null);
        }
    };

    return (
        <Container>
            <nav aria-label="breadcrumb" style={{ backgroundColor: '#fff', padding: '20px 0', borderRadius: '5px' }}>
                <Breadcrumb>
                    <Breadcrumb.Item href="/" style={{ fontSize: '16px', color: '#007bff' }}>Trang chủ</Breadcrumb.Item>
                    <Breadcrumb.Item active style={{ fontSize: '16px', color: '#6c757d' }}>Theo dõi số thứ tự</Breadcrumb.Item>
                </Breadcrumb>
            </nav>
            <h2 className="text-center">Tra cứu số thứ tự theo thời gian thực</h2>
            <p className="text-center">Nhập mã bệnh nhân để tra cứu số thứ tự đang khám hiện tại</p>
            <Form>
                <Form.Group controlId="formPatientCode">
                    <Form.Label>Mã bệnh nhân</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập mã bệnh nhân"
                        value={patientCode}
                        onChange={(e) => setPatientCode(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" onClick={handleSearch}>
                    Tra cứu
                </Button>
            </Form>
            {detailOrdinalNumber && detailOrdinalNumber.ordinalNumber !== null && (
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Title>Số thứ tự đang khám hiện tại là: {detailOrdinalNumber.ordinalNumber.ordinalNumber}</Card.Title>
                        <Card.Text>
                            <strong>Số thứ tự khám của bạn:</strong> {detailOrdinalNumber.appointment.ordinalNumber}<br />
                            <strong>Họ và tên:</strong> {detailOrdinalNumber.examinationRecord.firstname} {detailOrdinalNumber.examinationRecord.lastname}<br />
                            <strong>Email:</strong> {detailOrdinalNumber.examinationRecord.email}<br />
                            <strong>Số điện thoại:</strong> {detailOrdinalNumber.examinationRecord.phone}<br />
                            <strong>Ngày sinh:</strong> {detailOrdinalNumber.examinationRecord.dob}<br />
                            <strong>Giới tính:</strong> {detailOrdinalNumber.examinationRecord.gender === 2 ? 'Nữ' : 'Nam'}<br />
                            <strong>Địa chỉ:</strong> {detailOrdinalNumber.examinationRecord.address}<br />
                            <strong>Lý do khám:</strong> {detailOrdinalNumber.examinationRecord.reasonForConsultation}
                        </Card.Text>
                    </Card.Body>
                </Card>
            )}
            {error && (
                <Alert variant="danger" className="mt-3">
                    {error}
                </Alert>
            )}
        </Container>
    );
};

export default PatientLookup;
