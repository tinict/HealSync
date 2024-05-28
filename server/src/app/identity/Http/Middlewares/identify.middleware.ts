import {
    Request,
    Response,
    NextFunction
} from "express";
import {
    AccountService,
    AuthenticationService,
    CredentialService
} from "../../Services";
import { TYPES } from "../../Database/types";
import { inject, injectable } from "inversify";

@injectable()
export class IdentifyMiddleware {
    protected credentialService: CredentialService;
    private authService: AuthenticationService;

    constructor(
        @inject(TYPES.CredentialService) credentialService: CredentialService,
        @inject(TYPES.AuthenticationService) authService: AuthenticationService,
    ) {
        this.credentialService = credentialService;
        this.authService = authService;
    };

    async identifyAccount(req: Request, res: Response, next: NextFunction) {
        try {
            const { token, otp_key } = req.body;

            const isIdentify = await this.authService.identifyOTP(token, otp_key);

            if (isIdentify) {
                next();
            } else {
                return res.status(401).json("OTP is not exist!");
            }
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    };
};
