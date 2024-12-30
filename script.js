import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

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
const analytics = getAnalytics(app);
const auth = getAuth(app);

const loginForm = document.getElementById("login-form");
const errorMessage = document.getElementById("error-message");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const token = await user.getIdToken();
        localStorage.setItem("authToken", token);
        alert(`Welcome back, ${user.email}`);
        window.location.href = "dashboard.html";
    } catch (error) {
        console.error("Error during sign-in:", error.code, error.message);
        if (error.code === "auth/user-not-found") {
            errorMessage.textContent = "User not found. Please register first.";
        } else if (error.code === "auth/wrong-password") {
            errorMessage.textContent = "Incorrect password. Please try again.";
        } else if (error.code === "auth/invalid-email") {
            errorMessage.textContent = "Invalid email format.";
        } else {
            errorMessage.textContent = "Login failed. Please check your credentials.";
        }
    }
});
