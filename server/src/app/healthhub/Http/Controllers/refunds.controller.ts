import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import {
    RefundService,
} from "../../Services";
import { TYPES } from "../../Database/types";

@injectable()
export class RefundController {
    constructor(
        @inject(TYPES.RefundService)
        private refundService: RefundService,
    ) { }

    async createRefund(req: Request, res: Response) {
        try {
            const refundService = await this.refundService.createRefund(req.body);
            return res.status(200).json(refundService);
        } catch (err: any) {
            return res.status(500).json(err);
        }
    };

    async getRefunds(req: Request, res: Response) {
        try {
            const refunds = await this.refundService.getRefunds(req.params.customer_id);
            return res.status(200).json(refunds);
        } catch (err: any) {
            return res.status(500).json(err);
        }
    };

    async getAllRefund(req: Request, res: Response) {
        try {
            const refunds = await this.refundService.getAllRefund();
            return res.status(200).json(refunds);
        } catch (err: any) {
            return res.status(500).json(err);
        }
    };

    async updatedRefund(req: Request, res: Response) {
        try {
            const updatedRefund = await this.refundService.updatedRefund(Number(req.body.refund_id), req.body);
            return res.status(200).json(updatedRefund);
        } catch (err: any) {
            return res.status(500).json(err);
        }
    };
};
