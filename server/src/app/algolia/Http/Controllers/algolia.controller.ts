import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { TYPES } from "../../Database/types";
import { AlgoliaService } from "../../Services";

@injectable()
export class AlgoliaController {
    constructor(
        @inject(TYPES.AlgoliaService)
        private algoliaService: AlgoliaService,
    ) { }

    async search(req: Request, res: Response) {
        try {
            const {data, searchText} = req.body;

            console.log(data, searchText);

            const dataWithObjectIDs = data.map((item: any, index: number) => ({
                ...item,
                objectID: index,
            }));

            const resultSearch = await this.algoliaService.searchEngine(
                dataWithObjectIDs, 
                searchText, 
                [
                    'doctorEntity.firstname', 
                    'doctorEntity.lastname', 
                    'doctorEntity.specialty', 
                    'doctorEntity.qualification', 
                    'doctorEntity.experience'
                ]
            );

            return res.status(200).json(resultSearch);
        } catch (err: any) {
            return res.status(500).json({ message: err.message });
        }
    }
};