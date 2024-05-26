import { Request, Response } from "express";
import { injectable } from "inversify";

@injectable()
export class DefaultController {
    constructor() { }

    async get(req: Request, res: Response) {
        res.status(200).json('Test API');
    }
}