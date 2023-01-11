// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-analytics.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";

import {
    getDatabase,
    set,
    ref,
    update,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyC9_gWkyQMS_gdVgN8_8WiMKcBfFWxs3UY",

    authDomain: "projet-tikker.firebaseapp.com",

    databaseURL:
        "https://projet-tikker-default-rtdb.europe-west1.firebasedatabase.app",

    projectId: "projet-tikker",

    storageBucket: "projet-tikker.appspot.com",

    messagingSenderId: "1028480647724",

    appId: "1:1028480647724:web:cf7ab4bc919d46a1a80789",

    measurementId: "G-GRJ9P5SSJR",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const auth = getAuth();

const database = getDatabase(app);

const analytics = getAnalytics(app);

const emaildataEnter = document.getElementById("email");

const pwddataEnter = document.getElementById("pwd");

const errorinput = () => document.querySelectorAll("span").forEach((node) => node.style.color = "#fc4103");



emaildataEnter.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        let email = document.getElementById("email").value;
        let password = document.getElementById("pwd").value;

        Connexion(email, password);

    }
});

pwddataEnter.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        let email = document.getElementById("email").value;
        let password = document.getElementById("pwd").value;
        Connexion(email, password);
    }
});

submitdata.addEventListener("click", function () {
    let email = document.getElementById("email").value;
    let password = document.getElementById("pwd").value;

    Connexion(email, password);
});



function Connexion(email, password) {

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
            var lgDate = new Date().toLocaleDateString("fr-FR", {
                timeZone: "Europe/Paris",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            });
            update(ref(database, "users/" + user.uid), {
                last_login: lgDate,
            })
                .then(() => {
                    // Data saved successfully!
                    window.location.href = "../../";
                })
                .catch((error) => {
                    const errorCode = error.code;
                    alert(errorCode);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = "Mot de passe ou Email Incorrect.";
            alert(errorMessage);
            errorinput();

        });
}
