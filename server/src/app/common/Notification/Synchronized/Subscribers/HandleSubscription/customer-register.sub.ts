import { CustomerMapper } from "../../../Mappers/customers.mapper";
import AppServiceProvider from "../../../Providers/AppServiceProvider";
import { CustomerService } from "../../../Services";

export default async function CustomerRegisterHandelSubcription(message: any, channel: any) {
    const customerService = AppServiceProvider.getContainer().resolve(CustomerService);

    console.log("Channel", channel);
    console.log("Message", JSON.parse(message));

    try {
        const customer = CustomerMapper.toCustomer(JSON.parse(message));
        console.log('Customer', JSON.parse(message));
        const result = await customerService.createCustomer(customer);
        console.log('Create result', result);
    } catch (error) {
        console.error('Failed to create application', error);
    }
};
