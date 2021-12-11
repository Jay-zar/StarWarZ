const apiPlanets = "https://swapi.dev/api/planets/"

let params = new URLSearchParams(document.location.search);
const numberCheck = params.get("apiNumber");

//async call to get the names of the residents from their respective endpoints
async function fetchCharacter(residentEndpoints) {
    let response = await fetch(residentEndpoints);
    let data = await response.json();
    return data;
}

 async function fetchData() {
    fetch(apiPlanets+numberCheck)
    .then(response => {
        if(!response.ok) {
            throw Error("error")
        }
        return response.json(); 
    })
    .then(jsonResponse => {
        let characterPromises = [];

        // Getting resident information
        for (let i = 0; i < jsonResponse.residents.length; i++) {
            const characterPromise = fetchCharacter(jsonResponse.residents[i]);
            characterPromises.push(characterPromise)
        }

        Promise.all(characterPromises)
        .then(characters => {
            let residentsHTML = ``;
            for (let i = 0; i < characters.length; i++) {
                const character = characters[i]
                const splitURL = character.url.split("/");
                const id = splitURL[splitURL.length-2];
                residentsHTML+= `<p class= "peopleNames"><a href="people.html?apiNumber=${id}">${character.name}</a><p/>`
            }
            let residentText = ``;
            //add the correct residents text to put into HTML
            if (jsonResponse.residents.length > 0) {
                residentText = `<p>Residents: </p>`;
            }
            else {
                residentText = `<p>Residents: None</p>`
            }
    
            //converting object
            const html = `<div class= "infoSet">
            <h2>Planet ${jsonResponse.name}</h2>
            <p>Rotational Period: ${jsonResponse.rotation_period}</p>
            <p>Orbital Period: ${jsonResponse.orbital_period}</p>
            <p>Diameter: ${jsonResponse.diameter}</p>
            <p>Climate: ${jsonResponse.climate}</p>
            <p>Gravity: ${jsonResponse.gravity}</p>
            <p>Terrain: ${jsonResponse.terrain}</p>
            <p>Surface Water: ${jsonResponse.surface_water}</p>
            <p>Population: ${jsonResponse.population}</p>
            ${residentText}${residentsHTML}
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
