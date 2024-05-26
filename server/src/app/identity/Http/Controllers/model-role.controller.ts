import 'reflect-metadata';
import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import {
    ModelRoleService,
} from "../../Services";
import { TYPES } from '../../Database/types';

@injectable()
export class ModelRoleController {
    private modelRoleService: ModelRoleService;

    constructor(
        @inject(TYPES.ModelRoleService)
        modelRoleService: ModelRoleService,
    ) {
        this.modelRoleService = modelRoleService
    }

    async createModelRole(req: Request, res: Response) {
        try {
            const modelRole = await this.modelRoleService.createModelRole(req.body);
            return res.status(201).json(modelRole);
        } catch (error: any) {
            return res.status(500).json({ error: error.toString() });
        }
    }
};