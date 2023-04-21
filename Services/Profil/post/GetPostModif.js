import { getModifDemandeData, getModifOffreData } from "../../../IServices/Firebase.js";


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

if(urlParams != "")
{
    const id = urlParams.get('id');
    const typemodif = urlParams.get('type');

    const type = document.getElementById('type');
    type.innerHTML = 'Modification';
    
    const buttonok = document.getElementById('createok');
    buttonok.innerHTML = 'Modifier';
    
    if(typemodif == "demande"){
        getModifDemandeData(id);
    }else{
        getModifOffreData(id);
    }

}


