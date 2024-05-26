import { ZealSync } from "../../../Common/ZealSync/zealsync.service";
import { ZealSyncSubscriber } from "./Subscribers/zealsync.subscriber";

class ZealClient {
    private zealSync: any;
    private zealClient: any;

    constructor() {
        this.zealSync = new ZealSync();
        this.init();
    };

    async init() {
        this.zealClient = await this.zealSync.initSubcriber();
        ZealSyncSubscriber(this.zealClient);
    }
};

export default new ZealClient();