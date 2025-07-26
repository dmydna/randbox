import memory from "../../managers/Memory.js";
import {
  _updCssVars,
  _createSwitchItem,
  _createRangeItem,
  _createGroupRadio,
  _createGroup
} from "./utils.js";



function menuOptions() {

  memory.refresh()
  const cantPreg = memory.get("preguntas").length;

  const opcionesItems = [
    { id: "memoria", title: "guarda partida", value: 0, type: "switch" },
    { id: "teclado", title: "teclado", value: 0, type: "switch" },
    { id: "menu", title: "menu", value: 0, type: "switch" },
    { id: "tutorial", title: "tutorial", value: 0, type: "switch" },
    {id: "modo",title: "modo de juego" ,value: 3,type: "group-radio", group: [
      { id: "mode-1",   title: "Child",   value: 0, type: "switch" },
      { id: "mode-2",   title: "Normal",  value: 0, type: "switch" },
      { id: "default",   title: "Default", value: 0, type: "switch" },
      { id: "custom",   title: "custom", value: 0, type: "switch"  }
    ]},
    {id: "avanzado",title: "avanzado" ,value: 3,type: "group", group: [
      {id: "velocidad",title: "velocidad",value: 3,type: "range",min: 2,max: 5,},
      {id: "dificultad",title: "dificultad",value: 5,type: "range",min: 1,max: cantPreg,},
      {id: "vidas", title: "vidas", value: 3, type: "range", max: 12 },
      {id: "intentos",title: "intentos",value: 3,type: "range",min: 2,max: 12,},      
    ], hide:true},
    { id: "storage", title: "limpiar cache", value: 0, type: "switch", func : ()=>{
      if(document.querySelector('#storage').checked){
        localStorage.clear()
      }
    } }

  ];

  const template = document.createElement("template");

  template.innerHTML = `
      <section  class="options-menu">
        <h2 class="menu-title">
          <i class="fi fi-sr-settings"></i>opciones
        </h2>
        <ul class="menu"></ul>
      </section>
    `;
  const container = template.content.cloneNode(true);

  const ul = container.querySelector(".menu");

  opcionesItems.forEach((item) => {
    let li = "";
    switch (item.type) {
      case "switch":
        li = _createSwitchItem(item, _switchHandler);
        break;
      case "range":
        li = _createRangeItem(item, _rangeHandler);
        break;
      case "group-radio": // grupo de opcion unica
        li = _createGroupRadio(item, _groupRadioHandler);
        break;
      case "group":      // grupo de opcion multiple
        li = _createGroup(item, { _range:_rangeHandler, _switch: _switchHandler});
        break;
    }
    ul.appendChild(li);
  });


  return container;
}

// Handlers


function _switchHandler(elem, key, funcion = null){
  if(elem.checked){
    memory.set("opciones", {
      ...memory.get("opciones"),
      [key]: 1,
    })
  }else{
    memory.set("opciones", {
      ...memory.get("opciones"),
      [key]: 0,
    });
  }
  if(funcion){
    funcion()
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

// groupRadioHandler :: caso particular

const _groupRadioHandler = ({velocidad, dificultad, vidas, intentos, mode})=>{ 


  const avanzado = document.querySelector('#avanzado') 

  if(mode == 'custom'){
    // importante
    avanzado.classList.remove('hide')
    memory.set('opciones',{
      ...memory.get('opciones'),
      mode: mode
    })

      // fix
    const next = document.querySelector('#avanzado')
    next.scrollIntoView({ behavior: 'smooth', block: 'end' })
    return
  }

  //importante
  avanzado.classList.add('hide')

  const input1 = document.querySelector('#velocidad')
  const input2 = document.querySelector('#dificultad')
  const input3 = document.querySelector('#vidas')
  const input4 = document.querySelector('#intentos')
  input1.value = velocidad
  input2.value = dificultad
  input3.value = vidas
  input4.value = intentos


  memory.set('opciones',{
    ...memory.get('opciones'),
    ...{velocidad: velocidad, 
      dificultad:dificultad,
      vidas:vidas, 
      intentos: intentos,
      mode:mode}
  })




}




const _groupHandler = (elem,key)=>{ 

  if(elem.checked){
    memory.set("opciones", {
      ...memory.get("opciones"),
      [key]: elem.value,
    })
  }else{
    memory.set("opciones", {
      ...memory.get("opciones"),
      [key]: elem.value,
    });
  }
}




export default menuOptions;
