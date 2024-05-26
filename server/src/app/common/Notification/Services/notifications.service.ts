import 'reflect-metadata';
import {
    inject,
    injectable
} from "inversify";
import {
    NotificationEntity,
    NotificationEntity as NotificationRepository,
    AccountEntity as AccountRepository,
} from '../Entities';
import { 
    AccountService 
} from './account.service';
import { TYPES } from '../Database/types';

@injectable()
export class NotificationService {

    private accountService: AccountService;

    constructor(
        @inject(TYPES.AccountService)
        accountService: AccountService,
    ) {
        this.accountService = accountService;
    };

    async getNotification(identity_id: string) {
        try {
            const listNotification = await NotificationRepository
                .createQueryBuilder("tbl_notifications")
                .leftJoinAndSelect("tbl_notifications.accountEntity", "tbl_accounts")
                .where("tbl_accounts.identity_id = :identity_id",
                    {
                        identity_id
                    }
                )
                .getMany();

            return listNotification;
        } catch (error) {
            throw error;
        }
    };

    async createNotification(notificationModel: any) {
        try {
            let accountEntity = await AccountRepository.findOne({ where: { identity_id: notificationModel.identity_id } });
            if (!accountEntity) {
                accountEntity = await this.accountService.createAccount(notificationModel.identity_id);
            }

            if (accountEntity) {
                const notificationEntity = new NotificationEntity();

                notificationEntity.message = notificationModel.message;
                notificationEntity.accountEntity = accountEntity;

                return await NotificationRepository.save(notificationEntity);
            }
        } catch (error) {
            throw error;
        }
    };

    async updateNotification(notification_id: number) {
        try {
            const notification = await NotificationRepository.findOne({ where: { notification_id } });
            if (notification) {
                notification.read = true;
                return await NotificationRepository.save(notification);
            }
        } catch (error) {
            throw error;
        }
    };

    async deleteNotification(notification_id: number) {
        try {
            const notification = await NotificationRepository.findOne({ where: { notification_id } });
            if (notification)
                await NotificationRepository.remove(notification);
        } catch (error) {
            throw error;
        }
    };
};
