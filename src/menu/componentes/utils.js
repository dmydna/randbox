import memory from "../../managers/Memory"

// CSS CONFIG

function _updCssVars(){
    const config = memory.get('opciones')
    const partida = memory.get('partida')

    const html =  document.documentElement
    html.style.setProperty('--progress-enable',  config.progreso * 0.5)
    html.style.setProperty('--menu-enable', config.menu)
    html.style.setProperty('--animation-time', (-1) * config.velocidad + 5.5 + 's' )
    html.style.setProperty('--hearts', config.vidas)
    html.style.setProperty('--continue-menu', (config.memoria == 1 && partida.estado != '_' && partida.estado != 'user-wins' ) ? 'flex' : 'none')
    html.style.setProperty('--score-menu', (config.memoria == 1 && partida.estado == 'user-wins') ? 'flex' : 'none')
}


// MENU CREATE ITEMS

// Ratio
function _createRatioItem(prop, config, _rangeHandler){
    const template = document.createElement("template");
    template.innerHTML =`
    <li class="menu-options-item">
      <span class='title-options'></span>
      <input class='ratio-options'/>
    </li>
    `
    const container = template.content.cloneNode(true);
  
    const span = container.querySelector('.title-options')
    const input = container.querySelector('.ratio-options')
  
    span.textContent = prop.title
    input.type = "radio";
    input.value = config[prop.id] ?? prop.value;
    input.addEventListener("input", () => _rangeHandler(input, config ,prop.id));
    
  
    return container 
  }


// Title

function _createTitleItem(prop, config, _rangeHandler){
  const template = document.createElement("template");
  template.innerHTML =`
  <li class="menu-options-item">
    <span class='title-options'></span>
  </li>
  `
  const container = template.content.cloneNode(true);
  const span = container.querySelector('.title-options')

  span.textContent = prop.title

  return container
}
  
// Setter

function _createSetterItem(prop, config,_setterHandler) {

  const template = document.createElement("template");

  template.innerHTML = `
  <li class="menu-options-item">
    <span class='title-options'></span>
    <span class='setter-options'><span> 
  </li>
  `
  const container = template.content.cloneNode(true);

  const span1 = container.querySelector('.title-options')
  const span2 = container.querySelector('.setter-options')

  span1.textContent = prop.title
  span2.textContent = (config[prop.id] == 0) ? 'OFF' : 'ON';
  span2.addEventListener("click", () =>{ _setterHandler(span2, config,prop.id ) });

  return container
}
  

// Range

function _createRangeItem(prop, config, _rangeHandler) {

  const template = document.createElement("template");

  template.innerHTML = `
  <li class="menu-options-item">
    <span  class='title-options'></span>
    <input class='setter-options'/> 
  </li>
  `
  const container = template.content.cloneNode(true);

  // title
  const span = container.querySelector(".title-options");
  span.textContent = prop.title
  // input
  const input = container.querySelector(".setter-options");

  input.type = "range";
  input.min = prop.min  ??  0;
  input.max = prop.max  ?? 12;
  input.value = config[prop.id] ?? prop.value;
//   if(prop.id=='dificultad'){
//     input.addEventListener('input', () =>  partidaAleatoria(input, config, prop.id))
//     return container
//   }
  input.addEventListener("input", () => _rangeHandler(input, config ,prop.id));


  return container;
} 
  



export { _createRangeItem, _createRatioItem, _createSetterItem, _createTitleItem, _updCssVars }

