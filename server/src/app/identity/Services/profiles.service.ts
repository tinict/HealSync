import 'reflect-metadata';
import { inject, injectable } from "inversify";
import { 
    ProfileEntity,
    AccountEntity as AccountRepository,
    ProfileEntity as ProfileRepository,
    AccountEntity
} from '../Entities';
import { ProfileModel } from '../Models/profile.get.model';
import { AccountService } from './accounts.service';
import { TYPES } from '../Database/types';

@injectable()
export class ProfileService {
    private accountService: AccountService;

    constructor(
        @inject(TYPES.AccountService)
        accountService: AccountService
    ) {
        this.accountService = accountService
    };

    async getListProfile () {
        try {
            const listProfile = await ProfileRepository.find();
            const listAccount = await this.accountService.listAccount();

            let result: any[] = [];

            listAccount.forEach((account: AccountEntity, index: number) => {
                result.push(ProfileModel.toProfileModel({ ...listProfile[index], ...account }));
            });

            return result;
        } catch (error) {
            throw error;
        }
    };

    async identifyProfile (email: string) {
        try {
            const profile = await ProfileRepository
                .createQueryBuilder("tbl_profiles")
                .leftJoinAndSelect("tbl_profiles.accountEntity", "tbl_accounts")
                .where("tbl_profiles.email = :email", { email })
                .getOne();

            return profile?.accountEntity.identity_id;
        } catch (error) {
            throw error;
        }
    };
};
