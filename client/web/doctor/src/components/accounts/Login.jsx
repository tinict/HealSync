import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, loginFailure } from '../../features/auth/authSlice.js';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.token);
    const userInfo = useSelector(state => state.auth.userInfo);

    const getUserInfo = async (token) => {
        try {
            const response = await axios.get('http://localhost:5001/api/v1/auth/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error('Failed to get user info');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5001/api/v1/auth/login', {
                username,
                password,
                model_type: 'doctor'
            });

            sessionStorage.setItem('token', response.data.access_token);

            const user = await getUserInfo(response.data.access_token);
            const token = response.data.access_token;
            dispatch(loginSuccess({ token, user, isAuthenticated: true }));
            navigate('/');
        } catch (error) {
            console.error('Đăng nhập thất bại:', error);
            dispatch(loginFailure());
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '100px' }}>
            <Typography variant="h4" gutterBottom align="center">Đăng nhập</Typography>
            <form onSubmit={handleLogin}>
                <TextField
                    label="Tên người dùng"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    type="password"
                    label="Mật khẩu"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: '20px' }}
                >
                    Đăng nhập
                </Button>
            </form>
            <Link
                to="/identify"
                style={{ marginTop: '20px', display: 'block', textAlign: 'center' }}
            >
                Quên mật khẩu?
            </Link>
        </Container>
    );
};

export default LoginPage;
