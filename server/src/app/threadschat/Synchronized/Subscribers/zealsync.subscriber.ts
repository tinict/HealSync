import OrderHandelSubcription from "./HandleSubscription/handleexample.subscription";
// import RegisterHandelSubcription from "./HandleSubscription/register.sub";

async function ZealSyncSubscriber (zealClient: any) {
    if (!zealClient.instanceConnect) {
        console.error("Redis client is not initialized");
        return;
    }

    zealClient.instanceConnect.subscribe('ordersystem', OrderHandelSubcription);
    // zealClient.instanceConnect.subscribe('accountsystem', RegisterHandelSubcription);
};

export { ZealSyncSubscriber };