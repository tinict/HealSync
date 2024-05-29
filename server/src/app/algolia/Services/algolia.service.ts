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
                searchableAttributes: attributeSearch,
                attributesForFaceting: ['searchable(degree)', 'searchable(specialty)', 'searchable(position)'],
                customRanking: ['desc(create_at)', 'asc(firstname)', 'asc(lastname)'],
                highlightPreTag: '<em>',
                highlightPostTag: '</em>',
                attributesToHighlight: ['experience', 'position'],
                attributesToSnippet: ['experience:50'],
            });

            const searchResult = await index.search(
                searchText,
                {
                    filters: userFilters,
                    highlightPreTag: '<em>',
                    highlightPostTag: '</em>',
                    attributesToHighlight: ['experience'],
                    attributesToSnippet: ['experience:50'],
                }
            );

            return searchResult.hits
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
};
