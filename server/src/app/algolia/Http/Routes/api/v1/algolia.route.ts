import { Router } from "express";
import AppServiceProvider from "../../../../Providers/AppServiceProvider";
import { AlgoliaController } from "../../../Controllers";

class AlgoliaRoute {
    private algoliaController: AlgoliaController;
    router = Router();

    constructor() {
        this.algoliaController = AppServiceProvider.getContainer().resolve(AlgoliaController);
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.post(
            "/v1/algolia/search",
            this.algoliaController.search.bind(this.algoliaController)
        );
    }
};

export default new AlgoliaRoute().router;