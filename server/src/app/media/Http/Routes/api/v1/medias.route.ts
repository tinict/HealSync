import { Router } from "express";
import { MediaController } from "../../../Controllers/medias.controller";
import AppServiceProvider from "../../../../Providers/AppServiceProvider";
import upload from "../../../Storage/storage.service";

class MediaRoute {
    private mediaController: MediaController;
    router = Router();

    constructor() {
        this.mediaController = AppServiceProvider.getContainer().resolve(MediaController);
        this.intializeRoutes();
    }

    intializeRoutes() {
        // this.router.post(
        //     "/v1/medias/uploadfile",
        //     upload.single('file'),
        //     this.mediaController.uploadSingleFile.bind(this.mediaController),
        // );

        this.router.post(
            "/v1/medias/uploadfile/multiple",
            upload.array('files', 100),
            this.mediaController.uploadMultipleFile.bind(this.mediaController),
        );
        
        this.router.post(
            "/v1/media/upload/singlefile",
            upload.single('file'),
            this.mediaController.uploadSingleFile.bind(this.mediaController)
        );

        this.router.post(
            "/v1/media/html2pdf",
            this.mediaController.html2pdf.bind(this.mediaController)
        );

        this.router.post(
            "/v1/media/file/writehtml", 
            this.mediaController.writeFileHtml.bind(this.mediaController)
        );

        this.router.get(
            "/v1/media/file", 
            this.mediaController.readFile.bind(this.mediaController)
        );

        this.router.get(
            "/v1/media/readfile-pdf", 
            this.mediaController.readFilePDF.bind(this.mediaController)
        );

        this.router.delete(
            "/v1/media/files", 
            this.mediaController.deleteFile.bind(this.mediaController)
        );
    };
};

export default new MediaRoute().router;