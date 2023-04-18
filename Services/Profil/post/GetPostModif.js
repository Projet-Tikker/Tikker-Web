const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

if(urlParams != "")
{
    const intit = urlParams.get('intitule');
    const tag1 = urlParams.get('tag1');
    const tag2 = urlParams.get('tag2');
    const tag3 = urlParams.get('tag3');
    const desc = urlParams.get('desc');
    
    const intitule = document.getElementById("intitule");
    const tag_1 = document.getElementById("liste-domaines");
    const tag_2_container = document.getElementById("liste-spe");
    const tag_2 = document.createElement('option');

    const tag_3_container = document.getElementById("liste-lang");
    const tag_3 = document.createElement('option');

    const description = document.getElementById("bio");
    
    const type = document.getElementById('type');
    type.innerHTML = 'Modification';

    const buttonok = document.getElementById('createok');
    buttonok.innerHTML = 'Modifier';
    
    intitule.value = intit;
    tag_1.value = tag1;

    tag_2.value = tag2;
    tag_2.innerHTML = tag2;
    tag_2.selected = true;

    tag_3.value = tag3;
    tag_3.innerHTML = tag3;
    tag_3.selected = true;

    description.value = desc;

    tag_2_container.appendChild(tag_2);
    tag_3_container.appendChild(tag_3);
}


