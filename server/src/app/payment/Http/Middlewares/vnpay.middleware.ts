import 'reflect-metadata';
import { NextFunction, Request, Response } from "express";
import { injectable, inject } from 'inversify';
import { TYPES } from '../../Database/types';
import { PaymentService } from '../../Services';
import { VNPayUpdateModel } from '../../Models';

@injectable()
export class VNPayMiddleware {
    constructor(
        @inject(TYPES.PaymentService)
        private paymentService: PaymentService
    ) { }

    async ResultPayMidde(req: Request, res: Response, next: NextFunction) {
        try {
            await this.paymentService.UpdatePayment(VNPayUpdateModel.toVNPayUpdate(req.query));
            return next();
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
};