const apiKey = "3bdef2f503c2600e1ef2ee220264dd18";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const btn = document.querySelector(".search button");
const search = document.querySelector(".search input");
const weatherImg = document.querySelector(".icon");
const weatherSection = document.querySelector(".weather");
const errorMessage = document.querySelector(".error");

async function getWeather(city) {
  try {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    console.log(data);
    document.querySelector(".temp").textContent =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".city").textContent = data.name;
    document.querySelector(".humidity").textContent = data.main.humidity + "%";
    document.querySelector(".wind").textContent = data.wind.speed + " km/h";

    // Update weather icon based on condition
    const weatherCondition = data.weather[0].main;
    if (weatherCondition === "Clouds") {
      weatherImg.src = "./assets/cloudy.png";
    } else if (weatherCondition === "Clear") {
      weatherImg.src = "./assets/sunny.png";
    } else if (weatherCondition === "Rain") {
      weatherImg.src = "./assets/rain.png";
    } else if (weatherCondition === "Drizzle") {
      weatherImg.src = "./assets/drizzle.png";
    } else if (weatherCondition === "Mist") {
      weatherImg.src = "./assets/haze.png";
    }

    weatherSection.style.display = "block"; // Show weather details
    errorMessage.style.display = "none"; // Hide error message
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.style.display = "block"; // Show error
    weatherSection.style.display = "none"; // Hide weather details
  }
}

// Search Button Click Event
btn.addEventListener("click", () => {
  if (search.value.trim() === "") {
    errorMessage.textContent = "Please enter a city name";
    errorMessage.style.display = "block";
    weatherSection.style.display = "none"; // Hide weather if no city
    return;
  }
  getWeather(search.value);
});

// Pressing Enter Key to Search
search.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    btn.click(); // Simulate button click
  }
});
