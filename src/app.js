//Homework 1

let now = new Date();
let heading = document.querySelector("weekday");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
weekday.innerHTML = `${day}`;

let here = new Date();
let header = document.querySelector("time");

let hours = now.getHours();
let minutes = now.getMinutes();

time.innerHTML = `${hours}:${minutes}`;

//Homework 2

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let currentcity = document.querySelector(".currentcity");
  if (searchInput.value) {
    currentcity.innerHTML = `${searchInput.value}`;
  } else {
    alert("Enter a city");
  }
}

let form = document.querySelector("#change-city-form");

form.addEventListener("submit", search);

//Temperature, icons and extra info

function showTemperature(response) {
  let city = document.querySelector("h2");
  let localTemperature = document.querySelector("#currenttemp");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  city.innerHTML = response.data.name;
  localTemperature.innerHTML = Math.round(response.data.main.temp);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  
}

//Search function
function showCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let cityName = `${searchInput.value}`;
  let apiKey = "663df824629c10b5cb37f18468e84501";
  let units = "metric";
  let apiUrlSearch = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrlSearch}&appid=${apiKey}`).then(showTemperature);
}

let formSearcher = document.querySelector("form");
formSearcher.addEventListener("submit", showCity);

//Units

function fConvert(event) {
  event.preventDefault();
  cLink.classList.remove("active");
  fLink.classList.add("active");
  let tempElement = document.querySelector("#currenttemp");
  tempElement.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}

function cConvert(event) {
  event.preventDefault();
  cLink.classList.add("active");
  fLink.classList.remove("active");
  let tempElement = document.querySelector("#currenttemp");
  tempElement.innerHTML = Math.round(celsiusTemperature);
}

let fLink = document.querySelector(".fahrenheit-link");
fLink.addEventListener("click", fConvert);

let cLink = document.querySelector(".celsius-link");
cLink.addEventListener("click", cConvert);

let celsiusTemperature = null;
