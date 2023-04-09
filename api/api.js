import {
  createRecentItem,
  createResultsItem,
  updateCurrentCity,
} from "../helpers/elements.js";

export const getCoordByName = async (cityName) => {
  let response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=86157940b5d1a0fde3d98a43fbd8c597`
  );
  let res = await response.json();
  return res;
};
let searchInput = document.querySelector("#search");
let searchForm = document.querySelector("#searchForm");
let searchResults = document.querySelector(".searchResults");

let searchResultList = document.querySelector(".searchResults--list");
document.addEventListener("click", (e) => {
  if (e.target.className !== "searchResults--list") {
    // searchInput.value = "";
    searchResults.classList.remove("show");
  }
});
searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let { value } = searchInput;
  let res = await getCoordByName(value);
  if (res) {
    searchResults.classList.add("show");
    searchResultList.innerHTML = "";
    res.forEach((data) => {
      let liResult = createResultsItem(data?.name, data?.state, data?.country);

      liResult.addEventListener("click", (e) => {
        searchInput.value = "";
        searchResultList.innerHTML = "";
        updateCurrentCity(data);
        createRecentItem(e, data);
      });
    });

    // searchInput.value = "";
  }
  //   searchResults.innerHTML = null;

  //   res.forEach((r) => console.log(r.name, r.state, r.lon, r.lat));
  //   console.log({ res });
});
// searchInput.addEventListener("keypress", async (e) => {
//   const { name, value } = e.target;
// });
// searchInput.addEventListener("keyup", async (e) => {
//   const { name, value } = e.target;
//   let res = await getCoordByName(value);
//   res.forEach((r) => console.log(r.name, r.state, r.lon, r.lat));
//   console.log({ res });
// });
