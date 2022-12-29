import "./styles/reset.scss";
import "./styles/style.scss";
import * as weather from "./modules/weather";

const searchBarForm = document.querySelector(".search-bar");

const initialLoad = async function initialPageLoad() {
  const citySearch = weather.search();
  const coordinateEndpoint = weather.buildCoords(citySearch);
  const coordinateData = await weather.getCoords(coordinateEndpoint);
  const forecastEndpoint = weather.buildForecast(coordinateData);
  const forecastData = weather.getForecast(forecastEndpoint);

  return forecastData;
};

searchBarForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  initialLoad();
});
