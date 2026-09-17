import { auth } from "./firebase-config.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");
const msg = document.getElementById("msg");

document.getElementById("signupBtn").addEventListener("click", async () => {
    try {
        await createUserWithEmailAndPassword(auth, emailInput.value, passInput.value);
        msg.innerText = "Account ban gaya! Ab Login karo";
    } catch (e) {
        alert(e.message);
    }
});

document.getElementById("loginBtn").addEventListener("click", async () => {
    try {
        await signInWithEmailAndPassword(auth, emailInput.value, passInput.value);
        window.location = "booking.html";
    } catch (e) {
        alert(e.message);
    }
});