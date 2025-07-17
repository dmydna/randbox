import App from "../../main.js";
import memory from "../../managers/Memory.js";
import { hoverFlatIcon } from '../../utils/utils.js';
import { shuffleArr } from "../../utils/utils.js";





function _playNewGame(game,cantidadItentos){
  game.intentos = cantidadItentos
  game.jugar();
  return
}



function menuMain(menu) {

   // Agrega Menu Items
   const menuItems = [
     {id: 'play-btn',     title: 'PLAY',     ico :'fi fi-rr-play' ,   },
     {id: 'continue-btn', title: 'CONTINUE', ico :'fi fi-rr-dice-d10' },
     {id: 'options-btn', title: 'OPTIONS',  ico :'fi fi-rr-settings'  },
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
    App.fastRender('quiz')
 }
 

function _playMenuHandler(menu){

    // Inicia nueva partida con preguntas aleatorias 
    menu.showMenu(false)
    document.querySelector(".box").style.opacity = "1"

    // Limpia datos de partida anterior (setea a valor por default)
    memory._memoryReset('memoria')

    // Refresca preguntas (aplica shuffle)
    shuffleArr( memory._getMemory('preguntas'))
    memory._saveMemory()

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