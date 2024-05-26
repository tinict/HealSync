import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { CustomerService } from "../../Services";
import { TYPES } from "../../Database/types";
import { CustomerMapper } from "../../Mappers/customers.mapper";

@injectable()
export class CustomerController {
    private customerService: CustomerService;

    constructor(
        @inject(TYPES.CustomerService) customerService: CustomerService,
    ) {
        this.customerService = customerService;
    }

    async createCustomer(req: Request, res: Response) {
        try {
            const customer = CustomerMapper.toCustomer(req.body);
            await this.customerService.createCustomer(customer);
            return res.status(200).json();
        } catch (error: any) {
            return res.status(500).json(error);
        }
    }

    async me(req: Request, res: Response) {
        try {
            const customer_id = req.params.customer_id;
            const customer = await this.customerService.me(customer_id);
            return res.status(200).json(customer);
        } catch (error: any) {
            return res.status(500).json(error);
        }
    }

    async updateCustomer(req: Request, res: Response) {
        try {
            const customer = CustomerMapper.toCustomer(req.body.customer);
            await this.customerService.updateCustomer(req.body.customer);
            return res.status(200).json("Update profile successfull");
        } catch (error: any) {
            return res.status(500).json(error);
        }
    };

    async allCustomer (req: Request, res: Response) {
        try {
            const customers = await this.customerService.allCustomer();
            return res.status(200).json(customers);
        } catch (error: any) {
            return res.status(500).json(error);
        }
    };
};
