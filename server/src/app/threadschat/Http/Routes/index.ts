import { Express } from 'express';
import threadRoute from './api/v1/thread.route';
import messageRoute from './api/v1/message.route';

export default function route (app: Express) {
    const root = '/api';

    app.use(root, threadRoute);
    app.use(root, messageRoute);
};
                                                              