import { Express } from 'express';
import vnpay from '../Routes/api/v1/vnpay.route';

export default function route (app: Express) {
    const root = '/api';

    app.use(root, vnpay);
};
                                                              