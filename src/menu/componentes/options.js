import memory from "../../managers/Memory.js";
import { shuffleArr } from "../../utils/utils.js";
import { _updCssVars, _createSetterItem, _createRangeItem, _createRatioItem, _createTitleItem } from "./utils.js";

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
      let li = ''
      switch(prop.type){
        case 'setter':
         li = _createSetterItem(prop, config ,_setterHandler);
         break;
        case 'range':
         li = _createRangeItem(prop, config,_rangeHandler);
         break;
        case 'select':
         li = _createRatioItem(prop, config,_rangeHandler);
         break;
        case 'title':
         li = _createTitleItem(prop, config,_rangeHandler);
         break;
      } 
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

  memory.refresh()
  return  
}







export default menuOptions;
  

  

