import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { doctors } from '../Features/doctorsSlice';
import { dateScheduleDoctor } from '../Features/dateScheduleDoctorSlice';
import { filterDoctor } from '../Features/filterDoctorSlice';

function SubFilter() {
    const currentDate = new Date();
    const [date, setDate] = useState(currentDate);
    const [scheduleTypeId, setScheduleTypeId] = useState(1);
    const dispatch = useDispatch();

    const formatDate2 = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        const getDoctorByTime = async () => {
            try {
                const response = await axios.get(`http://localhost:5002/api/v1/doctors/day/${formatDate2(date)}?typeSchedule=${scheduleTypeId}`);
                dispatch(doctors(response.data));
                dispatch(dateScheduleDoctor(formatDate2(date)));
                dispatch(filterDoctor({
                    datework: formatDate2(date),
                    scheduleTypeId: scheduleTypeId
                }));
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        getDoctorByTime();
    }, [date, dispatch, scheduleTypeId]);

    useEffect(() => {
        dispatch(dateScheduleDoctor(formatDate2(date)));
        dispatch(filterDoctor({
            datework: formatDate2(date),
            scheduleTypeId: 1
        }));
    }, []);

    const handleChangeDate = (e) => {
        const newDate = new Date(e.target.value);
        const check_schedule_date = new Date(e.target.value);
        const current_date = new Date();

        if (check_schedule_date < current_date) {
            alert("Hiện tại các lịch khám sau ngày hiện tại đã khám, bạn không thể đăng ký khám. Vui lòng đăng ký khám từ ngày hiện tại trở về sau.");
        } else {
            setDate(newDate);
            dispatch(dateScheduleDoctor(formatDate2(newDate)));
            dispatch(filterDoctor({
                datework: formatDate2(newDate),
                scheduleTypeId: scheduleTypeId
            }));
        }
    };

    function handleTypeScheduleChange(e) {
        setScheduleTypeId(e.target.value);
        dispatch(filterDoctor({
            datework: formatDate2(date),
            scheduleTypeId: e.target.value
        }));
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <div className="container">
            <div className="form-group d-flex">
                <input
                    id="dateInput"
                    className="form-control"
                    style={{ width: '200px' }}
                    value={formatDate(date)}
                    onChange={handleChangeDate}
                    type='date'
                />
                <select
                    className="form-select"
                    aria-label="Default select example"
                    style={{ width: '210px' }}
                    onChange={handleTypeScheduleChange}
                >
                    <option value="1">Khám tại phòng khám</option>
                    <option value="2">Tư vấn trực tuyến</option>
                </select>
            </div>
        </div>
    );
}

export default SubFilter;
