function showCurrent(response) {
  let todaysTemperature = Math.round(response.data.main.temp);
  let temp = document.querySelector(".temp");
  temp.innerHTML = `${todaysTemperature}℃`;
  let nameCity = document.querySelector(".cityName");
  nameCity.innerHTML = response.data.name;
}

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
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

let actualDate = document.querySelector("h3#DatePlace");
actualDate.innerHTML = `${day} ${hour}:${minutes}`;

function inputCity() {
  let cityInput = document.querySelector("#city-input");
  let nameCity = document.querySelector(".cityName");
  nameCity.innerHTML = cityInput.value;

  let apiKey = "52646df4fd4d7b30904b5e794e90322f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCurrent);
}
let buttonSubmit = document.querySelector("button");
buttonSubmit.addEventListener("click", inputCity);

function showPosition(position) {
  let lat = `${position.coords.latitude}`;
  let lon = `${position.coords.longitude}`;
  console.log(lat);
  console.log(lon);
  let apiKey = "52646df4fd4d7b30904b5e794e90322f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  console.log(apiUrl);

  axios.get(apiUrl).then(showCurrent);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let point = document.querySelector("#point");
point.addEventListener("click", getPosition);
