import 'reflect-metadata';
import { Router } from "express";
import { 
    FormController 
} from '../../../Controllers';
import AppServiceProvider from '../../../../Providers/AppServiceProvider';

class FormRoute {
    private formController: FormController;
    router = Router();

    constructor() {
        this.formController = AppServiceProvider.getContainer().resolve(FormController);
        this.intializeRoutes();
    };

    intializeRoutes() {
        this.router.post(
            "/v1/forms", 
            this.formController.saveForm.bind(this.formController)
        );
        
        this.router.get(
            "/v1/forms/:user_id", 
            this.formController.getAllForm.bind(this.formController)
        );

        this.router.delete(
            "/v1/forms", 
            this.formController.deleteForm.bind(this.formController)
        );
    };
};

export default new FormRoute().router;