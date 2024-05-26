import { Container } from 'inversify';
import { TYPES } from '../Database/types';
import { 
    AccountService, 
    NotificationService 
} from '../Services';

class AppServiceProvider {
    private container: Container;

    constructor() {
        this.container = new Container();
        this.register();
    }

    public register() {
        this.container.bind<AccountService>(TYPES.AccountService).to(AccountService);
        this.container.bind<NotificationService>(TYPES.NotificationService).to(NotificationService);
    }

    public getContainer(): Container {
        return this.container;
    }
}

export default new AppServiceProvider;