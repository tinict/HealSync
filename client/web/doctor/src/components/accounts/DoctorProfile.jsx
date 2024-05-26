import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, TextField, Button, Box, Tab, Tabs, MenuItem } from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from './Avatar';
import ResetPassword from './ResetPassword';

const DoctorProfile = () => {
  const userInfo = useSelector(state => state.auth.user);
  const [tabValue, setTabValue] = useState(0);
  const [profile, setProfile] = useState(null);
  const [doctorInfo, setDoctorInfo] = useState({
    firstname: '',
    lastname: '',
    specialty: '',
    email: '',
    phone: '',
    workspace: '',
    location: '',
    experience: '',
    gender: '',
    degree: '',
    position: '',
    dob: '',
    address: '',
    idCardNumber: ''
  });
  const [avatar, setAvatar] = useState(null);


  const apiMe = async () => {
    const response = await axios.get(`http://localhost:5002/api/v1/doctors/profile/${userInfo.user.identity_id}`)
    setProfile(response.data);
    setDoctorInfo(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    apiMe();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDoctorInfo({ ...doctorInfo, [name]: value });
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = () => {
    axios.put(
      "http://localhost:5002/api/v1/doctor/profile",
      {
        ...doctorInfo,
        doctor_id: userInfo.user.identity_id
      }
    )
      .then((res) => {
        setDoctorInfo(res.data);
      })
  };

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container style={{ marginTop: '20px' }}>
      <Paper style={{ padding: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Thông tin cá nhân của bạn
        </Typography>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleChangeTab} aria-label="tabs">
            <Tab label="Ảnh đại diện" />
            <Tab label="Thông tin cá nhân" />
            <Tab label="Thông tin chuyên môn" />
            <Tab label="Tài khoản" />
          </Tabs>
        </Box>
        <Grid container spacing={2} style={{ marginTop: '20px' }}>
          {tabValue === 0 && (
            <Avatar />
          )}
          {tabValue === 1 && (
            <>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Họ"
                  name="firstName"
                  value={doctorInfo.firstname}
                  onChange={handleInputChange}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Tên"
                  name="lastName"
                  value={doctorInfo.lastname}
                  onChange={handleInputChange}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={doctorInfo.email}
                  onChange={handleInputChange}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Số điện thoại"
                  name="phone"
                  value={doctorInfo.phone}
                  onChange={handleInputChange}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nơi làm việc"
                  name="workspace"
                  value={doctorInfo.workspace}
                  onChange={handleInputChange}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Địa chỉ"
                  name="address"
                  value={doctorInfo.location}
                  onChange={handleInputChange}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Giới tính"
                  name="gender"
                  select
                  value={doctorInfo.gender}
                  onChange={handleInputChange}
                  variant="outlined"
                  margin="normal"
                >
                  <MenuItem value="1">Nam</MenuItem>
                  <MenuItem value="2">Nữ</MenuItem>
                  <MenuItem value="3">Khác</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Tháng/ngày/năm sinh"
                  name="dob"
                  type="date"
                  value={doctorInfo.dob}
                  onChange={handleInputChange}
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Địa chỉ hiện tại"
                  name="address"
                  value={doctorInfo.address}
                  onChange={handleInputChange}
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="CMND/CCCD"
                  name="idCardNumber"
                  value={doctorInfo.idCardNumber}
                  onChange={handleInputChange}
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </>
          )}
          {tabValue === 2 && (
            <>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Học vị"
                  name="degree"
                  value={doctorInfo.degree}
                  onChange={handleInputChange}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Chức vụ"
                  name="position"
                  value={doctorInfo.position}
                  onChange={handleInputChange}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Chuyên môn"
                  name="qualification"
                  value={doctorInfo.qualification}
                  onChange={handleInputChange}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Chuyên ngành"
                  name="specialty"
                  value={doctorInfo.specialty}
                  onChange={handleInputChange}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Mô tả kinh nghiệm làm việc"
                  name="experience"
                  value={doctorInfo.experience}
                  onChange={handleInputChange}
                  variant="outlined"
                  margin="normal"
                  multiline
                  rows={4}
                />
              </Grid>
            </>
          )}
          {tabValue === 3 && (
            <ResetPassword />
          )}
        </Grid>
        {
          (tabValue !== 0 && tabValue !== 3) && (
            <Button variant="contained" color="primary" onClick={handleUpdateProfile} style={{ marginTop: '20px' }}>
              Cập nhật
            </Button>
          )
        }
      </Paper>
    </Container>
  );
};

export default DoctorProfile;
