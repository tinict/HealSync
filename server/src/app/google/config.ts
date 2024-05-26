const fs = require('fs');

const config = JSON.parse(fs.readFileSync(__dirname + '/config.json', 'utf8'));

export default {
    server: {
        id: config.server.id,
        port: config.server.port,
    },
    api: {
        route: config.api.route,
        modules: config.api.modules
    },
    serviceRegistry: config.serviceRegistry,
    auth: config.auth,
};