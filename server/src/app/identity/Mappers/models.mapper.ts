import * as _ from 'lodash';

export class ModelMapper {
    static toModel = (entity: any) => {
        return {
            model_type: _.get(entity, 'model_type'),
            role_id: _.get(entity, 'role_id')
        }
    }
};