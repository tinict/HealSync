const redis = require('redis');

let statusConnectRedis = {
    CONNECT: 'connect',
    END: 'end',
    RECONNECT: 'reconnect',
    ERROR: 'error',
}

const handleEventConnect = ({ connectionRedis }: { connectionRedis: any }) => {
    connectionRedis.on(statusConnectRedis.CONNECT, () => {
        console.log('connectionRedis - Connection status: connected');
    })

    connectionRedis.on(statusConnectRedis.END, () => {
        console.log('connectionRedis - Connection status: disconnected');
    })

    connectionRedis.on(statusConnectRedis.RECONNECT, () => {
        console.log('connectionRedis - Connection status: RECONNECTING');
    })

    connectionRedis.on(statusConnectRedis.ERROR, (err: any) => {
        console.error('connectionRedis - Connection error:', err);
    })
}

let client: {
    status: string; instanceConnect?: any 
} = {
    status: ""
};

export const initRedis = async () => {
    try {
        const instanceRedis = redis.createClient();

        const errorHandler = (err: any) => {
            console.error('Error initializing Redis connection:', err);
            instanceRedis.off('error', errorHandler);
        };

        instanceRedis.on('error', errorHandler);

        client.instanceConnect = instanceRedis;
        handleEventConnect({
            connectionRedis: instanceRedis
        });

        await instanceRedis.connect();
    } catch (err) {
        console.error('Error initializing Redis connection:', err);
    }
};

export const getRedis = async () => {
    if (!client || client.status === 'end') {
        await initRedis();
    }
    return client;
};

//Close redis
export const closeRedis = () => {
    if (client.instanceConnect) {
        client.instanceConnect.quit(); 
        console.log('connectionRedis - Connection closed');
    } else {
        console.warn('No Redis connection to close.');
    }
};