import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../../Database/types";
import { FileService } from "../../Services";
import { FileMapper } from "../../Mappers/files.mapper";
import { MediaService } from "../../Services/medias.service";

@injectable()
export class MediaController {
    private fileService: FileService;
    private mediaService: MediaService;

    constructor(
        @inject(TYPES.FileService)
        fileService: FileService,
        @inject(TYPES.MediaService)
        mediaService: MediaService
    ) {
        this.fileService = fileService;
        this.mediaService = mediaService;
    };

    /**
     * @description Save file to database
     * @param req 
     * @param res 
     * @returns 
     */
    async fileSaveDB(req: Request, res: Response) {
        try {
            const fileModel = FileMapper.toFile({ "filepath": req.file?.path, ...req.body });
            console.log(fileModel);
            await this.fileService.SaveFileDB(fileModel);
        } catch (error: any) {
            console.error(error.message);
            return res.status(500).json({ message: error.message });
        }
    };

    /**
     * @description Uploads a single file to the server
     * @param req 
     * @param res 
     * @returns 
     */
    async uploadSingleFile(req: Request, res: Response) {
        try {
            const file = req.file;
            const data = req.body;

            const awss3 = await this.mediaService.uploadFile(file);

            const fileModel = FileMapper.toFile({ "filepath": awss3.Key, ...data });
            const newfile = await this.fileService.SaveFileDB(fileModel);

            res.status(200).json(newfile);
        } catch (err: any) {
            console.error(err.message);
            return res.status(500).json({
                message: err.message,
            });
        }
    };

    /**
     * @description Uploads a mutiple file to the server
     * @param req 
     * @param res 
     * @returns 
     */
    async uploadMultipleFile(req: Request, res: Response) {
        try {
            const data = req.body;

            if (!req.files || !Array.isArray(req.files)) {
                throw new Error("No files provided");
            }
            console.log(data);

            await Promise.all(req.files?.map(
                async (file: any, index: number) => {
                    const awss3 = await this.mediaService.uploadFile(file);

                    const fileModel = FileMapper.toFile(
                        {
                            "filepath": awss3.Location,
                            filename: data.file_name[index],
                            user_id: data.user_id[index]
                        }
                    );

                    await this.fileService.SaveFileDB(fileModel);
                }
            ));

            return res.status(200).json({ message: "Muitple file uploaded successfully" });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    };

    /**
     * @description Upload file html convert to file pdf
     * @param req 
     * @param res 
     * @returns 
    */
    async html2pdf(req: Request, res: Response) {
        try {
            const { html, filename, options } = req.body;
            await this.mediaService.htm2pdf(html, filename, { format: 'A4' });
            return res.status(200).json({ message: "HTML convert to PDF Success" });
        } catch (err: any) {
            return res.status(500).json({
                message: err.message,
            });
        }
    };

    /**
     * @description Write file html
     * @param req 
     * @param res 
     * @returns 
    */
    async writeFileHtml(req: Request, res: Response) {
        try {
            const { content, filename } = req.body;
            console.log(content, filename);
            const url = await this.mediaService.writeHtmlFile(filename, content);
            console.log(url);
            return res.status(200).json(url);
        } catch (err: any) {
            return res.status(500).json({
                message: err.message,
            });
        }
    };

    async readFile(req: Request, res: Response) {
        try {
            const key = req.query.rf as string;
            const content = await this.mediaService.readFile(key);
            
            return res.status(200).json({
                content
            });
        } catch (err: any) {
            return res.status(500).json({
                message: err.message,
            });
        }
    };

    async readFilePDF(req: Request, res: Response) {
        try {
            const key = req.query.rf as string;
            const content = await this.mediaService.readFilePDF(key);
            
            return res.status(200).json({
                content
            });
        } catch (err: any) {
            return res.status(500).json({
                message: err.message,
            });
        }
    };

    async deleteFile(req: Request, res: Response) {
        try {
            const key = req.query.rf as string;
            await this.mediaService.deleteFile(key);
            return res.status(200).json("Delete Sucess!");
        } catch (err: any) {
            return res.status(500).json({
                message: err.message
            });
        }
    };
};
