import 'reflect-metadata';
import bcrypt from 'bcrypt';
import { injectable, inject } from "inversify";
import jwt from 'jsonwebtoken';
import config from '../config';

@injectable()
export class AuthenticationService {

    constructor() {};

    generateAccessToken(account: any) {
        return jwt.sign({
            iss: 'HealthHub',
            sub: account.increment_id,
            ist: Math.floor(Date.now()),
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 3)
        }, config.auth.JWT.Secret as string);
    };

    async encrypt(data: string) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(data, salt);
        return hash;
    };

    async dencrypt(accessToken: string, hash: string) {
        if (!accessToken || !hash) {
            throw new Error('accessToken and hash are required');
        }
        return await bcrypt.compare(accessToken, hash);
    };

    async generateToken(data: any) {
        return jwt.sign({
            iss: 'HealthHub',
            sub: data,
            ist: Math.floor(Date.now()),
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 3)
        }, config.auth.JWT.Secret as string);
    };

    async verifyToken(token: string) {
        try {
            const decoded = jwt.verify(token, config.auth.JWT.Secret as string);
            return decoded;
        } catch (error) {
            console.error('Error verifying access token:', error);
            return null;
        }
    };
};
