import React, { useState } from 'react';
import { Button, Modal, TextField } from '@mui/material';
import axios from 'axios';

const CancelAppointmentModal = ({ isOpen, onClose, listData }) => {
    const [reason, setReason] = useState('');

    const APIMailer = (listData, reason) => {
        console.log(listData);
        const result = [];
        listData.forEach(item => {
            result.push({
                to: item.email,
                subject: `HealthHub | Thông báo hủy lịch khám benh nhan ${item.firstname}`,
                template: 'appointment_cancel',
                data: {
                    firstname: item.firstname,
                    lastname: item.lastname,
                    phone: item.phone,
                    date: item.appointmentEntity.timeSlotEntity.scheduleEntity.datework,
                    starttime: item.appointmentEntity.timeSlotEntity.starttime,
                    endtime: item.appointmentEntity.timeSlotEntity.endtime,
                    doctor_firstname: item.appointmentEntity.timeSlotEntity.scheduleEntity.doctorEntity.firstname,
                    doctor_lastname: item.appointmentEntity.timeSlotEntity.scheduleEntity.doctorEntity.lastname,
                    location: item.appointmentEntity.timeSlotEntity.localtion,
                    schedule_type: item.appointmentEntity.timeSlotEntity.scheduleEntity.scheduleTypeEntity.schedule_type_name,
                    reason: reason
                }
            });
        });

        return result;
    };

    const handleCancel = () => {
        const mailerSendData = APIMailer(listData.data, reason);
        console.log(mailerSendData);
        axios.post('http://localhost:5009/api/v1/mailer/sendmail/list', {
            listData: mailerSendData
        });
        onClose();
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="cancel-appointment-modal-title"
            aria-describedby="cancel-appointment-modal-description"
        >
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '8px', maxWidth: '400px' }}>
                <h2 id="cancel-appointment-modal-title">Hủy lịch khám</h2>
                <p id="cancel-appointment-modal-description">Vui lòng điền lý do hủy lịch khám:</p>
                <TextField
                    label="Lý do"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    style={{ marginBottom: '20px' }}
                />
                <Button onClick={handleCancel} variant="contained" color="primary">
                    Hủy lịch khám
                </Button>
            </div>
        </Modal>
    );
};


export default CancelAppointmentModal;
