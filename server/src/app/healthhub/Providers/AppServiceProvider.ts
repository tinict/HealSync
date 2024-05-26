import { Container } from 'inversify';
import { 
    AppointmentService, 
    CustomerService, 
    DoctorService,  
    ExaminationRecordService,   
    FeedbackService,   
    FormService,   
    InvoiceService,   
    MedicalRecordService,   
    ReExaminationScheduleService,   
    RefundService,   
    ScheduleService,
    TimeSlotService
} from '../Services';
import { TYPES } from '../Database/types';

class AppServiceProvider {
    private container: Container;

    constructor() {
        this.container = new Container();
        this.register();
    };

    public register() {
        this.container.bind<DoctorService>(TYPES.DoctorService).to(DoctorService);
        this.container.bind<ScheduleService>(TYPES.ScheduleService).to(ScheduleService);
        this.container.bind<TimeSlotService>(TYPES.TimeSlotService).to(TimeSlotService);
        this.container.bind<AppointmentService>(TYPES.AppointmentService).to(AppointmentService);
        this.container.bind<ExaminationRecordService>(TYPES.ExaminationRecordService).to(ExaminationRecordService);
        this.container.bind<CustomerService>(TYPES.CustomerService).to(CustomerService);
        this.container.bind<InvoiceService>(TYPES.InvoiceService).to(InvoiceService);
        this.container.bind<MedicalRecordService>(TYPES.MedicalRecordService).to(MedicalRecordService);
        this.container.bind<FormService>(TYPES.FormService).to(FormService);
        this.container.bind<FeedbackService>(TYPES.FeedbackService).to(FeedbackService);
        this.container.bind<ReExaminationScheduleService>(TYPES.ReExaminationScheduleService).to(ReExaminationScheduleService);
        this.container.bind<RefundService>(TYPES.RefundService).to(RefundService);
    };

    public getContainer(): Container {
        return this.container;
    };
};

export default new AppServiceProvider;