// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC5wBg19mZpwvju9uqnVW6Y2uxPRwKwlHM",
    authDomain: "antaragni-dae73.firebaseapp.com",
    projectId: "antaragni-dae73",
    storageBucket: "antaragni-dae73.appspot.com",
    messagingSenderId: "1048391944300",
    appId: "1:1048391944300:web:4b59af44d87408ce3d3049",
    measurementId: "G-3Z0CTPR9XC"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
