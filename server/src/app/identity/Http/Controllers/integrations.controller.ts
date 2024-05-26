import 'reflect-metadata';
import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import {
    IntegrationService,
    ModelService,
} from "../../Services";
import { TYPES } from '../../Database/types';

@injectable()
export class IntegrationController {
    private integrationService: IntegrationService;

    constructor(
        @inject(TYPES.IntegrationService)
        integrationService: IntegrationService,
    ) {
        this.integrationService = integrationService
    };

    async getAllIntegration(req: Request, res: Response) {
        try {
            const integrations = await this.integrationService.getAllIntergration();
            return res.status(200).json(integrations);
        } catch (error: any) {
            return res.status(500).json({ error: error.toString() });
        }
    };

    async createIntegration(req: Request, res: Response) {
        try {
            const integrations = await this.integrationService.createIntegration(req.body);
            return res.status(200).json(integrations);
        } catch (error: any) {
            return res.status(500).json({ error: error.toString() });
        }
    };
};