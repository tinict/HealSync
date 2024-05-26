import 'reflect-metadata';
import algoliasearch from "algoliasearch";
import { injectable } from 'inversify';
import config from '../config';

@injectable()
export class AlgoliaService {
    constructor() { }

    public async searchEngine(data: any, searchText: any, attributeSearch: any[], userFilters: string = '') {
        console.log(config.algolia.app_id);
        try {
            const algoliaClient = algoliasearch(
                config.algolia.app_id || '',
                config.algolia.api_key || ''
            );
            const index = algoliaClient.initIndex(config.algolia.index_name || '');

            const saveResult = await index.saveObjects(data);
            console.log(saveResult.objectIDs);

            await index.setSettings({
                searchableAttributes: attributeSearch
            });

            const searchResult = await index.search(
                searchText, 
                {
                    filters: userFilters
                }
            );

            return searchResult.hits
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}