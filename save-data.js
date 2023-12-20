import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';
import { getDatabase, ref, push, onValue } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js';

// Replace with your actual Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA-FV6x9SQ-_PK11WFTVDFR2rfBQHTZI58",
    authDomain: "accounts-bd9a0.firebaseapp.com",
    databaseURL: "https://accounts-bd9a0-default-rtdb.firebaseio.com",
    projectId: "accounts-bd9a0",
    storageBucket: "accounts-bd9a0.appspot.com",
    messagingSenderId: "970160825199",
    appId: "1:970160825199:web:af60ad85529a58ffdc3e9a"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

// Save data function
export const saveData = () => {
    const user = auth.currentUser;

    if (user) {
        // Get form values
        const customerName = document.getElementById("customer-name").value;
        const customerAge = document.getElementById("customer-age").value;
        const customerCode = document.getElementById("customer-code").value;
        const customerLetter = document.getElementById("customer-letter").value;

        // Create a reference to the "customers" node in the database, under the user's UID
        const userRef = ref(database, `users/${user.uid}/customers`);

        // Push data to the user's node in the database
        push(userRef, {
            name: customerName,
            age: customerAge,
            code: customerCode,
            letter: customerLetter
        });

        console.log("Data saved successfully for user:", user.uid);
        // You can redirect to another page or show a success message here

        // Clear form fields after saving
        document.getElementById("customer-name").value = "";
        document.getElementById("customer-age").value = "";
        document.getElementById("customer-code").value = "";
        document.getElementById("customer-letter").value = "";
    } else {
        console.error("User not authenticated. Unable to save data.");
    }
};

// Display data function
const displayData = (user) => {
    const dataTableBody = document.getElementById("data-table-body");

    if (user) {
        // Create a reference to the user's node in the database
        const userRef = ref(database, `users/${user.uid}/customers`);

        // Listen for changes to the data
        onValue(userRef, (snapshot) => {
            // Clear the existing table rows
            dataTableBody.innerHTML = "";

            // Iterate over the data and append rows to the table
            snapshot.forEach((childSnapshot) => {
                const customerData = childSnapshot.val();
                const row = `<tr>
                                <td>${customerData.name}</td>
                                <td>${customerData.age}</td>
                                <td>${customerData.code}</td>
                                <td>${customerData.letter}</td>
                            </tr>`;
                dataTableBody.innerHTML += row;
            });
        });
    } else {
        console.error("User not authenticated. Unable to display data.");
    }
};

// Handle button click
const saveDataBtn = document.querySelector("#saveDataBtn");

saveDataBtn.addEventListener("click", () => {
    const user = auth.currentUser;

    if (user) {
        // Save data
        const customerName = document.getElementById("customer-name").value;
        const customerAge = document.getElementById("customer-age").value;
        const customerCode = document.getElementById("customer-code").value;
        const customerLetter = document.getElementById("customer-letter").value;

        const userRef = ref(database, `users/${user.uid}/customers`);
        push(userRef, {
            name: customerName,
            age: customerAge,
            code: customerCode,
            letter: customerLetter
        });

        // Clear form fields after saving
        document.getElementById("customer-name").value = "";
        document.getElementById("customer-age").value = "";
        document.getElementById("customer-code").value = "";
        document.getElementById("customer-letter").value = "";

        // After saving, refresh the displayed data
        displayData(user);
    } else {
        console.error("User not authenticated. Unable to save data.");
    }
});

// Listen for changes in the authentication state
onAuthStateChanged(auth, (user) => {
    // Initial data display on page load
    displayData(user);
});