import { Express } from 'express';
import mailerRoute from './api/v1/mailer.route';

export default function route (app: Express) {
    const root = '/api';

    app.use(root, mailerRoute);
};
                                                              