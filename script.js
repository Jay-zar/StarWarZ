/*//Get a reference to the form for an event handler
//for its submit event
	  console.log('Does the search box load?');
      var form = document.getElementById("searchform");

	  console.log(form);

      //submit event handler for the form
      form.addEventListener("submit", function(){

        // when form has been submitted get the textbox value
        var inputTest = document.getElementById('userInput').value;
        localStorage.setItem( 'objectToPass', inputTest );
		console.log(inputTest);
        window.location.href = "redirect.html";

      }); */

// api url

function fetchData() {
    fetch("http://swapi.dev/api/planets/2/").then(response => {
        console.log(response);
        if(!response.ok) {
            throw Error("error")
        }
        return response.json(); 

    }).then(data => {
        console.log(data);
        console.log(Object.values(data));
        // data test
      //  console.log(data);

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
        <p>Residents: <a href= "${data.residents[0]}">${data.residents[0]}</a>
        <br><a href= "${data.residents[1]}">${data.residents[1]}</a>
        <br><a href= "${data.residents[2]}">${data.residents[2]}</a>
        </p>
        </div>`

      
       // console.log(html); //html that should be visible
        document.querySelector('#info-sidebar').insertAdjacentHTML("afterbegin", html)
    }).catch(function (error) {
            console.log(error);
        });
}
  
  console.log("Test message");
  fetchData(); 
