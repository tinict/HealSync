import * as _ from 'lodash';

export class RegisterMapper {
    static toRegister = (entity: any) => {
        return {
            firstname: _.get(entity, 'firstname'),
            lastname: _.get(entity, 'lastname'),
            username: _.get(entity, 'username'),
            email: _.get(entity, 'email'),
            phone: _.get(entity, 'phone'),
            password: _.get(entity, 'password'),
            roleEntity: _.get(entity, 'role'),
            modelEntity: _.get(entity, 'model')
        }
    }
};