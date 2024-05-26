import { forEach } from "lodash";
import { ButlerModel } from "../Models";
import PublishMessage from "../Synchronized/Publishers/PublishMessage";
var cron = require('node-cron');

class ButlerService {
    private butlerModel: ButlerModel;
    private dataset: any;
    private trackPoint: boolean;

    constructor(
        butlerModel: ButlerModel
    ) {
        this.butlerModel = butlerModel;
        this.trackPoint = false;
        this.initButler();
    };

    initButler() {
        try {
            if (this.trackPoint) {
                cron.schedule('0 0 * * * *', () => {
                    this.trackPoint = !this.trackPoint;
                    const currentDate = new Date().toISOString().slice(0, 10);
                    PublishMessage('collect-task', currentDate);
                }, {
                    scheduled: true,
                    timezone: "Asia/Ho_Chi_Minh"
                });
            } else {
                this.trackPoint = !this.trackPoint;
                const currentDate = new Date().toISOString().slice(0, 10);
                PublishMessage('collect-task', currentDate);
            }
        } catch (error: any) {
            throw error;
        }
    };

    collectQuests(dataset: any) {
        this.dataset = dataset;
    };

    planning() {
        this.dataset.forEach((item: any) => {
            console.log(item.doctorEntity.schedule_id);
            PublishMessage('request-mission', item.schedule_id);
        });
        return this.dataset;
    };

    coordinator(missions: any) {
        missions.forEach((mission: any) => {
            console.log(mission);
            let startTime = new Date(mission.starttime);
            let hours = startTime.getHours() - 1;
            let minutes = startTime.getMinutes();
            cron.schedule(`${minutes} ${hours} * * *`, () => {
                console.log("Send mail notification");
            }, {
                scheduled: true,
                timezone: "Asia/Ho_Chi_Minh"
            });
        });
    };
};

export default new ButlerService({});