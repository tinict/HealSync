import 'reflect-metadata';
import { 
    getDatabase, 
    ref, 
    onValue, 
    set, 
    push, 
    get 
} from "firebase/database";
import { v4 as uuidv4 } from 'uuid';
import { injectable } from "inversify";
import { initFirebase } from '../Saas/firebase-config';



@injectable()
export class MessageService {
    constructor() { };

    //Generate thread ID
    async generateThreadID() {
        const fullUUID = uuidv4();
        const shortenedUUID = fullUUID.split('-')[0];
        return shortenedUUID;
    };

    //Get messages
    async getMessages(thread_id: any) {
        try {
            const messages: any[] = [];
            const database = getDatabase(initFirebase);
            const dbRef = ref(database, `/threads/${thread_id}/messages`);
            onValue(dbRef, (snapshot) => {
                const data = snapshot.val();
                for (let key in data) {
                    messages.push(data[key]);
                }
            });
            return messages;
        } catch (err) {
            throw err;
        }
    };

    //Create message answer for thread_id
    async createMessage(createMessageModel: any) {
        try {
            const db = getDatabase(initFirebase);
            const messagesRef = ref(db, `threads/${createMessageModel.thread_id}/messages`);
            const snapshot = await get(messagesRef);
            let messagesArray: any[] = [];
            if (snapshot.exists()) messagesArray = Object.values(snapshot.val());
            const newMessage = {
                sender: {
                    user_id: createMessageModel.sender.user_id,
                    username: createMessageModel.sender.username
                },
                content: createMessageModel.content,
                timestamp: new Date().toISOString()
            };
            messagesArray.push(newMessage);
            await set(messagesRef, messagesArray);
        } catch (err) {
            throw err;
        }
    };
};
