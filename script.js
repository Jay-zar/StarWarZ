const urlTrimmer = function(text) {
    return encodeURIComponent(text)
}

//get the search box input to add to search url
const searchBox = document.querySelector("#searchform input");

document.getElementById("submit-button").addEventListener("click", function(searchRedirect) {
    let searchValue= document.getElementById("userInput").value;
    const redirectURL = `file:///C:/Users/16178/Documents/StarWarZ/redirect.html?keyword=`
    testingThis = urlTrimmer(searchValue);
    const searchURL = redirectURL+testingThis;
    window.location.assign(searchURL);
    console.log(searchValue);
    console.log(searchURL);
    console.log(testingThis);

}) 

document.getElementById("searchform").addEventListener('submit', (event) => {
    // stop form submission
    event.preventDefault();
    document.getElementById("submit-button").click();
});