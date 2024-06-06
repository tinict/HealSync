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
                attributesForFaceting: ['searchable(doctorEntity.degree)', 'searchable(doctorEntity.specialty)', 'searchable(doctorEntity.position)'],
                customRanking: ['desc(doctorEntity.create_at)', 'asc(doctorEntity.firstname)', 'asc(doctorEntity.lastname)'],
                highlightPreTag: '<em>',
                highlightPostTag: '</em>',
                attributesToHighlight: ['doctorEntity.experience', 'doctorEntity.position'],
                attributesToSnippet: ['doctorEntity.experience:50'],
            });

            const searchResult = await index.search(
                searchText,
                {
                    filters: userFilters,
                    highlightPreTag: '<em>',
                    highlightPostTag: '</em>',
                    attributesToHighlight: ['doctorEntity.experience'],
                    attributesToSnippet: ['doctorEntity.experience:50'],
                }
            );

            return searchResult.hits
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
};
