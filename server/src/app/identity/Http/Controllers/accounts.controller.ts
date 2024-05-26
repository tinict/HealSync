import 'reflect-metadata';
import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import {
    AccountService,
} from "../../Services";
import { TYPES } from '../../Database/types';

@injectable()
export class AccountController {
    private accountService: AccountService;

    constructor(
        @inject(TYPES.AccountService) accountService: AccountService,
    ) {
        this.accountService = accountService
    };

    async me(req: Request, res: Response) {
        try {
            const identity_id: string = req.user?.toString() || "";
            const user = await this.accountService.me(identity_id);
            return res.status(200).json({ user });
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    };

    async listAccount(req: Request, res: Response) {
        try {
            const listAccount = await this.accountService.listAccount();
            return res.status(200).json(listAccount);
        } catch (error: any) {
            return res.status(500).json({ message: error });
        }
    };
};
