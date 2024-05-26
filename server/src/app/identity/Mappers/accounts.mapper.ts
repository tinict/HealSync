import * as _ from 'lodash';

export class AccountMapper {
    static toAccount = (entity: any) => {
        return {
            account_id: _.get(entity, 'account_id'),
            identity_id: _.get(entity, 'identity_id'),
            firstname: _.get(entity, 'firstname'),
            lastname: _.get(entity, 'lastname'),
            username: _.get(entity, 'username'),
            email: _.get(entity, 'email'),
            phone: _.get(entity, 'phone'),
            password: _.get(entity, 'password'),
            roleEntity: _.get(entity, 'roleEntity'),
            model_id: _.get(entity, 'model'),
        };
    }
};
