import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [countdown, setCountdown] = useState(60);
    const [sendOTP, setSendOTP] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const eu = queryParams.get('eu');
    const identity_id = queryParams.get('identity_id');
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (sendOTP) {
            const timer = setTimeout(() => {
                if (countdown > 0) {
                    setCountdown(countdown - 1);
                }
                if (countdown === 0 && sendOTP) {
                    setSendOTP(false);
                    setCountdown(60);
                }
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [countdown, sendOTP]);

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleOtpChange = (event) => {
        setOtp(event.target.value);
    };

    const handleSendOtp = () => {
        axios.get(`http://localhost:5001/api/v1/identify/otp?eu=${eu}`)
            .then((res) => {
                setToken(res.data.token);
            })
        setSendOTP(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:5001/api/v1/auth/reset-password", {
            "password": newPassword,
            "identity_id": identity_id,
            "otp_key": otp,
            "token": token
        })
            .then(() => {
                navigate("/login");
            })
    };

    return (
        <Container>
            <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>
                        Đổi mật khẩu
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            id="newPassword"
                            type="password"
                            label="Mật khẩu mới"
                            placeholder="Nhập mật khẩu mới"
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                            required
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            id="Nhập lại mật khẩu"
                            type="password"
                            label="Nhập lại mật khẩu"
                            placeholder="Nhập lại mật khẩu"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                            margin="normal"
                        />
                        {
                            !sendOTP && (
                                <Typography variant="body1" gutterBottom>
                                    <span onClick={handleSendOtp} style={{ textDecoration: 'underline', color: 'blue', cursor: 'pointer' }}>Yêu cầu gửi mã OTP</span>. Mã OTP sẽ được gửi đến email của bạn.
                                </Typography>
                            )
                        }
                        {
                            sendOTP && (
                                <Typography variant="body1" gutterBottom>
                                    *Lưu ý: Mã OTP sẽ được gửi đến email của bạn.<br></br>
                                    Hãy đợi {countdown} giây trước khi yêu cầu gửi lại khi bạn vẫn chưa nhận được mã OTP.
                                </Typography>
                            )
                        }
                        <TextField
                            fullWidth
                            id="otp"
                            type="text"
                            label="Mã OTP"
                            placeholder="Nhập mã OTP"
                            value={otp}
                            onChange={handleOtpChange}
                            required
                            margin="normal"
                        />
                        <Button variant="contained" color="primary" type="submit">
                            Đổi mật khẩu
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ForgotPassword;
