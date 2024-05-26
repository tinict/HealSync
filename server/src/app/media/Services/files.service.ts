import 'reflect-metadata';
import {
    injectable,
} from "inversify";
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import util, { promisify } from 'util';
import {
    FileEntity as FileRepository,
    FileEntity
} from '../Entities';
import { ExaminationRecord } from '../Mappers/examination-records.mapper';
import { MedicalRecordMapper } from '../Mappers/medical-records.mappres';
import axios from 'axios';
import { pipeline } from 'stream';
import PublishMessage from '../Synchronized/Publishers/PublishMessage';

@injectable()
export class FileService {
    construct() { };

    async SaveFileDB(fileModel: any) {
        try {
            console.log(fileModel);

            let file = new FileEntity();

            const uuid = uuidv4();
            const shortUuid = uuid.substring(0, 8);

            file.file_id = shortUuid;
            file.user_id = fileModel.user_id;
            file.file_name = fileModel.filename;
            file.file_path = fileModel.filepath;

            const newFile = FileRepository.save(file);

            if (fileModel.event_message === "medicalRecordMessage")
                PublishMessage("medicalRecordMessage", MedicalRecordMapper.toMedicalRecord({ ...fileModel, filepath: file.file_path }));

            return newFile;
        } catch (error: any) {
            throw error;
        }
    }

    async SaveFile(fileModel: any) {
        try {
            const fileEntity = new FileEntity();

            const uuid = uuidv4();
            const shortUuid = uuid.substring(0, 8);

            fileEntity.file_id = shortUuid;
            fileEntity.file_name = fileModel.filename;
            fileEntity.file_path = `E:/ZealFlow-WorkSpace/HealthSync/server/assets/uploads/Doctors/Forms/${fileModel.filename}.html`;
            fileEntity.user_id = fileModel.user_id;

            const filePath = `./temporary/${fileModel.filename}.html`;
            
            const newFile = fs.writeFile(filePath, fileModel.content, (err) => {
                if (err) throw err;
                console.log('File saved successfully');
            });

            console.log(newFile);

            // await FileRepository.save(fileEntity);
        } catch (error: any) {
            throw error;
        }
    }

    async ReadFile(fileModel: any, exception: any) {
        // const filePath = `E:/ZealFlow-WorkSpace/HealthSync/server/assets/Doctors/18082002/Forms/${fileModel.filename}.html`;
        const readFile = util.promisify(fs.readFile);

        try {
            const data = await readFile(fileModel.filepath);
            return data;
        } catch (error) {
            console.error('Error reading file:', error);
            throw error;
        }
    }

    async listFile(user_id: string) {
        try {
            const files = await FileRepository.find({ where: { user_id } });
            return files;
        } catch (error: any) {
            throw error;
        }
    }

    async getListMedicalRecords(listFormID: any[]) {
        try {
            const forms = await Promise.all(
                listFormID.map(async form => {
                    return await FileRepository.findOne({ where: { file_id: form.diagnostic_records } });
                })
            );

            return forms;
        } catch (error: any) {
            throw error;
        }
    }

    async getFilePath(file_id: string) {
        try {
            const fileEntity = FileRepository.findOne({ where: { file_id } });
            return fileEntity;
        } catch (err: any) {
            throw err;
        }
    }

    async downloadFromUrl(filepath: string, outputFilename: string) {
        try {
            const response = await axios.get(`http://localhost:5003/${filepath}`, { responseType: 'stream' });
            const writer = fs.createWriteStream(outputFilename);

            await promisify(pipeline)(response.data, writer);

            console.log('Download completed.');
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                console.error('Error: The requested URL was not found on the server.');
            } else if (error.code === 'EACCES') {
                console.error('Error: The process does not have write permission to the output location.');
            } else {
                console.error('Error downloading file:', error);
            }
        }
    }
};