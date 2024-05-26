import * as _ from 'lodash';

export class CustomerMapper {
    static toCustomer = (entity: any) => {
        return {
            google_id: _.get(entity, 'google_id'),
            customer_id: _.get(entity, 'google_id'),
            name: _.get(entity, 'name'),
            family_name: _.get(entity, 'family_name'),
            email: _.get(entity, 'email'),
            url_picture: _.get(entity, 'url_picture'),
            address: _.get(entity, 'address'),
            phone: _.get(entity, 'phone'),
            gender: _.get(entity, 'gender'),
            dob: _.get(entity, 'dob'),
        };
    }
};
