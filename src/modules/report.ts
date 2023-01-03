import { ForecastSimplifiedData } from "./interfaces";

const printTempCategory = function (temp: Number) {
  if (temp <= 32) {
    return "Brrr... it's freezing. You should...";
  }
  if (temp <= 55) {
    return "It's a bit chilly! You should...";
  }
  if (temp <= 78) {
    return "The weather feels amazing today! You should...";
  }
  if (temp <= 95) {
    return "Expect to feel some heat today. You should...";
  }
  return "It's burning up today! You should...";
};

const weatherModifierOptions = {
  Snow: "Winter is coming! You should...",
  Rain: "Rain is the name today! You should...",
  Thunderstorm: "Kachow! Storms invade the skies! You should...",
  Drizzle: "Pitter patter. It's drizzling outside. You should...",
  Mist: "MIST'd ya. Visibility is limited admist this mist. You should...",
  Clouds: "It's cloudy with a chance of meatballs! You should...",
};

const isWindy = function (weatherData: ForecastSimplifiedData) {
  return weatherData.wind > 15;
};

const isHumid = function (weatherData: ForecastSimplifiedData) {
  return weatherData.humidity > 55;
};

const isNormal = function (weatherData: ForecastSimplifiedData) {
  return weatherData.temp >= 55 && weatherData.temp <= 78;
};

const getHeadline = function (weatherData: any) {
  if (weatherData.classification in weatherModifierOptions) {
    const value =
      weatherModifierOptions[
        weatherData.classification as keyof typeof weatherModifierOptions
      ];
    console.log(value);
    return value;
  }
  if (isWindy(weatherData) && isNormal(weatherData)) {
    console.log(
      "Hang on to your hats and skirts! It's windy today. You should..."
    );
    return "Hang on to your hats and skirts! It's windy today. You should...";
  }

  if (isHumid(weatherData) && isNormal(weatherData)) {
    console.log("Sweat sticks like honey today! You should...");
    return "Sweat sticks like honey today! You should...";
  }

  console.log(printTempCategory(weatherData.temp));
  return printTempCategory(weatherData.temp);
};

export default getHeadline;
