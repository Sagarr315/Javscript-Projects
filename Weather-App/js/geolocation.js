// Wait for the full page (images, styles, etc.) to load
window.onload = function () {
  // Get the span where we want to show the user's location
  const locationSpan = document.getElementById("user-location");

  // Check if browser supports geolocation
  if (navigator.geolocation) {

    // Ask for user's current position
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        // Destructure latitude and longitude from position.coords
        const { latitude, longitude } = position.coords;

        // Define your OpenCage API key and endpoint
        const apiKey = "1334bce6ebd440ceb6a9a0ba180eaced";
        const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

        try {
          // Make a fetch request to OpenCage API
          const response = await fetch(apiUrl);
          const data = await response.json();

          // Extract location components (like city, town, state, etc.)
          const components = data.results[0].components;

          // Try to get the most specific nearby location available
          const city =
            components.city ||               // for major cities
            components.town ||               // for towns
            components.village ||            // for villages
            components.locality ||           // sometimes local name
            components.county ||             // district or county
            components.suburb ||             // area within city
            components.state_district ||     // sub-state region
            components.state ||              // fallback to state
            "Unknown";                       // if nothing is found

          // Show the detected city/state in the DOM
          locationSpan.innerText = city;

        } catch (error) {
          // Catch any error that happened while fetching or parsing the data
          console.error("Error fetching city:", error);
          locationSpan.innerText = "Unable to fetch city";
        }
      },

      // If user denies geolocation or it fails
      (error) => {
        console.error("Geolocation Error:", error);
        locationSpan.innerText = "Permission Denied";
      }
    );

  } else {
    // If geolocation is not available on the browser
    locationSpan.innerText = "Geolocation not supported";
  }
};
