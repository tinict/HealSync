import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Modal, Button, TextField, Select, MenuItem, FormControl, Grid, Box, Typography, Alert } from '@mui/material';
import './tablescheduler.css';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
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
    const [modalThanOneDay, setModalThanOneDay] = useState(false);
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');
    const [limited, setLimited] = useState(false);

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
        console.log(updatedEvents);
        setEvents(updatedEvents);
    };

    const handleNavigate = (newDate, view, action) => {
        console.log('Navigate:', newDate, view, action);
    };

    function isMoreThanOneDay(startDate, endDate) {
        let start = new Date(startDate);
        let end = new Date(endDate);

        let diff = end - start;

        let diffInDays = diff / (1000 * 60 * 60 * 24);

        return diffInDays > 1;
    };

    const handleSelectSlot = ({ start, end }) => {
        const checkThanOneDay = isMoreThanOneDay(start, end);
        console.log(isMoreThanOneDay(start, end));
        if (!checkThanOneDay) {
            setNewEvent({
                id: uuidv4(),
                start,
                end,
                price: '',
                location: '',
                mode: 0,
            });
            setModalIsOpen(true);
        } else {
            setNewEvent({
                id: uuidv4(),
                start,
                end,
                price: '',
                location: '',
                mode: 0,
            });
            setModalThanOneDay(true);
        }
    };

    const handleSelectEvent = (event) => {
        console.log(event);
        setSelectedEvent(event);
        setNewEvent(event.extendedProps);
        setModalIsOpen(true);
    };

    const handleModalClose = () => {
        setModalIsOpen(false);
        setNewEvent({});
        setSelectedEvent(null);
        setIsEditing(false);
        setLimited(false);
    };

    const handleModalInputChange = (fieldName, value) => {
        setNewEvent(prevEvent => ({
            ...prevEvent,
            [fieldName]: value,
        }));
        if (isEditing) {
            console.log(fieldName, value);
            setSelectedEvent(prevEvent => ({
                ...prevEvent,
                extendedProps: {
                    ...prevEvent.extendedProps,
                    [fieldName]: value,
                }
            }));
            console.log(selectedEvent);
        }
    };

    function formatTime(dateString) {
        if (!dateString) {
            return undefined;
        }

        const date = new Date(dateString);

        if (isNaN(date.getTime())) {
            return undefined;
        }

        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${hours}:${minutes}:${seconds}`;
    };

    const APIUpdateEvent = async (event) => {
        let starttime = formatTime(selectedEvent?.extendedProps?.start);
        let endtime = formatTime(selectedEvent?.extendedProps?.end);
        return await axios.put(`http://localhost:5002/api/v1/timeslots/${event.extendedProps.timeslot_id}`, {
            count_person: event?.extendedProps?.countPerson,
            cost: event?.extendedProps?.price,
            localtion: event.extendedProps.location,
            starttime: starttime,
            endtime: endtime,
        });
    };

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

                        if (!isNaN(startDate?.getDate()) && !isNaN(endDate?.getDate())) {
                            const event = {
                                id: uuidv4(),
                                title: `Doctor: ${eventData.scheduleEntity.doctorEntity.doctor_id} - Location: ${eventData.localtion}`,
                                start: new Date(`${eventData.scheduleEntity.datework}T${eventData.starttime}`),
                                end: new Date(`${eventData.scheduleEntity.datework}T${eventData.endtime}`),
                                extendedProps: {
                                    price: eventData.cost,
                                    countPerson: eventData.count_person,
                                    location: eventData.localtion,
                                    mode: eventData.scheduleEntity.scheduleTypeEntity.typeSchedule,
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

    const handleCreateMutipleAppointment = async () => {
        console.log(newEvent.start, newEvent.end);

        console.log(newEvent.start, newEvent.end);

        const startTime = new Date(newEvent.start);
        const endTime = new Date(newEvent.end);

        let current = new Date(startTime);
        const end = new Date(endTime);

        while (current <= end) {
            let currentStart = new Date(current);
            let currentEnd = new Date(current);
            currentEnd.setHours(endTime.getHours(), endTime.getMinutes());

            console.log(currentStart.toISOString(), currentEnd.toISOString());

            try {
                await APITimeTable(
                    currentStart.toISOString(),
                    currentEnd.toISOString(),
                    userInfo.user.identity_id,
                    newEvent.location,
                    newEvent.countPerson,
                    newEvent.price
                );
            } catch (error) {
                continue;
            }

            current.setDate(current?.getDate() + 1);
        }
        setModalThanOneDay(false);
        displayEventsOnCalendar();
        handleAction("Lịch khám của bạn đã được tạo thành công !");
    };

    const handleEventResize = ({ event, start, end }) => {
        console.log({ event, start, end });
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
                mode: item.scheduleEntity.typeSchedule,
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
            setLimited(true);
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

    const formatDateToInput = (date) => {
        if (!date) return '';
        const d = new Date(date);
        const offset = d.getTimezoneOffset();
        d.setMinutes(d.getMinutes() - offset);
        return d.toISOString().slice(0, 16);
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
                views={['day', 'week', 'month']}
                eventPropGetter={(event) => {
                    let newStyle = {
                        backgroundColor: "lightblue",
                        color: 'black',
                        borderRadius: "0px",
                        border: "none"
                    };

                    if (event.extendedProps.mode === 2) {
                        newStyle.backgroundColor = "lightgreen";
                    }

                    return {
                        className: "",
                        style: newStyle
                    };
                }}
            />
            <Modal open={modalIsOpen} onClose={handleModalClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ width: 600, bgcolor: 'background.paper', p: 2 }}>
                    <Typography variant="h5">Tạo lịch khám</Typography>
                    {selectedEvent && !isEditing ? (
                        <div>
                            <Typography><strong>Số lượng bệnh:</strong> {selectedEvent?.extendedProps?.countPerson}</Typography>
                            <Typography><strong>Giá khám:</strong> {selectedEvent?.extendedProps?.price}</Typography>
                            {
                                selectedEvent?.extendedProps?.mode === 1 && (
                                    <Typography><strong>Vị trí khám:</strong> {selectedEvent?.extendedProps?.location}</Typography>
                                )
                            }
                            {
                                selectedEvent?.extendedProps?.mode === 2 && (
                                    <Typography><strong>Chú thích:</strong> {selectedEvent?.extendedProps?.location}</Typography>
                                )
                            }
                            <Typography><strong>Hình thức khám:</strong> {selectedEvent?.extendedProps?.mode ? 'Khám tại phòng khám' : 'Tư vấn trực tuyến'}</Typography>
                            <Typography><strong>Thời gian bắt đầu:</strong> {formatDateToInput(selectedEvent?.start).replace('T', ' ')}</Typography>
                            <Typography><strong>Thời gian kết thúc:</strong> {formatDateToInput(selectedEvent?.end).replace('T', ' ')}</Typography>
                        </div>
                    ) : (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Alert severity="warning">Các bác sĩ hãy chọn phù hợp số lượng bệnh nhân phù hợp trong ngày. Tránh trường hợp quá tải.</Alert>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Số lượng bệnh"
                                    value={isEditing ? (selectedEvent?.extendedProps?.countPerson || '') : newEvent.countPerson}
                                    onChange={(e) => handleModalInputChange('countPerson', e.target.value)}
                                />
                            </Grid>
                            {
                                !limited && (
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Giá khám"
                                            value={isEditing ? (selectedEvent?.extendedProps?.price || '') : newEvent.price}
                                            onChange={(e) => handleModalInputChange('price', e.target.value)}
                                        />
                                    </Grid>
                                )
                            }
                            {
                                newEvent?.mode === 1 || selectedEvent?.extendedProps?.mode === 1 && (
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Vị trí khám"
                                            value={isEditing ? (selectedEvent?.extendedProps?.location || '') : newEvent.location}
                                            onChange={(e) => handleModalInputChange('location', e.target.value)}
                                        />
                                    </Grid>
                                )
                            }
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Vị trí khám"
                                    value={isEditing ? (selectedEvent?.extendedProps?.location || '') : newEvent.location}
                                    onChange={(e) => handleModalInputChange('location', e.target.value)}
                                />
                            </Grid>
                            {
                                newEvent?.mode === 2 || selectedEvent?.extendedProps?.mode === 2 && (
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Chú thích"
                                            value={isEditing ? (selectedEvent?.extendedProps?.location || '') : newEvent.location}
                                            onChange={(e) => handleModalInputChange('location', e.target.value)}
                                        />
                                    </Grid>
                                )
                            }
                            {
                                !limited && (
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Thời gian bắt đầu"
                                            type="datetime-local"
                                            value={isEditing ? formatDateToInput(selectedEvent?.start) : formatDateToInput(newEvent.start)}
                                            onChange={(e) => handleModalInputChange('start', e.target.value)}
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                )
                            }
                            {
                                !limited && (
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Thời gian kết thúc"
                                            type="datetime-local"
                                            value={isEditing ? formatDateToInput(selectedEvent?.end) : formatDateToInput(newEvent.end)}
                                            onChange={(e) => handleModalInputChange('end', e.target.value)}
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                )
                            }
                            {
                                !limited && (
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <Select
                                                value={newEvent.mode}
                                                onChange={(e) => handleModalInputChange('mode', e.target.value)}
                                            >
                                                <MenuItem value={0}>Hình thức khám</MenuItem>
                                                <MenuItem value={1}>Khám tại phòng khám</MenuItem>
                                                <MenuItem value={2}>Tư vấn trực tuyến</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                )
                            }
                        </Grid>
                    )}
                    <Grid container justifyContent="flex-end" mt={2}>
                        <Grid item>
                            {!isEditing && (
                                <>
                                    <Button color="secondary" onClick={handleModalClose}>Đóng</Button>
                                    {
                                        selectedEvent?.extendedProps == null && (
                                            <Button color="primary" onClick={handleModalSave}>Tạo lịch</Button>
                                        )
                                    }
                                </>
                            )}
                            {isEditing && (
                                <>
                                    <Button color="secondary" onClick={handleModalClose}>Đóng</Button>
                                    <Button color="error" onClick={handleDeleteEvent}>Xóa</Button>
                                    <Button color="primary" onClick={handleModalSave}>Cập nhật</Button>
                                </>
                            )}
                            {
                                selectedEvent?.extendedProps != null && !isEditing && (
                                    <Button color="primary" onClick={handleModalEdit}>Chỉnh sửa</Button>
                                )
                            }
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
            <Modal open={modalThanOneDay} onClose={() => setModalThanOneDay(false)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ width: 600, bgcolor: 'background.paper', p: 2 }}>
                    <Typography variant="h5">Tạo lịch khám cố định</Typography>
                    {selectedEvent && !isEditing ? (
                        <div>
                            <Typography><strong>Số lượng bệnh:</strong> {selectedEvent?.extendedProps?.countPerson}</Typography>
                            <Typography><strong>Giá khám:</strong> {selectedEvent?.extendedProps?.price}</Typography>
                            <Typography><strong>Vị trí khám:</strong> {selectedEvent?.extendedProps?.location}</Typography>
                            <Typography><strong>Hình thức khám:</strong> {selectedEvent?.extendedProps?.mode ? 'Khám tại phòng khám' : 'Tư vấn trực tuyến'}</Typography>
                            <Typography><strong>Thời gian bắt đầu:</strong> {formatDateToInput(selectedEvent?.extendedProps?.start)}</Typography>
                            <Typography><strong>Thời gian kết thúc:</strong> {formatDateToInput(selectedEvent?.extendedProps?.end)}</Typography>
                        </div>
                    ) : (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Alert severity="warning">Các bác sĩ hãy chọn phù hợp số lượng bệnh nhân phù hợp trong ngày. Tránh trường hợp quá tải.</Alert>
                            </Grid>
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
                                <Alert severity="warning">Các bác sĩ lưu ý chon lại thời gian muốn tạo lịch, bao gồm thời gian bắt đầu và kết thúc.</Alert>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Thời gian bắt đầu"
                                    type="datetime-local"
                                    value={isEditing ? formatDateToInput(selectedEvent?.extendedProps?.start) : formatDateToInput(newEvent.start)}
                                    onChange={(e) => handleModalInputChange('start', e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Thời gian kết thúc"
                                    type="datetime-local"
                                    value={isEditing ? formatDateToInput(selectedEvent?.extendedProps?.end) : formatDateToInput(newEvent.end)}
                                    onChange={(e) => handleModalInputChange('end', e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <Select
                                        value={newEvent.mode}
                                        onChange={(e) => handleModalInputChange('mode', e.target.value)}
                                    >
                                        <MenuItem value={0}>Hình thức khám</MenuItem>
                                        <MenuItem value={1}>Khám tại phòng khám</MenuItem>
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
                                    <Button color="secondary" onClick={() => setModalThanOneDay(false)}>Đóng</Button>
                                    <Button color="primary" onClick={handleCreateMutipleAppointment}>Tạo lịch</Button>
                                </>
                            )}
                            {isEditing && (
                                <>
                                    <Button color="secondary" onClick={() => setModalThanOneDay(false)}>Đóng</Button>
                                    <Button color="error" onClick={handleDeleteEvent}>Xóa</Button>
                                    <Button color="primary" onClick={handleModalSave}>Cập nhật</Button>
                                </>
                            )}
                            {
                                selectedEvent?.extendedProps != null && !isEditing && (
                                    <Button color="primary" onClick={handleModalEdit}>Chỉnh sửa</Button>
                                )
                            }
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
