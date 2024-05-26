import { Container } from 'inversify';
import { TYPES } from '../Database/types';
import { AlgoliaService } from '../Services';

class AppServiceProvider {
    private container: Container;

    constructor() {
        this.container = new Container();
        this.register();
    }

    public register() {
        this.container.bind<AlgoliaService>(TYPES.AlgoliaService).to(AlgoliaService);
    }

    public getContainer(): Container {
        return this.container;
    }
}

export default new AppServiceProvider;