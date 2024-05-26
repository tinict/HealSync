import 'reflect-metadata';
import { 
    injectable 
} from "inversify";
import {
    AppointmentEntity,
    CustomerEntity,
    InvoiceEntity,
    InvoiceEntity as InvoiceRepository,
    AppointmentEntity as AppointmentRepository
} from '../Entities';

@injectable()
export class InvoiceService {
    constructor() { };

    async CreateInvoice(invoiceModel: any) {
        try {
            const invoiceEntity = new InvoiceEntity();

            invoiceEntity.customerEntity = new CustomerEntity();
            invoiceEntity.appointmentEntity = new AppointmentEntity();

            console.log(invoiceModel.invoice_id);

            invoiceEntity.invoice_id = invoiceModel.invoice_id;
            invoiceEntity.customerEntity.customer_id = invoiceModel.customer_id;
            invoiceEntity.appointmentEntity.appointment_id = invoiceModel.appointment_id;
            invoiceEntity.status = invoiceModel.status;
            invoiceEntity.create_at = invoiceModel.create_at;

            await InvoiceRepository.save(invoiceEntity);
        } catch (error: any) {
            throw error;
        }
    };

    async ResultInvoice(invoiceModel: any) {
        try {
            const invoiceEntity = await InvoiceRepository.findOne({ where: { invoice_id: invoiceModel.invoice_id } });

            if (!invoiceEntity) return;

            invoiceEntity.due_at = invoiceModel.due_at;
            invoiceEntity.status = invoiceModel.status;

            await InvoiceRepository.save(invoiceEntity);
        } catch (error: any) {
            throw error;
        }
    };

    async getInvoices(customer_id: string) {
        try {
            const invoices = await InvoiceRepository
                .createQueryBuilder("tbl_invoices")
                .leftJoinAndSelect("tbl_invoices.customerEntity", "tbl_customers")
                .leftJoinAndSelect("tbl_invoices.appointmentEntity", "tbl_appointments")
                .leftJoinAndSelect("tbl_appointments.timeSlotEntity", "tbl_timeslots")
                .leftJoinAndSelect("tbl_appointments.examinationRecordEntity", "tbl_examination_records")
                .leftJoinAndSelect("tbl_timeslots.scheduleEntity", "tbl_schedules")
                .leftJoinAndSelect("tbl_schedules.doctorEntity", "tbl_doctors")
                .where(
                    "tbl_customers.customer_id = :customer_id", { customer_id }
                )
                .getMany();

            return invoices;
        } catch (error: any) {
            throw error;
        }
    };

    async getInvoiceByAppointment(appointment_id: string) {
        try {
            const appointment = await AppointmentRepository.findOne({ where: { appointment_id: Number(appointment_id) } });

            if(!appointment) {
                throw new Error('Appointment not found');
            }

            const invoice = await InvoiceRepository.findOne({ where: { appointmentEntity: appointment } });
            
            return invoice;
        } catch (error: any) {
            throw error;
        }
    };

    async updateInvoice(invoice_id: any, appointment_id: any) {
        try {
            const appointment = await AppointmentRepository.findOne({ where: { appointment_id: Number(appointment_id) } });
            if(!appointment) {
                throw new Error('Appointment not found');
            }

            const invoice = await InvoiceRepository.findOne({ where: { invoice_id } });
            if (!invoice) {
                throw new Error('Invoice not found');
            }

            invoice.appointmentEntity = appointment;

            const updatedInvoice = await InvoiceRepository.save(invoice);

            return updatedInvoice;
        } catch (error: any) {
            throw error;
        }
    };
};
