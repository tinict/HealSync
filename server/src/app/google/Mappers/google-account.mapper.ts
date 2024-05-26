import * as _ from 'lodash';

export class GoogleAccountMapper {
    static toGoogleAccount = (entity: any) => {
        return {
            google_id: _.get(entity, 'google_id'),
            name: _.get(entity, 'name'),
            family_name: _.get(entity, 'family_name'),
            url_picture: _.get(entity, 'url_picture'),
            access_token: _.get(entity, 'access_token'),
            email: _.get(entity, 'email'),
        };
    }
};
