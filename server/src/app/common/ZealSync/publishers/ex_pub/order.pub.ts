import express, { Request, Response } from 'express';
import { getRedis, initRedis } from '../../redis';

const app = express();

app.get('/api/test/order', async (req: Request, res: Response) => {
    try {
        const order = [
            {
                id: 1,
                name: 'order 1',
                price: 5000
            },
            {
                id: 2,
                name: 'order 2',
                price: 20000
            }
        ];

        await initRedis();
        const client = await getRedis(); 

        if (client.instanceConnect && client.status !== 'end') {
            console.log('Connected to Redis server');
            client.instanceConnect.publish('ordersystem', JSON.stringify({order, updatetime: new Date().getTime()}));
        } else {
            console.error('Redis client is not initialized or closed');
        }

        return res.status(200).json(order);
    } catch (err: any) {
        console.log(err);
        return res.status(500).json({ error: 'An error occurred' });
    }
});

app.listen(3005, () => {
    console.log("Success order");
});