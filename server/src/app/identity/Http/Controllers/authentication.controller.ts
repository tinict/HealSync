import 'reflect-metadata';
import {
    inject,
    injectable
} from "inversify";
import {
    NextFunction,
    Request,
    Response
} from "express";
import {
    AccountService,
    AuthenticationService
} from "../../Services";
import {
    AccountMapper,
    LoginMapper
} from '../../Mappers';
import { TYPES } from '../../Database/types';

@injectable()
export class AuthenticationController {
    private accountService: AccountService;
    private authenticationService: AuthenticationService;

    constructor(
        @inject(TYPES.AccountService)
        accountService: AccountService,
        @inject(TYPES.AuthenticationService)
        authenticationService: AuthenticationService,
    ) {
        this.accountService = accountService,
            this.authenticationService = authenticationService
    };

    async login(req: Request, res: Response) {
        try {
            let loginModel = LoginMapper.toLogin(req.body);
            const auth = await this.authenticationService.login(loginModel);
            return res.status(200).json({ 'access_token': auth });
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    };

    async register(req: Request, res: Response) {
        try {
            let resgisterModel = AccountMapper.toAccount(req.body);
            console.log(resgisterModel, req.body);
            const token = await this.authenticationService.register(resgisterModel);
            return res.status(200).json({ 'access_token': token });
        } catch (error: any) {
            return res.status(400).json({ message: error });
        }
    };

    async me(req: Request, res: Response) {
        try {
            const identity_id: string = req.user?.toString() || "";
            const user = await this.accountService.me(identity_id);
            return res.status(200).json({ user });
        } catch (error: any) {
            return res.status(400).json({ message: error });
        }
    };

    async revokeToken(req: Request, res: Response) {
        try {
            const { access_token } = req.body;
            await this.authenticationService.revokeToken(access_token);

            return res.status(200).json({ message: 'Revoked token' });
        } catch (error: any) {
            return res.status(500).json({ message: error });
        }
    };

    async resetPassword(req: Request, res: Response) {
        try {
            await this.authenticationService.resetPassword(req.body);
            return res.status(200).json({ message: 'Reset password success!' });
        } catch (error: any) {
            return res.status(500).json({ message: error });
        }
    };

    async createOTP(req: Request, res: Response) {
        try {
            const emailUser = req.query.eu as string;
            const token = await this.authenticationService.createOTP(emailUser);
            return res.status(200).json({ token });
        } catch (error: any) {
            return res.status(500).json({ message: error });
        }
    };
};
