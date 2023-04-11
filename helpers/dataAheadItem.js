import { Element } from "./elements.js";
let daysAheadContainer = document.querySelector(".days-ahead");
export const renderDataAheadItem = (d) => {
  let dayAheadItem = new Element("div").addClass("day-ahead--item");
  let dayAheadItemDate = new Element("span")
    .content(d.date)
    .addClass("day-ahead--item-date")
    .content(d.date);
  let tempTitle = new Element("span")
    .addClass("data--item-title")
    .content("Temp");
  let tempData = new Element("span")
    .addClass("data--item-data")
    .content(`${d.temp}°C`);
  let windTitle = new Element("span")
    .addClass("data--item-title")
    .content("Wind speed (MPH)");
  let windData = new Element("span")
    .addClass("data--item-data")
    .content(d.windSpeed);
  let humidityTitle = new Element("span")
    .addClass("data--item-title")
    .content("Humidity");
  let humidityData = new Element("span")
    .addClass("data--item-data")
    .content(d.humidity);
  let dayAheadData = new Element("div").addClass("day-ahead--data");
  let dataItemTemp = new Element("div").addClass("data--item");
  let dataItemWind = new Element("div").addClass("data--item");
  let dataItemHumidity = new Element("div").addClass("data--item");
  dataItemTemp.append(tempTitle.element);
  dataItemTemp.append(tempData.element);
  dataItemWind.append(windTitle.element);
  dataItemWind.append(windData.element);
  dataItemHumidity.append(humidityTitle.element);
  dataItemHumidity.append(humidityData.element);
  dayAheadData.append(dataItemTemp.element);
  dayAheadData.append(dataItemWind.element);
  dayAheadData.append(dataItemHumidity.element);
  dayAheadItem.append(dayAheadItemDate.element);
  dayAheadItem.append(dayAheadData.element);
  daysAheadContainer.append(dayAheadItem.element);
};

