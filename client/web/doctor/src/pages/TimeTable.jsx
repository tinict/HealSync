import React from 'react';
import Sidebar from '../components/Sidebar';
import MainSchedule from '../components/main_schedule';
import { Grid, Box, Breadcrumbs, Link, Typography } from '@mui/material';
import Header from '../components/Header';

function TimeTable() {
    return (
        <>
            <Grid container spacing={0} sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
                <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, width: '100%', zIndex: 1100 }}>
                    <Header />
                </Box>
                <Grid item xs={12} md={1} style={{ position: 'fixed', top: '64px', left: 0, bottom: 0, background: "#001C38", minWidth: "80px", maxWidth: "80px" }}>
                    <Box sx={{ bgcolor: '#001C38', width: "100%" }}>
                        <Sidebar />
                    </Box>
                </Grid>
                <Grid item xs={12} md={11} style={{ marginTop: '64px', marginLeft: '80px' }}>
                    <Box sx={{ p: 4, bgcolor: 'background.paper' }}>
                        <Breadcrumbs separator="/" aria-label="breadcrumb">
                            <Link color="inherit" href="/">
                                Trang chủ
                            </Link>
                            <Typography color="textPrimary">Tạo lịch khám</Typography>
                        </Breadcrumbs>
                        <MainSchedule />
                    </Box>
                </Grid>
            </Grid>
        </>
    )
};

export default TimeTable;
