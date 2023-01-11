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

const EnterMail = document.getElementById("email");
const EnterPre = document.getElementById("prenom");
const EnterNom = document.getElementById("nom");
const EnterPass1 = document.getElementById("pwd");
const EnterPass2 = document.getElementById("pwd2");

const errorinput = () =>
  document
    .querySelectorAll("span")
    .forEach((node) => (node.style.color = "#fc4103"));

function errorpassword() {
  EnterPass1.style.color = "red";
  EnterPass2.style.color = "red";
}

EnterMail.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    let email = document.getElementById("email").value;
    let prenom = document.getElementById("prenom").value;
    let nom = document.getElementById("nom").value;
    let password = document.getElementById("pwd").value;
    let password2 = document.getElementById("pwd2").value;

    if (password == password2) {
      Inscription(email, prenom, nom, password);
    } else {
      alert("Le Mot de passe ne correspond pas !");
      errorpassword();
    }
  }
});

EnterPre.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    let email = document.getElementById("email").value;
    let prenom = document.getElementById("prenom").value;
    let nom = document.getElementById("nom").value;
    let password = document.getElementById("pwd").value;
    let password2 = document.getElementById("pwd2").value;

    if (password == password2) {
      Inscription(email, prenom, nom, password);
    } else {
      alert("Le Mot de passe ne correspond pas !");
      errorpassword();
    }
  }
});

EnterNom.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    let email = document.getElementById("email").value;
    let prenom = document.getElementById("prenom").value;
    let nom = document.getElementById("nom").value;
    let password = document.getElementById("pwd").value;
    let password2 = document.getElementById("pwd2").value;

    if (password == password2) {
      Inscription(email, prenom, nom, password);
    } else {
      alert("Le Mot de passe ne correspond pas !");
      errorpassword();
    }
  }
});

EnterPass1.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    let email = document.getElementById("email").value;
    let prenom = document.getElementById("prenom").value;
    let nom = document.getElementById("nom").value;
    let password = document.getElementById("pwd").value;
    let password2 = document.getElementById("pwd2").value;

    if (password == password2) {
      Inscription(email, prenom, nom, password);
    } else {
      alert("Le Mot de passe ne correspond pas !");
      errorpassword();
    }
  }
});

EnterPass2.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    let email = document.getElementById("email").value;
    let prenom = document.getElementById("prenom").value;
    let nom = document.getElementById("nom").value;
    let password = document.getElementById("pwd").value;
    let password2 = document.getElementById("pwd2").value;

    if (password == password2) {
      Inscription(email, prenom, nom, password);
    } else {
      alert("Le Mot de passe ne correspond pas !");
      errorpassword();
    }
  }
});

submitaccount.addEventListener("click", function () {
  let email = document.getElementById("email").value;
  let prenom = document.getElementById("prenom").value;
  let nom = document.getElementById("nom").value;
  let password = document.getElementById("pwd").value;
  let password2 = document.getElementById("pwd2").value;

  if (password == password2) {
    Inscription(email, prenom, nom, password);
  } else {
    alert("Le Mot de passe ne correspond pas !");
    errorpassword();
  }
});

function Inscription(email, prenom, nom, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Inscription
      const user = userCredential.user;
      let CreaDate = new Date().toLocaleDateString("fr-FR");
      // ...
      set(ref(database, "users/" + user.uid), {
        email: email,
        prenom: prenom,
        nom: nom,
        password: password,
        created: CreaDate,
      })
        .then(() => {
          // Data saved successfully!
          alert("Compte créer avec succès !");
          Deconnexion();
          window.location.href = "../Login";
        })
        .catch((error) => {
          // The write failed...
          alert(error);
        });
    })
    .catch((error) => {
      const errorMessage = "Des champs sont incorrectes.";
      alert(errorMessage);
      errorinput();
    });
}

function Deconnexion() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
      alert(error);
    });
}
