import 'reflect-metadata';
import { inject, injectable } from "inversify";
import { TYPES } from '../../Database/types';
import { 
    MessageService 
} from "../../Services";
import {
    NextFunction,
    Request,
    Response
} from "express";
import { MessageCreateModel, SenderCreateModel } from "../../Models";

@injectable()
export class MessageController {
    private messageService: MessageService;

    constructor(
        @inject(TYPES.MessageService) messageService: MessageService,
    ) {
        this.messageService = messageService;
    };

    getMessagesInThread() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const message_id = req.params.thread_id;
                console.log(message_id);
                const messages = await this.messageService.getMessages(message_id);
                return res.status(200).json(messages);
            } catch (err) {
                return next(err);
            }
        }
    };

    createMeasageInThread() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { content } = req.body;
                const { user_id, username } = req.body.sender;
                const thread_id = req.params.thread_id;
                const senderCreateModel = SenderCreateModel.toSenderCreateModel({ user_id, username });
                const messageCreateModel = MessageCreateModel.toMessageCreateModel({content, senderCreateModel, thread_id});
                await this.messageService.createMessage(messageCreateModel);
                res.status(200).json({ message: 'Message created successfully' });
            } catch (err) {
                return next(err);
            }
        }
    };
};
