import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, Breadcrumb } from 'react-bootstrap';
import axios from 'axios';
import { FaFileDownload, FaEye } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const ListMedicalRecord = ({ appointment_id }) => {
    const customerProfile = useSelector(state => state.customer);
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState({});
    const [content, setContent] = useState(null);

    const fetchAPIMedicalRecord = () => {
        axios.get(`http://localhost:5002/api/v1/medical/records`, {
            params: {
                appointment_id,
                customer_id: customerProfile.customer_id
            }
        })
            .then((res) => {
                console.log(res.data);
                setMedicalRecords(res.data);
            })
    };

    useEffect(() => {
        fetchAPIMedicalRecord();
    }, []);

    const handleMedicalRecord = (record) => {
        setSelectedRecord(record);
    }

    const renderRecords = () => {
        return (
            <Row>
                {medicalRecords.map(record => (
                    <Col key={record.id} md={4} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{record?.reasonForConsultation}</Card.Title>
                                <Card.Text>
                                    <strong>Bác sĩ khám:</strong> {record?.doctorEntity?.firstname + " " + record?.doctorEntity?.lastname}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Ngày khám:</strong> {record.createdAt}
                                </Card.Text>
                                <Button variant="primary" onClick={() => openModal(record)}>
                                    <FaEye onClick={() => handleMedicalRecord(record)} />
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        );
    };

    async function fetchFileData(record) {
        try {
            const res = await axios.post('http://localhost:5003/api/v1/file/getpath', {
                file_id: record.diagnostic_records
            });

            const resdata = await axios.post('http://localhost:5003/api/v1/file/readfile', {
                filepath: res.data.file_path
            });

            setContent(resdata.data.content);
            console.log(resdata.data);
        } catch (error) {
            console.error(error);
        }
    }

    const openModal = (record) => {
        fetchFileData(record);
        setSelectedRecord(record);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <Container>
            <nav aria-label="breadcrumb" style={{ backgroundColor: '#fff', padding: '20px 0', borderRadius: '5px' }}>
                <Breadcrumb>
                    <Breadcrumb.Item href="/" style={{ fontSize: '16px', color: '#007bff' }}>Trang chủ</Breadcrumb.Item>
                    <Breadcrumb.Item href="/medical-records" style={{ fontSize: '16px', color: '#007bff' }}>Danh sách bệnh án</Breadcrumb.Item>
                    <Breadcrumb.Item active style={{ fontSize: '16px', color: '#6c757d' }}>Chi tiết bệnh án</Breadcrumb.Item>
                </Breadcrumb>
            </nav>
            <Row className="mb-4">
                <Col>
                    <h1 className="text-center">Chi tiết bệnh án</h1>
                </Col>
            </Row>
            {renderRecords()}
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết bệnh án</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <iframe
                        src={`https://docs.google.com/viewer?url=${encodeURIComponent(`https://mediahealsyc.s3.ap-southeast-1.amazonaws.com/${selectedRecord.diagnostic_records}`)}&embedded=true`}
                        style={{ width: '100%', height: '500px' }}
                    >
                    </iframe>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ListMedicalRecord;
