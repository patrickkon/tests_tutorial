// To test how the API works in isolation. Don't make mistakes!
const APIKEY = "f90eaaa700aab37e36330ca9e0e64b07";

const fetch =  require("node-fetch");
const city = "london";
const result = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`, {
    mode: 'cors', 
  })
  .then(response => response.json())
  .then(data => data.name);


  result