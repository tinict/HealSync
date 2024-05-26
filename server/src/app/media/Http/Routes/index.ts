import { Express } from 'express';
import managerFiles from './api/v1/file.route';
import medias from './api/v1/medias.route';

export default function route (app: Express) {
    const root = '/api';

    app.use(root, managerFiles);
    app.use(root, medias);
};
                                                              