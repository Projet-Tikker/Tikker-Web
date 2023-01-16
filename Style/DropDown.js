// import { 
//     Deconnexion,
//  } from "../IServices/Functions.js";

// const logout = require("../IServices/Functions");

const menu = document.getElementById("menu");

const toggleDropdown = () => {
  menu.classList.toggle("open");
};

const handleMenuButtonClicked = () => {
  toggleDropdown();
  alert("Menu button clicked!");
};

const ProfilButtonClicked = () => {
  window.location.href = "./Pages/Profil";
};

const LogOutButtonClicked = () => {
    logout.Deconnexion;
};

