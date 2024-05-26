import * as React from "react";
import { Tabs, Tab, Box, Typography } from '@mui/material';
import CalendarAppointment from "./CalendarAppointment";
import TableReExaminationSchedule from "./TableReExaminationSchedule";
import TableReExamination from "./TableReExamination";


export default function ReExaminationSchdedule() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Typography variant="h5" gutterBottom component="div">
                Quản lý lịch tái khám
            </Typography>
            <Box sx={{ width: '100%' }}>
                <Tabs value={value} onChange={handleChange} aria-label="Tabs">
                    <Tab label="Lịch bệnh nhân tái khám" />
                    <Tab label="Danh sách đăng ký tái khám" />
                    <Tab label="Danh sách yêu cầu tái khám" />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <CalendarAppointment />
                </TabPanel>
                <TabPanel value={value} index={1}>
                   <TableReExaminationSchedule />
                </TabPanel>
                <TabPanel value={value} index={2}>
                   <TableReExamination />
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
