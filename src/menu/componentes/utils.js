import memory from "../../managers/Memory";

// CSS CONFIG

function _updCssVars() {
  const opciones = memory.get("opciones");
  const partida = memory.get("partida");

  const html = document.documentElement;
  html.style.setProperty("--progress-enable", opciones.progreso * 0.5);
  html.style.setProperty("--menu-enable", opciones.menu);
  html.style.setProperty(
    "--animation-time",
    -1 * opciones.velocidad + 5.5 + "s"
  );
  html.style.setProperty("--hearts", opciones.vidas);
  html.style.setProperty(
    "--continue-menu",
    opciones.memoria == 1 &&
      partida.estado != "_" &&
      partida.estado != "user-wins"
      ? "flex"
      : "none"
  );
  html.style.setProperty(
    "--score-menu",
    opciones.memoria == 1 && partida.estado == "user-wins" ? "flex" : "none"
  );
}

// MENU CREATE ITEMS

// Ratio
function _createRatioItem(item, _rangeHandler) {
  const opciones = memory.get("opciones");
  const template = document.createElement("template");
  template.innerHTML = `
    <li class="menu-options-item">
      <span class='title-options'></span>
      <input class='ratio-options'/>
    </li>
    `;
  const container = template.content.cloneNode(true);

  const span = container.querySelector(".title-options");
  const input = container.querySelector(".ratio-options");

  span.textContent = item.title;
  input.type = "radio";
  input.value = opciones[item.id] ?? item.value;
  input.addEventListener("input", () => _rangeHandler(input, item.id));

  return container;
}

// Title

function _createTitleItem(item, _rangeHandler) {
  const template = document.createElement("template");
  template.innerHTML = `
  <li class="menu-options-item">
    <span class='title-options'></span>
  </li>
  `;
  const container = template.content.cloneNode(true);
  const span = container.querySelector(".title-options");

  span.textContent = item.title;

  return container;
}

// Switchers

function _createSwitchItem(item, _switchHandler){
  const opciones = memory.get("opciones");
  const template = document.createElement("template");

  template.innerHTML = `
  <li class="menu-options-item">
    <span class='title-options'></span>
    <label class="switch">
     <input type="checkbox" checked>
     <span class="slider round"></span>
    </label>
  </li>`

  const container = template.content.cloneNode(true);

  const span  = container.querySelector('.title-options')
  const input = container.querySelector('input')

  span.textContent = item.title;
  input.checked = opciones[item.id] == 0 ? false : true
  input.addEventListener("input", () => {
    _switchHandler(input, item.id);
  });

  return container 
}


// Range

function _createRangeItem(item, _rangeHandler) {
  const opciones = memory.get("opciones");
  const template = document.createElement("template");

  template.innerHTML = `
  <li class="menu-options-item">
    <span  class='title-options'></span>
    <input class='setter-options'/> 
  </li>
  `;
  const container = template.content.cloneNode(true);

  // title
  const span = container.querySelector(".title-options");
  span.textContent = item.title;
  // input
  const input = container.querySelector(".setter-options");

  input.type = "range";
  input.min = item.min ?? 0;
  input.max = item.max ?? 12;
  input.value = opciones[item.id] ?? item.value;

  input.addEventListener("input", () => _rangeHandler(input, item.id));

  return container;
}

export {
  _createRangeItem,
  _createRatioItem,
  _createTitleItem,
  _updCssVars,
  _createSwitchItem
};
