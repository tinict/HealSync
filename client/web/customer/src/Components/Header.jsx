import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { FaGoogle, FaUser, FaCalendarAlt, FaUserMd, FaHistory, FaSignOutAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { loginSuccess, logout } from '../Features/auth/authSlice';
import { customer } from '../Features/customerSlice';
import Cookies from 'js-cookie';
import axios from 'axios';
import logo from '../Assets/z5358536056347_d9d573f4c26c622464b085d089ab77ea.jpg (1).png'

function Header() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isAuthenticated);
    const customerProfile = useSelector(state => state.customer);
    const [userProfile, setUserProfile] =  useState([]);
    
    function logIn() {
        window.open('http://localhost:5000/api/v1/auth/google', '_self');
    }

    function getProfileCustomer() {
        const client_token = Cookies.get('client_token');
        axios.get('http://localhost:5000/api/v1/google/account/me', {
            headers: { Authorization: `${client_token}` }
        })
            .then((response) => {
                console.log(response);
                axios.get(`http://localhost:5002/api/v1/customer/me/${response.data.google_id}`)
                    .then((res) => {
                        setUserProfile(res.data);
                        console.log(res.data);
                        dispatch(customer(res.data));
                    })
            })
            .catch(error => console.error(error));
    };

    function logOut() {
        const client_token = Cookies.get('client_token');
        axios.post('http://localhost:5000/api/v1/google/logout', { client_token });
        Cookies.remove('client_token');
        dispatch(logout());
        localStorage.removeItem("state");
    };

    useEffect(() => {
        const isLoggin = Cookies.get('client_token');
        if (isLoggin != null && !isLoggedIn) {
            dispatch(loginSuccess(isLoggin));
        }
        getProfileCustomer();
    }, []);

    return (
        <header className="header bg-light py-3">
            <Navbar expand="lg" className="header-nav">
                <Container>
                    <Navbar.Brand as={Link} to="/" className="menu-logo">
                        <img src={logo} className="img-fluid" alt="Logo" style={{ width: '85x', height: '85px' }} />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/list-doctor" className="nav-link">Bác sĩ</Nav.Link>
                            <Nav.Link as={Link} to="/doctors" className="nav-link">Đặt lịch khám</Nav.Link>
                            <Nav.Link as={Link} to="/patient-lookup" className="nav-link">Theo dõi số thứ tự</Nav.Link>
                            <Nav.Link as={Link} to="/community" className="nav-link">Hỏi đáp với bác sĩ</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    {isLoggedIn ? (
                        <Dropdown className="nav header-navbar-rht">
                            <Dropdown.Toggle className="nav-link header-login" id="dropdown-basic">
                                <img src={`${userProfile.url_picture}`} alt="Avatar" className="avatar" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu-right border">
                                <Link to="/account/profile" className="dropdown-item dropdown-item-custom">
                                    <FaUser className="dropdown-icon" /> <span className="dropdown-item-text">Trang cá nhân</span>
                                </Link>
                                <Link to="/manager-appointment" className="dropdown-item dropdown-item-custom">
                                    <FaCalendarAlt className="dropdown-icon" /> <span className="dropdown-item-text">Lịch đăng ký</span>
                                </Link>
                                <Link to="/re-examination-schedules" className="dropdown-item dropdown-item-custom">
                                    <FaCalendarAlt className="dropdown-icon" /> <span className="dropdown-item-text">Lịch tái khám</span>
                                </Link>
                                <Link to="/medical-records" className="dropdown-item dropdown-item-custom">
                                    <FaUserMd className="dropdown-icon" /> <span className="dropdown-item-text">Hồ sơ khám</span>
                                </Link>
                                <Link to="/invoices" className="dropdown-item dropdown-item-custom">
                                    <FaHistory className="dropdown-icon" /> <span className="dropdown-item-text">Hóa đơn</span>
                                </Link>
                                <Link to="/refunds" className="dropdown-item dropdown-item-custom">
                                    <FaHistory className="dropdown-icon" /> <span className="dropdown-item-text">Hoàn tiền</span>
                                </Link>
                                <Dropdown.Item className="dropdown-item-custom" onClick={logOut}>
                                    <FaSignOutAlt className="dropdown-icon" /> <span className="dropdown-item-text">Đăng xuất</span>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    ) : (
                        <Dropdown className="nav header-navbar-rht">
                            <Dropdown.Toggle className="nav-link header-login" id="dropdown-basic">
                                <i className="fas fa-user"></i> Đăng nhập / Đăng ký
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item className="dropdown-item-custom" onClick={logIn}>
                                    <FaGoogle /> <span className="dropdown-item-text">Login with Google</span>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    )}
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
