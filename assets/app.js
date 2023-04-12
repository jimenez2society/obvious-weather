import { updateCurrentCity, updateRecentItems } from "../helpers/elements.js";
import "../api/api.js";
let noRecentsList = document.querySelector(".noRecents");
let recents = JSON.parse(localStorage.getItem("recentActivity"));
let navToggler = document.querySelector(".hamburger-icon");
let sideBar = document.querySelector(".sideBar--content");
let exitSideBar = document.querySelector(".exitSideBar");
navToggler.addEventListener("click", (e) => {
  sideBar.classList.add("open-sideBar");
});
exitSideBar.addEventListener("click", (e) => {
  sideBar.classList.remove("open-sideBar");
});
if (!recents) {
  noRecentsList.classList.add("show");
}
updateRecentItems();
updateCurrentCity(JSON.parse(localStorage.getItem("currentCity")));
