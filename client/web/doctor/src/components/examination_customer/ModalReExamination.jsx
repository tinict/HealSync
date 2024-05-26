import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, TextField, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const ModalReExamination = ({ open, handleClose }) => {
    const userInfo = useSelector((state) => state.auth.user);
    const medicalRecord = useSelector(state => state.medicalRecord);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const [timeSlots, setTimeSlots] = useState([]);

    const getTimeSlots = () => {
        axios.get("http://localhost:5002/api/v1/timeslots", {
            params: {
                doctor_id: userInfo.user.identity_id,
                datework: selectedDate,
                typeSchedule: 1
            }
        })
            .then((res) => {
                setTimeSlots(res.data);
            })
    };

    const confirmAPIReExaminationSchedule = () => {
        axios.post("http://localhost:5002/api/v1/re-examination-schedules", {
            appointment_id: medicalRecord.appointment_id,
            endDay: selectedDate
        });
    };

    useEffect(() => {
        getTimeSlots();
    }, [selectedDate]);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleTimeSlotChange = (event) => {
        setSelectedTimeSlot(event.target.value);
    };

    const handleConfirm = () => {
        confirmAPIReExaminationSchedule();
        handleClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Tạo lịch tái khám
                </Typography>
                <Box sx={{ mt: 2, p: 2, border: '1px solid', borderColor: 'grey.300', borderRadius: 1, backgroundColor: 'grey.50' }}>
                    <Typography 
                        variant="body2" 
                        gutterBottom 
                        sx={{ color: 'text.secondary' }}
                    >
                        *Lưu ý: Các bác sĩ phải nhắc nhở bệnh nhân nội dung sau:
                    </Typography>
                    <Typography 
                        variant="body2" 
                        component="div" 
                        sx={{ color: 'text.secondary' }}
                    >
                        <ol>
                            <li>Có thể đến đúng vào thời gian tái khám hoặc đến bất kỳ thời gian nào trước ngày hẹn khám lại nếu có dấu hiệu (triệu chứng) bất thường.</li>
                            <li>Giấy hẹn khám lại chỉ có giá trị sử dụng 01 (một) lần trong thời hạn 10 ngày làm việc, kể từ ngày được hẹn khám lại.</li>
                        </ol>
                    </Typography>
                </Box>
                <TextField
                    id="date"
                    label="Chọn ngày tái khám"
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    fullWidth
                    sx={{ mt: 2 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Box sx={{ mt: 2, textAlign: 'right' }}>
                    <Button variant="outlined" onClick={handleClose} sx={{ mr: 2 }}>
                        Hủy bỏ
                    </Button>
                    <Button variant="contained" onClick={handleConfirm}>
                        Xác nhận
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ModalReExamination;
