// Firebase SDK imports
import { initializeApp } from
    "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import { getAuth, GoogleAuthProvider } from
    "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import { getFirestore } from
    "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCWFc-1Fej3LIQUyaeyvIsVFfbFABfuAfk",
    authDomain: "college-complaint-manage-a5dfb.firebaseapp.com",
    projectId: "college-complaint-manage-a5dfb",
    storageBucket: "college-complaint-manage-a5dfb.firebasestorage.app",
    messagingSenderId: "442973228416",
    appId: "1:442973228416:web:19887f983147951e844565",
    measurementId: "G-8CFQM32Y81"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication
const auth = getAuth(app);

// Google authentication provider
const googleProvider = new GoogleAuthProvider();

// Firestore database
const db = getFirestore(app);

export {
    app,
    auth,
    googleProvider,
    db
};