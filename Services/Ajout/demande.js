import { CreateDemande, ModifDemande } from "../../IServices/Firebase.js";


createok.addEventListener("click", function () {

  let selecteddomaine = document.getElementById("liste-domaines");
  let selectedspecial = document.getElementById("liste-spe");
  let selectedlangue = document.getElementById("liste-lang");

  let intitule = document.getElementById("intitule").value;
  let tagdomaine = selecteddomaine.options[selecteddomaine.selectedIndex].text;
  let tagspecial = selectedspecial.options[selectedspecial.selectedIndex].text;
  let taglangue = selectedlangue.options[selectedlangue.selectedIndex].text;
  let desc = document.getElementById("bio").value;

  if (createok.textContent == 'Modifier') {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    ModifDemande(id,intitule, tagdomaine, tagspecial, taglangue, desc);

  } else {
    CreateDemande(intitule, tagdomaine, tagspecial, taglangue, desc);
  }
});
