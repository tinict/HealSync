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
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import config from "../../config";
import {
    AccountEntity as AccountRepository
} from '../../Entities';

@injectable()
export class AuthenticationMiddleware {
    protected credentialService: CredentialService;
    private authService: AuthenticationService;
    private accountService: AccountService;

    constructor(
        @inject(TYPES.CredentialService) 
        credentialService: CredentialService,
        @inject(TYPES.AuthenticationService) 
        authService: AuthenticationService,
        @inject(TYPES.AccountService) 
        accountService: AccountService
    ) {
        this.credentialService = credentialService;
        this.authService = authService;
        this.accountService = accountService;
    }

    configurePassport() {
        passport.use(new JwtStrategy({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.auth.JWT.Secret as string,
            passReqToCallback: true,
        }, async (req: any, payload: any, done: any) => {
            try {
                const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
                const isBlacklisted = await this.authService.isTokenBlacklisted(token);
                if (isBlacklisted) {
                    done(new Error('Token is blacklisted'), false);
                }
                const accountEntity = await AccountRepository.findOne({ where: { account_id: payload.sub } });
                if (!accountEntity) {
                    done(new Error('Account not found'), false);
                } else {
                    done(null, accountEntity?.identity_id);
                }
            } catch (error) {   
                done(error, false);
            }
        }));

        passport.use(new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true,
        }, async (req: any, username: any, password: any, done: any) => {
            try {
                console.log(username, password, req.body.model_type);
                const role = await this.accountService.verifyRoleAccount(username);
                if (!role) done(null, false);
                console.log(role?.modelEntity.model_type, role?.modelEntity.model_type !== req.body.model_type);
                if (role?.modelEntity.model_type !== req.body.model_type) done(new Error('Account not access'), false);
                console.log(role);
                done(null, true);
            } catch (error) {
                done(error, false);
            }
        }));
    };

    async authenticateUser() {
        return passport.authenticate('local', { session: false });
    };

    async verifyCallback(payload: { sub: string }, done: (error: any, user?: any) => void) {
        try {
            const accountEntity = await AccountRepository.findOne({ where: { account_id: Number(payload.sub) } });
            if (!accountEntity) {
                done(new Error('Account not found'), false);
            } else {
                done(null, accountEntity.account_id);
            }
        } catch (error) {
            done(error, false);
        }
    };

    async verifyFunctionWithRequest(req: Request, username: string, password: string, done: (error: any, user?: any) => void) {
        try {
            const account = await AccountRepository.findOne({ where: { username } });
            if (account) {
                const credentialAccount = await this.credentialService.findOne({ where: { accountEntity: account } });
                done(null, credentialAccount);
            } else {
                done(new Error('Account not found'), false);
            }
        } catch (error) {
            done(error, false);
        }
    };
};
