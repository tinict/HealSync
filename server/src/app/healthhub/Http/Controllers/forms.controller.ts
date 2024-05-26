import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { Request, Response } from "express";
import { DoctorService, FormService } from '../../Services';
import { TYPES } from '../../Database/types';

@injectable()
export class FormController {
    constructor(
        @inject(TYPES.FormService)
        private formService: FormService
    ) { }

    async saveForm(req: Request, res: Response) {
        try {
            const formModel = req.body;
            const form = await this.formService.saveForm(formModel);
            return res.status(200).json(form);
        } catch (err: any) {
            return res.status(500).send("Server Error");
        }
    };

    async getAllForm(req: Request, res: Response) {
        try {
            const user_id = req.params.user_id;
            const forms = await this.formService.getAllForm(user_id);
            return res.status(200).json(forms);
        } catch (err: any) {
            return res.status(500).send("Server Error");
        }
    };

    async deleteForm(req: Request, res: Response) {
        try {
            const key = req.query.key;
            await this.formService.deleteForm(key);
            return res.status(200).json("Delete Success!");
        } catch (err: any) {
            return res.status(500).send("Server Error");
        }
    };
};
