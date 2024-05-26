import 'reflect-metadata';
import { inject, injectable } from "inversify";
import { TYPES } from '../Database/types';
import { AWSStorageService } from '../Http/Storage';
import pdf from 'html-pdf';

@injectable()
export class MediaService {
    private awsStorageService: AWSStorageService;

    constructor(
        @inject(TYPES.AWSStorageService)
        awsStorageService: AWSStorageService
    ) {
        this.awsStorageService = awsStorageService
    }

    /**
     * @Description Uploads a single file to the server
     * @param data 
     * @param file 
     * @returns 
    */
    async uploadFile(
        file: any,
    ) {
        if (!file || !file.buffer) {
            throw new Error('File or file buffer is missing');
        }

        const date = new Date();
        const timestamp = date.getTime();

        return this.awsStorageService.s3Save(
            'media/' + timestamp + "_" + file.originalname,
            file.buffer,
        );
    };

    async deleteFile(key: any) {
        try {
            return this.awsStorageService.s3Delete(key);
        } catch (error: any) {
            throw error;
        }
    };

    /**
     * @Description Uploads a single file to the server
     * @param filename 
     * @param content 
     * @returns 
    */
    async writeHtmlFile(
        filename: any,
        content: string
    ) {
        const date = new Date();
        const timestamp = date.getTime();

        return this.awsStorageService.s3WriteFileHTML(
            'media/' + timestamp + "_" + filename + '.html',
            content,
        );
    };

    /**
     * @Description Converts HTML to PDF
     * @param html 
     * @param filename 
     * @param options 
     * @returns 
    */
    async htm2pdf(html: string, filename: string, options: object) {
        try {
            return pdf.create(html, options).toFile(
                `./temporary/${filename}.pdf`,
                function (err, res) {
                    if (err)
                        return console.log(err);
                    console.log(res);
                }
            )
        } catch (err: any) {
            throw err;
        }
    };

    async readFile (key: string) {
        try {
            const buffer = await this.awsStorageService.readFile(key);
            if (buffer) {
                return buffer.toString('utf8');
            }
            throw new Error('Buffer is undefined');
        } catch (err: any) {
            throw err;
        }
    };

    async readFilePDF (key: string) {
        try {
            const buffer = await this.awsStorageService.readFile(key);
            if (buffer) {
                return buffer;
            }
            throw new Error('Buffer is undefined');
        } catch (err: any) {
            throw err;
        }
    };
};