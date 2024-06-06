import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

function BookingSuccess() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const examination = useSelector((state) => state.examination);
    const invoice_id = query.get('invoice_id');

    console.log(invoice_id);

    console.log(examination);

    const fetchUpdateStatus = async (appointment_id, status, ordinalNumber, meetLink = null) => {
        return await axios.post("http://localhost:5002/api/v1/appointments/status", {
            appointment_id,
            status,
            ordinalNumber,
            meetLink
        });
    };

    const fetchAPInvoice = () => {
        return axios.put("http://localhost:5002/api/v1/invoices", {
            invoice_id,
            appointment_id: examination.appointment_id
        })
    };

    const convertToISOString = (date, time) => {
        const dateTimeString = `${date}T${time}`;
        const dateTime = new Date(dateTimeString);

        const timezoneOffset = 7 * 60;
        const adjustedDateTime = new Date(dateTime.getTime() + timezoneOffset * 60 * 1000);

        const isoString = adjustedDateTime.toISOString();
        const isoStringWithTimeZone = isoString.slice(0, -1) + "+07:00";

        return isoStringWithTimeZone;
    };

    useEffect(() => {
        if (query.get('status') === 'true') {
            axios.get(
                `http://localhost:5002/api/v1/appointment/ordinal-number/${examination.appointment_id}`,
            )
                .then(async (res) => {
                    console.log(res.data);
                    try {
                        const meetLink = await APICalendar();
                        await fetchUpdateStatus(examination.appointment_id, 1, res.data.ordinalNumber, meetLink.data.meetLink);
                        fetchAPInvoice();
                        APISendmail();
                    } catch (error) {
                        console.error("Error fetching meet link: ", error);
                        console.log(examination.appointment_id);
                        fetchUpdateStatus(examination.appointment_id, 7);
                        fetchAPInvoice();
                    }
                })
                .catch(error => {
                    console.error("Error fetching ordinal number: ", error);
                    console.log(examination.appointment_id);
                    fetchUpdateStatus(examination.appointment_id, 7);
                    fetchAPInvoice();
                });
        } else {
            console.log(examination.appointment_id);
            fetchUpdateStatus(examination.appointment_id, 7);
            fetchAPInvoice();
        }
    }, []);


    const APISendmail = () => {
        axios.post(
            'http://localhost:5009/api/v1/mailer/sendmail',
            {
                to: examination.email,
                subject: 'HealthHub | Bạn đã đặt lịch thành công',
                data: examination,
                template: 'appointment'
            }
        )
    };

    const APICalendar = async () => {
        const [starttime, endtime, timeslot_id] = examination.timeslot.split('-');
        const client_token = Cookies.get('client_token');
        console.log(convertToISOString(examination.datetime, starttime));
        return await axios.post(
            'http://localhost:5000/api/v1/google/service/calendar/event',
            {
                summary: `HealthHub - Lịch hẹn với bác sĩ ${examination.doctor}`,
                startDateTime: convertToISOString(examination.datetime, starttime),
                endDateTime: convertToISOString(examination.datetime, endtime),
                client_token
            }
        );
    };

    return (
        <div className="content success-page-cont">
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        {
                            query.get('status') === 'true' ? (
                                <div className="card success-card">
                                    <div className="card-body">
                                        <div className="success-cont">
                                            <i className="fas fa-check"></i>
                                            <h3>Bạn đã đặt lịch khám thành công!</h3>
                                            <Link to="/invoices" className="btn btn-primary view-inv-btn">Xem chi tiết hóa đơn</Link>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="card success-card">
                                    <div className="card-body">
                                        <div className="success-cont">
                                            <FontAwesomeIcon icon={faExclamationCircle} />
                                            <h2>Bạn đã thanh toán thất bại!</h2>
                                            <h3>Lịch khám của bạn đặt đã bị hủy!</h3>
                                            <Link to="/invoices" className="btn btn-primary view-inv-btn">Xem chi tiết hóa đơn</Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookingSuccess;
