import { initFirebase } from '../Saas/firebase-config';
import { getDatabase } from "firebase/database";

const database = getDatabase(initFirebase);

export { database };