import 'reflect-metadata';
import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import {
    ModelService,
} from "../../Services";
import { TYPES } from '../../Database/types';
import { ModelMapper } from '../../Mappers';

@injectable()
export class ModelController {
    private modelService: ModelService;

    constructor(
        @inject(TYPES.ModelService)
        modelService: ModelService,
    ) {
        this.modelService = modelService
    };

    async createModel(req: Request, res: Response) {
        try {
            const model = ModelMapper.toModel(req.body);
            console.log(model);
            const modelRole = await this.modelService.createModel(model);
            return res.status(200).json(modelRole);
        } catch (error: any) {
            return res.status(500).json({ error: error.toString() });
        }
    };

    async getAllModel(req: Request, res: Response) {
        try {
            const models = await this.modelService.getAllModel();
            return res.status(200).json(models);
        } catch (error: any) {
            return res.status(500).json({ error: error.toString() });
        }
    };
};