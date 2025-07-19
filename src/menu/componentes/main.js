import App from "../../main.js";
import memory from "../../managers/Memory.js";
import { hoverFlatIcon, shuffleArr } from '../../utils/utils.js';
import { _updCssVars } from "./utils.js";





function _playNewGame(game,cantidadItentos){
  game.intentos = cantidadItentos
  game.jugar();
  return
}



function menuMain(menu) {

   // Agrega Menu Items
   const menuItems = [
     {id: 'play-btn',     title: 'PLAY',     ico :'fi fi-rr-play'   },
     {id: 'score-btn',    title: 'SCORE',    ico :'fi fi-rr-trophy-star' },
     {id: 'continue-btn', title: 'CONTINUE', ico :'fi fi-rr-dice-d10' },
     {id: 'options-btn',  title: 'OPTIONS',  ico :'fi fi-rr-settings'  },
     {id: 'help-btn',     title: 'HELP',     ico :'fi fi-rr-info'     }
  ];

  const container = document.createElement("section");
  container.classList.add("main-menu");
  const img = document.createElement('img')

  img.src = '/src/assets/img/popup/menu-game.png'
  img.className = 'popup-ico'
  img.height = '100px'

  container.appendChild(img) 
  const ul = document.createElement("ul")
  ul.classList.add("menu");

  // Agrega Handlers 
  menuItems.forEach((prop)=>{
    const li = createMainItem(prop);
    li.addEventListener('click', (e)=>{
      switch(prop.id){
        case 'play-btn': _playMenuHandler(menu); break;
        case 'score-btn': _verScoreHandler(); break;
        case 'continue-btn': _continueGameHandler(); break;
        case 'options-btn': menu.cambiarMenu('options'); break;
        case 'help-btn': menu.cambiarMenu('help'); break;
      }
    })
    ul.appendChild(li);
  });
  container.appendChild(ul);

  return container
}



// Handlers

function _continueGameHandler(){
  App.router('/quiz')
}

function _verScoreHandler(){
  App.router('/score')
}

function _playMenuHandler(menu){

    // Inicia nueva partida con preguntas aleatorias 
    menu.showMenu(false)
    document.querySelector(".box").style.opacity = "1"

    // Aplica configuraciones css
    _updCssVars()

    // Limpia datos de partida anterior (setea a valor por default)
    memory.reset('partida')

    // Genera Partida aleatoria basada en dificultad
    const opciones = memory.get('opciones')
    const partida  = memory.get('partida')

    const preguntas = Array.from(memory.get('preguntas'))
    const quiz = Object.fromEntries(
      shuffleArr(preguntas)
      .slice(0, opciones.dificultad)
      .map(element => [element, 0])
    )
    
    memory.set('partida', {
      ...partida, 
      quiz:quiz
    })

    memory.refresh()

    App.router('/intro')
}

// Auxiliares

function createMainItem(prop) {

    const li = document.createElement("li");
    li.className = prop.id
  
    const i = document.createElement('i')
    i.className = prop.ico

    const span = document.createElement('span')
    span.textContent = prop.title


    li.appendChild(i)
    li.appendChild(span)

    hoverFlatIcon(li)

    return li;
}
  


export default menuMain