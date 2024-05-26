import { Express } from 'express';
import authroute from './api/v1/auth.route';
import googleAccountRoute from './api/v1/google-account.route';
import googleCalendarRoute from './api/v1/google-calendar.route';

export default function route (app: Express) {
    const root = '/api';

    app.use(root, authroute);
    app.use(root, googleAccountRoute);
    app.use(root, googleCalendarRoute);
};
                                                              