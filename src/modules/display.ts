import * as report from "./report";
import { ForecastSimplifiedData } from "./interfaces";

const displayHeadline = function (headline: string) {
  const headlineElement = <HTMLElement>(
    document.querySelector(".report__headline")
  );
  headlineElement.textContent = headline;
};

const displayIcon = function (weatherData: any) {
  const iconElement = document.querySelector(".temperature__icon");
  iconElement?.classList.replace(
    // replaces previous icon with new icon
    iconElement.classList[3],
    report.getIconClass(weatherData)
  );
  setIconAnimation();
};

const displayTemperature = function (weatherData: any) {
  const tempElement = <HTMLElement>(
    document.querySelector(".temperature__value")
  );
  tempElement.textContent = `${Math.round(weatherData.temp)}°F`;
};

const displaySuggestions = function (suggestions: Array<string>) {
  const suggestionsElementContainer = document.querySelector(
    ".report__suggestions"
  );
  suggestions.forEach((suggestion) => {
    const suggestionElement = document.createElement("li");
    suggestionElement.classList.add("report__suggestions--active");
    suggestionElement.textContent = suggestion;
    suggestionsElementContainer?.appendChild(suggestionElement);
  });
};

const displayHiAndLo = function (weatherData: any) {
  const tempRangeElement = <HTMLElement>(
    document.querySelector(".temperature__range")
  );
  tempRangeElement.textContent = `H: ${Math.round(
    weatherData.tempMax
  )}°F L: ${Math.round(weatherData.tempMin)}°F`;
};

const displayCityName = function (weatherData: any) {
  const cityNameElement = <HTMLElement>(
    document.querySelector(".detailed-view__header")
  );
  cityNameElement.textContent = weatherData.name;
};

const clearSuggestionsContainer = function () {
  const suggestionsElementContainer = document.querySelector(
    ".report__suggestions"
  );
  while (suggestionsElementContainer?.firstChild) {
    suggestionsElementContainer.removeChild(
      suggestionsElementContainer.firstChild
    );
  }
};

const displayErrorMsg = function () {
  const errorMsgElement = <HTMLElement>(
    document.querySelector(".report__headline")
  );
  errorMsgElement.textContent =
    "Sorry, we could not find the city you inputted :/";
  displaySuggestions(["You should input a proper city name"]);
};

const renderDetailedView = function (weatherData: any) {
  const fieldsTextContent = report.getDetailedFields(weatherData);
  const detailedInformationFields = <NodeList>(
    document.querySelectorAll(".detailed-view__fields")
  );

  for (let i = 0; i < detailedInformationFields.length; i++) {
    detailedInformationFields[i].textContent = fieldsTextContent[i];
  }
};

const setIconAnimation = function () {
  const iconElement = <HTMLElement>document.querySelector(".temperature__icon");
  const iconClassList = iconElement.classList;
  const iconClassName = iconElement.classList[iconClassList.length - 1];

  console.log(iconClassList[iconClassList.length - 1]);

  if (iconClassList[3] === "fa-sun") {
    iconClassList.replace(iconClassName, "fa-spin");
  } else {
    iconClassList.replace(iconClassName, "fa-beat-fade");
  }
};

const resetDisplay = function () {
  const headlineElement = <HTMLElement>(
    document.querySelector(".report__headline")
  );
  const tempElement = <HTMLElement>(
    document.querySelector(".temperature__value")
  );
  const tempRangeElement = <HTMLElement>(
    document.querySelector(".temperature__range")
  );

  headlineElement.textContent = "";
  tempElement.textContent = "";
  tempRangeElement.textContent = "";
  clearSuggestionsContainer();
};

export {
  displayCityName,
  displayIcon,
  displayHeadline,
  displayHiAndLo,
  displaySuggestions,
  displayTemperature,
  displayErrorMsg,
  renderDetailedView,
  setIconAnimation,
  resetDisplay,
};
