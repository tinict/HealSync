import * as _ from 'lodash';

export class ProfileModel {
    static toProfileModel = (entity: any) => {
        return {
            identity_id: _.get(entity, 'identity_id'),
            firstname: _.get(entity, 'firstname'),
            lastname: _.get(entity, 'lastname'),
            email: _.get(entity, 'email'),
            phone: _.get(entity, 'phone'),
            url_picture: _.get(entity, 'url_picture'),
        };
    }
};