import memory from "../../managers/Memory.js";
import { shuffleArr } from "../../utils/utils.js";

const cantPreg = memory.get("preguntas").length

function menuOptions() {

    const opciones = [
      {id: 'memoria',    title: 'guarda partida', value : 0,   type: 'setter' },
      {id: 'teclado',    title: 'teclado',        value : 0,   type: 'setter' },
      {id: 'menu',       title: 'menu',           value : 0,   type: 'setter' },
      {id: 'velocidad',  title: 'velocidad',      value : 3,   type: 'range' , 
      min: 2,max: 5},
      {id: 'dificultad', title: 'dificultad',     value : 5,   type: 'range' , 
      min: 1,max: cantPreg},
      {id: 'vidas',      title: 'vidas',          value : 3,   type: 'range' , max: 12},
      {id: 'intentos',   title: 'intentos',       value : 3,   type: 'range' , 
        min: 2,max: 12},
    ];

    const template = document.createElement("template");

    template.innerHTML = `
      <section  class="options-menu">
        <ul class="menu"></ul>
      </section>
    `
    const container = template.content.cloneNode(true);

    const ul = container.querySelector('.menu')  

    const config = memory.get("opciones")


    opciones.forEach((prop) => {
      const li = (prop.type === 'setter')
        ? _createSetterItem(prop, config ,_setterHandler)
        : _createRangeItem(prop, config,_rangeHandler);
  
      ul.appendChild(li);
    });
  
    container.appendChild(ul);
    return container;
}
  



// Handlers

function _setterHandler(elem, config, index){
  if(elem.innerHTML.trim() == 'ON'){
    elem.innerHTML = 'OFF'
    config[index] = 0
  }else{
    elem.innerHTML = 'ON'
    config[index] = 1
  }
  memory.refresh()
}


function _rangeHandler(elem, config, index){
  config[index] =  Number(elem.value)
  elem.value    =  config[index]

  switch(index){
    case 'dificultad':
     // Arma partida aleatoria
     const preguntas = Array.from(memory.get("preguntas"))
     const quiz = Object.fromEntries(
       shuffleArr(preguntas).slice(0, config.dificultad)
       .map(element => [element, 0])
     )
     memory.get("partida").quiz = quiz
     break;
  }

  memory.refresh()
}



// Auxiliares


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
  input.addEventListener("input", () => _rangeHandler(input, config ,prop.id));

  return container;
} 


  export default menuOptions;
  

  

