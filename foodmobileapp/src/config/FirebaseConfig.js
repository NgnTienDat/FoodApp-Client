// FIRE-BASE
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCsuOOTfTaF3VzAd8m4zBkjieE6CslazVY",
    authDomain: "food-mobile-app-6a23e.firebaseapp.com",
    databaseURL: "https://food-mobile-app-6a23e-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "food-mobile-app-6a23e",
    storageBucket: "food-mobile-app-6a23e.firebasestorage.app",
    messagingSenderId: "44484717440",
    appId: "1:44484717440:web:eafec03c893cd179a6af65",
    measurementId: "G-TE9CLD8VTF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export { database };
//