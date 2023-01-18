import { Connexion } from "../../IServices/Firebase.js";

const emaildataEnter = document.getElementById("email");

const pwddataEnter = document.getElementById("pwd");

const showpwd = document.getElementById("showpwd");
let showpwdIndex = 0;
const showpwdImages = ["../../assets/icons/showpwdoff.svg", "../../assets/icons/showpwdon.svg"];
const showpwdType = ["password", "text"];


showpwd.addEventListener("click", function() {
    showpwdIndex = (showpwdIndex + 1) % showpwdImages.length;
    showpwd.src = showpwdImages[showpwdIndex];
    pwddataEnter.type = showpwdType[showpwdIndex];
});


emaildataEnter.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        let email = document.getElementById("email").value;
        let password = document.getElementById("pwd").value;

        Connexion(email, password);

    }
});

pwddataEnter.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        let email = document.getElementById("email").value;
        let password = document.getElementById("pwd").value;
        Connexion(email, password);
    }
});

submitdata.addEventListener("click", function () {
    let email = document.getElementById("email").value;
    let password = document.getElementById("pwd").value;

    Connexion(email, password);
});



