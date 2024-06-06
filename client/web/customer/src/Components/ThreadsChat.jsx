import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, ListGroup, Navbar, Nav, Modal, Breadcrumb } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

export function ThreadsChat() {
    const [showModal, setShowModal] = useState(false);
    const [threads, setThreads] = useState([]);
    const [groupType, setGroupType] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const customerProfile = useSelector(state => state.customer);
    const isLoggedIn = useSelector(state => state.auth.isAuthenticated);

    const APIThreads = () => {
        axios.get('http://localhost:5006/api/v1/threads')
            .then((res) => {
                console.log(res.data);
                const dataArray = Object.entries(res.data["0"]).map(([index, value]) => {
                    return [index, value];
                });
                setThreads(dataArray);
            })
    };

    useEffect(() => {
        APIThreads();
    }, []);

    const handleCreateQuestion = () => {
        if(!isLoggedIn) {
            alert("Bạn vui lòng đăng nhập/đăng ký để được cấp quyền sử dụng chức năng này!");
            return;
        }
        else {
            setShowModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleQuestionSubmit = () => {
        axios.post("http://localhost:5006/api/v1/thread", {
            group_type: groupType,
            content: content,
            creator: {
                avatar: customerProfile.url_picture,
                user_id: customerProfile.customer_id,
                user_name: customerProfile.name
            }
        })
            .then(() => {
                APIThreads();
            })
            .catch((error) => {
                console.error("Error creating thread: ", error);
            });

        setShowModal(false);
    };

    const ThreadItem = ({ thread }) => {
        const formatDate = (timestamp) => {
            const date = new Date(timestamp);
            return date.toLocaleString();
        };

        const handleReply = () => {
            navigate(`chat/${thread[0]}`);
        };

        return (
            <ListGroup.Item className="thread-item" action onClick={handleReply}>

                <Row>
                    <Col md={5} className="d-flex align-items-center">
                        {thread[1].creator.avatar ? (
                            <img src={thread[1].creator.avatar} alt="Avatar" className="avatar rounded-circle" style={{ width: "50px", height: "50px" }} />
                        ) : (
                            <div className="avatar rounded-circle" style={{ width: "50px", height: "50px", backgroundColor: '#007bff', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {thread[1].creator.username.charAt(0).toUpperCase()}
                            </div>
                        )}
                        <div className="ml-3">
                            <h6 className="mb-0">{thread[1].creator.username}</h6>
                            <small className="text-muted">{formatDate(thread[1].timestamp)}</small>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="thread-content">
                            <p>{thread[1].content}</p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <Button variant="primary" size="sm" onClick={handleReply}>Tham gia</Button>
                        </div>
                    </Col>
                </Row>
            </ListGroup.Item>
        );
    };

    return (
        <Container>
            <nav aria-label="breadcrumb" style={{ backgroundColor: '#fff', padding: '0 20px 0 10px', borderRadius: '5px' }}>
                <Breadcrumb>
                    <Breadcrumb.Item href="/" style={{ fontSize: '16px', color: '#007bff' }}>Trang chủ</Breadcrumb.Item>
                    <Breadcrumb.Item active style={{ fontSize: '16px', color: '#6c757d' }}>Hỏi đáp với bác sĩ</Breadcrumb.Item>
                </Breadcrumb>
            </nav>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand >Hỏi đáp với bác sĩ</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link onClick={handleCreateQuestion}>Đặt câu hỏi</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Row>
                <Col xs={12} md={6} className="mx-auto my-5">
                    <ListGroup>
                        {threads.map((threadId) => (
                            <ThreadItem key={threadId} thread={threadId} />
                        ))}
                    </ListGroup>
                </Col>
            </Row>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Tạo câu hỏi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="groupType">
                            <Form.Label>Chuyên khoa</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập tên chuyên khoa"
                                value={groupType}
                                onChange={(e) => setGroupType(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="content">
                            <Form.Label>Nội dung</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Nhập nội dung"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="button" onClick={handleQuestionSubmit}>
                            Gửi câu hỏi
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};
