import {
  GetPostsDemandes,
  GetPostsOffres,
} from "../../../IServices/Firebase.js";

let selectedType = document.getElementById("type-posts");

let tagType = selectedType.options[selectedType.selectedIndex].value;

if (tagType === "all") {
    GetPostsDemandes();
    GetPostsOffres();
  }

  if (tagType === "demande") {
    GetPostsDemandes();
  }

  if (tagType === "offre") {
    GetPostsOffres();
  }

selectedType.onchange = function () {
    location.reload();
};
