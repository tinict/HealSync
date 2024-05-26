import 'reflect-metadata';
import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import {
    ModelPermissionService,
    ModelRoleService,
} from "../../Services";
import { TYPES } from '../../Database/types';

@injectable()
export class ModelPermissionController {
    private modelPermissionService: ModelPermissionService;

    constructor(
        @inject(TYPES.ModelPermissionService)
        modelPermissionService: ModelPermissionService,
    ) {
        this.modelPermissionService = modelPermissionService
    }

    async createModelPermission(req: Request, res: Response) {
        try {
            const { accessPermissions } = req.body;
            console.log(accessPermissions);
            accessPermissions.forEach(async (accessPermission: any) => {
                await this.modelPermissionService.createModelPermission(accessPermission);
            })
            return res.status(200).json({ message: 'Model Permission created successfully' });
        } catch (error: any) {
            return res.status(500).json({ error: error.toString() });
        }
    }

    async getModelPermission(req: Request, res: Response) {
        try {
            const model_id = Number(req.params.model_id);
            const modelPermission = await this.modelPermissionService.getModelPermission(model_id);
            return res.status(200).json(modelPermission);
        } catch (error: any) {
            return res.status(500).json({ error: error.toString() });
        }
    }

    async getAllModelPermissionIntegration(req: Request, res: Response) {
        try {
            const modelPermissionIntegration = await this.modelPermissionService.getAllModelPermissionIntegration();
            return res.status(200).json(modelPermissionIntegration);
        } catch (error: any) {
            return res.status(500).json({ error: error.toString() });
        }
    }
};