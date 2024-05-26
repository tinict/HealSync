import 'reflect-metadata';
import {
    ThreadCreateModel,
    UserCreateModel
} from '../../Models';
import { 
    Request, 
    Response, 
    NextFunction 
} from 'express';
import { inject, injectable } from "inversify";
import { TYPES } from '../../Database/types';
import { ThreadService } from '../../Services';

@injectable()
export class ThreadController {
    private threadService: ThreadService;

    constructor(
        @inject(TYPES.ThreadService) threadService: ThreadService
    ) {
        this.threadService = threadService;
    };

    getThreads() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const threads = await this.threadService.getThreads();
                res.status(200).json(threads);
            } catch (err) {
                next(err);
            }
        };
    };

    createThreads() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                console.log(req.body);
                const threadCreateModel = ThreadCreateModel.toThreadCreateModel(req.body);
                console.log(threadCreateModel);
                await this.threadService.createThread(threadCreateModel);
                res.status(200).json({ message: 'Thread created successfully' });
            } catch (err) {
                next(err);
            }
        };
    };

    deleteThreads() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const threadID = req.params.thread_id;
                await this.threadService.deleteThread(threadID);
                res.status(200).json({ message: 'Thread deleted successfully' });
            } catch (err) {
                next(err);
            }
        };
    };
};

