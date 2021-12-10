const apiPlanets = "https://swapi.dev/api/planets/"
const planetsSearch = "https://swapi.dev/api/planets/?search"
const testRedirect = "planets.html"

//get the search box input to add to search url
const searchBox = document.querySelector("#searchform input");

document.getElementById("submit-button").addEventListener("click", function(searchRedirect) {
    let searchValue= document.getElementById("userInput").value;
    window.location.assign(`file:///C:/Users/16178/Documents/StarWarZ/redirect.html?keyword=${searchValue}`);
    console.log(searchValue)
}) 

document.getElementById("searchform").addEventListener('submit', (event) => {
    // stop form submission
    event.preventDefault();
    document.getElementById("submit-button").click();
});