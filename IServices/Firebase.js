// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-analytics.js";

import {
  getAuth,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
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

// Initialize Functions

//Controllers

export const ControllerAccueil = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const UserData = ref(database, "users/" + user.uid + "/prenom");
      onValue(UserData, (snapshot) => {
        const data = snapshot.val();
        console.log("Connecté en tant que : " + data);

        profilbutton.addEventListener("click", function () {
          window.location.href = "/public/Pages/Profil";
        });

        Custombutton.addEventListener("click", function () {
          window.location.href = "/public//Pages/Profil/Modification";
        });

        const userImg = (document.getElementById("pp-img").src =
          "/public/assets/users/user-default.svg");
      });
    } else {
      console.log("Aucun Utilisateur connecté!");

      const menu1 = document.getElementById("menu-1");
      menu1.innerHTML = "Se connecter";

      profilbutton.addEventListener("click", function () {
        window.location.href = "/public/Pages/Login";
      });

      const menu2 = document.getElementById("Custombutton");
      menu2.style.display = "none";

      const menu3 = document.getElementById("logoutbutton");
      menu3.style.display = "none";

      const msgiconhead = document.getElementById("msg-head");
      msgiconhead.style.display = "none";

      const addiconhead = document.getElementById("add-head");
      addiconhead.style.display = "none";
    }
  });
};

export const ControllerUserLoged = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const UserData = ref(database, "users/" + user.uid + "/pseudo");
      onValue(UserData, (snapshot) => {
        const data = snapshot.val();
        console.log("Connecté en tant que : " + data);
      });
    } else {
      console.log("Accès Refuser !");
      window.location.href = "/public/Pages/Login";
    }
  });
};

//Logout

export const Deconnexion = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
      alert(error);
    });
};

//Login

export function Connexion(email, password) {
  const errorinput = () =>
    document
      .querySelectorAll("span")
      .forEach((node) => (node.style.color = "#fc4103"));

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

//SignIn

export function Inscription(email, pseudo ,prenom, nom, password) {
  const errorinput = () =>
    document
      .querySelectorAll("span")
      .forEach((node) => (node.style.color = "#fc4103"));

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Inscription
      const user = userCredential.user;
      let CreaDate = new Date().toLocaleDateString("fr-FR");
      // ...
      set(ref(database, "users/" + user.uid), {
        email: email,
        pseudo: pseudo,
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
      errorinput();
      switch (error.code) {
        case "auth/email-already-in-use":
          var errorMessage = "L'adresse email renseigné est déja utilisée.";
          ErrorRobot(errorMessage);
          break;
        case "auth/invalid-email":
          var errorMessage =
            "L'email que vous avez renseigné n'est pas valide.";
          ErrorRobot(errorMessage);
          break;
        case "auth/weak-password":
          var errorMessage = "Le Mot de passe est trop faible. ";
          ErrorRobot(errorMessage);
          break;
        default:
          var errorMessage = "Des champs sont incorrect.";
          ErrorRobot(error.code);
      }
    });
}


// GET ALL VALUES FOR PROFIL PAGE

export function GetValues() {
  onAuthStateChanged(auth, (user) => {
    if (user) {

      const ps = document.getElementById("pseudo");
      const nom = document.getElementById("nom");
      const prenom = document.getElementById("prenom");
      const email = document.getElementById("email");

      
      const PseudoData = ref(database, "users/" + user.uid + "/pseudo");
      onValue(PseudoData, (snapshot) => {
        const data = snapshot.val();
        ps.innerHTML = data;
      });
      const NomData = ref(database, "users/" + user.uid + "/nom");
      onValue(NomData, (snapshot) => {
        const data = snapshot.val();
        nom.innerHTML = data;
      });
      const PrenomData = ref(database, "users/" + user.uid + "/prenom");
      onValue(PrenomData, (snapshot) => {
        const data = snapshot.val();
        prenom.innerHTML = data;
      });
      const EmailData = ref(database, "users/" + user.uid + "/email");
      onValue(EmailData, (snapshot) => {
        const data = snapshot.val();
        email.innerHTML = data;
      });



    } else {
      console.log("Accès Refuser !");
      window.location.href = "/public/Pages/Login";
    }
  });






}










//ROBOT ERROR, TAKE ME FOR ERROR ALERTS <3

function ErrorRobot(feedme) {
  alert(feedme);
}
