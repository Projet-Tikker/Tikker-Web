const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const research = urlParams.get('research');

const searchbar = document.getElementById("search-bar");

searchbar.value = research;

