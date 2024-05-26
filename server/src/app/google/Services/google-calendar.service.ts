import 'reflect-metadata';
import { inject, injectable } from "inversify";
import {
    GoogleAccountEntity,
    GoogleAccountEntity as GoogleAccountModel,
    GoogleAccountEntity as GoogleAccountRepository
} from '../Entities';
import { AuthenticationService } from "./authentication.service";
import { TYPES } from "../Database/types";
import { google } from 'googleapis';

@injectable()
export class GoogleCalendarService {
    private auth: AuthenticationService;

    constructor(
        @inject(TYPES.AuthenticationService) auth: AuthenticationService
    ) {
        this.auth = auth;
    }

    // createEvent(req, res) {
    //     const oauth2Client = new google.auth.OAuth2();
    //     oauth2Client.setCredentials({ access_token: req.accessToken });
    
    //     const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    
    //     const event = {
    //         summary: 'New Event',
    //         location: '800 Howard St., San Francisco, CA 94103',
    //         start: {
    //             dateTime: '2022-01-01T09:00:00-07:00',
    //             timeZone: 'America/Los_Angeles',
    //         },
    //         end: {
    //             dateTime: '2022-01-01T17:00:00-07:00',
    //             timeZone: 'America/Los_Angeles',
    //         },
    //     };
    
    //     calendar.events.insert({
    //         calendarId: 'primary',
    //         resource: event,
    //     }, (err, event) => {
    //         if (err) {
    //             console.log('There was an error contacting the Calendar service: ' + err);
    //             return;
    //         }
    //         console.log('Event created: %s', event.htmlLink);
    //     });
    // }
};
