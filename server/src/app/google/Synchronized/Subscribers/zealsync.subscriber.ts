import OrderHandelSubcription from "./HandleSubscription/handleexample.subscription";

async function ZealSyncSubscriber (zealClient: any) {
    if (!zealClient.instanceConnect) {
        console.error("Redis client is not initialized");
        return;
    }

    zealClient.instanceConnect.subscribe('ordersystem', OrderHandelSubcription);
};

export { ZealSyncSubscriber };