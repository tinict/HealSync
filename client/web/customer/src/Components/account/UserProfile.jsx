import React, { useState, useEffect } from 'react';
import Avatar from 'react-avatar';
import { Form, Button, Container, Row, Col, Breadcrumb } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const UserProfile = () => {
    const customerProfile = useSelector(state => state.customer);
    const [userData, setUserData] = useState({
        name: '',
        family_name: '',
        email: '',
        url_picture: '',
        phone: '',
        address: '',
        dob: '',
        gender: ''
    });

    console.log(customerProfile);

    useEffect(() => {
        fetchApiMe(customerProfile.customer_id);
    }, []);

    const fetchApiMe = (customer_id) => {
        axios.get(`http://localhost:5002/api/v1/customer/me/${customer_id}`)
            .then((res) => {
                setUserData(res.data);
            })
    };

    const fetchApiUpdateMe = (customer) => {
        axios.put(`http://localhost:5002/api/v1/customer/me`, {
            customer
        })
            .then(() => {
                fetchApiMe(customerProfile.customer_id);
            })
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        let formData = new FormData();
        formData.append('file', file);
        formData.append('user_id', customerProfile.customer_id);
        formData.append('filename', `${customerProfile.customer_id + '_avatar'}`);

        axios.post(`http://localhost:5003/api/v1/media/upload/singlefile`, formData, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
            }
        })
            .then((res) => {
                const newUserData = {
                    ...userData,
                    url_picture: `https://mediahealsyc.s3.ap-southeast-1.amazonaws.com/${res.data.file_path}`
                };
                setUserData(newUserData);
                fetchApiUpdateMe(newUserData);
            })
        const reader = new FileReader();
        reader.onloadend = () => {
            setUserData(prevData => ({
                ...prevData,
                url_picture: reader.result
            }));
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchApiUpdateMe(userData);
    };

    return (
        <Container className="mt-4">
            <nav aria-label="breadcrumb" style={{ backgroundColor: '#fff', padding: '20px 0', borderRadius: '5px' }}>
                <Breadcrumb>
                    <Breadcrumb.Item href="/" style={{ fontSize: '16px', color: '#007bff' }}>Trang chủ</Breadcrumb.Item>
                    <Breadcrumb.Item active style={{ fontSize: '16px', color: '#6c757d' }}>Theo tin cá nhân</Breadcrumb.Item>
                </Breadcrumb>
            </nav>
            <h4 className="mb-4">Thông tin cá nhân</h4>
            <Row>
                <Col md={4}>
                    <div className="card mb-4">
                        <div className="card-header">Ảnh đại diện</div>
                        <div className="card-body text-center">
                            <Avatar
                                name={`${userData.family_name} ${userData.name}`}
                                src={userData.url_picture}
                                round={true}
                                size="150"
                                style={{ marginBottom: '20px', cursor: 'pointer' }}
                            />
                            <div className="small font-italic text-muted mb-4"></div>
                            <Button variant="primary" onClick={() => document.getElementById('avatarInput').click()}>
                                Thay ảnh đại diện
                            </Button>
                            <Form.Control
                                id="avatarInput"
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleAvatarChange}
                            />
                        </div>
                    </div>
                </Col>
                <Col md={8}>
                    <div className="card mb-4">
                        <div className="card-header">Chi tiết thông tin</div>
                        <div className="card-body">
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formFirstName">
                                    <Form.Label>Họ đệm</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập họ đệm"
                                        name="family_name"
                                        value={userData.family_name}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formLastName">
                                    <Form.Label>Tên</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="tên"
                                        name="name"
                                        value={userData.name}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Địa chỉ email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        name="email"
                                        value={userData.email}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formPhone">
                                    <Form.Label>Số điện thoại</Form.Label>
                                    <Form.Control
                                        type="phone"
                                        placeholder="Nhập số điện thoại"
                                        name="phone"
                                        value={userData.phone}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formaAddress">
                                    <Form.Label>Địa chỉ</Form.Label>
                                    <Form.Control
                                        type="address"
                                        placeholder="Nhập địa chỉ"
                                        name="address"
                                        value={userData.address}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formDateOfBirth">
                                    <Form.Label>Ngày sinh</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="dob"
                                        value={userData.dob}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGender">
                                    <Form.Label>Giới tính</Form.Label>
                                    <Form.Select
                                        name="gender"
                                        value={userData.gender}
                                        onChange={handleChange}
                                    >
                                        <option value="">Chọn giới tính</option>
                                        <option value="1">Nam</option>
                                        <option value="2">Nữ</option>
                                        <option value="3">Khác</option>
                                    </Form.Select>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Lưu thay đổi
                                </Button>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default UserProfile;
