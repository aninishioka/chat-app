import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDjnqUpFKf9fKHkdH7xGe9fEWiNo-3pNCw",
    authDomain: "chat-app-b832e.firebaseapp.com",
    projectId: "chat-app-b832e",
    storageBucket: "chat-app-b832e.appspot.com",
    messagingSenderId: "673502583316",
    appId: "1:673502583316:web:0f7806263c08a5af686501",
    measurementId: "G-9CE8HQRCD5"
  };

const app = initializeApp(firebaseConfig);
const db = app.firestore();

export default db;