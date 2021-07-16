function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily;
  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
            <div class="week">
            <img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="" width="60"/>
            ${formatDay(forecastDay.dt)}
            <span class="days_temp">
              <span class="temperature-max">${Math.round(
                forecastDay.temp.max
              )}° </span> 
              | 
              <span class="temperature-min"> ${Math.round(
                forecastDay.temp.min
              )}°</span>
            </span>
          </div>
          `;
    }
  });
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "52646df4fd4d7b30904b5e794e90322f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);

  axios.get(apiUrl).then(displayForecast);
}
function showCurrent(response) {
  console.log(response.data);

  let tempereature = document.querySelector(".temp");
  let nameCity = document.querySelector(".cityName");
  let description = document.querySelector("#desc");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let icon = document.querySelector("#icon");
  let dateElement = document.querySelector("#DatePlace");
  let sunriseElement = document.querySelector("#sunrise");
  let sunsetElement = document.querySelector("#sunset");

  console.log(response);
  
  celsiusTemperature = response.data.main.temp;
  nameCity.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  tempereature.innerHTML = Math.round(celsiusTemperature);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  sunriseElement.innerHTML = formatTime(response.data.sys.sunrise * 1000);
  sunsetElement.innerHTML = formatTime(response.data.sys.sunset * 1000);

  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "52646df4fd4d7b30904b5e794e90322f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCurrent);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Szczecin");
