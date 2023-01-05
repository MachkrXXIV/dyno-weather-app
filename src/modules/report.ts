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
  Fog: "Fogs of war today! You should...",
};

const suggestions = {
  // Attire
  Summer: "Dress like a hot day in the summer, T-shirt and Shorts!",
  Light: "Dress warm with 2-3 light layers",
  Heavy: "Dress with heavy layers 3+",
  Raingear: "Wear a rainjacket and bring an umbrella",
  Sunglasses: "Put on some nice shades",
  Hat: "Block out the sunlight with a hat",
  Beanie: "Keep that noggin of yours warm with a beanie!",
  Boots: "Wear your boots today, it's gonna get messy!",

  // Warnings
  Defrost: "Defrost your windshield",
  Warmup: "Warm up your car before you go",
  Watch: "Be more attentive while driving, watch the roads!",
  Hydrate: "Drink more water today and have a water bottle handy",
  Sunscreen: "Slap on some sunscreen",

  // Activity
  Inside: "Spend your time indoors",
  Outside: "Get outside as it feels great",
  Snow: "Go sledding, have a snowball fight, or make a snowman!",
};

const suggestionsMap = {
  "Winter is coming! You should...": [
    suggestions.Snow,
    suggestions.Defrost,
    suggestions.Heavy,
    suggestions.Warmup,
    suggestions.Beanie,
  ],
  "Rain is the name today! You should...": [
    suggestions.Boots,
    suggestions.Raingear,
    suggestions.Inside,
    suggestions.Watch,
  ],
  "Kachow! Storms invade the skies! You should...": [
    suggestions.Boots,
    suggestions.Raingear,
    suggestions.Inside,
    suggestions.Watch,
  ],
  "Pitter patter. It's drizzling outside. You should...": [
    suggestions.Boots,
    suggestions.Light,
  ],
  "MIST'd ya. Visibility is limited admist this mist. You should...": [
    suggestions.Watch,
    suggestions.Light,
  ],
  "It's cloudy with a chance of meatballs! You should...": [
    suggestions.Outside,
    suggestions.Light,
  ],
  "Fogs of war today! You should...": [suggestions.Watch],
  "Brrr... it's freezing. You should...": [
    suggestions.Defrost,
    suggestions.Heavy,
    suggestions.Warmup,
    suggestions.Beanie,
  ],
  "It's a bit chilly! You should...": [suggestions.Light, suggestions.Beanie],
  "The weather feels amazing today! You should...": [
    suggestions.Outside,
    suggestions.Hat,
    suggestions.Sunscreen,
    suggestions.Summer,
  ],
  "Expect to feel some heat today. You should...": [
    suggestions.Summer,
    suggestions.Sunscreen,
    suggestions.Outside,
    suggestions.Hydrate,
  ],
  "It's burning up today! You should...": [
    suggestions.Summer,
    suggestions.Sunscreen,
    suggestions.Hat,
    suggestions.Hydrate,
  ],
};

const iconMap = {
  Snow: "fa-snowflake",
  Rain: "fa-cloud-showers-heavy",
  Thunderstorm: "fa-cloud-bolt",
  Drizzle: "fa-cloud-sun-rain",
  Clouds: "fa-cloud",
  Mist: "fa-smog",
  Fog: "fa-smog",
  Clear: "fa-sun",
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
    if (weatherData.classification === "Clouds" && !isNormal(weatherData))
      return printTempCategory(weatherData.temp);
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

const getSuggestions = function (headline: string) {
  console.log(suggestionsMap[headline as keyof typeof suggestionsMap]);
  return suggestionsMap[headline as keyof typeof suggestionsMap];
};

const getIconClass = function (weatherData: any) {
  console.log(iconMap[weatherData.classification as keyof typeof iconMap]);
  return iconMap[weatherData.classification as keyof typeof iconMap];
};

const getDetailedFields = function (weatherData: ForecastSimplifiedData) {
  return [
    `Description: ${weatherData.description}`,
    `Feels Like: ${Math.round(weatherData.feelsLike)}°F`,
    `Wind: ${Math.round(weatherData.wind)} MPH`,
    `Humidity: ${weatherData.humidity}%`,
  ];
};

export { getHeadline, getSuggestions, getIconClass, getDetailedFields };

// do special keywords styling
