import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Modal, Button, TextField, Select, MenuItem, FormControl, InputLabel, FormHelperText, Grid, Box, Typography } from '@mui/material';
import './tablescheduler.css';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import CancelAppointmentModal from './CancelAppointmentModal';
import ToastMessage from '../ToastMessage';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const TableScheduler = () => {
    const [events, setEvents] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [newEvent, setNewEvent] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpenCancel, setIsModalOpenCancel] = useState(false);
    const [listData, setListData] = useState([]);

    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');

    const handleAction = (message) => {
        setToastMessage(message);
        setToastType('success');
        setToastOpen(true);
    };

    const handleCloseToast = () => {
        setToastOpen(false);
    };


    const userInfo = useSelector(state => state.auth.user);

    const handleEventDrop = ({ event, start, end }) => {
        const updatedEvents = events.map(item => (item.id === event.id ? { ...item, start, end } : item));
        setEvents(updatedEvents);
    };

    const handleNavigate = (newDate, view, action) => {
        console.log('Navigate:', newDate, view, action);
    };

    const handleSelectSlot = ({ start, end }) => {
        setNewEvent({
            id: uuidv4(),
            start,
            end,
            price: '',
            location: '',
            mode: '',
        });
        setModalIsOpen(true);
    };

    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
        setNewEvent(event.extendedProps);
        setModalIsOpen(true);
    };

    const handleModalClose = () => {
        setModalIsOpen(false);
        setNewEvent({});
        setSelectedEvent(null);
        setIsEditing(false);
    };

    const handleModalInputChange = (fieldName, value) => {
        setNewEvent(prevEvent => ({
            ...prevEvent,
            [fieldName]: value,
        }));
        if (isEditing) {
            setSelectedEvent(prevEvent => ({
                ...prevEvent,
                extendedProps: {
                    ...prevEvent.extendedProps,
                    [fieldName]: value,
                }
            }));
        }
    };

    const APIUpdateEvent = async (event) => {
        return await axios.put(`http://localhost:5002/api/v1/timeslots/${event.extendedProps.timeslot_id}`, {
            count_person: event.extendedProps.countPerson,
            cost: event.extendedProps.price,
            localtion: event.extendedProps.location,
        });
    }

    const handleModalSave = async () => {
        if (isEditing && selectedEvent) {
            try {
                await APIUpdateEvent(selectedEvent);
                const updatedEvents = events.map(e => e.id === selectedEvent.id ? selectedEvent : e);
                setEvents(updatedEvents);
                setModalIsOpen(false);
                setSelectedEvent(null);
                setIsEditing(false);
                handleAction("Cập nhật thông tin lịch khám thành công !");
                displayEventsOnCalendar();
            } catch (error) {
                console.error('Error updating event:', error);
            }
        } else {
            if (newEvent.price && newEvent.location && newEvent.mode && newEvent.countPerson) {
                try {
                    const res = await APITimeTable(newEvent.start, newEvent.end, userInfo.user.identity_id, newEvent.location, newEvent.countPerson, newEvent.price);
                    handleAction("Tạo lịch khám thành công !");
                    setModalIsOpen(false);
                    displayEventsOnCalendar();
                    const eventData = res.data.scheduleCreate;
                    if (eventData.scheduleEntity && eventData.scheduleEntity.datework && eventData.starttime && eventData.endtime) {
                        const startDate = new Date(`${eventData.scheduleEntity.datework}T${eventData.starttime}`);
                        const endDate = new Date(`${eventData.scheduleEntity.datework}T${eventData.endtime}`);

                        if (!isNaN(startDate.getDate()) && !isNaN(endDate.getDate())) {
                            const event = {
                                id: uuidv4(),
                                title: `Doctor: ${eventData.scheduleEntity.doctorEntity.doctor_id} - Location: ${eventData.localtion}`,
                                start: new Date(`${eventData.scheduleEntity.datework}T${eventData.starttime}`),
                                end: new Date(`${eventData.scheduleEntity.datework}T${eventData.endtime}`),
                                extendedProps: {
                                    price: eventData.cost,
                                    countPerson: eventData.count_person,
                                    location: eventData.localtion,
                                    mode: eventData.scheduleEntity.scheduleTypeEntity.schedule_type_name === 'online' ? 'Khám trực tuyến' : 'Khám tại đơn vị',
                                    doctor: eventData.scheduleEntity.doctorEntity,
                                    schedule_id: eventData.scheduleEntity.schedule_id,
                                    timeslot_id: eventData.timeslot_id,
                                },
                            };
                            setEvents([...events, event]);
                        }
                    }
                    setIsEditing(false);
                } catch (error) {
                    console.error('Error saving event:', error);
                }
            }
        }
    };

    const handleEventResize = ({ event, start, end }) => {
        const updatedEvents = events.map(item => (item.id === event.id ? { ...item, start, end } : item));
        setEvents(updatedEvents);
    };

    const APITimeTable = async (start, end, doctor_id, location, count_person, cost) => {
        const datework = moment(start).format('YYYY-MM-DD');
        const starttime = moment(start).format('HH:mm:ss');
        const endtime = moment(end).format('HH:mm:ss');

        return await axios.post('http://localhost:5002/api/v1/schedules', {
            datework,
            typeSchedule: newEvent.mode,
            doctor_id,
            localtion: location,
            timeslots: [{
                count_person,
                starttime,
                endtime,
                cost,
            }],
        });
    };

    const fetchScheduleData = async () => {
        const response = await axios.get(`http://localhost:5002/api/v1/schedules/${userInfo.user.identity_id}`);
        console.log(response);
        return response.data;
    };

    const convertDataToEvents = (data) => {
        return data.map(item => ({
            id: uuidv4(),
            title: `Lịch khám - ${item.localtion}`,
            start: new Date(`${item.scheduleEntity.datework}T${item.starttime}`),
            end: new Date(`${item.scheduleEntity.datework}T${item.endtime}`),
            extendedProps: {
                price: item.cost,
                countPerson: item.count_person,
                location: item.localtion,
                mode: item.scheduleEntity.typeSchedule === 1 ? 'Khám tại đơn vị' : 'Khám trực tuyến',
                doctor: item.scheduleEntity.doctorEntity,
                schedule_id: item.scheduleEntity.schedule_id,
                timeslot_id: item.timeslot_id,
            },
        }));
    };

    const displayEventsOnCalendar = async () => {
        const data = await fetchScheduleData(2);
        const events = convertDataToEvents(data);
        setEvents(events);
        console.log(events);
        return events;
    };

    useEffect(() => {
        displayEventsOnCalendar();
    }, []);

    const APIDeleteTimeslot = async (timeslot_id) => {
        await axios.delete(`http://localhost:5002/api/v1/timeslots/${timeslot_id}`);
    };

    const APICheckTimeslot = async (timeslot_id) => {
        return await axios.get(`http://localhost:5002/api/v1/examination-records/check/${timeslot_id}`);
    };

    const handleDeleteEvent = async () => {
        if (selectedEvent && selectedEvent.id) {
            const listData = await APICheckTimeslot(selectedEvent.extendedProps.timeslot_id);
            if (listData.data.length == 0) {
                await APIDeleteTimeslot(selectedEvent.extendedProps.timeslot_id);
                const updatedEvents = events.filter(event => event.id !== selectedEvent.id);
                setEvents(updatedEvents);
                setModalIsOpen(false);
                setSelectedEvent(null);
                handleAction("Xóa lịch khám thành công !");
            } else {
                await axios.put(`http://localhost:5002/api/v1/timeslots/${selectedEvent.extendedProps.timeslot_id}`, {
                    isActive: false
                })
                    .then(() => {
                        handleAction("Xóa lịch khám thành công !");
                        displayEventsOnCalendar();
                    })
                setListData(listData);
                openModalCancel(listData);
                setModalIsOpen(false);
                setSelectedEvent(null);
            }
        }
    };

    const handleModalEdit = async () => {
        const listData = await APICheckTimeslot(selectedEvent.extendedProps.timeslot_id);
        if (listData.data.length !== 0) {
            // await APIDeleteTimeslot(selectedEvent.extendedProps.timeslot_id);
            // const updatedEvents = events.filter(event => event.id !== selectedEvent.id);
            // setEvents(updatedEvents);
            // setModalIsOpen(false);
            // setSelectedEvent(null);
            handleAction("Lịch khám này đã có bệnh nhân đăng ký. Thông tin sẽ bị hạn chế chỉnh sửa !");
        }
        setIsEditing(true);
    };

    const openModalCancel = () => {
        setIsModalOpenCancel(true);
    };

    const closeModalCancel = () => {
        setIsModalOpenCancel(false);
    };

    return (
        <div className="calendar-container">
            <DnDCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                className="calendar"
                onEventDrop={handleEventDrop}
                onNavigate={handleNavigate}
                selectable
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
                onEventResize={handleEventResize}
                views={['week', 'day', 'month']}
                eventPropGetter={(event, start, end, isSelected) => {
                    let newStyle = {
                        backgroundColor: "lightblue",
                        color: 'black',
                        borderRadius: "0px",
                        border: "none"
                    };

                    if (event.extendedProps.mode === 'Khám trực tuyến') {
                        newStyle.backgroundColor = "lightgreen";
                    }

                    return {
                        className: "",
                        style: newStyle
                    };
                }}
            />
            <Modal open={modalIsOpen} onClose={handleModalClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ width: 400, bgcolor: 'background.paper', p: 2 }}>
                    <Typography variant="h5">Lịch khám</Typography>
                    {selectedEvent && !isEditing ? (
                        <div>
                            <Typography><strong>Số lượng bệnh:</strong> {selectedEvent?.extendedProps?.countPerson}</Typography>
                            <Typography><strong>Giá khám:</strong> {selectedEvent?.extendedProps?.price}</Typography>
                            <Typography><strong>Vị trí khám:</strong> {selectedEvent?.extendedProps?.location}</Typography>
                            <Typography><strong>Hình thức khám:</strong> {selectedEvent?.extendedProps?.mode}</Typography>
                        </div>
                    ) : (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Số lượng bệnh"
                                    value={isEditing ? (selectedEvent?.extendedProps?.countPerson || '') : newEvent.countPerson}
                                    onChange={(e) => handleModalInputChange('countPerson', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Giá khám"
                                    value={isEditing ? (selectedEvent?.extendedProps?.price || '') : newEvent.price}
                                    onChange={(e) => handleModalInputChange('price', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Vị trí khám"
                                    value={isEditing ? (selectedEvent?.extendedProps?.location || '') : newEvent.location}
                                    onChange={(e) => handleModalInputChange('location', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <Select
                                        value={newEvent.mode}
                                        onChange={(e) => handleModalInputChange('mode', e.target.value)}
                                    >
                                        <MenuItem>Hình thức khám</MenuItem>
                                        <MenuItem value={1}>Khám tại cơ sở || phòng khám</MenuItem>
                                        <MenuItem value={2}>Tư vấn trực tuyến</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    )}
                    <Grid container justifyContent="flex-end" mt={2}>
                        <Grid item>
                            {!isEditing && (
                                <>
                                    <Button color="secondary" onClick={handleModalClose}>Đóng</Button>
                                    <Button color="primary" onClick={handleModalSave}>Tạo lịch</Button>
                                </>
                            )}
                            {isEditing && (
                                <>
                                    <Button color="secondary" onClick={handleModalClose}>Đóng</Button>
                                    <Button color="error" onClick={handleDeleteEvent}>Xóa</Button>
                                    <Button color="primary" onClick={handleModalSave}>Cập nhật</Button>
                                </>
                            )}
                            <Button color="primary" onClick={handleModalEdit}>Chỉnh sửa</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
            <CancelAppointmentModal isOpen={isModalOpenCancel} onClose={closeModalCancel} listData={listData} />
            <ToastMessage
                open={toastOpen}
                message={toastMessage}
                handleClose={handleCloseToast}
                type={toastType}
            />
        </div>
    );
};

export default TableScheduler;
