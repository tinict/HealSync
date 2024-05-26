import React from 'react';
import { Typography, Box } from '@mui/material';
import TableScheduler from "./TableScheduler";

function MainSchedule() {
    return (
        <Box style={{ marginTop: "16px", marginBottom: "16px" }}>
            <Typography variant="h5" gutterBottom>
                Lịch khám bệnh
            </Typography>
            <TableScheduler />
        </Box>
    )
};

export default MainSchedule;
