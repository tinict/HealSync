import BulterReceiveTaskHandelSubcription from "./HandleSubscription/receive-task.sub";
import ResponeTaskHandelSubcription from "./HandleSubscription/respone-task.sub";

async function ZealSyncSubscriber (zealClient: any) {
    if (!zealClient.instanceConnect) {
        console.error("Redis client is not initialized");
        return;
    }

    zealClient.instanceConnect.subscribe('require-task', BulterReceiveTaskHandelSubcription);
    zealClient.instanceConnect.subscribe('respone-task', ResponeTaskHandelSubcription);
};

export { ZealSyncSubscriber };