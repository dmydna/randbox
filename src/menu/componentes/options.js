import memory from "../../managers/Memory.js";
import {
  _updCssVars,
  _createSetterItem,
  _createRangeItem,
  _createRatioItem,
  _createTitleItem,
} from "./utils.js";

const cantPreg = memory.get("preguntas").length;

function menuOptions() {
  const opcionesItems = [
    { id: "memoria", title: "guarda partida", value: 0, type: "setter" },
    { id: "teclado", title: "teclado", value: 0, type: "setter" },
    { id: "menu", title: "menu", value: 0, type: "setter" },
    {
      id: "velocidad",
      title: "velocidad",
      value: 3,
      type: "range",
      min: 2,
      max: 5,
    },
    {
      id: "dificultad",
      title: "dificultad",
      value: 5,
      type: "range",
      min: 1,
      max: cantPreg,
    },
    { id: "vidas", title: "vidas", value: 3, type: "range", max: 12 },
    {
      id: "intentos",
      title: "intentos",
      value: 3,
      type: "range",
      min: 2,
      max: 12,
    },
  ];

  const template = document.createElement("template");

  template.innerHTML = `
      <section  class="options-menu">
        <ul class="menu"></ul>
      </section>
    `;
  const container = template.content.cloneNode(true);

  const ul = container.querySelector(".menu");

  opcionesItems.forEach((item) => {
    let li = "";
    switch (item.type) {
      case "setter":
        li = _createSetterItem(item, _setterHandler);
        break;
      case "range":
        li = _createRangeItem(item, _rangeHandler);
        break;
      case "select":
        li = _createRatioItem(item, _rangeHandler);
        break;
      case "title":
        li = _createTitleItem(item, _rangeHandler);
        break;
    }
    ul.appendChild(li);
  });

  container.appendChild(ul);
  return container;
}

// Handlers

function _setterHandler(elem, key) {
  memory.set("opciones", {
    ...memory.get("opciones"),
    [key]: 0,
  });

  if (elem.innerHTML.trim() == "ON") {
    elem.innerHTML = "OFF";
    memory.set("opciones", {
      ...memory.get("opciones"),
      [key]: 0,
    });
  } else {
    elem.innerHTML = "ON";
    memory.set("opciones", {
      ...memory.get("opciones"),
      [key]: 1,
    });
  }
}

function _rangeHandler(elem, key) {
  memory.set("opciones", {
    ...memory.get("opciones"),
    [key]: Number(elem.value),
  });

  elem.value = memory.get("opciones")[key];

  return;
}

export default menuOptions;
