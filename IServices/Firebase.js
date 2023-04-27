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
  get,
  remove,
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
          ErrorRobot(
            "Cette page est réserver uniqument pour les comptes professionels."
          );
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
      const pp = document.querySelectorAll("#imgmain");
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
          pp.forEach((img) => {
            img.src = "/assets/users/user-default.svg";
          });
        } else {
          pp.forEach((img) => {
            img.src = data;
          });
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

// GET ALL POSTS DEMANDE

export function GetPostsDemandes() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userID = user.uid;

      let pseudo = "";
      let pp = "";

      const PseudoData = ref(database, "users/" + userID + "/pseudo");
      onValue(PseudoData, (snapshot) => {
        const data = snapshot.val();
        pseudo = data;
      });
      const PPData = ref(database, "users/" + user.uid + "/pp");
      onValue(PPData, (snapshot) => {
        const data = snapshot.val();
        if (data == null) {
          data = "/assets/users/user-default.svg";
        } else {
          pp = data;
        }
      });

      //INFO GET

      function AddFicheForfaitToTable1(
        id_demande,
        intitule,
        tag1,
        tag2,
        tag3,
        desc,
        user,
        pp
      ) {
        let pub_body = document.getElementById("pub-bodyy");

        let pub_content = document.createElement("div");
        pub_content.className = "pub-content";
        let pub_content_header = document.createElement("div");
        pub_content_header.className = "pub-content-header";
        let title = document.createElement("h1");
        title.className = "intitule";
        title.setAttribute("id", "intitul");
        let type = document.createElement("h2");
        type.className = "type";
        type.innerHTML = "Demande";
        let div_tags = document.createElement("div");
        div_tags.className = "div-tags";
        let h2tag1 = document.createElement("h2");
        h2tag1.className = "pub-tags _1";
        h2tag1.setAttribute("id", "pub-tag1");
        let h2tag2 = document.createElement("h2");
        h2tag2.className = "pub-tags _2";
        h2tag2.setAttribute("id", "pub-tag2");
        let h2tag3 = document.createElement("h2");
        h2tag3.className = "pub-tags _3";
        h2tag3.setAttribute("id", "pub-tag3");

        let pub_content_desc = document.createElement("div");
        pub_content_desc.className = "pub-content-desc";
        let div_img = document.createElement("div");
        div_img.className = "div-img";
        let img = document.createElement("img");
        img.src = "../../assets/icons/no-photo.svg";
        img.setAttribute("alt", "img not found");
        img.className = "img-notfound";
        img.title = "Not Found Images";
        let pub_desc = document.createElement("div");
        pub_desc.className = "pub-desc";
        let p_desc = document.createElement("p");
        p_desc.setAttribute("id", "desc");

        let pub_content_footer = document.createElement("div");
        pub_content_footer.className = "pub-content-footer";
        let div_publier = document.createElement("div");
        div_publier.className = "div-publier";
        let h2autor = document.createElement("h2");
        h2autor.className = "publierpar";
        h2autor.innerHTML = "Publier par ";
        let autorspan = document.createElement("span");
        autorspan.setAttribute("id", "utilis");
        let imgautor = document.createElement("img");
        imgautor.src = "../../assets/icons/loading.gif";
        imgautor.className = "loading-pp-publication";
        imgautor.setAttribute("id", "img_util");
        imgautor.setAttribute("alt", "photo de profil");
        let div_edits = document.createElement("div");
        div_edits.className = "div-edits";

        let pencilbutton = document.createElement("button");
        pencilbutton.className = "button-post";

        pencilbutton.onclick = function (e) {
          window.location =
            "/Pages/Profil/Ajout/Demande/?id=" + id_demande + "&type=demande";
        };

        let imgpencil = document.createElement("img");
        imgpencil.src = "../../assets/icons/pencil.svg";
        imgpencil.alt = "pencil_edit";
        imgpencil.className = "pencil";
        imgpencil.setAttribute("id", "edit");

        let binbutton = document.createElement("button");
        binbutton.className = "button-post";

        binbutton.onclick = function (e) {
          if (confirm("Voulez-vous vraiment suprrimer cette demande ?")) {
            remove(
              ref(database, "Posts/Demande/" + userID + "/" + id_demande)
            ).then(() => {
              alert("Demande supprimer avec succès !");
              location.reload();
            });
          } else {
            console.log("Action annulé !");
          }
        };

        let imgbin = document.createElement("img");
        imgbin.src = "../../assets/icons/bin.svg";
        imgbin.className = "bin";
        imgbin.alt = "bin_delete";

        title.innerHTML = intitule;
        h2tag1.innerHTML = tag1;
        h2tag2.innerHTML = tag2;
        h2tag3.innerHTML = tag3;

        p_desc.innerHTML = desc;

        autorspan.innerHTML = user;
        imgautor.src = pp;

        pub_body.appendChild(pub_content);
        pub_content.appendChild(pub_content_header);
        pub_content.appendChild(pub_content_desc);
        pub_content.appendChild(pub_content_footer);

        pub_content_header.appendChild(title);
        pub_content_header.appendChild(type);
        pub_content_header.appendChild(div_tags);

        div_tags.appendChild(h2tag1);
        div_tags.appendChild(h2tag2);
        div_tags.appendChild(h2tag3);

        pub_content_desc.appendChild(div_img);
        div_img.appendChild(img);
        pub_content_desc.appendChild(pub_desc);
        pub_desc.appendChild(p_desc);

        pub_content_footer.appendChild(div_publier);
        div_publier.appendChild(h2autor);
        h2autor.appendChild(autorspan);
        div_publier.appendChild(imgautor);
        pub_content_footer.appendChild(div_edits);

        div_edits.appendChild(pencilbutton);
        pencilbutton.appendChild(imgpencil);

        div_edits.appendChild(binbutton);
        binbutton.appendChild(imgbin);
      }

      function AddAllFichesForfaitToTable1(FichesForfait1) {
        FichesForfait1.forEach((element) => {
          AddFicheForfaitToTable1(
            element.id_demande,
            element.intitule,
            element.tagdomaine,
            element.taglangue,
            element.tagspecial,
            element.desc,
            pseudo,
            pp
          );
        });
      }

      function GetAllFichesForfaitRT1() {
        const dbref = ref(database, "Posts/Demande/" + userID);

        onValue(dbref, (snapshot) => {
          var fichesforfait1 = [];

          snapshot.forEach((DataSnapshot) => {
            fichesforfait1.push(DataSnapshot.val());
          });

          AddAllFichesForfaitToTable1(fichesforfait1);
        });
      }

      window.onload = GetAllFichesForfaitRT1();
    } else {
    }
  });
}

// GET ALL POSTS OFFRES

export function GetPostsOffres() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userID = user.uid;

      let pseudo = "";
      let pp = "";

      const PseudoData = ref(database, "users/" + userID + "/pseudo");
      onValue(PseudoData, (snapshot) => {
        const data = snapshot.val();
        pseudo = data;
      });
      const PPData = ref(database, "users/" + user.uid + "/pp");
      onValue(PPData, (snapshot) => {
        const data = snapshot.val();
        if (data == null) {
          data = "/assets/users/user-default.svg";
        } else {
          pp = data;
        }
      });

      //INFO GET

      function AddFicheForfaitToTable1(
        id_offre,
        intitule,
        tag1,
        tag2,
        tag3,
        desc,
        user,
        pp
      ) {
        let pub_body = document.getElementById("pub-bodyy");

        let pub_content = document.createElement("div");
        pub_content.className = "pub-content";
        let pub_content_header = document.createElement("div");
        pub_content_header.className = "pub-content-header";
        let title = document.createElement("h1");
        title.className = "intitule";
        title.setAttribute("id", "intitul");
        let type = document.createElement("h2");
        type.className = "type";
        type.innerHTML = "Offre";
        let div_tags = document.createElement("div");
        div_tags.className = "div-tags";
        let h2tag1 = document.createElement("h2");
        h2tag1.className = "pub-tags _1";
        h2tag1.setAttribute("id", "pub-tag1");
        let h2tag2 = document.createElement("h2");
        h2tag2.className = "pub-tags _2";
        h2tag2.setAttribute("id", "pub-tag2");
        let h2tag3 = document.createElement("h2");
        h2tag3.className = "pub-tags _3";
        h2tag3.setAttribute("id", "pub-tag3");

        let pub_content_desc = document.createElement("div");
        pub_content_desc.className = "pub-content-desc";
        let div_img = document.createElement("div");
        div_img.className = "div-img";
        let img = document.createElement("img");
        img.src = "../../assets/icons/no-photo.svg";
        img.setAttribute("alt", "img not found");
        img.className = "img-notfound";
        img.title = "Not Found Images";
        let pub_desc = document.createElement("div");
        pub_desc.className = "pub-desc";
        let p_desc = document.createElement("p");
        p_desc.setAttribute("id", "desc");

        let pub_content_footer = document.createElement("div");
        pub_content_footer.className = "pub-content-footer";
        let div_publier = document.createElement("div");
        div_publier.className = "div-publier";
        let h2autor = document.createElement("h2");
        h2autor.className = "publierpar";
        h2autor.innerHTML = "Publier par ";
        let autorspan = document.createElement("span");
        autorspan.setAttribute("id", "utilis");
        let imgautor = document.createElement("img");
        imgautor.src = "../../assets/icons/loading.gif";
        imgautor.className = "loading-pp-publication";
        imgautor.setAttribute("id", "img_util");
        imgautor.setAttribute("alt", "photo de profil");
        let div_edits = document.createElement("div");
        div_edits.className = "div-edits";

        let pencilbutton = document.createElement("button");
        pencilbutton.className = "button-post";

        pencilbutton.onclick = function (e) {
          window.location =
            "/Pages/Profil/Ajout/Offre/?id=" + id_offre + "&type=offre";
        };

        let imgpencil = document.createElement("img");
        imgpencil.src = "../../assets/icons/pencil.svg";
        imgpencil.alt = "pencil_edit";
        imgpencil.className = "pencil";
        imgpencil.setAttribute("id", "edit");

        let binbutton = document.createElement("button");
        binbutton.className = "button-post";

        binbutton.onclick = function (e) {
          if (confirm("Voulez-vous vraiment suprrimer cette offre ?")) {
            remove(
              ref(database, "Posts/Offre/" + userID + "/" + id_offre)
            ).then(() => {
              alert("Demande supprimer avec succès !");
              location.reload();
            });
          } else {
            console.log("Action annulé !");
          }
        };

        let imgbin = document.createElement("img");
        imgbin.src = "../../assets/icons/bin.svg";
        imgbin.className = "bin";
        imgbin.alt = "bin_delete";

        title.innerHTML = intitule;
        h2tag1.innerHTML = tag1;
        h2tag2.innerHTML = tag2;
        h2tag3.innerHTML = tag3;

        p_desc.innerHTML = desc;

        autorspan.innerHTML = user;
        imgautor.src = pp;

        pub_body.appendChild(pub_content);
        pub_content.appendChild(pub_content_header);
        pub_content.appendChild(pub_content_desc);
        pub_content.appendChild(pub_content_footer);

        pub_content_header.appendChild(title);
        pub_content_header.appendChild(type);
        pub_content_header.appendChild(div_tags);

        div_tags.appendChild(h2tag1);
        div_tags.appendChild(h2tag2);
        div_tags.appendChild(h2tag3);

        pub_content_desc.appendChild(div_img);
        div_img.appendChild(img);
        pub_content_desc.appendChild(pub_desc);
        pub_desc.appendChild(p_desc);

        pub_content_footer.appendChild(div_publier);
        div_publier.appendChild(h2autor);
        h2autor.appendChild(autorspan);
        div_publier.appendChild(imgautor);
        pub_content_footer.appendChild(div_edits);

        div_edits.appendChild(pencilbutton);
        pencilbutton.appendChild(imgpencil);

        div_edits.appendChild(binbutton);
        binbutton.appendChild(imgbin);
      }

      function AddAllFichesForfaitToTable1(FichesForfait1) {
        FichesForfait1.forEach((element) => {
          AddFicheForfaitToTable1(
            element.id_offre,
            element.intitule,
            element.tagdomaine,
            element.taglangue,
            element.tagspecial,
            element.desc,
            pseudo,
            pp
          );
        });
      }

      function GetAllFichesForfaitRT1() {
        const dbref = ref(database, "Posts/Offre/" + userID);

        onValue(dbref, (snapshot) => {
          var fichesforfait1 = [];

          snapshot.forEach((DataSnapshot) => {
            fichesforfait1.push(DataSnapshot.val());
          });

          AddAllFichesForfaitToTable1(fichesforfait1);
        });
      }

      window.onload = GetAllFichesForfaitRT1();
    } else {
    }
  });
}

// GETMODIFDATA

//DEMANDE

export function getModifDemandeData(id_dmnd) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      let intit = document.getElementById("intitule");
      let tag_1 = document.getElementById("liste-domaines");
      let tag_2_container = document.getElementById("liste-spe");
      let tag2 = document.createElement("option");

      let tag_3_container = document.getElementById("liste-lang");
      let tag3 = document.createElement("option");

      let description = document.getElementById("bio");

      const DemandeData = ref(
        database,
        "Posts/Demande/" + user.uid + "/" + id_dmnd
      );
      onValue(DemandeData, (snapshot) => {
        const data = snapshot.val();

        intit.value = data.intitule;
        tag_1.value = data.tagdomaine;

        tag2.value = data.tagspecial;
        tag2.innerHTML = data.tagspecial;
        tag2.selected = true;

        tag3.value = data.taglangue;
        tag3.innerHTML = data.taglangue;
        tag3.selected = true;

        description.value = data.desc;

        tag_2_container.appendChild(tag2);
        tag_3_container.appendChild(tag3);
      });
    } else {
      console.log("Accès Refuser !");
      window.location.href = "/Pages/Login";
    }
  });
}

//OFFRE

export function getModifOffreData(id_ofr) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      let intit = document.getElementById("intitule");
      let tag_1 = document.getElementById("liste-domaines");
      let tag_2_container = document.getElementById("liste-spe");
      let tag2 = document.createElement("option");

      let tag_3_container = document.getElementById("liste-lang");
      let tag3 = document.createElement("option");

      let description = document.getElementById("bio");

      const OffreData = ref(database, "Posts/Offre/" + user.uid + "/" + id_ofr);
      onValue(OffreData, (snapshot) => {
        const data = snapshot.val();

        intit.value = data.intitule;
        tag_1.value = data.tagdomaine;

        tag2.value = data.tagspecial;
        tag2.innerHTML = data.tagspecial;
        tag2.selected = true;

        tag3.value = data.taglangue;
        tag3.innerHTML = data.taglangue;
        tag3.selected = true;

        description.value = data.desc;

        tag_2_container.appendChild(tag2);
        tag_3_container.appendChild(tag3);
      });
    } else {
      console.log("Accès Refuser !");
      window.location.href = "/Pages/Login";
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

export function CreateDemande(
  intitule,
  tagdomaine,
  tagspecial,
  taglangue,
  desc
) {
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

      const newPostDemande = push(
        child(ref(database), "Posts/Demande/" + uid)
      ).key;

      if (intitule.length > 3) {
        set(ref(database, "Posts/Demande/" + uid + "/" + newPostDemande), {
          id_demande: newPostDemande,
          intitule: intitule,
          tagdomaine: tagdomaine,
          tagspecial: tagspecial,
          taglangue: taglangue,
          desc: desc,
          datecrea: DateCreation,
        })
          .then(() => {
            // Data saved successfully!
            ErrorRobot("Poste créer avec succès !");
            window.location.href = window.location.href;
          })
          .catch((error) => {
            alert("Erreur :" + error);
          });
      } else {
        ErrorRobot("Veuillez précisez l'intitulé.");
      }
    }
  });
}

// MODIF DEMANDE

export function ModifDemande(
  id_demande,
  intitule,
  tagdomaine,
  tagspecial,
  taglangue,
  desc
) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;

      var DateModification = new Date().toLocaleDateString("fr-FR", {
        timeZone: "Europe/Paris",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      if (intitule.length > 3) {
        update(ref(database, "Posts/Demande/" + user.uid + "/" + id_demande), {
          last_modif: DateModification,
          intitule: intitule,
          tagdomaine: tagdomaine,
          tagspecial: tagspecial,
          taglangue: taglangue,
          desc: desc,
        })
          .then(() => {
            // Data saved successfully!
            alert("Données Modifiés avec succès");
            location.reload();
          })
          .catch((error) => {
            const errorCode = error.code;
            ErrorRobot(errorCode);
          });
      }
    }
  });
}

// MODIF OFFRE

export function ModifOffre(
  id_offre,
  intitule,
  tagdomaine,
  tagspecial,
  taglangue,
  desc
) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;

      var DateModification = new Date().toLocaleDateString("fr-FR", {
        timeZone: "Europe/Paris",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      if (intitule.length > 3) {
        update(ref(database, "Posts/Offre/" + user.uid + "/" + id_offre), {
          last_modif: DateModification,
          intitule: intitule,
          tagdomaine: tagdomaine,
          tagspecial: tagspecial,
          taglangue: taglangue,
          desc: desc,
        })
          .then(() => {
            // Data saved successfully!
            alert("Données Modifiés avec succès !");
            location.reload();
          })
          .catch((error) => {
            const errorCode = error.code;
            ErrorRobot(errorCode);
          });
      }
    }
  });
}

// CREATE OFFRE

export function CreateOffre(intitule, tagdomaine, tagspecial, taglangue, desc) {
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

      const newPostOffre = push(child(ref(database), "Posts/Offre/" + uid)).key;

      if (intitule.length > 3) {
        set(ref(database, "Posts/Offre/" + uid + "/" + newPostOffre), {
          id_offre: newPostOffre,
          intitule: intitule,
          tagdomaine: tagdomaine,
          tagspecial: tagspecial,
          taglangue: taglangue,
          desc: desc,
          datecrea: DateCreation,
        })
          .then(() => {
            // Data saved successfully!
            ErrorRobot("Poste créer avec succès !");
            window.location.href = window.location.href;
          })
          .catch((error) => {
            alert("Erreur :" + error);
          });
      } else {
        ErrorRobot("Veuillez précisez l'intitulé.");
      }
    }
  });
}

// SEARCH METHOD

export function Search(research) {

  function AddFicheForfaitToTable1(
    intitule,
    tag1,
    tag2,
    tag3,
    desc,
    type,
    user,
    pp
  ) {

    let pub_body = document.getElementById("container");

    let pub_content = document.createElement("div");
    pub_content.className = "pub-content";
    let pub_content_header = document.createElement("div");
    pub_content_header.className = "pub-content-header";
    let title = document.createElement("h1");
    title.className = "intitule";
    title.setAttribute("id", "intitul");
    let typecontainer = document.createElement("h2");
    typecontainer.className = "type";
    typecontainer.innerHTML = type;
    let div_tags = document.createElement("div");
    div_tags.className = "div-tags";
    let h2tag1 = document.createElement("h2");
    h2tag1.className = "pub-tags _1";
    h2tag1.setAttribute("id", "pub-tag1");
    let h2tag2 = document.createElement("h2");
    h2tag2.className = "pub-tags _2";
    h2tag2.setAttribute("id", "pub-tag2");
    let h2tag3 = document.createElement("h2");
    h2tag3.className = "pub-tags _3";
    h2tag3.setAttribute("id", "pub-tag3");

    let pub_content_desc = document.createElement("div");
    pub_content_desc.className = "pub-content-desc";
    let div_img = document.createElement("div");
    div_img.className = "div-img";
    let img = document.createElement("img");
    img.src = "../../assets/icons/no-photo.svg";
    img.setAttribute("alt", "img not found");
    img.className = "img-notfound";
    img.title = "Not Found Images";
    let pub_desc = document.createElement("div");
    pub_desc.className = "pub-desc";
    let p_desc = document.createElement("p");
    p_desc.setAttribute("id", "desc");

    let pub_content_footer = document.createElement("div");
    pub_content_footer.className = "pub-content-footer";
    let div_publier = document.createElement("div");
    div_publier.className = "div-publier";
    let h2autor = document.createElement("h2");
    h2autor.className = "publierpar";
    h2autor.innerHTML = "Publier par ";
    let autorspan = document.createElement("span");
    autorspan.setAttribute("id", "utilis");
    let imgautor = document.createElement("img");
    imgautor.src = "../../assets/icons/loading.gif";
    imgautor.className = "loading-pp-publication";
    imgautor.setAttribute("id", "img_util");
    imgautor.setAttribute("alt", "photo de profil");
    let div_edits = document.createElement("div");
    div_edits.className = "div-edits";

    let pencilbutton = document.createElement("button");
    pencilbutton.className = "button-post";

    pencilbutton.onclick = function (e) {
      if (confirm("Voulez-vous vraiment Signaler ce post ?")) {

        alert("Post Signaler ! Merci pour votre aide.")
      } else {
      }
    };

    let imgpencil = document.createElement("img");
    imgpencil.src = "../../assets/icons/signaler.svg";
    imgpencil.alt = "pencil_edit";
    imgpencil.className = "pencil";
    imgpencil.setAttribute("id", "edit");

    let binbutton = document.createElement("button");
    binbutton.className = "button-post";

    // binbutton.onclick = function (e) {
    //   if (confirm("Voulez-vous vraiment suprrimer cette offre ?")) {
    //     remove(
    //       ref(database, "Posts/Offre/" + user.uid + "/" + id_offre)
    //     ).then(() => {
    //       alert("Demande supprimer avec succès !");
    //       location.reload();
    //     });
    //   } else {
    //     console.log("Action annulé !");
    //   }
    // };

    let imgbin = document.createElement("img");
    imgbin.src = "../../assets/icons/messages-icon.svg";
    imgbin.className = "bin";
    imgbin.alt = "bin_delete";

    title.innerHTML = intitule;
    h2tag1.innerHTML = tag1;
    h2tag2.innerHTML = tag2;
    h2tag3.innerHTML = tag3;

    p_desc.innerHTML = desc;

    autorspan.innerHTML = user;
    imgautor.src = pp;


    pub_body.appendChild(pub_content);
    pub_content.appendChild(pub_content_header);
    pub_content.appendChild(pub_content_desc);
    pub_content.appendChild(pub_content_footer);

    pub_content_header.appendChild(title);
    pub_content_header.appendChild(typecontainer);
    pub_content_header.appendChild(div_tags);

    div_tags.appendChild(h2tag1);
    div_tags.appendChild(h2tag2);
    div_tags.appendChild(h2tag3);

    pub_content_desc.appendChild(div_img);
    div_img.appendChild(img);
    pub_content_desc.appendChild(pub_desc);
    pub_desc.appendChild(p_desc);

    pub_content_footer.appendChild(div_publier);
    div_publier.appendChild(h2autor);
    h2autor.appendChild(autorspan);
    div_publier.appendChild(imgautor);
    pub_content_footer.appendChild(div_edits);

    div_edits.appendChild(pencilbutton);
    pencilbutton.appendChild(imgpencil);

    div_edits.appendChild(binbutton);
    binbutton.appendChild(imgbin);
  }

  function AddAllFichesForfaitToTable1(FichesForfait1) {
    FichesForfait1.forEach((element) => {
      AddFicheForfaitToTable1(
        element.intitule,
        element.tagdomaine,
        element.tagspecial,
        element.taglangue,
        element.desc,
        element.type,
        element.pseudo,
        element.pp,
      );
    });
  }

  async function GetNameUser(id) {
    var ppseudo;
    const PseudoData = await get(ref(database, "users/" + id + "/pseudo"));
    ppseudo = PseudoData.val();
    return ppseudo;
  }

  async function GetUSrPP(id) {
    var ppvar;
    const PpData = await get(ref(database, "users/" + id + "/pp"));
    ppvar = PpData.val();
    return ppvar;
  }

  function GetAllFichesForfaitRT1() {
    const dbref = ref(database, "Posts/Demande");

    onValue(dbref, (snapshot) => {
      var fichesforfait1 = [];
      var child1 = [];
      const promises = []; // Tableau de promesses

      snapshot.forEach((DataSnapshot) => {
        fichesforfait1.push(DataSnapshot.val());
        const userid = DataSnapshot.key;

        const printPseudo = async () => {
          const pseudo = await GetNameUser(userid);
          return pseudo;
        }
        const printPPP = async () => {
          const ppv = await GetUSrPP(userid);
          return ppv;
        }

        const pseudoPromise = printPseudo(); // Stockage des promesses
        const ppvPromise = printPPP();

        DataSnapshot.forEach((UserSnapshot) => {
          const childValue = UserSnapshot.val();

          Promise.all([pseudoPromise, ppvPromise]).then((values) => {

            if (research != "") {


              if (childValue.intitule.toLowerCase().includes(research)) {
                const childObj = {
                  ...childValue,
                  type: "Demande",
                  pseudo: values[0],
                  pp: values[1]
                };

                child1.push(childObj);
              }
            }
          });
          promises.push(pseudoPromise, ppvPromise);

        });

      });

      // Attente que toutes les promesses soient résolues
      Promise.all(promises).then(() => {
        AddAllFichesForfaitToTable1(child1);
      });
    });
  }

  function GetAllFichesForfaitRT2() {
    const dbref = ref(database, "Posts/Offre");

    onValue(dbref, (snapshot) => {
      var fichesforfait1 = [];
      var child1 = [];
      const promises = []; // Tableau de promesses

      snapshot.forEach((DataSnapshot) => {
        fichesforfait1.push(DataSnapshot.val());
        const userid = DataSnapshot.key;

        const printPseudo = async () => {
          const pseudo = await GetNameUser(userid);
          return pseudo;
        }
        const printPPP = async () => {
          const ppv = await GetUSrPP(userid);
          return ppv;
        }

        const pseudoPromise = printPseudo(); // Stockage des promesses
        const ppvPromise = printPPP();

        DataSnapshot.forEach((UserSnapshot) => {
          const childValue = UserSnapshot.val();

          Promise.all([pseudoPromise, ppvPromise]).then((values) => {

            if (research != "") {


              if (childValue.intitule.toLowerCase().includes(research)) {

                const childObj = {
                  ...childValue,
                  type: "Offre",
                  pseudo: values[0],
                  pp: values[1]
                };

                child1.push(childObj);
              }
            }
          });
          promises.push(pseudoPromise, ppvPromise);

        });
      });

      // Attente que toutes les promesses soient résolues
      Promise.all(promises).then(() => {
        AddAllFichesForfaitToTable1(child1);
      });
    });
  }

  window.onload = GetAllFichesForfaitRT1(), GetAllFichesForfaitRT2();
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
