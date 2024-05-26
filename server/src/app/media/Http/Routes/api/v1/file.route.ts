import { Router } from "express";
import { 
    FileController 
} from "../../../Controllers";
import AppServiceProvider from "../../../../Providers/AppServiceProvider";

class File {
    router = Router();
    private fileController: FileController;

    constructor() {
        this.fileController = AppServiceProvider.getContainer().resolve(FileController);
        this.intializeRoutes();
    }

    intializeRoutes() {
        // this.router.get(
        //     "/v1/file/htmlconvertpdf", 
        //     this.fileController.HtmlToPdf.bind(this.fileController)
        // );

        this.router.post(
            "/v1/file/savefile", 
            this.fileController.SaveFile.bind(this.fileController)
        );

        this.router.post(
            "/v1/file/readfile", 
            this.fileController.ReadFile.bind(this.fileController)
        );

        this.router.post(
            "/v1/file/listfile", 
            this.fileController.listFile.bind(this.fileController)
        );

        this.router.post(
            "/v1/file/medical-records",
            this.fileController.getListMedicalRecord.bind(this.fileController)
        );

        this.router.post(
            "/v1/file/getpath",
            this.fileController.getFilePath.bind(this.fileController)
        );

        this.router.post(
            "/v1/file/download",
            this.fileController.downloadFile.bind(this.fileController)
        );
    }
}

export default new File().router;
