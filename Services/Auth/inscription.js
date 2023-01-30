import { Inscription } from "../../IServices/Firebase.js";


const EnterMail = document.getElementById("email");
const EnterUsername = document.getElementById("pseudo");
const EnterPre = document.getElementById("prenom");
const EnterNom = document.getElementById("nom");
const EnterPass1 = document.getElementById("pwd");
const EnterPass2 = document.getElementById("pwd2");



const showpwd = document.getElementById("showpwd");
let showpwdIndex = 0;
const showpwdImages = ["../../assets/icons/showpwdoff.svg", "../../assets/icons/showpwdon.svg"];
const showpwdType = ["password", "text"];


showpwd.addEventListener("click", function() {
    showpwdIndex = (showpwdIndex + 1) % showpwdImages.length;
    showpwd.src = showpwdImages[showpwdIndex];
    EnterPass1.type = showpwdType[showpwdIndex];
});


function errorpassword() {
  EnterPass1.style.color = "red";
  EnterPass2.style.color = "red";
}

EnterMail.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    let email = document.getElementById("email").value;
    let pseudo = document.getElementById("pseudo").value;
    let prenom = document.getElementById("prenom").value;
    let nom = document.getElementById("nom").value;
    let password = document.getElementById("pwd").value;
    let password2 = document.getElementById("pwd2").value;

    if (password == password2) {
      Inscription(email, pseudo,prenom, nom, password);
    } else {
      alert("Le Mot de passe ne correspond pas !");
      errorpassword();
    }
  }
});

EnterUsername.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    let email = document.getElementById("email").value;
    let pseudo = document.getElementById("pseudo").value;
    let prenom = document.getElementById("prenom").value;
    let nom = document.getElementById("nom").value;
    let password = document.getElementById("pwd").value;
    let password2 = document.getElementById("pwd2").value;

    if (password == password2) {
      Inscription(email, pseudo,prenom, nom, password);
    } else {
      alert("Le Mot de passe ne correspond pas !");
      errorpassword();
    }
  }
});

EnterPre.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    let email = document.getElementById("email").value;
    let pseudo = document.getElementById("pseudo").value;
    let prenom = document.getElementById("prenom").value;
    let nom = document.getElementById("nom").value;
    let password = document.getElementById("pwd").value;
    let password2 = document.getElementById("pwd2").value;

    if (password == password2) {
      Inscription(email,pseudo, prenom, nom, password);
    } else {
      alert("Le Mot de passe ne correspond pas !");
      errorpassword();
    }
  }
});

EnterNom.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    let email = document.getElementById("email").value;
    let pseudo = document.getElementById("pseudo").value;
    let prenom = document.getElementById("prenom").value;
    let nom = document.getElementById("nom").value;
    let password = document.getElementById("pwd").value;
    let password2 = document.getElementById("pwd2").value;

    if (password == password2) {
      Inscription(email,pseudo, prenom, nom, password);
    } else {
      alert("Le Mot de passe ne correspond pas !");
      errorpassword();
    }
  }
});

EnterPass1.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    let email = document.getElementById("email").value;
    let pseudo = document.getElementById("pseudo").value;
    let prenom = document.getElementById("prenom").value;
    let nom = document.getElementById("nom").value;
    let password = document.getElementById("pwd").value;
    let password2 = document.getElementById("pwd2").value;

    if (password == password2) {
      Inscription(email, pseudo,prenom, nom, password);
    } else {
      alert("Le Mot de passe ne correspond pas !");
      errorpassword();
    }
  }
});

EnterPass2.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    let email = document.getElementById("email").value;
    let pseudo = document.getElementById("pseudo").value;
    let prenom = document.getElementById("prenom").value;
    let nom = document.getElementById("nom").value;
    let password = document.getElementById("pwd").value;
    let password2 = document.getElementById("pwd2").value;

    if (password == password2) {
      Inscription(email, pseudo,prenom, nom, password);
    } else {
      alert("Le Mot de passe ne correspond pas !");
      errorpassword();
    }
  }
});

submitaccount.addEventListener("click", function () {
  let email = document.getElementById("email").value;
  let pseudo = document.getElementById("pseudo").value;
  let prenom = document.getElementById("prenom").value;
  let nom = document.getElementById("nom").value;
  let password = document.getElementById("pwd").value;
  let password2 = document.getElementById("pwd2").value;

  if (password == password2) {
    Inscription(email, pseudo,prenom, nom, password);
  } else {
    alert("Le Mot de passe ne correspond pas !");
    errorpassword();
  }
});



