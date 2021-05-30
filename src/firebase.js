import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD8KgBdAns71Zhqj6ewXpNHww0r7DNxqH4",
    authDomain: "react-todo-app-1.firebaseapp.com",
    projectId: "react-todo-app-1",
    storageBucket: "react-todo-app-1.appspot.com",
    messagingSenderId: "62657077321",
    appId: "1:62657077321:web:f07550de60d562e30f5f98",
    measurementId: "G-RDVP2RGPWF"
});

const db = firebaseApp.firestore();
export default db;

