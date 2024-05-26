import 'reflect-metadata';
import { 
    inject,
    injectable 
} from "inversify";
import {
    DoctorEntity,
    DoctorEntity as DoctorRepository,
    ScheduleEntity as ScheduleRepository,
    ScheduleEntity as ScheduleModel,
} from '../Entities';
import DoctorPulisher from "../Synchronized/Publishers/doctor.pub";

@injectable()
export class DoctorService {

    constructor() { };

    async getAll() {
        try {
            return await DoctorRepository
                .createQueryBuilder("tbl_doctors")
                .leftJoinAndSelect("tbl_doctors.accountEntity", "tbl_accounts")
                .getMany();
        } catch (error: any) {
            throw error;
        }
    };

    async filterDoctor(selectDate: string, schedule_type_id: number) {
        try {
            var dateWork;
            if (!isNaN(Date.parse(selectDate))) {
                dateWork = new Date(selectDate);
                dateWork = dateWork.toISOString().split('T')[0];
            }
            return await ScheduleRepository
                .createQueryBuilder("tbl_schedules")
                .leftJoinAndSelect("tbl_schedules.scheduleTypeEntity", "tbl_schedule_types")
                .leftJoinAndSelect("tbl_schedules.doctorEntity", "tbl_doctors")
                .where("tbl_schedules.datework = :datework and tbl_schedule_types.schedule_type_id = :schedule_type_id",
                    {
                        datework: dateWork,
                        schedule_type_id: schedule_type_id
                    }
                )
                .getMany();
        } catch (error: any) {
            throw error;
        }
    };

    async getAllDoctor() {
        try {
            return await ScheduleRepository
                .createQueryBuilder("tbl_schedules")
                .leftJoinAndSelect("tbl_schedules.scheduleTypeEntity", "tbl_schedule_types")
                .leftJoinAndSelect("tbl_schedules.doctorEntity", "tbl_doctors")
                .getMany();
        } catch (error: any) {
            throw error;
        }
    };

    async findAllDoctorByTime(selectDate: string, typeSchedule: any) {
        try {
            DoctorPulisher("listdoctor", true);
            var dateWork;
            if (!isNaN(Date.parse(selectDate))) {
                dateWork = new Date(selectDate);
                dateWork = dateWork.toISOString().split('T')[0];
            }
            return await ScheduleRepository
                .createQueryBuilder("tbl_schedules")
                .leftJoinAndSelect("tbl_schedules.doctorEntity", "tbl_doctors")
                .where("tbl_schedules.datework = :datework and tbl_schedules.typeSchedule = :typeSchedule",
                    {
                        datework: dateWork,
                        typeSchedule
                    }
                )
                .getMany();
        } catch (error: any) {
            throw error
        }
    };

    async createDoctor(doctorModel: any) {
        try {
            const doctorEntity = new DoctorEntity();

            doctorEntity.doctor_id = doctorModel.identity_id;
            doctorEntity.email = doctorModel.email;
            doctorEntity.phone = doctorModel.phone;
            doctorEntity.firstname = doctorModel.firstname;
            doctorEntity.lastname = doctorModel.lastname;
            doctorEntity.url_picture = doctorModel.url_picture;

            DoctorRepository.save(doctorEntity);
        } catch (error: any) {
            throw error;
        }
    };

    async updateInformationDoctor(doctorModel: any) {
        try {
            console.log("update: " + doctorModel.user_id);

            let doctorEntity = await DoctorRepository.findOne({ where: { doctor_id: doctorModel.doctor_id } });
            console.log(doctorEntity);

            if (!doctorEntity) {
                throw new Error('Doctor not found');
            }

            doctorEntity.specialty = doctorModel.specialty;
            doctorEntity.qualification = doctorModel.qualification;
            doctorEntity.position = doctorModel.position;
            doctorEntity.degree = doctorModel.degree;
            doctorEntity.workspace = doctorModel.workspace;
            doctorEntity.location = doctorModel.location;

            const updatedDoctor = await DoctorRepository.save(doctorEntity);
            return updatedDoctor;
        } catch (error: any) {
            throw error;
        }
    };

    async getDoctorById(doctor_id: string) {
        try {
            const profileDoctor = await DoctorRepository.findOne({ where: { doctor_id: doctor_id } });
            return profileDoctor;
        } catch (error: any) {
            throw error;
        }
    };

    async updateProfileDoctor(doctorModel: any) {
        try {
            const doctorEntity = await DoctorRepository.findOne({ where: { doctor_id: doctorModel.doctor_id } });

            if (!doctorEntity) {
                throw new Error('Doctor not found');
            }

            if (doctorModel.email !== undefined) {
                doctorEntity.email = doctorModel.email;
            }
            if (doctorModel.phone !== undefined) {
                doctorEntity.phone = doctorModel.phone;
            }
            if (doctorModel.firstname !== undefined) {
                doctorEntity.firstname = doctorModel.firstname;
            }
            if (doctorModel.lastname !== undefined) {
                doctorEntity.lastname = doctorModel.lastname;
            }
            if (doctorModel.url_picture !== undefined) {
                doctorEntity.url_picture = doctorModel.url_picture;
            }
            if (doctorModel.specialty !== undefined) {
                doctorEntity.specialty = doctorModel.specialty;
            }
            if (doctorModel.qualification !== undefined) {
                doctorEntity.qualification = doctorModel.qualification;
            }
            if (doctorModel.position !== undefined) {
                doctorEntity.position = doctorModel.position;
            }
            if (doctorModel.degree !== undefined) {
                doctorEntity.degree = doctorModel.degree;
            }
            if (doctorModel.workspace !== undefined) {
                doctorEntity.workspace = doctorModel.workspace;
            }
            if (doctorModel.experience !== undefined) {
                doctorEntity.experience = doctorModel.experience;
            }
            if (doctorModel.location !== undefined) {
                doctorEntity.location = doctorModel.location;
            }
            if (doctorModel.isActive !== undefined) {
                doctorEntity.isActive = doctorModel.isActive;
            }
            if (doctorModel.gender !== undefined) {
                doctorEntity.gender = doctorModel.gender;
            }
            if (doctorModel.idCardNumber !== undefined) {
                doctorEntity.idCardNumber = doctorModel.idCardNumber;
            }
            if (doctorModel.dob !== undefined) {
                doctorEntity.dob = doctorModel.dob;
            }
            if (doctorModel.dob !== undefined) {
                doctorEntity.dob = doctorModel.dob;
            }
            if (doctorModel.address !== undefined) {
                doctorEntity.address = doctorModel.address;
            }

            return await DoctorRepository.save(doctorEntity);
        } catch (error: any) {
            console.error(error);
            throw error;
        }
    };
};
