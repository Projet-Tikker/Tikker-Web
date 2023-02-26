import { UpdateDataUsr } from "../../../IServices/Firebase.js";


okmodif.addEventListener("click", function () {

    let pseudo = document.getElementById("pseudo").value;
    let nom = document.getElementById("nom").value;
    let prenom = document.getElementById("prenom").value;
    let bio = document.getElementById("bio").value;
    let pp = document.getElementById("imgmain").src;

    if (confirm("Voulez-vous vraiment Appliquée les changements ?")) {
        UpdateDataUsr(pseudo, nom, prenom, bio, pp)
    } else {
        console.log("[Action non-aboutie] - Refus Utilisateur");
    }
});
