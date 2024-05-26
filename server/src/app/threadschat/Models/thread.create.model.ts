import * as _ from 'lodash';

export class ThreadCreateModel {
    static toThreadCreateModel = (entity: any) => {
        return {
            content: _.get(entity, 'content'),
            group_type: _.get(entity, 'group_type'),
            creator: {
                user_id: _.get(entity, 'creator.user_id'),
                user_name:  _.get(entity, 'creator.user_name')
            },
        };
    }
};