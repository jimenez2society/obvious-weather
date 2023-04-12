import { getWeatherByCoord } from "../api/api.js";
import { renderDataAheadItem } from "./dataAheadItem.js";

export class Element {
  constructor(type) {
    let element = document.createElement(type);
    this.element = element;
  }
  addClass(className) {
    if (!this.element.className) {
      this.element.className = className;
    } else {
      this.element.classList.add(className);
    }
    return this;
  }
  addId(id) {
    this.element.id = id;
    return this;
  }
  content(content) {
    this.element.textContent = content;
    return this;
  }
  append(child) {
    this.element.appendChild(child);
    return this;
  }
}

export const createResultsItem = (name, state, country) => {
  let searchResultsList = document.querySelector(".searchResults--list");
  let li = document.createElement("li");
  let a = document.createElement("a");
  li.className = "searchResults--list-item";

  a.href = "#";
  a.textContent = `${name ? `${name},` : ""} ${state ? `${state},` : ""} ${
    country ? `${country}` : ""
  }`;
  li.appendChild(a);
  searchResultsList.appendChild(li);
  return li;
};
export const updateRecentItems = () => {
  let recentsList = JSON.parse(localStorage.getItem("recentActivity"));
  recentsList.forEach(({ state, name, country }) => {
    let list = document.querySelector(".recentActivity--list");
    let li = document.createElement("li");
    let a = document.createElement("a");
    let exit = document.createElement("img");

    li.className = "recentActivity--list-item";
    a.id = `${name}-${state}-${country}`;
    a.className = "recentActivity--list-item-link";
    a.href = "#";
    a.textContent = `${name ? `${name},` : null} ${state ? `${state},` : ""} ${
      country ? `${country}` : ""
    }`;
    a.addEventListener("click", async (e) => {
      let main = document.querySelector(".main");
      let mainEmpty = document.querySelector(".empty-main");
      let splitId = e.target.id.split("-");
      let city = splitId[0];
      let state = splitId[1];
      let country = splitId[2];
      let foundItem = getRecentItem(city, state)[0];
      updateCurrentCity({ name: city, state, country });
      const { lat, lon } = foundItem;
      let res = await getWeatherByCoord({
        lat,
        lon,
      });
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
    });
    exit.className = "recent-delete";
    exit.setAttribute("src", "../assets/svg/exit.svg");
    a.appendChild(exit);
    li.appendChild(a);
    list.appendChild(li);
  });
};
export const createRecentItem = (e, currentCity) => {
  let noRecentsList = document.querySelector(".noRecents");

  const { name, state, country } = currentCity;
  let list = document.querySelector(".recentActivity--list");
  let li = document.createElement("li");
  let a = document.createElement("a");
  let exit = document.createElement("img");
  exit.className = "recent-delete";
  exit.setAttribute("src", "../assets/svg/exit.svg");
  li.className = "recentActivity--list-item";
  a.id = `${name}-${state}-${country}`;
  a.className = "recentActivity--list-item-link";
  a.href = "#";
  a.textContent = `${name ? `${name},` : null} ${state ? `${state},` : ""} ${
    country ? `${country}` : ""
  }`;
  a.appendChild(exit);
  li.appendChild(a);
  a.addEventListener("click", async (e) => {
    let main = document.querySelector(".main");
    let mainEmpty = document.querySelector(".empty-main");
    let splitId = e.target.id.split("-");
    let city = splitId[0];
    let state = splitId[1];
    let country = splitId[2];
    let foundItem = getRecentItem(city, state)[0];
    updateCurrentCity({ name: city, state, country });
    const { lat, lon } = foundItem;
    let res = await getWeatherByCoord({
      lat,
      lon,
    });
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
    console.log(curr);
    res.forEach((d) => {
      if (!d.current) {
        console.log(d.date);
        let date = new Date(d.date);
        d.date = date.toString().split(" ").slice(0, 4).join(" ");
        renderDataAheadItem(d);
      }
    });
    console.log({ foundItem, res });
    // console.log({ res });
  });
  list.insertBefore(li, list.firstChild);
  let recentsList = JSON.parse(localStorage.getItem("recentActivity"));
  if (!recentsList) {
    noRecentsList.classList.remove("show");
    localStorage.setItem("recentActivity", JSON.stringify([currentCity]));
  } else {
    recentsList.unshift(currentCity);
    localStorage.setItem("recentActivity", JSON.stringify(recentsList));
  }
};
const getRecentItem = (city, state) => {
  let recents = JSON.parse(localStorage.getItem("recentActivity"));
  let foundItem = recents.filter(
    (item) => item.name === city && item.state === state
  );
  return foundItem;
};
export const updateCurrentCity = (currentCity) => {
  const { name, state, country } = currentCity;
  let currentCityContent = document.querySelector(".currentCity--content");
  currentCityContent.textContent = `${name ? `${name},` : null} ${
    state ? `${state},` : ""
  } ${country ? `${country}` : ""}`;
  let currentCityTitle = document.querySelector(".currentCity--name");
  currentCityTitle.textContent = `${name ? `${name},` : null} ${
    state ? `${state},` : ""
  } ${country ? `${country}` : ""}`;
  localStorage.setItem("currentCity", JSON.stringify(currentCity));
};
