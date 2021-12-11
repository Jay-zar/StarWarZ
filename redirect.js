let params = new URLSearchParams(document.location.search);
const searchTerm = params.get("keyword");

async function fetchData() {
    let planetsSearchPromise = fetch(`http://swapi.dev/api/planets/?search=${searchTerm}`);
    let peopleSearchPromise = fetch(`http://swapi.dev/api/people/?search=${searchTerm}`);
    
   Promise.all([planetsSearchPromise, peopleSearchPromise])
    .then(responses => {      
        planetsResponse = responses[0];
        peopleResponse = responses[1];
        if(!planetsResponse.ok) {
            throw Error("error")
        }
        jsonPlanetResponse = planetsResponse.json();
        jsonPeopleResponse = peopleResponse.json();
        return Promise.all([jsonPlanetResponse, jsonPeopleResponse]);
    })
    .catch(function (error) {
        const errorHTML = `<p>There was an error processing your request, try refreshing the page</p>`
        document.querySelector('#info-sidebar').insertAdjacentHTML("beforeend", errorHTML)
    })
    .then(jsonResponses => {  
        let resultsHTML = ``;
        if (jsonResponses[0].count + jsonResponses[1].count == 0) {
            resultsHTML =  `<p>There were no matches for your search please try another one.</p>`
        } else 
        {
            // printing search results
            for (let j = 0 ; j < 2; j++) {
                searchResults = jsonResponses[j].results;
                for (let i = 0; i <  searchResults.length; i++) {
                    const result =  searchResults[i]
                    const splitURL = result.url.split("/");
                    const id = splitURL[splitURL.length-2];
                    const page = splitURL[splitURL.length-3];
                    resultsHTML+= `<p><a href="${page}.html?apiNumber=${id}">${result.name}</a></p>`
                }
            }
        }
        const html = 
        `<div class= "infoset">
        ${resultsHTML}
        </div>`
        //adding info to HTML div
        document.querySelector('#info-sidebar').insertAdjacentHTML("beforeend", html)
        })
        .catch(function (error) {
            const errorHTML = `<p>There was an error processing your request, try refreshing the page</p>`
            document.querySelector('#info-sidebar').insertAdjacentHTML("beforeend", errorHTML)
        })
}

fetchData();