//import des fonctions nécessaires dans firebase.js
import { Deconnexion, ControllerAccueil } from "../../IServices/Firebase.js";

//lancement du controleur
ControllerAccueil();

//Animation du menu déroulant
const menu = document.getElementById("menu");

dropdown.addEventListener("click", function () {
  menu.classList.toggle("open");
});

//Déconnexion
logoutbutton.addEventListener("click", function () {
  if (confirm("Voulez-vous vraiment vous déconnecté ?")) {
    //Lancement de la fonction decconexion de firebase.js
    Deconnexion();
    //Rechargement de la page
    location.reload();
  } else {
    console.log("[Action non-aboutie] - Refus User");
  }
});
