// Import Firebase functions
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Initialize Firebase
const auth = getAuth();
const database = getDatabase();

// Function to log in the user
window.login = async function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, username, password);
        // Redirect based on role
        if (role === 'doctor') {
            window.location.href = 'doctorDashboard.html';
        } else if (role === 'receptionist') {
            window.location.href = 'receptionistDashboard.html';
        }
    } catch (error) {
        console.error("Error logging in: ", error);
    }
}

// Function to register a new user
window.register = async function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, username, password);
        // Store user role in the database
        const userId = userCredential.user.uid;
        await set(ref(database, 'users/' + userId), {
            role: role
        });
        alert("Registration successful! You can now log in.");
    } catch (error) {
        console.error("Error registering: ", error);
    }
}

// Function to generate a token
window.generateToken = function() {
    const token = Math.floor(Math.random() * 10000); // Simple token generation
    document.getElementById('tokenDisplay').innerText = `Your token is: ${token}`;
    console.log(`Generated token: ${token}`);
}