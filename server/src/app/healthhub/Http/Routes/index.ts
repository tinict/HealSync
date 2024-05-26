import { Express } from 'express';
import schedule from './api/v1/schedule.route';
import doctors from './api/v1/doctor.route';
import timeslots from './api/v1/timeslot.route';
import appointment from './api/v1/appointment.route';
import customer from './api/v1/customer.route';
import invoiceRoute from './api/v1/invoice.route';
import medicalRecordsRoute from './api/v1/medical-records.route';
import examinationRecordRoute from './api/v1/examination-record.route';
import formRoute from './api/v1/form.route';
import feedbackRoute from './api/v1/feedback.route';
import reExaminationScheduleRoute from './api/v1/re-examination-schedules.route';
import refundRoute from './api/v1/refund.route';

export default function route (app: Express) {
    const root = '/api';

    app.use(root, schedule);
    app.use(root, doctors);
    app.use(root, timeslots);
    app.use(root, appointment);
    app.use(root, customer);
    app.use(root, invoiceRoute);
    app.use(root, medicalRecordsRoute);
    app.use(root, examinationRecordRoute)
    app.use(root, formRoute);
    app.use(root, feedbackRoute);
    app.use(root, reExaminationScheduleRoute);
    app.use(root, refundRoute);
};
                                                              