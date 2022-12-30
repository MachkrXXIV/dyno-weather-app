import API_KEY from "../config";

interface CoordinateData {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

interface ForecastSimplifiedData {
  name: string;
}

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
    console.log(coordData);
    return coordData;
  } catch (err) {
    console.log(err);
  }
};

const getCityForecast = async function (url: string) {
  try {
    const response = await fetch(url);
    const forecastJson = await response.json();
    console.log(forecastJson); // main gets us temp, weather is title
    return forecastJson;
  } catch (err) {
    console.log(err);
  }
};

// const filterData = function filterForecastData(data) {};

export {
  search,
  buildCityCoordinatesUrl,
  buildForecastUrl,
  getCityCordinates,
  getCityForecast,
};
