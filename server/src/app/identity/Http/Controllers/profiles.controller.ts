import 'reflect-metadata';
import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import {
    AccountService,
    ProfileService,
} from "../../Services";
import { TYPES } from '../../Database/types';

@injectable()
export class ProfileController {
    private profileService: ProfileService;
    private accountService: AccountService

    constructor(
        @inject(TYPES.ProfileService)
        profileService: ProfileService,
        @inject(TYPES.AccountService)
        accountService: AccountService,
    ) {
        this.profileService = profileService,
            this.accountService = accountService
    };

    async listProfile(req: Request, res: Response) {
        try {
            const listProfile = await this.profileService.getListProfile();
            return res.status(200).json(listProfile);
        } catch (error: any) {
            return res.status(500).json({ message: error });
        }
    };

    async identifyProfile(req: Request, res: Response) {
        try {
            const email = req.query.email as string;
            const identify = await this.profileService.identifyProfile(email);
            return res.status(200).json({identify});
        } catch (error: any) {
            return res.status(500).json({ message: error });
        }
    };
};
