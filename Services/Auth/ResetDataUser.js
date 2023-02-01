import { ResetPassword } from "../../IServices/Firebase.js";

resetpassword.addEventListener("click", function () {
    const email = document.getElementById("email").textContent;
    console.log(email);

  if (confirm("Voulez-vous vraiment Réinisialisé votre mot de passe ?")) {
    ResetPassword(email);
  } else {
    console.log("[Action non-aboutie] - Refus User");
  }
});
