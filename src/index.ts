import "./styles/reset.scss";
import "./styles/style.scss";
import * as weather from "./modules/weather";

const searchBarForm = document.querySelector(".search-bar");

const fetchCityTemp = async function () {
  try {
    const citySearch = weather.search();
    const coordinateEndpoint = weather.buildCityCoordinatesUrl(citySearch);
    const coordinateData = await weather.getCityCordinates(coordinateEndpoint);
    const forecastEndpoint = weather.buildForecastUrl(coordinateData);
    const forecastData = await weather.getCityForecast(forecastEndpoint);

    return forecastData;
  } catch (err) {
    console.error(err);
  }
};

searchBarForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  fetchCityTemp();
});
