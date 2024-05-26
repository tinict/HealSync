import * as _ from 'lodash';

export class MessageCreateModel {
    static toMessageCreateModel = (entity: any) => {
        return {
            content: _.get(entity, 'content'),
            sender: _.get(entity, 'sender'),
            thread_id: _.get(entity, 'thread_id')
        };
    }
};
