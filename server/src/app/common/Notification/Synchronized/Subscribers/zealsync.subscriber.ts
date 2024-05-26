import CustomerRegisterHandelSubcription from "./HandleSubscription/customer-register.sub";
import DoctorRegisterHandelSubcription from "./HandleSubscription/doctor-register.sub";
import DoctorHandelSubcription from "./HandleSubscription/doctor.sub";
import InvoicePayHandelSubcription from "./HandleSubscription/invoice-pay.sub";
import InvoiceResultHandelSubcription from "./HandleSubscription/invoice-result.sub";
import MedicalRecordHandelSubcription from "./HandleSubscription/medical-records.sub";

async function ZealSyncSubscriber (zealClient: any) {
    if (!zealClient.instanceConnect) {
        console.error("Redis client is not initialized");
        return;
    }

    zealClient.instanceConnect.subscribe('initdoctorhub', DoctorHandelSubcription);
    zealClient.instanceConnect.subscribe('healthhubregister', CustomerRegisterHandelSubcription);
    zealClient.instanceConnect.subscribe('examinationRecordMessage', DoctorRegisterHandelSubcription);
    zealClient.instanceConnect.subscribe('CreateInvoice', InvoicePayHandelSubcription);
    zealClient.instanceConnect.subscribe('ResultInvoice', InvoiceResultHandelSubcription);
    zealClient.instanceConnect.subscribe('medicalRecordMessage', MedicalRecordHandelSubcription);
};

export { ZealSyncSubscriber };