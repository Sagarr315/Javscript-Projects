document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.getElementById("search-btn");
  const searchInput = document.getElementById("search-input");
  const weatherTop = document.getElementById("weather-top");
  const historyList = document.getElementById("history-list");

  const openWeatherKey = "021d0942318aedf13f9044edb7e59fab";

  // Load history from localStorage
  const searchHistory = JSON.parse(localStorage.getItem("weatherSearchHistory")) || [];
  updateHistoryList();

  function updateHistoryList() {
    historyList.innerHTML = "";
    const uniqueCities = [...new Set(searchHistory)].slice(-5).reverse(); // Last 5 searches
    uniqueCities.forEach((city) => {
      const option = document.createElement("option");
      option.value = city;
      historyList.appendChild(option);
    });
  }

  function saveToHistory(city) {
    searchHistory.push(city);
    localStorage.setItem("weatherSearchHistory", JSON.stringify(searchHistory));
    updateHistoryList();
  }

  function fetchWeather(city) {
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${openWeatherKey}&units=metric`;

    fetch(weatherApiUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data.cod === 200) {
          const html = `
            <div class="card shadow p-4 bg-light fade-in " style="max-width: 400px; margin: auto;">
              <h3 class="mb-2">${data.name}, ${data.sys.country}</h3>
              <p><strong>🌡 Temp:</strong> ${data.main.temp}°C</p>
              <p><strong>☁️ Weather:</strong> ${data.weather[0].description}</p>
              <p><strong>💧 Humidity:</strong> ${data.main.humidity}%</p>
              <p><strong>🌬 Wind:</strong> ${data.wind.speed} m/s</p>
            </div>`;
          weatherTop.innerHTML = html;

          saveToHistory(city); // save city to localStorage
        } else {
          weatherTop.innerHTML = `<p class="text-danger">❌ City not found.</p>`;
        }
      })
      .catch(() => {
        weatherTop.innerHTML = `<p class="text-danger">⚠️ Error fetching weather.</p>`;
      });
  }

  function handleSearch() {
    const city = searchInput.value.trim();
    if (city) {
      fetchWeather(city);
    }
  }

  // Click search icon
  searchBtn.addEventListener("click", handleSearch);

  // Press Enter key
  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  });
});
