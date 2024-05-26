import { Container } from 'inversify';
import { TYPES } from '../Database/types';
import { 
    MessageService,
    ThreadService, 
} from '../Services';

class AppServiceProvider {
    private container: Container;

    constructor() {
        this.container = new Container();
        this.register();
    }

    public register() {
        this.container.bind<MessageService>(TYPES.MessageService).to(MessageService);
        this.container.bind<ThreadService>(TYPES.ThreadService).to(ThreadService);
    }

    public getContainer(): Container {
        return this.container;
    }
}

export default new AppServiceProvider;