import { Container } from 'inversify';
import { TYPES } from '../Database/types';
import { MailerService } from '../Services';

class AppServiceProvider {
    private container: Container;

    constructor() {
        this.container = new Container();
        this.register();
    }

    public register() {
        this.container.bind<MailerService>(TYPES.MailerService).to(MailerService);
    }

    public getContainer(): Container {
        return this.container;
    }
}

export default new AppServiceProvider;