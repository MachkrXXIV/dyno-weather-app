import "./styles/reset.scss";
import "./styles/style.scss";
import * as weather from "./modules/weather";
import { getHeadline, getSuggestions } from "./modules/report";
import * as displayController from "./modules/display";

const searchBarForm = document.querySelector(".search-bar");
const detailedView = document.querySelector(".detailed-view");

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
    displayController.displayErrorMsg();
    console.error(err);
  }
};

window.addEventListener("load", async (e) => {
  displayController.resetDisplay();
  e.preventDefault;
  const weatherData = await fetchCityTemp(true);
  const headline = getHeadline(weatherData);
  console.log(headline);
  const suggestions = getSuggestions(headline);
  displayController.displayHeadline(headline);
  displayController.displaySuggestions(suggestions);
  displayController.displayIcon(weatherData);
  displayController.displayTemperature(weatherData);
  displayController.displayHiAndLo(weatherData);
  displayController.displayCityName(weatherData);
  displayController.renderDetailedView(weatherData);
});

searchBarForm?.addEventListener("submit", async (e) => {
  displayController.resetDisplay();
  e.preventDefault();
  const weatherData = await fetchCityTemp();
  const headline = getHeadline(weatherData);
  const suggestions = getSuggestions(headline);
  displayController.displayHeadline(headline);
  displayController.displaySuggestions(suggestions);
  displayController.displayIcon(weatherData);
  displayController.displayTemperature(weatherData);
  displayController.displayHiAndLo(weatherData);
  displayController.displayCityName(weatherData);
  displayController.renderDetailedView(weatherData);
});

document.addEventListener("click", (e) => {
  if (e.target != detailedView) {
    detailedView?.classList.remove("detailed-view--active");
  }
});

detailedView?.addEventListener("click", (e) => {
  e.stopPropagation();
  detailedView.classList.toggle("detailed-view--active");
});
