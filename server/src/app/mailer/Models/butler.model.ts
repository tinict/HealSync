import * as _ from 'lodash';

export class ButlerModel {
    static toButler = (entity: any) => {
        return {
            rule: _.get(entity, "rule"),
            mission: {
                mode: _.get(entity, "mission.mode"),
                startTime: _.get(entity, "mission.startTime"),
                endTime: _.get(entity, "mission.endTime"),
            },
            require: {
                task: _.get(entity, "require.task"),
                priority: _.get(entity, "require.priority"),
                startTask: _.get(entity, "require.startTask"),
                endTask: _.get(entity, "require.endTask"),
            }
        };
    }
};