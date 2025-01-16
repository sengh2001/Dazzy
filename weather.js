const apiKey = 'bd5e378503939ddaee76f12ad7a97608';

document.getElementById('searchButton').addEventListener('click', async () => {
  const dropdownCity = document.getElementById('cityDropdown').value;
  const customCity = document.getElementById('customCity').value;
  const city = customCity || dropdownCity;

  if (!city) {
    alert('Please select or enter a city.');
    return;
  }

  try {
    // Fetch weather data from OpenWeather API
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.cod !== 200) {
      document.getElementById('output').innerHTML = `<p>Error: ${data.message}</p>`;
    } else {
      document.getElementById('output').innerHTML = `
        <h2>Weather in ${data.name}, ${data.sys.country}</h2>
        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
      `;
    }
  } catch (error) {
    document.getElementById('output').innerHTML = `<p>Error fetching weather data. Please try again.</p>`;
  }
});
