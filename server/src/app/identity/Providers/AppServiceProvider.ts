import { Container } from 'inversify';
import { 
    AccountService,  
    AuthenticationService, 
    CredentialService,
    IntegrationService,
    ModelPermissionService,
    ModelRoleService,
    ModelService,
    PermissionService,
    ProfileService,
    RolePermissionService,
    RoleService,
} from '../Services';
import { TYPES } from '../Database/types';

class AppServiceProvider {
    private container: Container;

    constructor() {
        this.container = new Container();
        this.register();
    }

    public register() {
        this.container.bind<AccountService>(TYPES.AccountService).to(AccountService);
        this.container.bind<ProfileService>(TYPES.ProfileService).to(ProfileService);
        this.container.bind<CredentialService>(TYPES.CredentialService).to(CredentialService);
        this.container.bind<AuthenticationService>(TYPES.AuthenticationService).to(AuthenticationService);
        this.container.bind<ModelRoleService>(TYPES.ModelRoleService).to(ModelRoleService);
        this.container.bind<ModelService>(TYPES.ModelService).to(ModelService);
        this.container.bind<RoleService>(TYPES.RoleService).to(RoleService);
        this.container.bind<RolePermissionService>(TYPES.RolePermissionService).to(RolePermissionService);
        this.container.bind<PermissionService>(TYPES.PermissionService).to(PermissionService);
        this.container.bind<IntegrationService>(TYPES.IntegrationService).to(IntegrationService);
        this.container.bind<ModelPermissionService>(TYPES.ModelPermissionService).to(ModelPermissionService);
    }

    public getContainer(): Container {
        return this.container;
    }
}

export default new AppServiceProvider;