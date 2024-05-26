import * as _ from 'lodash';

export class MeMapper {
    static toMe = (entity: any) => {
        return {
            username: _.get(entity, 'token')
        }
    }
};