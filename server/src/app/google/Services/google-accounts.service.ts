import 'reflect-metadata';
import { inject, injectable } from "inversify";
import {
    GoogleAccountEntity,
    GoogleAccountEntity as GoogleAccountModel,
    GoogleAccountEntity as GoogleAccountRepository
} from '../Entities';
import { AuthenticationService } from "./authentication.service";
import { TYPES } from "../Database/types";
import PublishMessage from "../Synchronized/Publishers/PublishMessage";
import { GoogleAccountMapper } from "../Mappers";

@injectable()
export class GoogleAccountService {
    private auth: AuthenticationService;

    constructor(
        @inject(TYPES.AuthenticationService) 
        auth: AuthenticationService
    ) {
        this.auth = auth;
    };

    async create(googleAccountModel: any) {
        let existingCustomer = await GoogleAccountRepository.findOne({ where: { google_id: googleAccountModel.google_id } });

        if (existingCustomer) {
            const enCryptToken = await this.auth.encrypt(googleAccountModel.access_token);
            this.updateAccessToken(googleAccountModel.google_id, enCryptToken);
            return existingCustomer;
        } else {
            let googleAccountEntity = new GoogleAccountEntity();

            googleAccountEntity.google_id = googleAccountModel.google_id;
            googleAccountEntity.email = googleAccountModel.email;
            googleAccountEntity.name = googleAccountModel.name;
            googleAccountEntity.family_name = googleAccountModel.family_name;
            googleAccountEntity.url_picture = googleAccountModel.url_picture;
            googleAccountEntity.access_token = await this.auth.encrypt(googleAccountModel.access_token);

            const newAccountGoogle = await GoogleAccountRepository.save(googleAccountModel);

            PublishMessage('healthhubregister', GoogleAccountMapper.toGoogleAccount(newAccountGoogle));

            return newAccountGoogle;
        }
    };

    async me(google_id: string) {
        try {
            const profile = await GoogleAccountRepository.findOne({ where: { google_id } });
            console.log(profile);
            return profile;
        } catch (error) {
            console.log(error);
        }
    };

    async getAccessToken(google_id: string) {
        try {
            const token = await GoogleAccountRepository.findOne({ where: { google_id } });
            console.log("getAccessToken: ", token);
            if (!token) return null;
            return token.access_token;
        } catch (error) {
            console.log(error);
        }
    };

    async updateAccessToken(google_id: string, access_token: string) {
        try {
            const googleAccountEntity = await GoogleAccountRepository.findOne({ where: { google_id } });
            if (!googleAccountEntity) return null;
            googleAccountEntity.access_token = access_token;
            return await GoogleAccountRepository.save(googleAccountEntity);
        } catch (error) {
            console.log(error);
        }
    };
};
