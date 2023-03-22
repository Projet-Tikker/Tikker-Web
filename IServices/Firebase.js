// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-analytics.js";

import {
  getAuth,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";

import {
  getDatabase,
  set,
  ref,
  update,
  onValue,
  push,
  child,
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
  //Détécteur d'utilisateur
  onAuthStateChanged(auth, (user) => {
    //Si il y a un utililisateur logged
    if (user) {
      //Prendre le prenom et pp de la base users
      const UserData = ref(database, "users/" + user.uid + "/prenom");
      const PPData = ref(database, "users/" + user.uid + "/pp");
      //Le stocker et le print dans la console
      onValue(UserData, (snapshot) => {
        const data = snapshot.val();
        console.log("Accès Garantie à " + data);

        //Menu déroulant chemin Profil
        profilbutton.addEventListener("click", function () {
          window.location.href = "/Pages/Profil";
        });

        //Menu déroulant chemin Modif profil
        Custombutton.addEventListener("click", function () {
          window.location.href = "/Pages/Profil/Modification";
        });
      });

      onValue(PPData, (snapshot) => {
        const pp = snapshot.val();

        //Appliquer la pp de l'utilisateur
        if (pp == null) {
          const userImg = (document.getElementById("pp-img").src =
            "/assets/users/user-default.svg");
        } else {
          const userImg = (document.getElementById("pp-img").src = pp);
        }
      });
    } else {
      //Print dans la console
      console.log("Aucun Utilisateur connecté!");

      //Changement du menu déroulant
      const menu1 = document.getElementById("menu-1");
      menu1.innerHTML = "Se connecter";

      profilbutton.addEventListener("click", function () {
        window.location.href = "/Pages/Login";
      });

      //Désactivation du menu déroualnt non connecté
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
      window.location.href = "/Pages/Login";
    }
  });
};

//PROFESSIONEL DETECTOR

export const ProDetector = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const UserData = ref(database, "users/" + user.uid + "/professionel");
      onValue(UserData, (snapshot) => {
        const data = snapshot.val();
        if (data == true) {
          console.log("Compte Professionel");
        } else {
          ErrorRobot("Cette page est réserver uniqument pour les comptes professionels.")
          window.location.href = "/Pages/Profil/Ajout/Demande";
        }
      });
    } else {
      console.log("Accès Refuser !");
      window.location.href = "/Pages/Login";
    }
  });
};

//Logout

export const Deconnexion = () => {
  signOut(auth)
    .then(() => {
      window.location.href = "/";
    })
    .catch((error) => {
      // An error happened.
      ErrorRobot(error);
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
          ErrorRobot(errorCode);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = "Mot de passe ou Email Incorrect.";
      ErrorRobot(errorMessage);
      errorinput();
    });
}

//SignIn

export function Inscription(email, pseudo, prenom, nom, password) {
  const errorinput = () =>
    document
      .querySelectorAll("span")
      .forEach((node) => (node.style.color = "#fc4103"));

  if (
    pseudo.length > 3 &&
    nom.length > 3 &&
    /\d/.test(nom) == false &&
    prenom.length > 2 &&
    /\d/.test(prenom) == false
  ) {
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
            ErrorRobot("Compte créer avec succès !");
            Deconnexion();
            window.location.href = "../Login";
          })
          .catch((error) => {
            // The write failed...
            ErrorRobot(error);
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
  } else {
    if (pseudo.length < 3) {
      let problem = "'Nom Utilisateur'";
      ErrorRobot(
        "Les changements sont invalides sur le " +
        problem +
        " ! Veuillez réesayez."
      );
    } else {
      if (nom.length < 3 || /\d/.test(nom) == true) {
        let problem = "'Nom'";
        ErrorRobot(
          "Les changements sont invalides sur le " +
          problem +
          " ! Veuillez réesayez."
        );
      } else {
        if (prenom.length < 3 || /\d/.test(prenom) == true) {
          let problem = "'Prenom'";
          ErrorRobot(
            "Les changements sont invalides sur le " +
            problem +
            " ! Veuillez réesayez."
          );
        }
      }
    }
  }
}

// GET ALL VALUES FOR PROFIL PAGE

export function GetValues() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const ps = document.getElementById("pseudo");
      const nom = document.getElementById("nom");
      const prenom = document.getElementById("prenom");
      const email = document.getElementById("email");
      const bio = document.getElementById("bio");
      const pp = document.getElementById("imgmain");

      const pro = document.getElementById("pro");

      const protag = document.getElementById("protag");

      const PseudoData = ref(database, "users/" + user.uid + "/pseudo");
      onValue(PseudoData, (snapshot) => {
        const data = snapshot.val();
        ps.innerHTML = data;
        ps.setAttribute("value", data);
      });
      const NomData = ref(database, "users/" + user.uid + "/nom");
      onValue(NomData, (snapshot) => {
        const data = snapshot.val();
        nom.innerHTML = data;
        nom.setAttribute("value", data);
      });
      const PrenomData = ref(database, "users/" + user.uid + "/prenom");
      onValue(PrenomData, (snapshot) => {
        const data = snapshot.val();
        prenom.innerHTML = data;
        prenom.setAttribute("value", data);
      });
      const EmailData = ref(database, "users/" + user.uid + "/email");
      onValue(EmailData, (snapshot) => {
        const data = snapshot.val();
        email.innerHTML = data;
        email.setAttribute("value", data);
      });
      const BioData = ref(database, "users/" + user.uid + "/bio");
      onValue(BioData, (snapshot) => {
        const data = snapshot.val();
        bio.innerHTML = data;
        bio.setAttribute("value", data);
      });
      const PPData = ref(database, "users/" + user.uid + "/pp");
      onValue(PPData, (snapshot) => {
        const data = snapshot.val();
        if (data == null) {
        } else {
          pp.setAttribute("src", data);
        }
      });
      const ProData = ref(database, "users/" + user.uid + "/professionel");
      onValue(ProData, (snapshot) => {
        const data = snapshot.val();
        if (data == false || data == null) {
        } else {
          if (protag != null) {
            protag.style.display = "block";
          }
          if (pro != null) {
            pro.checked = data;
          }
        }
      });
    } else {
      console.log("Accès Refuser !");
      window.location.href = "/public/Pages/Login";
    }
  });
}

// UPDATE DATA USER

export function UpdateDataUsr(pseudo, nom, prenom, bio, pp, pro) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;

      var LUDate = new Date().toLocaleDateString("fr-FR", {
        timeZone: "Europe/Paris",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      if (
        pseudo.length > 3 &&
        nom.length > 3 &&
        /\d/.test(nom) == false &&
        prenom.length > 2 &&
        /\d/.test(prenom) == false
      ) {
        update(ref(database, "users/" + uid), {
          pseudo: pseudo,
          nom: nom,
          prenom: prenom,
          bio: bio,
          Last_Update: LUDate,
          pp: pp,
          professionel: pro,
        })
          .then(() => {
            // Data saved successfully!
            ErrorRobot("Changements Appliquées !");
            window.location.reload();
          })
          .catch((error) => {
            const errorCode = error.code;
            ErrorRobot(errorCode);
          });
      } else {
        if (pseudo.length < 3) {
          let problem = "'Nom Utilisateur'";
          ErrorRobot(
            "Les changements sont invalides sur le " +
            problem +
            " ! Veuillez réesayez."
          );
        } else {
          if (nom.length < 3 || /\d/.test(nom) == true) {
            let problem = "'Nom'";
            ErrorRobot(
              "Les changements sont invalides sur le " +
              problem +
              " ! Veuillez réesayez."
            );
          } else {
            if (prenom.length < 3 || /\d/.test(prenom) == true) {
              let problem = "'Prenom'";
              ErrorRobot(
                "Les changements sont invalides sur le " +
                problem +
                " ! Veuillez réesayez."
              );
            }
          }
        }
      }
    } else {
      /////
    }
  });
}

// CREATE DEMANDE

export function CreateDemande(intitule, tagdomaine, tagspecial, taglangue, desc) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;

      var DateCreation = new Date().toLocaleDateString("fr-FR", {
        timeZone: "Europe/Paris",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      const newPostDemande = push(child(ref(database), 'Posts/Demande/' + uid)).key;

      if (
        intitule.length > 3
      ) {
        set(ref(database, 'Posts/Demande/' + uid + "/" + newPostDemande), {
          id_demande: newPostDemande,
          intitule: intitule,
          tagdomaine: tagdomaine,
          tagspecial: tagspecial,
          taglangue: taglangue,
          desc: desc,
          datecrea: DateCreation,
        }).then(() => {
          // Data saved successfully!
          ErrorRobot("Poste créer avec succès !");
          window.location.href = window.location.href;
        }).catch((error) => {
          alert("Erreur :" + error);
        });
      } else {
        ErrorRobot("Veuillez précisez l'intitulé.");
      }
    }
  }
  )
}

// RESET PASSWORD

export function ResetPassword(email) {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      ErrorRobot("Lien envoyé !");
      console.log("Lien envoyé avec succès à :" + email);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      ErrorRobot(errorMessage);
    });
}

//ROBOT ERROR, TAKE ME FOR ERROR ALERTS <3

export function ErrorRobot(feedme) {
  alert(feedme);
}
