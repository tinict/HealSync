import 'reflect-metadata';
import {
    injectable,
} from "inversify";
import { v4 as uuidv4 } from 'uuid';
import {
    FormEntity as FormRepository,
    FormEntity,
    DoctorEntity,
    DoctorEntity as DoctorRepository
} from '../Entities';

@injectable()
export class FormService {
    construct() { };

    async saveForm(formModel: any) {
        try {
            console.log(formModel);

            let form = new FormEntity();

            const uuid = uuidv4();
            const shortUuid = uuid.substring(0, 8);

            const doctorEntity = await DoctorRepository.findOne({ where: { doctor_id: formModel.user_id } });
            if (!doctorEntity) return;

            form.doctorEntity = doctorEntity;
            form.form_id = shortUuid;
            form.formname = formModel.formname;
            form.filepath = formModel.filepath;

            const newForm = FormRepository.save(form);

            return newForm;
        } catch (error: any) {
            throw error;
        }
    };

    async getAllForm(user_id: string) {
        try {
            const doctorEntity = await DoctorRepository.findOne({ where: { doctor_id: user_id } });
            if (!doctorEntity) return;
            const forms = await FormRepository.find({ where: { doctorEntity: doctorEntity } });

            return forms;
        } catch (error: any) {
            throw error;
        }
    };

    async deleteForm(filepath: any) {
        try {
            const formEntity = await FormRepository.findOne({ where: { filepath } });
            if (formEntity) {
                await FormRepository.delete(formEntity.increment_id);
            }
        } catch (error: any) {
            throw error;
        }
    };
};