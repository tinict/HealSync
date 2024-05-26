import { Container } from 'inversify';
import { 
    FileService
} from '../Services';
import { TYPES } from '../Database/types';
import { AWSStorageService } from '../Http/Storage';
import { MediaService } from '../Services/medias.service';

class AppServiceProvider {
    private container: Container;

    constructor() {
        this.container = new Container();
        this.register();
    }

    public register() {
        this.container.bind<FileService>(TYPES.FileService).to(FileService);
        this.container.bind<MediaService>(TYPES.MediaService).to(MediaService);
        this.container.bind<AWSStorageService>(TYPES.AWSStorageService).to(AWSStorageService);
    }

    public getContainer(): Container {
        return this.container;
    }
}

export default new AppServiceProvider;