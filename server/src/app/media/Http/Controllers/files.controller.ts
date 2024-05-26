import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { TYPES } from "../../Database/types";
import { FileService } from "../../Services";
import { FileMapper } from "../../Mappers/files.mapper";

@injectable()
export class FileController {
    private fileService: FileService;
    constructor(
        @inject(TYPES.FileService)
        fileService: FileService
    ) {
        this.fileService = fileService;
    };

    async fileSaveDB(req: Request, res: Response) {
        try {
            const fileModel = FileMapper.toFile({ "filepath": req.file?.path, ...req.body });
            console.log(fileModel);
            await this.fileService.SaveFileDB(fileModel);
            return res.status(200).json({ message: 'File saved successfully' });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async SaveFile(req: Request, res: Response) {
        try {
            const { content, filename, user_id } = req.body;
            const fileModel = FileMapper.toFile({ content, filename, user_id });
            await this.fileService.SaveFile(fileModel);
            return res.status(200).json({ message: 'Save file success' });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async ReadFile(req: Request, res: Response) {
        try {
            const fileModel = FileMapper.toFile(req.body);

            const buffer = await this.fileService.ReadFile(fileModel, (err: any) => {
                if (err) {
                    console.error('Lỗi khi đọc file:', err);
                    return res.status(500).send('Lỗi khi đọc file');
                }

            });

            const content = buffer.toString('utf8');
            return res.status(200).json({ content });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async listFile(req: Request, res: Response) {
        try {
            const user_id = FileMapper.toFile(req.body).user_id;
            const files = await this.fileService.listFile(user_id);
            return res.status(200).json({ files });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getListMedicalRecord(req: Request, res: Response) {
        try {
            const listFileID = req.body.list_file;
            const medicalRecords = await this.fileService.getListMedicalRecords(listFileID);
            return res.status(200).json({ medicalRecords });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getFilePath(req: Request, res: Response) {
        try {
            const file_id = req.body.file_id;
            const fileEntity = await this.fileService.getFilePath(file_id);
            return res.status(200).json(fileEntity);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async downloadFile(req: Request, res: Response) {
        try {
            const { filepath, outputFilename } = req.body;
            await this.fileService.downloadFromUrl(filepath, outputFilename);
            return res.status(200).json("Download Successful");
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
};
