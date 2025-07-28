// Wait until the full HTML document is loaded
document.addEventListener("DOMContentLoaded", function () {

  // 🔹 Step 1: Grab all the DOM elements that will be updated with weather info
  const cityElem      = document.getElementById("cityname");
  const tempElem      = document.getElementById("temperature");
  const conditionElem = document.getElementById("weathercondition");
  const humidityElem  = document.getElementById("humidity");
  const windElem      = document.getElementById("wind");
  const pressureElem  = document.getElementById("pressure");

  // 🔹 Step 2: Your OpenWeather API key
  const weatherApiKey = "021d0942318aedf13f9044edb7e59fab";

  // 🔹 Step 3: Check if the browser supports geolocation
  if (navigator.geolocation) {

    // Try to get user's current location (latitude and longitude)
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // 🔹 Step 4: Use reverse geocoding to get city/state from lat/lon
          const reverseGeoURL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${weatherApiKey}`;
          const geoRes = await fetch(reverseGeoURL);
          const geoData = await geoRes.json();

          // Check if location data is returned
          if (!geoData || geoData.length === 0) {
            throw new Error("No location data found");
          }

          // 🔹 Step 5: Extract city and state name
          const city = geoData[0].name;
          const state = geoData[0].state;
          const displayLocation = `${city}, ${state}`;

          // 🔹 Step 6: Show the city + state in the UI
          if (cityElem) cityElem.innerText = displayLocation;

          // 🔹 Step 7: Fetch weather data using the city name
          const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;
          const weatherRes = await fetch(weatherUrl);
          const weatherData = await weatherRes.json();

          console.log("🌤️ Weather response:", weatherData);

          // 🔹 Step 8: Handle API errors
          if (weatherData.cod !== 200) {
            console.error("❌ Weather API error:", weatherData.message);
            if (cityElem) cityElem.innerText = `Weather error: ${weatherData.message}`;
            return;
          }

          // 🔹 Step 9: Update UI with weather data
          if (tempElem)      tempElem.innerText      = `${weatherData.main.temp} °C`;
          if (conditionElem) conditionElem.innerText = weatherData.weather[0].main;
          if (humidityElem)  humidityElem.innerText  = `${weatherData.main.humidity}%`;
          if (windElem)      windElem.innerText      = `${weatherData.wind.speed} m/s`;
          if (pressureElem)  pressureElem.innerText  = `${weatherData.main.pressure} hPa`;

        } catch (err) {
          // 🔹 Step 10: Handle errors (API failed or bad data)
          console.error("Error fetching data:", err);
          if (cityElem) cityElem.innerText = "Error loading weather";
        }
      },

      // 🔹 If user denies location access or an error occurs
      (err) => {
        console.error("Geolocation error:", err);
        if (cityElem) cityElem.innerText = "Permission denied";
      }
    );

  } else {
    // 🔹 Geolocation not supported on this browser
    console.warn("Geolocation not supported");
    if (cityElem) cityElem.innerText = "Geolocation not supported";
  }
});
