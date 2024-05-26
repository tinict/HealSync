import 'reflect-metadata';
import { injectable } from "inversify";
import {
    AccountEntity,
    AccountEntity as AccountRepository,
} from '../Entities';


@injectable()
export class AccountService {

    constructor() { };

    async createAccount(identity_id: string) {
        try {
            const accountEntity = new AccountEntity();

            accountEntity.identity_id = identity_id;

            return await AccountRepository.save(accountEntity);
        } catch (error) {
            throw error;
        }
    };
};
