import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCbyhptRZOK903bpkqdlQCpVnVlDWnjI9o",
    authDomain: "chat-realtime-20047.firebaseapp.com",
    databaseURL: "https://chat-realtime-20047-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "chat-realtime-20047",
    storageBucket: "chat-realtime-20047.appspot.com",
    messagingSenderId: "1046153957148",
    appId: "1:1046153957148:web:ec76e82e9306e0ecb3b4d9",
    measurementId: "G-W102SKRVE9"
};

const initFirebase = initializeApp(firebaseConfig);

export { initFirebase };