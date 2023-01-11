// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-analytics.js";

import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";

import {
  getDatabase,
  set,
  ref,
  update,
  onValue,
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

onAuthStateChanged(auth, (user) => {
  if (user) {

    const UserData = ref(database, 'users/' + user.uid + '/prenom');
      onValue(UserData, (snapshot) => {
          const data = snapshot.val();
          console.log( "Connecté en tant que : " + data);          
      })
    account.addEventListener("click", function () {
      window.location.href = "./Pages/Profil";
    });
  } else {
    console.log("Aucun Utilisateur connecté!");
    account.addEventListener("click", function () {
        window.location.href = "./Pages/Login";
      });
  }
});