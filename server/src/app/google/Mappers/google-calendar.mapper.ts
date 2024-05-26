import * as _ from 'lodash';

export class GoogleCalendarMapper {
    static toGoogleCalendar = (entity: any) => {
        return {
            client_token: _.get(entity, 'client_token'),
            summary: _.get(entity, 'summary'),
            location: _.get(entity, 'location'),
            startDateTime: _.get(entity, 'startDateTime'),
            startTimeZone: _.get(entity, 'startTimeZone'),
            endDateTime: _.get(entity, 'endDateTime'),
            endTimeZone: _.get(entity, 'endTimeZone'),
        };
    }
};
