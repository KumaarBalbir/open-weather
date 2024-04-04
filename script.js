apiKey = "4ce52acd0dfcbd6da802cbf9d5ea0563";
apiURL = "https://api.openweathermap.org/data/2.5/weather?&units=metric";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function getWeatherByCity(city) {
  try {
    const response = await fetch(`${apiURL}&q=${city}&appid=${apiKey}`);

    // Handle HTTP errors
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    // Check if the response contains valid data
    if (!data || !data.main || !data.name || !data.wind) {
      throw new Error("Invalid response data from the API");
    }

    // update DOM with weather conditions
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // Update the background color based on the weather conditions
    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("Please enter a valid city name!");
  }
}

// Event Listeners
searchBtn.addEventListener("click", () => {
  const city = searchBox.value;
  getWeatherByCity(city);
});

// Default call to getWeatherByCity with "Kolkata" when the site reloads
document.addEventListener("DOMContentLoaded", () => {
  getWeatherByCity("Kolkata");
});
