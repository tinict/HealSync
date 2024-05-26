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
    aws: {
        aws_region: config.aws.aws_region,
        aws_access_key_id: config.aws.aws_access_key_id,
        aws_secret_access_key: config.aws.aws_secret_access_key,
        aws_S3_bucket_name: config.aws.aws_S3_bucket_name,
    }
};