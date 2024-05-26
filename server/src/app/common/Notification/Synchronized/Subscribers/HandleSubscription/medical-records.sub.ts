import { MedicalRecordMapper } from "../../../Mappers";
import AppServiceProvider from "../../../Providers/AppServiceProvider";
import { MedicalRecordService } from "../../../Services";

export default async function MedicalRecordHandelSubcription(message: any, channel: any) {
    const medicalRecordService = AppServiceProvider.getContainer().resolve(MedicalRecordService);

    console.log("Channel", channel);
    console.log("Message", JSON.parse(message));

    try {
        console.log(JSON.parse(message));
        const result = await medicalRecordService.CreateRecord(MedicalRecordMapper.toMedicalRecord(JSON.parse(message)));
        console.log('Create result', result);
    } catch (error) {
        console.error('Failed to create application', error);
    }
};