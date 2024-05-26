import { injectable } from "inversify";
import { 
    CredentialEntity as CredentialModel, 
    CredentialEntity as credentialRepository
} from '../Entities';

@injectable()
export class CredentialService {
    
    async create(credential: CredentialModel) {
        return await credentialRepository.save(credential)
    };

    async findAll() {
        return await credentialRepository.find();
    };

    async findOne(option: Object) {
        return await credentialRepository.findOne(option);
    };

    async update(id: number, credential: CredentialModel) {
        return await credentialRepository.update(id, credential);
    };

    async remove(id: number) {
        return await credentialRepository.delete(id);
    };
};