import { DoctorMapper } from "../../../Mappers";
import AppServiceProvider from "../../../Providers/AppServiceProvider";
import { DoctorService } from "../../../Services";

export default async function DoctorHandelSubcription(message: any, channel: any) {
    const doctorService = AppServiceProvider.getContainer().resolve(DoctorService);

    console.log("Channel", channel);
    console.log("Message", JSON.parse(message));

    try {
        const doctor = DoctorMapper.toDoctor(JSON.parse(message));
        console.log('Doctor', JSON.parse(message));
        const result = await doctorService.createDoctor(doctor);
        console.log('Create result', result);
    } catch (error) {
        console.error('Failed to create application', error);
    }
};
