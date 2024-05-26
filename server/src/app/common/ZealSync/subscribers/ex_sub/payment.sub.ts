import express from 'express';
import { getRedis, initRedis } from '../../redis';

const app = express();

const initApp = async () => {
    try {
        await initRedis();
        const redisClient = await getRedis();

        if (!redisClient.instanceConnect) {
            console.error("Redis client is not initialized");
            return;
        }

        // Đảm bảo rằng hàm lắng nghe đã được định nghĩa trước khi subscribe
        // redisClient.instanceConnect.on('message', handleRedisMessage);

        redisClient.instanceConnect.subscribe('ordersystem', (message: any, channel: any) => {
            console.log(new Date().getTime());
            console.log("Channel", channel);
            console.log("Message", JSON.parse(message));
        });

        app.listen(3006, () => {
            console.log("Success: Payment service is running");
        });
    } catch (err) {
        console.error('Error initializing application:', err);
    }
};

initApp();
