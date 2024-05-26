import { Express } from 'express';
import authRoute from './api/v1/auth.route';
import accountRoute from './api/v1/account.route';
import profileRoute from './api/v1/profile.route';
import modelRoute from './api/v1/model.route';
import roleRoute from './api/v1/role.route';
import modelPermissionRoute from './api/v1/model-permission.route';
import permissionRoute from './api/v1/permission.route';
import rolePermissionRoute from './api/v1/role-permission.route';
import integrationRoute from './api/v1/integration.route';

export default function route (app: Express) {
    const root = '/api';

    app.use(root, authRoute);
    app.use(root, accountRoute);
    app.use(root, profileRoute);
    app.use(root, modelRoute);
    app.use(root, roleRoute);
    app.use(root, modelPermissionRoute);
    app.use(root, permissionRoute);
    app.use(root, rolePermissionRoute);
    app.use(root, integrationRoute);
};
                                                              