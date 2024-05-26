import 'reflect-metadata';
import {
    inject,
    injectable
} from "inversify";
import {
    Request,
    Response
} from "express";
import {
    AuthenticationService,
    GoogleAccountService
} from '../../Services';
import { TYPES } from '../../Database/types';

@injectable()
export class GoogleAccountController {
    private googleAccountService: GoogleAccountService;
    private authService: AuthenticationService;

    constructor(
        @inject(TYPES.GoogleAccountService)
        googleAccountService: GoogleAccountService,
        @inject(TYPES.AuthenticationService)
        authService: AuthenticationService,
    ) {
        this.googleAccountService = googleAccountService;
        this.authService = authService;
    };

    async me(req: Request, res: Response) {
        try {
            const google_id: { sub?: { user_id?: string | undefined } | undefined } = req.user!;
            if (google_id.sub === undefined) return res.status(500).json({ error: 'Unauthorized' });
            const me = await this.googleAccountService.me(google_id.sub?.user_id ?? '');
            console.log("me: " + me);
            return res.status(200).json(me);
        } catch (error) {
            return res.status(500).json(error);
        }
    };
};
