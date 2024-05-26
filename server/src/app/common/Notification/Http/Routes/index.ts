import { Express } from 'express';
import notificationRoute from './api/v1/notification.route';
import accountRoute from './api/v1/account.route';

export default function route (app: Express) {
    const root = '/api';

    app.use(root, notificationRoute);
    app.use(root, accountRoute);
};
                                                              