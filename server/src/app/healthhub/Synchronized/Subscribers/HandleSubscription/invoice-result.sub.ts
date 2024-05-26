import { InvoiceMapper } from "../../../Mappers";
import AppServiceProvider from "../../../Providers/AppServiceProvider";
import {
    InvoiceService 
} from "../../../Services";

export default async function InvoiceResultHandelSubcription(message: any, channel: any) {
    const invoiceService = AppServiceProvider.getContainer().resolve(InvoiceService);

    console.log("Channel", channel);
    console.log("Message", JSON.parse(message));

    try {
        const result = await invoiceService.ResultInvoice(InvoiceMapper.toInvoice(JSON.parse(message)));
        console.log('Create result', result);
    } catch (error) {
        console.error('Failed to create application', error);
    }
};