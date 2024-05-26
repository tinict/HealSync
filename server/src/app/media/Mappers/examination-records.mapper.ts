import * as _ from 'lodash';

export class ExaminationRecord {
    static toExaminationRecord = (entity: any) => {
        return {
            user_id: _.get(entity, 'user_id'),
            vi_tri_lam_viec: _.get(entity, 'vi_tri_lam_viec'),
            noi_lam_viec: _.get(entity, 'noi_lam_viec'),
            noi_o_hien_tai: _.get(entity, 'noi_o_hien_tai'),
            trinh_do_chuyen_nganh: _.get(entity, 'trinh_do_chuyen_nganh'),
            hoc_vi: _.get(entity, 'hoc_vi'),
            chuyen_nganh: _.get(entity, 'chuyen_nganh')
        };
    }
};