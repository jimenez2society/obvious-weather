import { getCoordByName } from "../api/api.js";
import {
  createResultsItem,
  updateCurrentCity,
  updateRecentItems,
} from "../helpers/elements.js";
let currentCityContent = document.querySelector(".currentCity--content");
let noRecentsList = document.querySelector(".noRecents");
let recents = JSON.parse(localStorage.getItem("recentActivity"));

if (!recents) {
  noRecentsList.classList.add("show");
}
updateRecentItems();
updateCurrentCity(JSON.parse(localStorage.getItem("currentCity")));
