import API_KEY from "../config";

const search = function getUserSearch(): string {
  const searchBar = <HTMLInputElement>document.getElementById("search-bar");
  const cityName = searchBar.value.toLowerCase();

  return cityName;
};

const buildCoords = function buildCityCoordinatesUrl(cityName: string): string {
  return `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${API_KEY}`;
};

// const buildForecast = function build

const getCoords = async function getCityCordinates(url: string) {
  try {
    const response = await fetch(url);
    const coordJson = response.json();
    console.log(coordJson);
  } catch (err) {
    console.log(err);
  }
};

const getForecast = async function getCityForecast(url: string) {
  const response = await fetch(url);
  const forecastJson = response.json();
};

export { search, buildCoords, getCoords };
