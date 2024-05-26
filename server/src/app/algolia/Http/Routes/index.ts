import { Express } from 'express';
import algoliaRoute from './api/v1/algolia.route';

export default function route (app: Express) {
    const root = '/api';

    app.use(root, algoliaRoute);
};
                                                              