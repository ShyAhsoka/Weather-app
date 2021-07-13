let now = new Date();
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
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let actualDate = document.querySelector("#DatePlace");
actualDate.innerHTML = `${day} ${hour}:${minutes}`;

function showCurrent(response) {
  console.log(response.data);

  let tempereature = document.querySelector(".temp");
  let nameCity = document.querySelector(".cityName");
  let description = document.querySelector("#desc");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let icon = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;
  nameCity.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  tempereature.innerHTML = Math.round(celsiusTemperature);

  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
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

function displayFarenheitTemp(event) {
  event.preventDefault();
  let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector(".temp");
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
  //remove the active class from  the celsius unit
  celsiusUnit.classList.remove("active");
  farenheitUnit.classList.add("active");
}
function displayCelsiusTemp(event) {
  event.preventDefault();
  let celsiusElement = document.querySelector(".temp");
  celsiusElement.innerHTML = Math.round(celsiusTemperature);
  celsiusUnit.classList.add("active");
  farenheitUnit.classList.remove("active");
}

let celsiusTemperature = null;

let farenheitUnit = document.querySelector("#farenheitUnit");
farenheitUnit.addEventListener("click", displayFarenheitTemp);

let celsiusUnit = document.querySelector("#celsiusUnit");
celsiusUnit.addEventListener("click", displayCelsiusTemp);

search("Szczecin");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
