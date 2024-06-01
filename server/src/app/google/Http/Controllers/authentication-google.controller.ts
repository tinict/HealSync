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
    AuthenticationService,
    GoogleAccountService 
} from '../../Services';
import { TYPES } from '../../Database/types';
import axios from 'axios';

declare global {
    namespace Express {
        interface Request {
            accessToken?: string;
        }
    }
};

@injectable()
export class AuthenticationGoogleController {
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

    async authenticationGoogle(req: Request, res: Response, access_token: any) {
        return res.status(200).json(access_token);
    };

    async logOutGoogle(req: Request, res: Response, next: NextFunction) {
        try {
            const client_token = req.body.client_token;
            console.log(client_token);
            const verifyToken = await this.authService.verifyToken(client_token);
            const sub = typeof verifyToken?.sub === 'string' ? JSON.parse(verifyToken?.sub) : verifyToken?.sub;
            let access_token = sub?.access_token;
            const token_db = await this.googleAccountService.getAccessToken(sub?.user_id);
            if (!token_db) return res.status(500);

            const isMatch = await this.authService.dencrypt(access_token, token_db);
            // if (isMatch) {
            //     await axios.post('https://oauth2.googleapis.com/revoke', {
            //         token: access_token
            //     });
            // }
            res.status(200).send('Logout successfull');
        } catch (error) {
            console.log(error);
            res.status(500).send('An error occurred');
        }
    };

    async authGoogle(req: Request, res: Response, next: NextFunction) {
        try {
            const profileUser = {
                access_token: req.accessToken,
                user_id: (req.user as { id: string })?.id
            };
            console.log("authGoogle: ",profileUser);
            const client_token = await this.authService.generateToken(profileUser);
            res.cookie('client_token', client_token).redirect(`http://localhost:5000/api/v1/google/client_token?continue=${"http://localhost:3003"}`);
        } catch (error) {
            res.status(500).send('An error occurred');
        }
    };

    async responseTokenClient(req: Request, res: Response, next: NextFunction) {
        try {
            res.redirect(`${req.query.continue}`);
        } catch (error) {
            res.status(500).send('An error occurred');
        }
    };
};
