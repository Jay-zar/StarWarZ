const apiPlanets = "https://swapi.dev/api/planets/"
// const planetParams =

let params = new URLSearchParams(document.location.search);
    const numberCheck = params.get("apiNumber");
    console.log(numberCheck);

console.log()
function fetchData() {
    fetch("http://swapi.dev/api/planets/"+numberCheck).then(response => {
        console.log(response);
        if(!response.ok) {
            throw Error("error")
        }
        return response.json(); 

    }).then(data => {
       
       // console.log(Object.values(data));
        // data test
      //  console.log(data);
        let residentsHTML = ``;

    // checking if planet has residents
      for (let i = 0; i < data.residents.length; i++) {
            console.log(data.residents[i]);
          residentsHTML+= `${data.residents[i]}<br>`
      }

      let residentText = ``;
        //add the correct residents text to put into HTML
      if (data.residents.length>0) {
          residentText= "<p>Residents: ";
      }
      else {
          residentText= "<p>Residents: None"
      }
      //converting object
        const html = `<div class= "infoSet">
        <h2>Planet ${data.name}</h2>
        <p>Rotational Period: ${data.rotation_period}</p>
        <p>Orbital Period: ${data.orbital_period}</p>
        <p>Diameter: ${data.diameter}</p>
        <p>Climate: ${data.climate}</p>
        <p>Gravity: ${data.gravity}</p>
        <p>Terrain: ${data.terrain}</p>
        <p>Surface Water: ${data.surface_water}</p>
        <p>Population: ${data.population}</p>
        ${residentText}${residentsHTML}</p>
        `

      
       // console.log(html); //html that should be visible
        document.querySelector('#info-sidebar').insertAdjacentHTML("afterbegin", html)
    }).catch(function (error) {
            console.log(error);
        });
}
  
  console.log("End of functions");
  fetchData(); 
