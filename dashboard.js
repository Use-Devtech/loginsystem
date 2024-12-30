import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAc5WPI0pRudf5OEbMU7DP4xacLJiR41Ts",
    authDomain: "loginauth-599ab.firebaseapp.com",
    projectId: "loginauth-599ab",
    storageBucket: "loginauth-599ab.firebasestorage.app",
    messagingSenderId: "656000578400",
    appId: "1:656000578400:web:f331c0336c73c21f4d2405",
    measurementId: "G-9987F8YQ4L",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const token = localStorage.getItem("authToken");
if (!token) {
    alert("You must log in first.");
    window.location.href = "index.html";
}
const dashboard = document.getElementById("dashboard");
const logoutButton = document.getElementById("logout-button");

onAuthStateChanged(auth, (user) => {
    if (user) {
        dashboard.textContent = "Hello World! Welcome to the Dashboard.";
        logoutButton.style.display = "block";
    } else {
        window.location.href = "index.html";
    }
});

logoutButton.addEventListener("click", async () => {
    try {
        await signOut(auth);
        localStorage.removeItem("authToken");
        alert("You have been logged out.");
        window.location.href = "index.html";
    } catch (error) {
        console.error("Error logging out:", error.message);
    }
});
