import Sidebar from '../components/Sidebar';
import CreateMedicalRecord from '../components/examination_customer/CreateMedicalRecord';
import React from 'react';
import { Grid, Box } from '@mui/material';
import Header from '../components/Header';

function CreateMedicalPage() {
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
                    <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
                        <CreateMedicalRecord />
                    </Box>
                </Grid>
            </Grid>
        </>
    )
};

export default CreateMedicalPage;
