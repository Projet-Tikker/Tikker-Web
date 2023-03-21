let domaines = ["Site Internet","Application Mobile","Base de données","Cybersécurité","Jeux vidéos"];

let SI = ["Vitrine ", "E-commerce", "Web-App", "Blogs", "Intranets", "Wikis", "Autre... Expliquez"];
let AM = ["Social", "Jeux", "Utilitaire", "Divertissement", "Productivité", "Style de vie","Voyage", "Autre... Expliquez"];
let BD = ["A déterminer", "Autre... Expliquez"];
let CS = ["A déterminer", "Autre... Expliquez"];
let JV = ["A déterminer", "Autre... Expliquez"];

let SILang = ["HTML / CSS / PHP", ".NET 7", "React", "Angular", "Node JS"];
let AMLang = ["Natif", "Hybride", "Web-App", "Flutter", "C# .NET"];
let BDLang = ["a determiner"];
let CSLang = ["Linux", "Microsoft", "VM", "PenTest", "Virus"];
let JVLang = ["C++", "Unity", "Unreal Engine", "Python", "C#"];


let listedomain = document.getElementById("liste-domaines");
let listespe = document.getElementById("liste-spe");
let listelang = document.getElementById("liste-lang");

domaines.forEach(function adddomains(item){
    let option = document.createElement("option");
    option.text = item;
    option.value = item;
    listedomain.appendChild(option);
})

listedomain.onchange = function (){
    listespe.innerHTML = "<option value=" + "none" +" disabled selected>Choisir une Spécialité</option>";
    listelang.innerHTML = "<option value=" +"none" + "disabled selected>Choisir un Langage</option>";
    switch(this.value){
        case "Site Internet":
            addspe(SI);
            addlang(SILang);
            break;
        case "Application Mobile":
            addspe(AM);
            addlang(AMLang);
            break;
        case "Base de données":
            addspe(BD);
            addlang(BDLang);
            break;
        case "Cybersécurité":
            addspe(CS);
            addlang(CSLang);
            break;
        case "Jeux vidéos":
            addspe(JV);
            addlang(JVLang);
            break;
        default:
            addspe(null);
            addlang(null);
            break;
    }
}

function addspe(liste){
    liste.forEach(function (item){
        let option = document.createElement("option");
        option.text = item;
        option.value = item;
        listespe.appendChild(option);
    })
}

function addlang(listel){
    listel.forEach(function (item){
        let option = document.createElement("option");
        option.text = item;
        option.value = item;
        listelang.appendChild(option);
    })
}
