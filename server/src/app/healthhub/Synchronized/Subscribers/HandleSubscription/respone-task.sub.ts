import Publisher from '../../Publishers/PublishMessage';
import AppServiceProvider from "../../../Providers/AppServiceProvider";
import { AppointmentService } from "../../../Services";

export default async function ResponeTaskHandelSubcription(message: any, channel: any) {
    const appointmentService = AppServiceProvider.getContainer().resolve(AppointmentService);
    console.log("Channel", channel);
    console.log("Message", JSON.parse(message));

    try {
        console.log('Create result', JSON.parse(message));
        const appointments = await appointmentService.getAppointmentsBySchedule(Number(JSON.parse(message)));
        console.log(appointments);
        Publisher('respone-task', appointments);
    } catch (error) {
        console.error('Failed to create application', error);
    }
};