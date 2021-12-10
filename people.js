const apiPlanets = "https://swapi.dev/api/planets/"

let params = new URLSearchParams(document.location.search);
const numberCheck = params.get("apiNumber");

//async call to get the names of the residents from their respective endpoints
async function fetchHomeworld(planetEndpoints) {
    let response = await fetch(planetEndpoints);
    let data = await response.json();
    return data;
}

 async function fetchData() {
    fetch("http://swapi.dev/api/people/"+numberCheck)
    .then(response => {
        if(!response.ok) {
            throw Error("error")
        }
        return response.json(); 
    })
    .then(jsonResponse => {
        let planetPromises = fetchHomeworld(jsonResponse.homeworld); 
            console.log(jsonResponse);

    planetPromises
    .then(planets => {
            let planetHTML = ``;
                const splitURL = planets.url.split("/");
                const id = splitURL[splitURL.length-2];
                planetHTML+= `<p>Homeworld: <a href="planets.html?apiNumber=${id}">${planets.name}</a>`
        
    
            //converting object
            const html = `<div class= "infoSet">
            <h2>About ${jsonResponse.name}</h2>
            <p>Height: ${jsonResponse.height}</p>
            <p>Mass: ${jsonResponse.mass}</p>
            <p>Eye Color: ${jsonResponse.eye_color}</p>
            <p>Hair Color: ${jsonResponse.hair_color}</p>
            <p>Skin Color: ${jsonResponse.skin_color}</p>
            <p>Gender: ${jsonResponse.gender}</p>
            <p>Birth Year: ${jsonResponse.birth_year}</p>
            ${planetHTML}</p>
            `
            //adding info to HTML div
            document.querySelector('#info-sidebar').insertAdjacentHTML("afterbegin", html)
        })
        .catch(function (error) {
            const errorHTML = `<p>There was an error processing your request, try refreshing the page</p>`
            document.querySelector('#info-sidebar').insertAdjacentHTML("afterbegin", errorHTML)
        })
    }).catch(function (error) {
        const errorHTML = `<p>We couldn't find what you were looking for.</p>`
        document.querySelector('#info-sidebar').insertAdjacentHTML("afterbegin", errorHTML)
    });
}

fetchData(); 
