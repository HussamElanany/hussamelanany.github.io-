// Import the Firebase modules using ECMAScript modules syntax
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';

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

// Sign-up function
export const signUp = () => {
    // Get form values
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const user = userCredential.user;
            console.log("User signed up:", user.email, "with username:", username);
            // You can redirect to another page or show a success message here
            window.location.href = 'login.html';
        })
        .catch(error => {
            console.error("Sign up error:", error.message);
            // Handle sign-up errors (e.g., display an error message)
        });
};

// Handle button click
const signUpBtn = document.querySelector("#signUpBtn");

signUpBtn.addEventListener("click", signUp);
