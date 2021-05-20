/*** PRINT WELCOME MESSAGE ***/
const h3 = document.createElement("h3");
const h2 = document.createElement("h2");
h2.innerText = "Input coordinates to locate a city";
h3.innerText = "The city temperature will be shown here";
document.body.appendChild(h2);
document.body.appendChild(h3);
let lat = document.getElementById("lat");
let lon = document.getElementById("lon");

/*** FORM VALIDATION ***/
const getBtn = document.querySelector("#getBtn");
getBtn.disabled = true;

////// BUTTON DISABLED //////

const enableButton = () => {
  if (lat.value !== "" && lon.value !== "") {
    getBtn.disabled = false;
  }
};

lat.addEventListener("change", enableButton);
lon.addEventListener("change", enableButton);

////// INPUT TO NUMBER //////
const isNumber = (lat, lon) => {
  return parseFloat(lat) && parseFloat(lon);
};

/*** INPUT FETCH ***/
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  (isNumber(lat.value, lon.value) &&
    fetch(
      `https://fcc-weather-api.glitch.me/api/current?lat=${lat.value}&lon=${lon.value}`
    )
      .then((response) => response.json())
      .then((temperatures) => {
        h3.innerText = `The current temperature there is ${temperatures.main.temp} degrees Celsius`;
        h2.innerText = `You have input coordinates for ${temperatures.name.toUpperCase()}`;
        document.body.appendChild(h2);
        document.body.appendChild(h3);
      })
      .catch((error) => console.log(`Error: ${error}`))) ||
    alert("Please enter valid coordinates in both fields");
});
