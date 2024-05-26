import * as _ from 'lodash';

export class FileMapper {
    static toFile = (entity: any) => {
        return {
            event_message: _.get(entity, 'event_message'),
            user_id: _.get(entity, 'user_id'),
            patient_id: _.get(entity, 'patient_id'),
            appointment_id: _.get(entity, 'appointment_id'),
            filename: _.get(entity, 'filename'),
            filepath: _.get(entity, 'filepath'),
            content: _.get(entity, 'content'),
            chuyen_nganh: _.get(entity, 'chuyen_nganh'),
            vi_tri_lam_viec: _.get(entity, 'vi_tri_lam_viec'),
            noi_lam_viec: _.get(entity, 'noi_lam_viec'),
            noi_o_hien_tai: _.get(entity, 'noi_o_hien_tai'),
            trinh_do_chuyen_nganh: _.get(entity, 'trinh_do_chuyen_nganh'),
            hoc_vi: _.get(entity, 'hoc_vi')
        };
    }
};
