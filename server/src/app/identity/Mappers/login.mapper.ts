import * as _ from 'lodash';

export class LoginMapper {
    static toLogin = (entity: any) => {
        return {
            username: _.get(entity, 'username'),
            password: _.get(entity, 'password')
        }
    }
};