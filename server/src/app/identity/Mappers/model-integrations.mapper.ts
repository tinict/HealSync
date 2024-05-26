import * as _ from 'lodash';

export class ModelIntegrationMapper {
    static toModelIntegration = (entity: any) => {
        return {
            model_id: _.get(entity, 'model_id'),
            model_type: _.get(entity, 'model_type'),
            permission_id: _.get(entity, 'permission_id'),
            permission_name: _.get(entity, 'permission_name'),
            modelPermisionEntities: _.get(entity, 'modelPermisionEntities'),
        }
    }
};