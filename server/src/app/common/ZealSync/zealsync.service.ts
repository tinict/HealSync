import { getRedis, initRedis } from './redis';

class ZealSync {
    constructor() {};

    async initSubcriber() {
        await initRedis();
        const redisClient = await getRedis();
        return redisClient;
    }
};

export { ZealSync };