import { Container } from 'inversify';
import {  
    AuthenticationService,
    GoogleAccountService,
} from '../Services';
import { TYPES } from '../Database/types';

class AppServiceProvider {
    private container: Container;

    constructor() {
        this.container = new Container();
        this.register();
    }

    public register() {
        this.container.bind<AuthenticationService>(TYPES.AuthenticationService).to(AuthenticationService);
        this.container.bind<GoogleAccountService>(TYPES.GoogleAccountService).to(GoogleAccountService);
    }

    public getContainer(): Container {
        return this.container;
    }
}

export default new AppServiceProvider;