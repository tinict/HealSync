import 'reflect-metadata';
import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import {
    ModelService,
    PermissionService,
    RolePermissionService,
} from "../../Services";
import { TYPES } from '../../Database/types';

@injectable()
export class RolePermissionController {
    private rolePermissionService: RolePermissionService;

    constructor(
        @inject(TYPES.RolePermissionService)
        rolePermissionService: RolePermissionService,
    ) {
        this.rolePermissionService = rolePermissionService
    };

    async getAllRolePermission(req: Request, res: Response) {
        try {
            const rolePermissions = await this.rolePermissionService.getAllPermissionRole();
            return res.status(200).json(rolePermissions);
        } catch (error: any) {
            return res.status(500).json({ error: error.toString() });
        }
    };
};