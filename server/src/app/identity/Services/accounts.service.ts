import 'reflect-metadata';
import { injectable } from "inversify";
import {
    AccountEntity as AccountModel,
    AccountEntity as AccountRepository
} from '../Entities';
import { IAModel } from '../Models';

@injectable()
export class AccountService {

    constructor() { };

    async me(identity_id: string) {
        try {
            const account = await AccountRepository
                .createQueryBuilder("tbl_accounts")
                .leftJoinAndSelect("tbl_accounts.profileEntity", "tbl_profiles")
                .where("tbl_accounts.identity_id = :identity_id",
                    {
                        identity_id
                    }
                )
                .getOne();

            return account;
        } catch (error) {
            throw error;
        }
    };

    async listAccount() {
        try {
            return await AccountRepository.find();
        } catch (error) {
            throw error;
        }
    };

    async updateAccount(identity_id: string, updatedAccount: Partial<AccountModel>) {
        try {
            let accountToUpdate = await AccountRepository.findOne({ where: { identity_id } });
            if (accountToUpdate) {
                Object.assign(accountToUpdate, updatedAccount);
                return await AccountRepository.save(accountToUpdate);
            }
            return null;
        } catch (error) {
            throw error;
        }
    };

    async deleteAccount(identity_id: string) {
        try {
            let accountToDelete = await AccountRepository.findOne({ where: { identity_id } });
            if (accountToDelete) {
                return await AccountRepository.remove(accountToDelete);
            }
            return null;
        } catch (error) {
            throw error;
        }
    };

    async accountModelHasRole(identity_id: string) {
        try {
            const account = await AccountRepository
                .createQueryBuilder("tbl_accounts")
                .leftJoinAndSelect("tbl_accounts.modelEntity", "tbl_models")
                .leftJoinAndSelect("tbl_models.modelRoleEntity", "tbl_model_has_roles")
                .leftJoinAndSelect("tbl_model_has_roles.roleEntity", "tbl_roles")
                .leftJoinAndSelect("tbl_roles.rolePermisstionEntity", "tbl_role_permissions")
                .leftJoinAndSelect("tbl_role_permissions.permissionEntity", "tbl_permissions")
                .where("tbl_accounts.identity_id = :identity_id",
                    {
                        identity_id
                    }
                )
                .getOne();

            const iam = IAModel.toIAM({
                ...account,
                ...account?.modelEntity,
                ...account?.modelEntity.modelRoleEntity,
                ...account?.modelEntity.modelRoleEntity.roleEntity,
                ...account?.modelEntity.modelRoleEntity.roleEntity.rolePermisstionEntity,
                ...account?.modelEntity.modelRoleEntity.roleEntity.rolePermisstionEntity.permissionEntity,
            });

            return iam;
        } catch (error) {
            throw error;
        }
    };

    async verifyRoleAccount(username: string) {
        try {
            const account = await AccountRepository
                .createQueryBuilder("tbl_accounts")
                .leftJoinAndSelect("tbl_accounts.modelEntity", "tbl_models")
                .leftJoinAndSelect("tbl_models.modelRoleEntity", "tbl_model_has_roles")
                .where("tbl_accounts.username = :username",
                    {
                        username
                    }
                )
                .getOne();
            return account;
        } catch (error) {
            throw error;
        }
    };
};
