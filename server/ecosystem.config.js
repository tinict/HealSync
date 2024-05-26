module.exports = {
    apps: [
        {
            name: 'google',
            script: './src/app/google/app.service.ts',
            interpreter: 'ts-node',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'development',
                TS_NODE_PROJECT: './tsconfig.json'
            },
            env_production: {
                NODE_ENV: 'production',
                TS_NODE_PROJECT: './tsconfig.json'
            },
        },
        {
            name: 'identity',
            script: './src/app/identity/app.service.ts',
            interpreter: 'ts-node',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'development',
                TS_NODE_PROJECT: './tsconfig.json'
            },
            env_production: {
                NODE_ENV: 'production',
                TS_NODE_PROJECT: './tsconfig.json'
            },
        },
        {
            name: 'healthhub',
            script: './src/app/healthhub/app.service.ts',
            interpreter: 'ts-node',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'development',
                TS_NODE_PROJECT: './tsconfig.json'
            },
            env_production: {
                NODE_ENV: 'production',
                TS_NODE_PROJECT: './tsconfig.json'
            },
        },
        {
            name: 'algolia',
            script: './src/app/algolia/app.service.ts',
            interpreter: 'ts-node',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'development',
                TS_NODE_PROJECT: './tsconfig.json'
            },
            env_production: {
                NODE_ENV: 'production',
                TS_NODE_PROJECT: './tsconfig.json'
            },
        },
        {
            name: 'payment',
            script: './src/app/payment/app.service.ts',
            interpreter: 'ts-node',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'development',
                TS_NODE_PROJECT: './tsconfig.json'
            },
            env_production: {
                NODE_ENV: 'production',
                TS_NODE_PROJECT: './tsconfig.json'
            },
        },
        {
            name: 'media',
            script: './src/app/media/app.service.ts',
            interpreter: 'ts-node',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'development',
                TS_NODE_PROJECT: './tsconfig.json'
            },
            env_production: {
                NODE_ENV: 'production',
                TS_NODE_PROJECT: './tsconfig.json'
            },
        },
        {
            name: 'threadschat',
            script: './src/app/threadschat/app.service.ts',
            interpreter: 'ts-node',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'development',
                TS_NODE_PROJECT: './tsconfig.json'
            },
            env_production: {
                NODE_ENV: 'production',
                TS_NODE_PROJECT: './tsconfig.json'
            },
        },
        {
            name: 'mailer',
            script: './src/app/mailer/app.service.ts',
            interpreter: 'ts-node',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'development',
                TS_NODE_PROJECT: './tsconfig.json'
            },
            env_production: {
                NODE_ENV: 'production',
                TS_NODE_PROJECT: './tsconfig.json'
            },
        },
        {
            name: 'notification',
            script: './src/app/common/Notification/app.service.ts',
            interpreter: 'ts-node',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'development',
                TS_NODE_PROJECT: './tsconfig.json'
            },
            env_production: {
                NODE_ENV: 'production',
                TS_NODE_PROJECT: './tsconfig.json'
            },
        },
    ],
};