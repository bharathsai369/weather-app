const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const cardInfo = document.querySelector(".card-info");
const apiKey = "your-api-key";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value;

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Please enter a city");
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Could not fetch weather data");
  }

  return await response.json();
}

function displayWeatherInfo(data) {
  console.log(data);
  const {
    name: city,
    main: { temp, humidity, pressure },
    weather: [{ description, icon }],
  } = data;

  console.log(icon);
  cardInfo.textContent = "";
  cardInfo.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("img");

  const containerDiv = document.createElement("div");
  const tempDiv = document.createElement("div");
  const humidityDiv = document.createElement("div");
  const pressureDiv = document.createElement("div");

  cityDisplay.textContent = city;
  descDisplay.textContent = description;
  weatherEmoji.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  tempDiv.innerHTML = `Temperature <img class='div-img' src='imgs/temperature.png'> ${(
    temp - 273.15
  ).toFixed(1)}°C`;
  humidityDiv.innerHTML = `Humidity <img class='div-img' src='imgs/humidity.png'> ${humidity}%`;
  pressureDiv.innerHTML = `Pressure <img class='div-img' src='imgs/pressure.png'> ${pressure} hPa`;

  cityDisplay.classList.add("cityDisplay");
  descDisplay.classList.add("descDisplay");
  weatherEmoji.classList.add("weatherEmoji");

  containerDiv.classList.add("containerDiv");
  tempDiv.classList.add("divs");
  humidityDiv.classList.add("divs");
  pressureDiv.classList.add("divs");

  cardInfo.appendChild(cityDisplay);
  cardInfo.appendChild(weatherEmoji);
  cardInfo.appendChild(descDisplay);

  containerDiv.appendChild(tempDiv);
  containerDiv.appendChild(humidityDiv);
  containerDiv.appendChild(pressureDiv);

  cardInfo.appendChild(containerDiv);
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}
