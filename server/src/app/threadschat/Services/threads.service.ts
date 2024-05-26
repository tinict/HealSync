import 'reflect-metadata';
import {
    ref,
    onValue,
    set,
    get,
    getDatabase
} from "firebase/database";
import { v4 as uuidv4 } from 'uuid';
import { injectable } from "inversify";
import { initFirebase } from '../Saas/firebase-config';

@injectable()
export class ThreadService {
    constructor() { };

    //Get threads
    async getThreads() {
        try {
            const threads = [];
            const database = getDatabase(initFirebase);
            const dbRef = ref(database);
            const snapshot = await get(dbRef);
            const data = snapshot.val();
            const filteredData = Object.values(data).filter(item => item !== null);
            for (let key in filteredData) {
                const item = filteredData[key];
                if (item !== null && item !== undefined && item !== "" && !(typeof item === 'object' && item && Object.keys(item).length === 0)) {
                    threads.push(item);
                }
            }
            return threads;
        } catch (err) {
            throw err;
        }
    };

    //Generate thread ID
    async generateThreadID() {
        const fullUUID = uuidv4();
        const shortenedUUID = fullUUID.split('-')[0];
        return shortenedUUID;
    };

    // Create threads
    async createThread(threadModel: any) {
        try {
            const database = getDatabase(initFirebase);
            const threadRef = ref(database, 'threads/');
            const snapshot = await get(threadRef);
            let threadsArray: any[] = [];
            if (snapshot.exists()) threadsArray = Object.values(snapshot.val());
            const newThread = {
                thread_id: await this.generateThreadID(),
                creator: {
                    user_id: threadModel.creator.user_id,
                    username: threadModel.creator.user_name
                },
                messages: [],
                content: threadModel.content,
                group_type: threadModel.group_type,
                timestamp: new Date().toISOString()
            };
            threadsArray.push(newThread);
            await set(threadRef, threadsArray);
        } catch (err) {
            throw err;
        }
    };

    //Delete threads
    async deleteThread(threadID: any) {
        try {
            const database = getDatabase(initFirebase);
            const threadRef = ref(database, 'threads/');
            const snapshot = await get(threadRef);
            let threadsArray: any[] = [];
            if (snapshot.exists()) threadsArray = Object.values(snapshot.val());
            const newThreadsArray = threadsArray.filter(thread => thread.thread_id !== threadID);
            await set(threadRef, newThreadsArray);
        } catch (err) {
            throw err;
        }
    };
};
