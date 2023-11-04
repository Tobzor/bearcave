// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCZ5I1R6nx76ozx2h55WGXa2Z58WpRBOA8",
    authDomain: "tobzor-32daa.firebaseapp.com",
    databaseURL: "https://tobzor-32daa.firebaseio.com",
    projectId: "tobzor-32daa",
    storageBucket: "tobzor-32daa.appspot.com",
    messagingSenderId: "314184273356",
    appId: "1:314184273356:web:52e7ceee54672ba4",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export { firebaseApp };
