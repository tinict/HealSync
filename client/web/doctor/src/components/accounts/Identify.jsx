import React, { useState } from 'react';
import { Container, Grid, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Identify = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const apiIdentifyProfile = (email) => {
        axios.get(`http://localhost:5001/api/v1/identify/profile?email=${email}`)
            .then((res) => {
                if (res.data !== null) navigate(`/forgot-password?eu=${email}&&identity_id=${res.data.identify}&&is_identify=true`);
            })
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        apiIdentifyProfile(email);
    };

    return (
        <Container>
            <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>
                        Xác thực thông tin người dùng
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            id="email"
                            type="email"
                            label="Nhập email"
                            placeholder="Nhập email *"
                            value={email}
                            onChange={handleEmailChange}
                            required
                            margin="normal"
                        />
                        <Button variant="contained" color="primary" type="submit">
                            Tiếp theo
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Identify;
