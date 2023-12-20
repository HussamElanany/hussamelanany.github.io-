// Import the Firebase modules using ECMAScript modules syntax
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';

// Replace with your actual Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA-FV6x9SQ-_PK11WFTVDFR2rfBQHTZI58",
    authDomain: "accounts-bd9a0.firebaseapp.com",
    projectId: "accounts-bd9a0",
    storageBucket: "accounts-bd9a0.appspot.com",
    messagingSenderId: "970160825199",
    appId: "1:970160825199:web:af60ad85529a58ffdc3e9a"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

// Login function
export const login = () => {
    // Get form values
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const user = userCredential.user;
            console.log("User logged in:", user.email);
            // You can redirect to another page or show a success message here
            window.location.href = 'save-data.html';
        })
        .catch(error => {
            console.error("Login error:", error.message);
            // Handle login errors (e.g., display an error message)
        });
};

// Handle button click
const loginBtn = document.querySelector("#loginBtn");

loginBtn.addEventListener("click", login);
