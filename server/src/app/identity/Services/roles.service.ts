import { injectable } from "inversify";
import {
    RoleEntity as RoleModel,
    RoleEntity as RoleRepository
} from '../Entities';

@injectable()
export class RoleService {
    constructor() { };
    
    async create(role_name: string) {
        try {
            let newRole = new RoleModel();

            newRole.role_name = role_name;

            newRole = await RoleRepository.save(newRole);

            return newRole;
        } catch (error) {
            throw error;
        }
    };

    async getAllRole() {
        try {
            return await RoleRepository.find();
        } catch (error) {
            throw error;
        }
    };
};

