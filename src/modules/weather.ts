import { ForecastSimplifiedData, CoordinateData } from "./interfaces";

const API_KEY = "4ebefd568a896d60b78e4d043eb08d81";
// testing

const search = function getUserSearch(): string {
  const cityName = <HTMLInputElement>document.getElementById("search-bar");

  if (cityName) {
    return cityName.value.toLowerCase();
  }

  return "";
};

const buildCityCoordinatesUrl = function (cityName: string): string {
  return `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${API_KEY}`;
};

const buildForecastUrl = function (coordinateData: any) {
  return `https://api.openweathermap.org/data/2.5/weather?lat=${coordinateData.lat}&lon=${coordinateData.lon}&units=imperial&exclude=minutely,alerts&appid=${API_KEY}`;
};

const getCityCordinates = async function (url: string) {
  try {
    const response = await fetch(url);
    const coordJson = await response.json();
    const coordData: CoordinateData = {
      name: coordJson[0].name,
      lat: coordJson[0].lat,
      lon: coordJson[0].lon,
      country: coordJson[0].country,
      state: coordJson[0].state,
    };
    return coordData;
  } catch (err) {
    console.log(err);
  }
};

const getCityForecast = async function (url: string) {
  try {
    const response = await fetch(url);
    const forecastJson = await response.json();
    return forecastJson;
  } catch (err) {
    console.log(err);
  }
};

const convertData = function (data: any): ForecastSimplifiedData {
  const weatherData: ForecastSimplifiedData = {
    classification: data.weather[0].main,
    name: data.name,
    description: data.weather[0].description,
    country: data.sys.country,
    temp: data.main.temp,
    tempMin: data.main.temp_min,
    tempMax: data.main.temp_max,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    wind: data.wind.speed,
  };
  console.log(weatherData);
  return weatherData;
};

export {
  search,
  buildCityCoordinatesUrl,
  buildForecastUrl,
  getCityCordinates,
  getCityForecast,
  convertData,
};
