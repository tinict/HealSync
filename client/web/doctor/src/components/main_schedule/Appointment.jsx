import * as React from "react";
import { Tabs, Tab, Box, Typography } from '@mui/material';
import CalendarAppointment from "./CalendarAppointment";
import TableAppointment from "./TableAppointment";


export default function Appointment() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div bgcolor="#f9f9f9">
            <Typography variant="h5" component="h3" gutterBottom>
                Quản lý lịch bệnh nhân đặt khám
            </Typography>
            <Box sx={{ width: '100%' }}>
                <Tabs value={value} onChange={handleChange} aria-label="Tabs" indicatorColor="primary" textColor="primary">
                    <Tab label="Lịch bệnh nhân đăng ký khám" />
                    <Tab label="Trạng thái bệnh nhân đăng ký khám" />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <CalendarAppointment />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <TableAppointment />
                </TabPanel>
            </Box>
        </div>
    );
};

function TabPanel({ children, value, index }) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}
