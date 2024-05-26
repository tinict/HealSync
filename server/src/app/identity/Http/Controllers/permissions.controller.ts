import 'reflect-metadata';
import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import {
    ModelService,
    PermissionService,
} from "../../Services";
import { TYPES } from '../../Database/types';
import { ModelMapper } from '../../Mappers';

@injectable()
export class PermissionController {
    private permissionService: PermissionService;

    constructor(
        @inject(TYPES.PermissionService)
        permissionService: PermissionService,
    ) {
        this.permissionService = permissionService
    };

    async getAllModel(req: Request, res: Response) {
        try {
            const permissions = await this.permissionService.getAllPermission();
            return res.status(200).json(permissions);
        } catch (error: any) {
            return res.status(500).json({ error: error.toString() });
        }
    };

    async createPermission(req: Request, res: Response) {
        try {
            const { permission_name } = req.body;

            const permission = await this.permissionService.createPermission({ permission_name });

            if (!permission)
                return res.status(400).json({ message: 'Permission not created' });

            return res.status(200).json(permission);
        
        } catch (error: any) {
            return res.status(500).json({ error: error.toString() });
        }
    };
};