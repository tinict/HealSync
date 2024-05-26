import 'reflect-metadata';
import { 
    inject, 
    injectable 
} from "inversify";
import {
    CustomerEntity,
    CustomerEntity as CustomerModel,
    CustomerEntity as CustomerRepository
} from '../Entities';
import { TYPES } from "../Database/types";

@injectable()
export class CustomerService {
    constructor() { };

    async createCustomer(customerModel: any) {
        try {
            console.log(customerModel);

            const customerEnity = new CustomerEntity();

            customerEnity.name = customerModel.name;
            customerEnity.family_name = customerModel.family_name;
            customerEnity.email = customerModel.email;
            customerEnity.url_picture = customerModel.url_picture;
            customerEnity.customer_id = customerModel.google_id;

            return await CustomerRepository.save(customerEnity);
        } catch (error: any) {
            console.error(error);
            throw error;
        }
    };

    async me(customer_id: string) {
        try {
            return await CustomerRepository.findOne({ where: { customer_id } });
        } catch (error: any) {
            console.error(error);
            throw error;
        }
    };

    async updateCustomer(customerModel: any) {
        try {
            const customerEntity = await CustomerRepository.findOne({ where: { customer_id: customerModel.customer_id } });

            if (!customerEntity) {
                throw new Error('Customer not found');
            }

            if (customerModel.name !== undefined) {
                customerEntity.name = customerModel.name;
            }
            if (customerModel.family_name !== undefined) {
                customerEntity.family_name = customerModel.family_name;
            }
            if (customerModel.url_picture !== undefined) {
                customerEntity.url_picture = customerModel.url_picture;
            }
            if (customerModel.dob !== undefined) {
                customerEntity.dob = customerModel.dob;
            }
            if (customerModel.gender !== undefined) {
                customerEntity.gender = customerModel.gender;
            }
            if (customerModel.phone !== undefined) {
                customerEntity.phone = customerModel.phone;
            }
            if (customerModel.email !== undefined) {
                customerEntity.email = customerModel.email;
            }
            if (customerModel.address !== undefined) {
                customerEntity.address = customerModel.address;
            }
            if (customerModel.isActive !== undefined) {
                customerEntity.isActive = customerModel.isActive;
            }

            return await CustomerRepository.save(customerEntity);
        } catch (error: any) {
            console.error(error);
            throw error;
        }
    };

    async allCustomer() {
        try {
            const customers = CustomerRepository.find();
            return customers;
        } catch (error: any) {
            console.error(error);
            throw error;
        }
    };
};
