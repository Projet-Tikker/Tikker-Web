import { Deconnexion, ControllerAccueil } from "../../IServices/Firebase.js";

ControllerAccueil();

const menu = document.getElementById("menu");

dropdown.addEventListener("click", function () {
  menu.classList.toggle("open");
});

logoutbutton.addEventListener("click", function () {
  if (confirm("Voulez-vous vraiment vous déconnecté ?")) {
    Deconnexion();
    location.reload();
  } else {
    console.log("[Action non-aboutie] - Refus User");
  }
});
