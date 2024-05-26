import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { TYPES } from "../../Database/types";
import {
    AccountService,
} from "../../Services";

@injectable()
export class AccountController {
    constructor(
        @inject(TYPES.AccountService)
        private accountService: AccountService,
    ) { }

    async createAccount(req: Request, res: Response) {
        try {
            const { identity_id } = req.body;
            const notification = await this.accountService.createAccount(identity_id);
            res.status(200).json(notification);
        } catch (err: any) {
            return res.status(500).json(err.message);
        }
    }
};
