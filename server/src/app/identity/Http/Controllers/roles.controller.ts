import 'reflect-metadata';
import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { TYPES } from '../../Database/types';
import { RolePermissionService, RoleService } from '../../Services';

@injectable()
export class RoleController {
    private roleService: RoleService;
    private rolePermissionService: RolePermissionService;

    constructor(
        @inject(TYPES.RoleService)
        roleService: RoleService,
        @inject(TYPES.RolePermissionService)
        rolePermissionService: RolePermissionService,
    ) {
        this.roleService = roleService,
            this.rolePermissionService = rolePermissionService
    };

    async createRole(req: Request, res: Response) {
        try {
            const { role_name, permission_id } = req.body;

            const role = await this.roleService.create(role_name);

            if (!role) 
                return res.status(400).json({ message: 'Role not created' });

            console.log({ role_id: role.role_id, permission_id });
            const rolePermission = await this.rolePermissionService.createRolePermission({ role_id: role.role_id, permission_id });

            if (!rolePermission)
                return res.status(400).json({ message: 'Role permission not created' });

            return res.status(200).json(rolePermission);
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    };

    async createRoles (req: Request, res: Response) {
        try {
            const { role_name } = req.body;
            const roles = await this.roleService.create(role_name);
            return res.status(200).json(roles);
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    };

    async getAllRole(req: Request, res: Response) {
        try {
            const roles = await this.roleService.getAllRole();
            return res.status(200).json(roles);
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    };
};
