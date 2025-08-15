import memory from "../../managers/Memory";

// CSS CONFIG

function updateCssVars() {
  const opciones = memory.get("opciones");
  const partida_quiz = memory.get("partida_quiz");
  const partida_intro = memory.get("partida_intro")

  const html = document.documentElement;
  // html.style.setProperty("--progress-enable", opciones.progreso * 0.5);
  html.style.setProperty("--menu-btn", opciones.menu == 1 ? 'block' : 'none');
  html.style.setProperty(
    "--animation-time",
    -1 * opciones.velocidad + 5.5 + "s"
  );

  if(opciones.memoria == 1){
    html.style.setProperty(
      "--continue-menu",
      partida_quiz.resume &&
      partida_quiz.estado != "user-wins" || 
      partida_intro.resume &&  
      partida_quiz.estado != "user-wins" 
      ? "flex"
      : "none"
    );
    html.style.setProperty(
      "--score-menu",
      partida_quiz.estado == "user-wins" ? "flex" : "none"
    );
  }

  }



// MENU CREATE ITEMS


function _createGroup(group_item, {_range, _switch}){
  const template = document.createElement("template");

  template.innerHTML = `
    <div class='menu-options-group'>
      <li class='menu-group-title'>
         <span>${group_item.title}</span> <i class="fi fi-rr-angle-down"></i>
      </li>
      <div class="menu-group expande">
      </div>
    </div>
  `;
  const container = template.content.cloneNode(true);
  const title        = container.querySelector(".menu-group-title")
  title.addEventListener('click',() => {
    const next = title.nextElementSibling
      if(next.classList.contains('collapse')){
        next.classList.replace('collapse','expande')
      }else if(next.classList.contains('expande')){
        next.classList.replace('expande', 'collapse')
      }
      next.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
  const this_group = container.querySelector(".menu-group");
  const li = container.querySelector('.menu-options-group')
  li.id = group_item.id
 
  group_item.hide = memory.get('opciones').mode == 'custom' ? false : true
  if(group_item.hide){
    li.classList.add('hide')
  }

  group_item.group.forEach(item => {
    let li;
    switch (item.type) {
      case "switch":
        li = _createSwitchItem(item, _switch);
        break;
      case "range":
        li = _createRangeItem(item, _range);
        break;
    }
    this_group.appendChild(li);
  });

  return container

}


function collapseToggle (target){
  const next = target.nextElementSibling
  if(next.classList.contains('collapse')){
    next.classList.replace('collapse','expande')
  }else if(next.classList.contains('expande')){
    next.classList.replace('expande', 'collapse')
  }
  next.scrollIntoView({ behavior: 'smooth', block: 'start' })
}


function _createGroupRadioW(item, _groupHandler){

    
  const template = document.createElement("template");

  template.innerHTML = `
    <div class='menu-options-group'>
      <li class='menu-group-title'>
         <span>${item.title}</span> <i class="fi fi-rr-angle-down"></i>
      </li>
      <div class="menu-group expande">
      </div>
    </div>
    `;
  const container = template.content.cloneNode(true);



  const li = container.querySelector('.menu-options-group')
  li.id = item.id

  const switchGroup  = container.querySelector(".menu-group");
  const title        = container.querySelector(".menu-group-title")
  title.addEventListener('click', ()=>{ collapseToggle(title)})

  item.group.forEach(elem => {

    const li = _createSwitchItem(elem, funchandler )
    const input = li.querySelector('input')
    input.type="radio"
    input.value= elem.id
    input.name= item.id
    input.id = elem.id

    let funchandler;
    switch(elem.id){
      case 'mode-1':   funchandler = ()=>{ _groupHandler(input ,item.id) }; break;
      case 'mode-2':   funchandler = ()=>{ _groupHandler(input ,item.id) }; break;
      case 'mode-3':   funchandler = ()=>{ _groupHandler(input ,item.id) }; break;
      case 'custom':   funchandler = ()=>{ _groupHandler(input ,item.id)}; break;
    }

    switchGroup.append(li)
  }); 


  return container;
}




function _createGroupRadio(item, _groupHandler){

  // Caso Particular
  const opciones = memory.get('opciones')
  const template = document.createElement("template");

  template.innerHTML = `
    <div class='menu-options-group'>
      <li class='menu-group-title'>
         <span>${item.title}</span> <i class="fi fi-rr-angle-down"></i>
      </li>
      <div class="menu-group expande">
      </div>
    </div>
    `;
  const container = template.content.cloneNode(true);


  const config_1 = {velocidad:4, dificultad:4, vidas:5, intentos:7, mode:1} // mode 1
  const config_2 = {velocidad:5, dificultad:5, vidas:5, intentos:5, mode:2} // mode 2
  const config_0 = {velocidad:5, dificultad:5, vidas:3, intentos:8, mode:0} // default

  const li = container.querySelector('.menu-options-group')
  li.id = item.id

  const switchGroup  = container.querySelector(".menu-group");
  const title        = container.querySelector(".menu-group-title")
  title.addEventListener('click', ()=>{ 
    collapseToggle(title);
  })


  item.group.forEach(elem => {

    let funchandler;
    switch(elem.id){
      case 'mode-1':   funchandler = ()=>{ _groupHandler({...config_1, mode: elem.id}) }; break;
      case 'mode-2':   funchandler = ()=>{ _groupHandler({...config_2, mode: elem.id}) }; break;
      case 'default':   funchandler = ()=>{ _groupHandler({...config_0, mode: elem.id}) }; break;
      case 'custom':   funchandler = ()=>{ _groupHandler({ mode: elem.id })}; break;
    }
    
    const li = _createSwitchItem(elem, funchandler )
    const input = li.querySelector('input')
    input.value= elem.id
    input.name= item.id
    input.id = elem.id
    input.type = "radio"
    input.checked = opciones['mode'] == elem.id ? true : false
    switchGroup.append(li)
  }); 


  return container;
}




// // Switchers

function _createButtonItem(item, _switchHandler){
  const opciones = memory.get("opciones");
  const template = document.createElement("template");

  template.innerHTML = `
  <li class="menu-options-item">
    <span class='title-options'></span>
    <div class="button-menu-item" checked>
      <i style="font-size:20px" class="${item.data.class}" ></i>
    </div>
  </li>`

  const container = template.content.cloneNode(true);

  const span  = container.querySelector('.title-options')
  const div = container.querySelector('.button-menu-item')


  div.id = item.id
  div.checked = opciones[item.id] == 0 ? false : true
  span.textContent = item.title;

  div.addEventListener("click", () => {
    _switchHandler(div, item.id, item.func);
  });

  return container 
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


  input.id = item.id
  input.checked = opciones[item.id] == 0 ? false : true
  input.value = opciones[item.id] ?? item.value;
  span.textContent = item.title;

  input.addEventListener("input", () => {
    _switchHandler(input, item.id, item.func);
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

  input.id = item.id
  input.type = "range";
  input.min = item.min ?? 0;
  input.max = item.max ?? 12;
  input.value = opciones[item.id] ?? item.value;

  input.addEventListener("input", () => _rangeHandler(input, item.id));

  return container;
}

export {
  _createButtonItem, _createGroup, _createGroupRadio, _createRangeItem, _createSwitchItem,
  updateCssVars
};

