import 'reflect-metadata';
import { injectable } from 'inversify';
import nodemailer, { Transporter } from 'nodemailer';
import config from '../config';
import path from 'path';
import util from 'util';
const ejs = require('ejs');

@injectable()
export class MailerService {

    constructor() { }

    public async sendMail(sendMailModel: any) {
        const mailerClient: nodemailer.Transporter = nodemailer.createTransport({
            host: config.mailer.hostname,
            port: config.mailer.port,
            auth: {
                user: config.mailer.user,
                pass: config.mailer.pass,
            },
        });

        const templatePath = path.join(__dirname, `../Templates/${sendMailModel.template}.ejs`);

        const renderFile = util.promisify(ejs.renderFile);
        const template = await renderFile(templatePath, sendMailModel.data);

        return mailerClient.sendMail({
            from: config.mailer.fromemail,
            to: sendMailModel.to,
            subject: sendMailModel.subject,
            html: template,
        });
    };

    async sendMailerDataList(listData: any[]) {
        try {
            listData.forEach(async (itemDataModel: any) => {
                await this.sendMail(itemDataModel);
            });
        } catch(error: any) {
            throw error;
        }
    };
};
