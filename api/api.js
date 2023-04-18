import { renderDataAheadItem } from "../helpers/dataAheadItem.js";
import {
  createRecentItem,
  createResultsItem,
  updateCurrentCity,
} from "../helpers/elements.js";
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
export const getCoordByName = async (cityName) => {
  // api call
  let response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=86157940b5d1a0fde3d98a43fbd8c597`
  );
  let res = await response.json();
  return res;
};
export const getWeatherByCoord = async (coords) => {
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&units=imperial&appid=86157940b5d1a0fde3d98a43fbd8c597`
  );
  let responseCurrentWeather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=imperial&appid=86157940b5d1a0fde3d98a43fbd8c597`
  );
  let resCurrent = await responseCurrentWeather.json();
  let res = await response.json();
  console.log({ resCurrent: resCurrent });
  return [
    {
      current: {
        temp: resCurrent.main.temp,
        humidity: resCurrent.main.humidity,
        windSpeed: resCurrent.wind.speed,
        date: resCurrent.dt,
      },
    },
    {
      temp: res.list[0].main.temp,
      humidity: res.list[0].main.humidity,
      windSpeed: res.list[0].wind.speed,
      date: res.list[0].dt_txt,
    },
    {
      temp: res.list[8].main.temp,
      humidity: res.list[8].main.humidity,
      windSpeed: res.list[8].wind.speed,
      date: res.list[8].dt_txt,
    },
    {
      temp: res.list[16].main.temp,
      humidity: res.list[16].main.humidity,
      windSpeed: res.list[16].wind.speed,
      date: res.list[16].dt_txt,
    },
    {
      temp: res.list[24].main.temp,
      humidity: res.list[24].main.humidity,
      windSpeed: res.list[24].wind.speed,
      date: res.list[24].dt_txt,
    },
  ];
};
let searchInput = document.querySelector("#search");
let searchForm = document.querySelector("#searchForm");
let searchResults = document.querySelector(".searchResults");

let searchResultList = document.querySelector(".searchResults--list");
document.addEventListener("click", (e) => {
  if (e.target.className !== "searchResults--list") {
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

      liResult.addEventListener("click", async (e) => {
        const { lat, lon } = data;
        let main = document.querySelector(".main");
        let mainEmpty = document.querySelector(".empty-main");
        let res = await getWeatherByCoord({ lat, lon });
        let curr = res[0];
        curr.current.date = new Date(curr.current.date * 1000);
        main.classList.add("main-show");
        mainEmpty.classList.add("empty-main-hide");
        document.querySelector(
          ".currentCity--temp-result"
        ).textContent = `${Math.floor(curr.current.temp)}°­F`;
        document.querySelector(".currentCity--wind-result").textContent =
          curr.current.windSpeed;
        document.querySelector(
          ".currentCity--humidity-result"
        ).textContent = `${curr.current.humidity}%`;
        document.querySelector(".currentCity--wind-bg").textContent =
          curr.current.windSpeed;
        document.querySelector(
          ".currentCity--humidity-bg"
        ).textContent = `${curr.current.humidity}%`;
        let tempImg = document.querySelector(".temp-img");
        if (curr.current.temp < 64) {
          tempImg.setAttribute("src", "../assets/svg/coldSvg.svg");
        } else {
          tempImg.setAttribute("src", "../assets/svg/weatherHotIcons.svg");
        }
        // .currentCity--temp-result,
        // .currentCity--wind-result,
        // .currentCity--humidity-result
        // .currentCity--wind-bg,
        // .currentCity--humidity-bg
        console.log(curr);
        res.forEach((d) => {
          if (!d.current) {
            console.log(d.date);
            let date = new Date(d.date);
            d.date = date.toString().split(" ").slice(0, 4).join(" ");
            renderDataAheadItem(d);
          }
        });
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
