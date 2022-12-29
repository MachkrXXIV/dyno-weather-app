import "./styles/reset.scss";
import "./styles/style.scss";
import { search, getCoords, buildCoords } from "./modules/weather";

const searchBarForm = document.querySelector(".search-bar");

const initialLoad = function initialPageLoad() {
  const city = search();
  const coordinateEndpoint = buildCoords(city);
  getCoords(coordinateEndpoint);
};

searchBarForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  initialLoad();
});
