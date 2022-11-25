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
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
time.innerHTML = `${hours}:${minutes}`;

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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function formatHour(timestamp) {
  let time = new Date(timestamp * 1000);
  let forecastHour = time.getHours();
  let forecastHours = [
    "1:00",
    "2:00",
    "3:00",
    "4:00",
    "5:00",
    "6:00",
    "7:00",
    "8:00",
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    "24:00",
  ];
  return forecastHours[forecastHour];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let hourlyForecast = response.data.hourly;
  let forecastElement = document.querySelector("#forecast");
  let hourlyForecastElement = document.querySelector("#hourly-forecast");
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

  let hourlyForecastHTML = `<div class="row"> `;
  hourlyForecast.forEach(function (forecastHour, index) {
    if (index < 6) {
      hourlyForecastHTML =
        hourlyForecastHTML +
        `
    <div class="col-2">
      ${formatHour(forecastHour.dt)}
      <strong>${Math.round(forecastHour.temp)}°</strong>
    </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  hourlyForecastHTML = hourlyForecastHTML + ` </div>`;
  hourlyForecastElement.innerHTML = hourlyForecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "dce1833d93dd6a3d4369718b45707a73";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let city = document.querySelector("h2");
  let localTemperature = document.querySelector("#currenttemp");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  celsiusTemperature = Math.round(response.data.main.temp);
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
  let apiKey = "4ea8e5dff1b6d9441049f23868b12760";
  let units = "metric";
  let apiUrlSearch = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrlSearch}&appid=${apiKey}`).then(showTemperature);
}
let formSearcher = document.querySelector("form");
formSearcher.addEventListener("submit", showCity);

searchCity("Tokyo");


function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "4ea8e5dff1b6d9441049f23868b12760";
  let apiGeoUrl = `https://api.openweathermap.org/data/3.0/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiGeoUrl).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let geolocationbutton = document.querySelector("#geolocation");
geolocationbutton.addEventListener("click", getCurrentPosition);

function parisPosition(position) {
  let lat = `48.8534`;
  let lon = `2.3488`;
  let units = "metric";
  let apiKey = "663df824629c10b5cb37f18468e84501";
  let apiGeoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiGeoUrl).then(showTemperature);
}

let parisButton = document.querySelector("#paris");
parisButton.addEventListener("click", parisPosition);

function londonPosition(position) {
  let lat = `51.5085`;
  let lon = `-0.1257`;
  let units = "metric";
  let apiKey = "663df824629c10b5cb37f18468e84501";
  let apiGeoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiGeoUrl).then(showTemperature);
}

let londonButton = document.querySelector("#london");
londonButton.addEventListener("click", londonPosition);

function tokyoPosition(position) {
  let lat = `35.6895`;
  let lon = `139.6917`;
  let units = "metric";
  let apiKey = "663df824629c10b5cb37f18468e84501";
  let apiGeoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiGeoUrl).then(showTemperature);
}

let tokyoButton = document.querySelector("#ny");
tokyoButton.addEventListener("click", tokyoPosition);

function sydneyPosition(position) {
  let lat = `-33.8679`;
  let lon = `151.2073`;
  let units = "metric";
  let apiKey = "663df824629c10b5cb37f18468e84501";
  let apiGeoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiGeoUrl).then(showTemperature);
}

let sydneyButton = document.querySelector("#sydney");
sydneyButton.addEventListener("click", sydneyPosition);
