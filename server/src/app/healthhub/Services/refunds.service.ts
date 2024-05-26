import 'reflect-metadata';
import { 
    injectable 
} from "inversify";
import {
    RefundEntity,
    RefundEntity as RefundRepository,
    InvoiceEntity,
    InvoiceEntity as InvoiceRespository,
    AppointmentEntity as AppointmentRepository
} from '../Entities';

@injectable()
export class RefundService {
    constructor() { };

    async createRefund(refundModel: any) {
        try {
            const invoice = await InvoiceRespository.findOne({ where: { invoice_id: refundModel.invoice_id } });

            if (!invoice) {
                throw new Error('Invoice not found');
            }

            const refund = new RefundEntity();
            refund.invoiceEntity =  invoice;

            return await RefundRepository.save(refund);
        } catch (error: any) {
            throw error;
        }
    };

    async getRefunds(customer_id: string) {
        try {
            const refunds = await RefundRepository
                .createQueryBuilder("tbl_refunds")
                .leftJoinAndSelect("tbl_refunds.invoiceEntity", "tbl_invoices")
                .leftJoinAndSelect("tbl_invoices.appointmentEntity", "tbl_appointments")
                .leftJoinAndSelect("tbl_invoices.customerEntity", "tbl_customers")
                .leftJoinAndSelect("tbl_appointments.examinationRecordEntity", "tbl_examination_records")
                .leftJoinAndSelect("tbl_appointments.timeSlotEntity", "tbl_timeslot")
                .leftJoinAndSelect("tbl_timeslot.scheduleEntity", "tbl_schedules")
                .leftJoinAndSelect("tbl_schedules.doctorEntity", "tbl_doctors")
                .where("tbl_customers.customer_id = :customer_id", { customer_id })
                .getMany();

            return refunds; 
        } catch (error: any) {
            throw error;
        }
    };

    async getAllRefund() {
        try {
            const refunds = await RefundRepository
                .createQueryBuilder("tbl_refunds")
                .leftJoinAndSelect("tbl_refunds.invoiceEntity", "tbl_invoices")
                .leftJoinAndSelect("tbl_invoices.appointmentEntity", "tbl_appointments")
                .leftJoinAndSelect("tbl_invoices.customerEntity", "tbl_customers")
                .leftJoinAndSelect("tbl_appointments.examinationRecordEntity", "tbl_examination_records")
                .leftJoinAndSelect("tbl_appointments.timeSlotEntity", "tbl_timeslot")
                .leftJoinAndSelect("tbl_timeslot.scheduleEntity", "tbl_schedules")
                .leftJoinAndSelect("tbl_schedules.doctorEntity", "tbl_doctors")
                .getMany();

            return refunds; 
        } catch (error: any) {
            throw error;
        }
    };

    async updatedRefund(refund_id: number, updatedData: Partial<RefundEntity>) {
        try {
            const refund = await RefundRepository.findOne({ where: { refund_id } });

            if(!refund) {
                throw new Error('Refund not found');
            }

            Object.assign(refund, updatedData);

            const updatedRefund = await RefundRepository.save(refund);

            return updatedRefund;
        } catch (error: any) {
            throw error;
        }
    };
};
