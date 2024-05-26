import 'reflect-metadata';
import {
    inject,
    injectable
} from "inversify";
import {
    Request,
    Response
} from "express";
import {
    AuthenticationService,
    GoogleAccountService
} from '../../Services';
import { TYPES } from '../../Database/types';
import { google } from 'googleapis';
import { GoogleCalendarMapper } from '../../Mappers';

@injectable()
export class GoogleCalendarController {
    private googleAccountService: GoogleAccountService;
    private authService: AuthenticationService;

    constructor(
        @inject(TYPES.GoogleAccountService)
        googleAccountService: GoogleAccountService,
        @inject(TYPES.AuthenticationService)
        authService: AuthenticationService,
    ) {
        this.googleAccountService = googleAccountService;
        this.authService = authService;
    };

    async createEvent(req: Request, res: Response) {
        try {
            const eventModel = GoogleCalendarMapper.toGoogleCalendar(req.body);
            console.log(eventModel);
            const client_token = req.body.client_token;
            console.log(client_token);
            const verifyToken = await this.authService.verifyToken(client_token);
            const sub = typeof verifyToken?.sub === 'string' ? JSON.parse(verifyToken?.sub) : verifyToken?.sub;
            let access_token = sub?.access_token;
            const token_db = await this.googleAccountService.getAccessToken(sub?.user_id);
            if (!token_db) return res.status(500);

            const isMatch = await this.authService.dencrypt(access_token, token_db);
            if (isMatch) {

                const oauth2Client = new google.auth.OAuth2();
                oauth2Client.setCredentials({ access_token });

                const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

                const event = {
                    summary: eventModel.summary,
                    location: 'Huế, Việt Nam',
                    start: {
                        dateTime: eventModel.startDateTime,
                        timeZone: 'Asia/Ho_Chi_Minh',
                    },
                    end: {
                        dateTime: eventModel.endDateTime,
                        timeZone: 'Asia/Ho_Chi_Minh',
                    },
                    conferenceData: {
                        createRequest: {
                            requestId: 'sample11',
                            conferenceSolutionKey: {
                                type: 'hangoutsMeet',
                            },
                        },
                    },
                };

                calendar.events.insert(
                    {
                        calendarId: 'primary',
                        requestBody: {
                            ...event
                        },
                        conferenceDataVersion: 1,
                    },
                    (err: any, event: any) => {
                        if (err) {
                            console.log('There was an error contacting the Calendar service: ' + err);
                            return;
                        }
                        console.log('Event created: %s', event.htmlLink);
                        res.status(200).json({ message: "Create Event Success!", meetLink: event.data.hangoutLink });
                    }
                );
            }
        } catch (error: any) {
            res.status(500).send('An error occurred');
        }
    };
};
