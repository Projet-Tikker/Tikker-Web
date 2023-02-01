import { UpdateDataUsr } from "../../../IServices/Firebase.js";


okmodif.addEventListener("click", function () {

    let pseudo = document.getElementById("pseudo").value;
    let nom = document.getElementById("nom").value;
    let prenom = document.getElementById("prenom").value;
    let bio = document.getElementById("bio").value;

    if (confirm("Voulez-vous vraiment Appliquée les changements ?")) {
        UpdateDataUsr(pseudo, nom, prenom, bio)
    } else {
        console.log("[Action non-aboutie] - Refus User");
      }
});
