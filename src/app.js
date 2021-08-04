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
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  let forecastHTML = `<div class= "row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
          <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
          <img src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"" class="icons" />
         <div class = "weather-forecast-temperatures">
           <span class = "weather-forecast-temperature-max">${Math.round(
             forecastDay.temp.max
           )}°</span> <br />
         <span class = "weather-forecast-temperature-min">${Math.round(
           forecastDay.temp.min
         )}°</span>
        </div>
      </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "663df824629c10b5cb37f18468e84501";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let city = document.querySelector("h2");
  let localTemperature = document.querySelector("#currenttemp");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp;
  city.innerHTML = response.data.name;
  localTemperature.innerHTML = Math.round(response.data.main.temp);
  humidityElement.innerHTML = `${Math.round(response.data.main.humidity)}%`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} km/H`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function showCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  searchCity(searchInput.value);
}
function searchCity(cityName) {
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
searchCity("Tokyo");
