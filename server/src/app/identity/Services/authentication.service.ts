import 'reflect-metadata';
import bcrypt from 'bcrypt';
import { injectable, inject } from "inversify";
import {
    AccountEntity,
    AccountEntity as AccountRepository,
    CredentialEntity,
    ProfileEntity,
    ProfileEntity as ProfileRepository,
    ModelEntity,
    ModelEntity as ModelRepository,
    RoleEntity,
    RoleEntity as RoleRepository,
    CredentialEntity as CredentialRepository
} from "../Entities";
import { CredentialService } from "./credentials.service";
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { TYPES } from '../Database/types';
import config from "../config";
import { v4 as uuidv4 } from 'uuid';
import PublishMessage from '../Http/Synchronized/Publishers/PublishMessage';
import { AccountMapper } from '../Mappers';
import Redis from 'ioredis';
import axios from 'axios';

@injectable()
export class AuthenticationService {
    private credentialService: CredentialService;
    private redis = new Redis();

    constructor(
        @inject(TYPES.CredentialService)
        credentialService: CredentialService,
    ) {
        this.credentialService = credentialService
    };

    blacklistToken(token: string, expiryDate: number) {
        const ttl = expiryDate - Math.floor(Date.now() / 1000);
        this.redis.set(token, '', 'EX', ttl);
    }

    async isTokenBlacklisted(token: any) {
        const result = await this.redis.get(token);
        return result !== null;
    }

    generateAccessToken(account: any) {
        return jwt.sign({
            iss: 'HealthHub',
            sub: account.account_id,
            ist: Math.floor(Date.now()),
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 3)
        }, config.auth.JWT.Secret as string);
    };

    async resetPassword(accountModel: any) {
        try {
            const account = await AccountRepository.findOne({ where: { identity_id: accountModel.identity_id } });
            if (account) {
                const saltPassword = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(accountModel.password, saltPassword);

                let credential = await CredentialRepository.findOne({ where: { accountEntity: account } });

                if (credential) {
                    credential.password_hash = hashPassword;
                    credential.password_salt = saltPassword;

                    await CredentialRepository.save(credential);
                } else {
                    throw new Error("No credential found for this account");
                }
            } else {
                throw new Error("Account not found");
            }
        } catch (error: any) {
            throw error;
        }
    };

    async revokeToken(token: any) {
        try {
            this.blacklistToken(token, Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 3));
        } catch (error: any) {
            throw error;
        }
    };

    async register(userRegister: any) {
        try {
            let account = new AccountEntity();

            account.username = userRegister.username;
            account.identity_id = uuidv4();

            const modelAccount = await ModelRepository.findOne({ where: { model_id: userRegister.model_id } });
            console.log(modelAccount);
            if (modelAccount) account.modelEntity = modelAccount;

            const newAccount = await AccountRepository.save(account);
            if (newAccount) {

                PublishMessage('accountsystem', { "user_id": newAccount.identity_id });

                let profile = new ProfileEntity();

                profile.firstname = userRegister.firstname;
                profile.lastname = userRegister.lastname;
                profile.email = userRegister.email;
                profile.phone = userRegister.phone;
                profile.accountEntity = newAccount;

                let newProfile = await ProfileRepository.save(profile);

                let credential = new CredentialEntity();

                const saltPassword = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(userRegister.password, saltPassword);

                credential.password_hash = hashPassword;
                credential.password_salt = saltPassword;
                credential.accountEntity = newAccount;

                await this.credentialService.create(credential);

                PublishMessage('initdoctorhub', AccountMapper.toAccount({ ...newAccount, ...newProfile }));
            }
            const token = this.generateAccessToken(account);
            return token;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    async login(loginModel: any) {
        try {
            const account = await AccountRepository.findOne({ where: { username: loginModel.username } });
            if (!account) {
                throw new Error('Account not found');
            }

            const credentialAccount = await this.credentialService.findOne({ where: { accountEntity: account } });
            if (!credentialAccount) {
                throw new Error('Credentials not found');
            }

            const validPassword = await bcrypt.compare(loginModel.password, credentialAccount.password_hash);
            if (!validPassword) {
                return false;
            }

            const token = this.generateAccessToken(account);
            return token;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    async encrypt(data: string) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(data, salt);
        return hash;
    };

    async dencrypt(accessToken: string, hash: string) {
        const isTokenRevoked = await this.isTokenBlacklisted(accessToken);
        console.log(isTokenRevoked);
        if (isTokenRevoked) {
            if (!accessToken || !hash) {
                throw new Error('accessToken and hash are required');
            }
            return await bcrypt.compare(accessToken, hash);
        }
    };

    generateTokenKey() {
        return jwt.sign({
            iss: 'HealthHub',
            sub: true,
            ist: Math.floor(Date.now()),
            exp: Math.floor(Date.now() / 1000) + 60
        }, config.auth.JWT.Secret as string);
    };

    async createOTP(emailUser: string) {
        try {
            const otp_key = uuidv4().substring(0, 6);
            await axios.post(
                'http://localhost:5009/api/v1/mailer/sendmail',
                {
                    to: emailUser,
                    subject: 'HealthHub | Thông báo mã xác thực tài khoản của bạn',
                    data: { otp_key },
                    template: 'identifyCode'
                }
            )

            return jwt.sign({
                iss: 'identify_otp',
                iam: true,
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + 60
            }, otp_key as string);
        } catch (error) {
            throw error;
        }
    };

    async identifyOTP(token: string, otp_key: string) {
        try {
            const decoded = jwt.verify(token, otp_key) as jwt.JwtPayload;
            return decoded.iam;
        } catch (error) {
            throw error;
        }
    };

    async verifyAuthentication(verifyCallback: any) {
        return passport.use(new JwtStrategy({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.auth.JWT.Secret as string,
        }, verifyCallback))
    };

    async verifyLocal(verifyFunctionWithRequest: any) {
        return passport.use(new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true,
        }, verifyFunctionWithRequest))
    };
};
