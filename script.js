const urlTrimmer = function(text) {
    return encodeURIComponent(text)
}

//get the search box input to add to search url
const searchBox = document.querySelector("#searchform input");

document.getElementById("submit-button").addEventListener("click", function(searchRedirect) {
    let searchValue= document.getElementById("userInput").value;
    const redirectURL = `https://jay-zar.github.io/StarWarZ/redirect.html?keyword=`
    urlAdd = urlTrimmer(searchValue);
    const searchURL = redirectURL+urlAdd;
    window.location.assign(searchURL);

}) 

document.getElementById("searchform").addEventListener('submit', (event) => {
    // stop form submission and click invisible button instead
    event.preventDefault();
    document.getElementById("submit-button").click();
});
