import * as React from "react";
import { Tabs, Tab, Box, Container, Typography } from '@mui/material';
import TablePatient from "./TablePatient";
import PatientManagement from "./PatientManagement";

export default function Patient() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Typography variant="h5" gutterBottom component="div">
                Quản lý bệnh nhân
            </Typography>

            <Box sx={{ width: '100%' }}>
                <Tabs value={value} onChange={handleChange} aria-label="Tabs">
                    <Tab label="Danh sách bệnh nhân đặt khám" />
                    <Tab label="Hồ sơ bệnh nhân" />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <TablePatient />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <PatientManagement />
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
