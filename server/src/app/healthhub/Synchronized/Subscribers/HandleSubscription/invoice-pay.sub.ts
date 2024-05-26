import { InvoiceMapper } from "../../../Mappers";
import AppServiceProvider from "../../../Providers/AppServiceProvider";
import { 
    DoctorService, 
    InvoiceService 
} from "../../../Services";

export default async function InvoicePayHandelSubcription(message: any, channel: any) {
    const invoiceService = AppServiceProvider.getContainer().resolve(InvoiceService);

    console.log("Channel", channel);
    console.log("Message", JSON.parse(message));

    try {
        console.log(InvoiceMapper.toInvoice(JSON.parse(message)));
        const result = await invoiceService.CreateInvoice(InvoiceMapper.toInvoice(JSON.parse(message)));
        console.log('Create result', result);
    } catch (error) {
        console.error('Failed to create application', error);
    }
};