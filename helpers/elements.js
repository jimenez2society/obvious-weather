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
    a.className = "recentActivity--list-item-link";
    a.href = "#";
    a.textContent = `${name ? `${name},` : null} ${state ? `${state},` : ""} ${
      country ? `${country}` : ""
    }`;

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

  a.className = "recentActivity--list-item-link";
  a.href = "#";
  a.textContent = `${name ? `${name},` : null} ${state ? `${state},` : ""} ${
    country ? `${country}` : ""
  }`;
  a.appendChild(exit);
  li.appendChild(a);

  list.insertBefore(li, list.firstChild);
  //   list.appendChild(li);
  let recentsList = JSON.parse(localStorage.getItem("recentActivity"));
  if (!recentsList) {
    noRecentsList.classList.remove("show");
    localStorage.setItem("recentActivity", JSON.stringify([currentCity]));
  } else {
    recentsList.unshift(currentCity);
    localStorage.setItem("recentActivity", JSON.stringify(recentsList));
  }
};
export const updateCurrentCity = (currentCity) => {
  const { name, state, country } = currentCity;
  let currentCityContent = document.querySelector(".currentCity--content");
  currentCityContent.textContent = `${name ? `${name},` : null} ${
    state ? `${state},` : ""
  } ${country ? `${country}` : ""}`;
  localStorage.setItem("currentCity", JSON.stringify(currentCity));
};
