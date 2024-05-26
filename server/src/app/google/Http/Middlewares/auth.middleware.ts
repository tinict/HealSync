import {
    AuthenticationService,
    GoogleAccountService,
} from "../../Services";
import { TYPES } from "../../Database/types";
import { inject, injectable } from "inversify";
import passport from 'passport';
import { GoogleAccountMapper } from "../../Mappers";
import config from "../../config";
import { NextFunction, Request, Response } from "express";
var GoogleStrategy = require('passport-google-oauth20').Strategy;

@injectable()
export class AuthMiddleware {
    private authService: AuthenticationService;
    protected googleAccountService: GoogleAccountService;

    constructor(
        @inject(TYPES.AuthenticationService)
        authService: AuthenticationService,
        @inject(TYPES.GoogleAccountService)
        googleAccountSerivce: GoogleAccountService,
    ) {
        this.authService = authService;
        this.googleAccountService = googleAccountSerivce;
        this.configurePassport();
    };

    configurePassport() {
        passport.use(new GoogleStrategy({
            clientID: config.auth.GOOGLE.CLIENT_ID,
            clientSecret: config.auth.GOOGLE.CLIENT_SECRET,
            callbackURL: "http://localhost:5000/api/v1/auth/google/callback",
            scopes: ['https://www.googleapis.com/auth/calendar']
        }, async (accessToken: any, refreshToken: any, profile: any, cb: any) => {
            console.log(profile);
            this.googleAccountService.create(
                GoogleAccountMapper.toGoogleAccount({
                    google_id: profile.id,
                    name: profile.name.givenName,
                    family_name: profile.name.familyName,
                    url_picture: profile.photos[0].value,
                    email: profile.emails[0].value,
                    access_token: accessToken,
                })
            );
            return cb(null, profile, accessToken);
        }
        ));
    };

    async isAuthenticated(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers.authorization;
            const client_token = authHeader || '';
            console.log(client_token);
            if (client_token === null) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            const verifyToken = await this.authService.verifyToken(client_token);
            if (verifyToken === null) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            req.user = verifyToken;
            console.log(verifyToken);
            next();
        } catch (error) {
            console.log(error);
            res.status(500).send('An error occurred');
        }
    };
};
