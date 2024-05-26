import { getRedis, initRedis } from "../../../Common/ZealSync/redis";


export default async function PublishMessage(channel: string, message: any) {
    try {
        await initRedis();
        const client = await getRedis();
        if (client.instanceConnect && client.status !== 'end') {
            console.log('Connected to Redis server');
            client.instanceConnect.publish(channel, JSON.stringify(message));
        } else {
            console.error('Redis client is not initialized or closed');
        }
    } catch (err) {
        console.error('Error getting Redis client:', err);
    }
};
