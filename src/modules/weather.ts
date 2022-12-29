import API_KEY from "../config";

interface CoordinateData {
  name: string;
  lat: number;
  lon: number;
  country: string;
}

const search = function getUserSearch(): string {
  const cityName = <HTMLInputElement>document.getElementById("search-bar");

  if (cityName) {
    return cityName.value.toLowerCase();
  }

  return "";
};

const buildCoords = function buildCityCoordinatesUrl(cityName: string): string {
  return `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${API_KEY}`;
};

const buildForecast = function buildForecastUrl(coordinateData: any) {
  return `https://api.openweathermap.org/data/2.5/weather?lat=${coordinateData.lat}&lon=${coordinateData.lon}&appid=${API_KEY}`;
};

const getCoords = async function getCityCordinates(url: string) {
  try {
    const response = await fetch(url);
    const coordJson = await response.json();
    const coordData: CoordinateData = {
      name: coordJson[0].name,
      lat: coordJson[0].lat,
      lon: coordJson[0].lon,
      country: coordJson[0].country,
    };
    console.log(coordData);
    return coordData;
  } catch (err) {
    console.log(err);
  }
};

const getForecast = async function getCityForecast(url: string) {
  try {
    const response = await fetch(url);
    const forecastJson = await response.json();
    console.log(forecastJson); // main gets us temp
    return forecastJson;
  } catch (err) {
    console.log(err);
  }
};

export { search, buildCoords, buildForecast, getCoords, getForecast };
