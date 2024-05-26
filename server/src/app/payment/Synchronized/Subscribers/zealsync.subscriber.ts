async function ZealSyncSubscriber (zealClient: any) {
    if (!zealClient.instanceConnect) {
        console.error("Redis client is not initialized");
        return;
    }
};

export { ZealSyncSubscriber };