import "./styles/reset.scss";
import "./styles/style.scss";
import * as weather from "./modules/weather";

const searchBarForm = document.querySelector(".search-bar");

const fetchCityTemp = async function (isInitialLoad = false) {
  try {
    const citySearch = isInitialLoad ? "Fayetteville" : weather.search();
    if (!citySearch) {
      // if no value put, then stops function
      return;
    }
    const coordinateEndpoint = weather.buildCityCoordinatesUrl(citySearch);
    const coordinateData = await weather.getCityCordinates(coordinateEndpoint);
    const forecastEndpoint = weather.buildForecastUrl(coordinateData);
    const forecastData = await weather.getCityForecast(forecastEndpoint);

    const simplifiedForecastData = weather.convertData(forecastData);
    return simplifiedForecastData;
  } catch (err) {
    console.error(err);
  }
};

fetchCityTemp(true);

searchBarForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const weatherData = await fetchCityTemp();
  console.log(weatherData);
});
