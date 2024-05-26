import Publisher from '../../Publishers/PublishMessage';
import AppServiceProvider from "../../../Providers/AppServiceProvider";
import { ScheduleService } from "../../../Services";

export default async function BulterHandelSubcription(message: any, channel: any) {
    const scheduleService = AppServiceProvider.getContainer().resolve(ScheduleService);
    console.log("Channel", channel);
    console.log("Message", JSON.parse(message));

    try {
        console.log('Create result', JSON.parse(message));
        const result = await scheduleService.getListDoctorByDate(JSON.parse(message));
        Publisher('require-task', result);
    } catch (error) {
        console.error('Failed to create application', error);
    }
};