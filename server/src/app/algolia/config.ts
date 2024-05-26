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
    algolia: {
        app_id: config.algolia.ALGOLIA_APP_ID,
        api_key: config.algolia.ALGOLIA_API_KEY,
        index_name: config.algolia.ALGOLIA_INDEX_NAME
    }
};
