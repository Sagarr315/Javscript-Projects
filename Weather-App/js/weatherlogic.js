document.addEventListener("DOMContentLoaded", function () {
  const cityElem = document.getElementById("cityname");
  const tempElem = document.getElementById("temperature");
  const conditionElem = document.getElementById("weathercondition");
  const humidityElem = document.getElementById("humidity");
  const windElem = document.getElementById("wind");
  const forecastContainer = document.getElementById("forecast-container");
  const errorBox = document.getElementById("error-box");

  const weatherApiKey = "021d0942318aedf13f9044edb7e59fab";

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // 🔹 Reverse geocoding to get city name
          const reverseGeoURL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${weatherApiKey}`;
          const geoRes = await fetch(reverseGeoURL);
          const geoData = await geoRes.json();

          if (!geoData || geoData.length === 0) {
            throw new Error("No location data found");
          }

          const city = geoData[0].name;
          const state = geoData[0].state;
          const displayLocation = `${city}, ${state}`;

          if (cityElem) cityElem.innerText = displayLocation;

          // 🔹 Current weather fetch
          const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;
          const weatherRes = await fetch(weatherUrl);
          const weatherData = await weatherRes.json();

          if (weatherData.cod !== 200) {
            throw new Error(weatherData.message);
          }

          tempElem.innerText = `🌡️ ${weatherData.main.temp} °C`;
          const iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
          const conditionIcon = document.getElementById("weathericon");
          const conditionText = document.getElementById("condition-text");

          conditionIcon.src = iconUrl;
          conditionIcon.alt = weatherData.weather[0].description;
          conditionIcon.title = weatherData.weather[0].description;
          conditionText.innerText = `${weatherData.weather[0].main} (${weatherData.weather[0].description})`;

          humidityElem.innerText = `💧 Humidity: ${weatherData.main.humidity}%`;
          windElem.innerText = `🌬️ Wind: ${weatherData.wind.speed} m/s`;

          // 🔹 5-Day Forecast
          const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherApiKey}&units=metric`;
          const forecastRes = await fetch(forecastUrl);
          const forecastData = await forecastRes.json();

          if (forecastData.cod !== "200") {
            throw new Error(forecastData.message);
          }

          forecastContainer.innerHTML = "";

          let daysAdded = 0;
          let lastDate = "";

          forecastData.list.forEach((item) => {
            const date = new Date(item.dt_txt);
            const dayName = date.toLocaleDateString("en-US", {
              weekday: "short",
            });

            if (
              date.getHours() === 12 &&
              dayName !== lastDate &&
              daysAdded < 5
            ) {
              lastDate = dayName;
              daysAdded++;

              const icon = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
              const desc = item.weather[0].main;
              const fullDesc = item.weather[0].description;
              const minTemp = Math.round(item.main.temp_min);
              const maxTemp = Math.round(item.main.temp_max);
              const humidity = item.main.humidity;
              const windSpeed = item.wind.speed;

              const card = document.createElement("div");
              card.className = "forecast-card";
              card.innerHTML = `
              <h4>${dayName}</h4>
              <img src="${icon}" alt="${desc}" title="${fullDesc}" />
              <p>🌡️ ${minTemp}° / ${maxTemp}°C</p>
              <p>${desc}</p>
              <p>💧 ${humidity}%</p>
              <p>🌬️ ${windSpeed} m/s</p>
            `;
              forecastContainer.appendChild(card);
            }
          });
        } catch (err) {
          console.error("Error:", err.message);
          if (errorBox) {
            errorBox.style.display = "block";
            errorBox.innerText = ` ${err.message}`;
          } else {
            cityElem.innerText = "Error fetching weather data";
          }
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
        cityElem.innerText = "Location access denied.";
      }
    );
  } else {
    cityElem.innerText = "Geolocation not supported.";
  }
  
});
