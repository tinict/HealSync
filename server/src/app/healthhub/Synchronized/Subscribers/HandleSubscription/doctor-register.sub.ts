import { CustomerMapper } from "../../../Mappers/customers.mapper";
import AppServiceProvider from "../../../Providers/AppServiceProvider";
import { DoctorService } from "../../../Services";

export default async function DoctorRegisterHandelSubcription(message: any, channel: any) {
    const doctorService = AppServiceProvider.getContainer().resolve(DoctorService);

    console.log("Channel", channel);
    console.log("Message", JSON.parse(message));

    try {
        const result = await doctorService.updateInformationDoctor(JSON.parse(message));
        console.log('Create result', result);
    } catch (error) {
        console.error('Failed to create application', error);
    }
};