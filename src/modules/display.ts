import * as report from "./report";
import { ForecastSimplifiedData } from "./interfaces";

const displayHeadline = function (headline: string) {
  const headlineElement = <HTMLElement>(
    document.querySelector(".report__headline")
  );
  headlineElement.textContent = headline;
};

const displayTemperature = function (weatherData: any) {
  const tempElement = <HTMLElement>(
    document.querySelector(".temperature__value")
  );
  tempElement.textContent = weatherData.temp;
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
  tempRangeElement.textContent = `H: ${weatherData.tempMax} L: ${weatherData.tempMin}`;
};

const displayCityName = function (weatherData: ForecastSimplifiedData) {
  const cityNameElement = <HTMLElement>document.querySelector(".detailed-view");
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

// const displayIcon =
